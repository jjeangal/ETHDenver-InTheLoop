"use client";
// pages/index.tsx
import CompileSongsTile from "@/components/CompareSongsTile";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useAccount, useWatchContractEvent } from "wagmi";
import { reviewContract } from "../assets/reviewContract";
import {
  assignRandomSeed,
  getSubmission,
  revealResult,
  selectReviewers,
} from "../../contract_interaction/calls";
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
  const { accountToReviews, setAccountToReviews } = useState<any>({});

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
      console.log(`Reviewers chosen: ${subId}, ${JSON.stringify(reviewers, null, 2)}`);
      const data = getSubmission(subId);

      selectReviewers(subId);
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "VotingCompleted",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
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
          {tiles.map((tile, index) => (
            <CompileSongsTile
              key={index}
              song1={[50, 60]}
              song2={[40, 70, 50]}
            />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Home;
