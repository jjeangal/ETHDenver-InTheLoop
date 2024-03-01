// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

contract Review is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface immutable VRF_COORDINATOR;
    uint64 immutable vrfSubscriptionId;
    bytes32 immutable vrfKeyHash;    
    uint32 constant CALLBACK_GAS_LIMIT = 100000;    
    uint16 constant REQUEST_CONFIRMATIONS = 3;
    uint32 constant NUM_WORDS = 1;
    uint32 public requiredReviews = 1;
    mapping(uint256 => uint256) vrfRequestIdToSubmissionId;

    struct Reviewer {
        address addr;
    }
    struct Submission {
        address author;
        string data;
        string[] options;
        uint256 thresholdToPass;
        mapping(address => bytes32) commits;
        mapping(address => uint8) votes;
        mapping(uint8 => uint32) tally;
        mapping(address => string) comments;
        mapping(address => bool) canReviewerVote;
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
    constructor(string memory _license, uint256 _roiDenominator, uint64 _vrfSubscriptionId, address _vrfCoordinator, bytes32 _vrfKeyHash, uint32 _requiredReviews) VRFConsumerBaseV2(_vrfCoordinator) {
        LICENSE = _license;
        ROI_DENOMINATOR = _roiDenominator;
        owner = msg.sender;
        VRF_COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        vrfKeyHash = _vrfKeyHash;
        vrfSubscriptionId = _vrfSubscriptionId;
        requiredReviews = _requiredReviews;
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

    event SubmissionCreated(uint256 indexed submissionId);

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
    function selectReviewers(uint256 submissionId) public {
        require(requiredReviews <= reviewers.length, "Not enough reviewers to review the song");
        require(submissionId < submissions.length, "Invalid submission ID");
        // The shuffleReviewers call is updated to shuffle and store reviewers in the Submission struct
        shuffleReviewers(submissionId); // This call now populates the shuffledReviewers field in the Submission struct
        address[] memory selectedReviewers = new address[](requiredReviews);
        for(uint32 i = 0; i < requiredReviews; i++) {
            selectedReviewers[i] = submissions[submissionId].shuffledReviewers[i];
            submissions[submissionId].canReviewerVote[selectedReviewers[i]] = true;
        }
        submissions[submissionId].selectedReviewers = selectedReviewers;
    }

    // Updated function to shuffle a copy of the reviewers and store it in the Submission struct
    function shuffleReviewers(uint256 submissionId) internal {
        require(submissionId < submissions.length, "Invalid submission ID");
        address[] memory shuffledReviewers = new address[](reviewers.length);
        for (uint256 i = 0; i < reviewers.length; i++) {
            shuffledReviewers[i] = reviewers[i].addr;
        }
        uint256 seed = submissions[submissionId].seed;
        for (uint256 i = 0; i < shuffledReviewers.length; i++) {
            uint256 j = (uint256(keccak256(abi.encode(seed, i))) % (i + 1));
            (shuffledReviewers[i], shuffledReviewers[j]) = (
                shuffledReviewers[j],
                shuffledReviewers[i]
            );
        }
        submissions[submissionId].shuffledReviewers = shuffledReviewers;
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
    function castVote(uint256 submissionIndex, uint8 option) public {
        require(submissions[submissionIndex].canReviewerVote[msg.sender], "Only selected reviewers can cast votes");
        require(option < submissions[submissionIndex].options.length, "Select a valid option");

        submissions[submissionIndex].canReviewerVote[msg.sender] = false;
        addToTally(submissionIndex, option, 1);
    }

    function addToTally(uint256 submissionIndex, uint8 option, uint32 amount) internal {
        submissions[submissionIndex].tally[option] = submissions[submissionIndex].tally[option] + amount;
    }

    event ResultRevealed(uint256 submissionId, bool result);

    function revealResult(uint256 submissionIndex) public {
        uint256 overallResult = 0;
        for (uint8 i = 0; i < submissions[submissionIndex].options.length; i++) {
            uint256 optionTally = submissions[submissionIndex].tally[i];
            overallResult += optionTally;
        }
        //approve the submission
        submissions[submissionIndex].isApproved = submissions[submissionIndex].selectedReviewers.length * submissions[submissionIndex].thresholdToPass <= overallResult;
        emit ResultRevealed(submissionIndex, submissions[submissionIndex].isApproved);
    }
}