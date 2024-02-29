// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

contract Review is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface immutable VRF_COORDINATOR;
    uint64 immutable vrfSubscriptionId;
    bytes32 immutable vrfKeyHash;    
    uint32 constant CALLBACK_GAS_LIMIT = 100000;    
    uint16 constant REQUEST_CONFIRMATIONS = 3;
    uint32 constant NUM_WORDS = 1;
    uint32 constant REQUIRED_REVIEWS = 1;
    mapping(uint256 => uint256) vrfRequestIdToSubmissionId;

    struct Reviewer {
        address addr;
    }
    struct Submission {
        address author;
        string data;
        string[] options;
        euint8[] encOptions;
        uint256 thresholdToPass;
        mapping(address => bytes32) commits;
        mapping(address => euint8) votes;
        mapping(uint8 => euint32) tally;
        mapping(address => string) comments;
        mapping(address => bool) isReviewerSelected;
        address[] selectedReviewers;
        address[] shuffledReviewers; // Updated field to store shuffled reviewers
        bool isApproved;
        uint256 seed; // New field to store seed
    }

    address[] public authors;
    Reviewer[] public reviewers;
    Submission[] public submissions;
    string public LICENSE;
    uint256 public ROI_DENOMINATOR;
    uint32 MAX_INT = 2 ** 32 - 1;
    address public owner;

    //constructor that sets license and ROI_DENOMINATOR
    constructor(string memory _license, uint256 _roiDenominator, uint64 _vrfSubscriptionId, address _vrfCoordinator, bytes32 _vrfKeyHash) VRFConsumerBaseV2(_vrfCoordinator) {
        LICENSE = _license;
        ROI_DENOMINATOR = _roiDenominator;
        owner = msg.sender;
        VRF_COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        vrfKeyHash = _vrfKeyHash;
        vrfSubscriptionId = _vrfSubscriptionId;
    }

    // Function to add an author, only callable by the owner
    function addAuthor(address _author) public {
        require(msg.sender == owner, "Only the owner can add authors.");
        authors.push(_author);
    }

    // Function to add a reviewer, only callable by the owner
    function addReviewer(address _reviewer) public {
        require(msg.sender == owner, "Only the owner can add reviewers.");
        reviewers.push(Reviewer(_reviewer));
    }

    // Function to get a reviewer's information by index
    function getReviewer(uint256 index)
        public
        view
        returns (address)
    {
        Reviewer storage reviewer = reviewers[index];
        return (reviewer.addr);
    }

    function setOptions(uint256 submissionIndex, string[] memory options) public {
        require(msg.sender == owner, "Only the owner can set options.");
        submissions[submissionIndex].options = options;
        for (uint8 i = 0; i < options.length; i++) {
            submissions[submissionIndex].tally[i] = FHE.asEuint32(0);
            submissions[submissionIndex].encOptions.push(FHE.asEuint8(i));
        }
    }

    function setThresholdToPass(uint256 submissionIndex, uint256 threshold) public {
        require(msg.sender == owner, "Only the owner can set the threshold to pass.");
        submissions[submissionIndex].thresholdToPass = threshold;
    }

    // Submit a data object
    function submitData(string memory _data) public returns (uint256) {
        Submission storage newSubmission = submissions.push();
        newSubmission.author = msg.sender;
        newSubmission.data = _data;
        uint256 submissionId = submissions.length - 1;
        emit SubmissionCreated(submissionId);
        return submissionId;
    }

    event SubmissionCreated(uint256 submissionId);

    // Function to get a submission's data by its ID
    function getSubmission(uint256 submissionId)
        public
        view
        returns (address author, string memory data)
    {
        require(
            submissionId < submissions.length,
            "Submission does not exist."
        );
        Submission storage submission = submissions[submissionId];
        return (submission.author, submission.data);
    }

    // Function to assign a seed to a submission
    function assignRndSeed(uint256 submissionId) external  {
        require(submissionId < submissions.length, "Invalid submission ID");
        uint256 vrfRequestId = VRF_COORDINATOR.requestRandomWords(
            vrfKeyHash,
            vrfSubscriptionId,
            REQUEST_CONFIRMATIONS,
            CALLBACK_GAS_LIMIT,
            NUM_WORDS
        );
        vrfRequestIdToSubmissionId[vrfRequestId] = submissionId;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 submissionId = vrfRequestIdToSubmissionId[requestId];
        submissions[submissionId].seed = randomWords[0]; 
    }

    // Find top 3 matching reviewers for a submission
    function findReviewers(uint256 submissionId) public {
        require(reviewers.length <= REQUIRED_REVIEWS, "Not enough reviewers to review the song");
        require(submissionId < submissions.length, "Invalid submission ID");
        // The shuffleReviewers call is updated to shuffle and store reviewers in the Submission struct
        shuffleReviewers(submissionId); // This call now populates the shuffledReviewers field in the Submission struct
        address[] memory selectedReviewers = new address[](REQUIRED_REVIEWS);
        for(uint32 i = 0; i < REQUIRED_REVIEWS; i++) {
            selectedReviewers[i] = submissions[submissionId].reviewers[i].address;
        }
        submissions[submissionId].selectedReviewers = selectedReviewers;
    }

    // Updated function to shuffle a copy of the reviewers and store it in the Submission struct
    function shuffleReviewers(uint256 submissionId) internal {
        require(submissionId < submissions.length, "Invalid submission ID");
        Submission storage submission = submissions[submissionId];
        address[] memory shuffledReviewers = new address[](reviewers.length);
        for (uint256 i = 0; i < reviewers.length; i++) {
            shuffledReviewers[i] = reviewers[i].addr;
        }
        uint256 seed = submission.seed;
        for (uint256 i = 0; i < shuffledReviewers.length; i++) {
            uint256 j = (uint256(keccak256(abi.encode(seed, i))) % (i + 1));
            (shuffledReviewers[i], shuffledReviewers[j]) = (
                shuffledReviewers[j],
                shuffledReviewers[i]
            );
        }
        submission.shuffledReviewers = shuffledReviewers;
    }


    // Function to get selected reviewers for a submission
    function getSelectedReviewers(uint256 submissionId)
        public
        view
        returns (address[] memory)
    {
        require(submissionId < submissions.length, "Invalid submission ID");
        return submissions[submissionId].selectedReviewers;
    }

    // https://docs.inco.org/getting-started/example-dapps/private-voting
    function castVote(uint256 submissionIndex, inEuint8 memory option) public {
        require(submissions[submissionIndex].isReviewerSelected[msg.sender], "Only selected reviewers can cast votes");
        euint8 encOption = FHE.asEuint8(option);

        ebool isValid = FHE.or(FHE.eq(encOption, submissions[submissionIndex].encOptions[0]), FHE.eq(encOption, submissions[submissionIndex].encOptions[1]));
        for (uint i = 1; i < submissions[submissionIndex].encOptions.length; i++) {
            FHE.or(isValid, FHE.eq(encOption, submissions[submissionIndex].encOptions[i + 1]));
        }
        FHE.req(isValid);

        // If already voted - first revert the old vote
        if (FHE.isInitialized(submissions[submissionIndex].votes[msg.sender])) {
            addToTally(submissionIndex, submissions[submissionIndex].votes[msg.sender], FHE.asEuint32(MAX_INT)); // Adding MAX_INT is effectively `.sub(1)`
        }

        submissions[submissionIndex].votes[msg.sender] = encOption;
        addToTally(submissionIndex, encOption, FHE.asEuint32(1));

    }

    function addToTally(uint256 submissionIndex, euint8 encOption, euint32 amount) internal {
        for (uint8 i = 0; i < submissions[submissionIndex].encOptions.length; i++) {
            euint32 toAdd = FHE.select(FHE.eq(encOption, submissions[submissionIndex].encOptions[i]), amount, FHE.asEuint32(0));
            submissions[submissionIndex].tally[i] = FHE.add(submissions[submissionIndex].tally[i], toAdd);
        }
    }

    event ResultRevealed(uint256 submissionId, bool result);

    function revealResult(uint256 submissionIndex) public {
        uint256 overallResult = 0;
        for (uint8 i = 0; i < submissions[submissionIndex].encOptions.length; i++) {
            uint256 optionTally = FHE.decrypt(submissions[submissionIndex].tally[i]);
            overallResult += optionTally * i;
        }
        //approve the submission
        submissions[submissionIndex].isApproved = submissions[submissionIndex].selectedReviewers.length * submissions[submissionIndex].thresholdToPass <= overallResult;
        emit ResultRevealed(submissionIndex, submissions[submissionIndex].isApproved);
    }
}