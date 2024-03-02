"use client";
// pages/index.tsx
import CompileSongsTile from "@/components/CompareSongsTile";
import { Box, Flex, Grid } from "@chakra-ui/react";
import {
  useAccount,
  useWatchContractEvent,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { reviewContract } from "../assets/reviewContract";
import { useState } from "react";

const tiles = [
  // Replace with your actual data (question and answer pairs)
  { question: "What is the capital of France?", answer: "Paris" },
  { question: 'Who wrote "Romeo and Juliet"?', answer: "William Shakespeare" },
  // Add more tiles as needed
];

const Home: React.FC = () => {
  // submissionIds, setSubmissionIds = useState([]);

  const account = useAccount();
  const [ accountToReviews, setAccountToReviews ] =
    useState < Map<string, object[]> >(new Map());
  const { writeContractAsync } = useWriteContract();

  async function assignRandomSeed(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "assignRndSeed",
      args: [subId],
    });
    console.log(`Assign Random Seed --> ${hash}`);
  }

  async function selectReviewers(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "selectReviewers",
      args: [subId],
    });
    console.log(`Select Reviewers --> ${hash}`);
  }

  async function castVote(subId: number, option: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "castVote",
      args: [subId, option],
    });
    console.log(`Cast Vote --> ${hash}`);
  }

  async function revealResult(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "revealResult",
      args: [subId],
    });
    console.log(`Reveal Result --> ${hash}`);
  }

  function getSubmission(subId: number) {
    return useReadContract({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "getSubmission",
      args: [subId],
    });
  }

  const { address, abi } = reviewContract;

  useWatchContractEvent({
    address,
    abi,
    eventName: "SubmissionCreated",
    onLogs(logs) {
      const newSubId = logs[0].args.submissionId;
      console.log(`Submission created: ${newSubId}`);
      assignRandomSeed(newSubId);
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "RandomWordFulfilled",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      console.log(`RandomWordFulfilled: ${subId}`);
      selectReviewers(subId);
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "ReviewersChosen",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const reviewers = logs[0].args.reviewers;
      console.log(
        `Reviewers chosen: ${subId}, ${JSON.stringify(reviewers, null, 2)}`
      );
      const data = getSubmission(subId);
      console.log(`Submission data for ${subID} is ${JSON.stringify(data, null, 2)}`)
      setAccountToReviews((state: Map<string, object[]>) => {
        for (const reviewer of reviewers) {
          if (!state.has(reviewer)) {
            state.set(reviewer, [data]);
          } else {
            state.get(reviewer)?.push(data);
          }
        }
        console.log(`Account to reviews ${JSON.stringify(state, null, 2)}`);
        return state;
      });
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "VotingCompleted",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      console.log(`Voting completed ${subId}`);
      revealResult(subId);
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "ResultRevealed",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const result = logs[0].args.result;
      console.log(`Result for ${subId} is ${result}`);
      //close the review process
    },
  });

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      pt={10}
      h="100vh"
      w="100vw"
      bg="gray.100"
    >
      <Box p={4}>
        <Grid templateColumns="repeat(auto-fill, minmax(305px, 1fr))" gap={4}>
          {accountToReviews.get(account.address as string)?.map((review, index) => (
            <CompileSongsTile
              key={index}
              song1={review[1][0]}
              song2={review[1][1]}
            />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Home;
