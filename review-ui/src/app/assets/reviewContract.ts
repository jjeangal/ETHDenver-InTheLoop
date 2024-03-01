export const reviewContract = {
  address: "0xcA951F899540a892236044E6dd3051F001C97A4" as `0x${string}`,
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "_license",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_roiDenominator",
          type: "uint256",
        },
        {
          internalType: "uint64",
          name: "_vrfSubscriptionId",
          type: "uint64",
        },
        {
          internalType: "address",
          name: "_vrfCoordinator",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "_vrfKeyHash",
          type: "bytes32",
        },
        {
          internalType: "uint32",
          name: "_requiredReviews",
          type: "uint32",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "have",
          type: "address",
        },
        {
          internalType: "address",
          name: "want",
          type: "address",
        },
      ],
      name: "OnlyCoordinatorCanFulfill",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "submissionId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "result",
          type: "bool",
        },
      ],
      name: "ResultRevealed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "submissionId",
          type: "uint256",
        },
      ],
      name: "SubmissionCreated",
      type: "event",
    },
    {
      inputs: [],
      name: "LICENSE",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ROI_DENOMINATOR",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_author",
          type: "address",
        },
      ],
      name: "addAuthor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_reviewer",
          type: "address",
        },
      ],
      name: "addReviewer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionId",
          type: "uint256",
        },
      ],
      name: "assignRndSeed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "authors",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionIndex",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "option",
          type: "uint8",
        },
      ],
      name: "castVote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getReviewer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionId",
          type: "uint256",
        },
      ],
      name: "getSelectedReviewers",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionId",
          type: "uint256",
        },
      ],
      name: "getSubmission",
      outputs: [
        {
          internalType: "address",
          name: "author",
          type: "address",
        },
        {
          internalType: "string",
          name: "data",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "requestId",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "randomWords",
          type: "uint256[]",
        },
      ],
      name: "rawFulfillRandomWords",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionIndex",
          type: "uint256",
        },
      ],
      name: "revealResult",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "reviewers",
      outputs: [
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionId",
          type: "uint256",
        },
      ],
      name: "selectReviewers",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionIndex",
          type: "uint256",
        },
        {
          internalType: "string[]",
          name: "options",
          type: "string[]",
        },
      ],
      name: "setOptions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "submissionIndex",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "threshold",
          type: "uint256",
        },
      ],
      name: "setThresholdToPass",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "submissions",
      outputs: [
        {
          internalType: "address",
          name: "author",
          type: "address",
        },
        {
          internalType: "string",
          name: "data",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "thresholdToPass",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isApproved",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "seed",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_data",
          type: "string",
        },
      ],
      name: "submitData",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
