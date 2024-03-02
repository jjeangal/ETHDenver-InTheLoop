"use client";
import { Box, Center, Flex, Text, useToast } from "@chakra-ui/react";
import {
  useAccount,
  useWatchContractEvent,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { reviewContract } from "../assets/reviewContract";
import { useState } from "react";

const Home: React.FC = () => {
  const owner = "0x14b8B257Ed2C330d1283F4dFb28a66c8475C54Bb";
  const account = useAccount();

  if (owner !== account.address) {
    console.error("Only the owner should access this page");
  }

  const { writeContractAsync } = useWriteContract();
  const toast = useToast();

  const [text, setText] = useState("Welcome!");

  async function assignRandomSeed(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "assignRndSeed",
      args: [subId],
    });
    // toast({
    //   title: "Random seed requested",
    //   description: `Random seed for submission of ID: ${subId} requested --> ${hash}`,
    //   status: "success",
    //   isClosable: true,
    // });

    const txt = `Assign Random Seed for submission ${subId}--> ${hash}`;
    console.log(txt);
    setText(txt);
  }

  async function selectReviewers(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "selectReviewers",
      args: [subId],
    });
    // toast({
    //   title: "Reviewers selection process requested",
    //   description: `Reviewers selection process requested for submission ID: ${subId} --> ${hash}`,
    //   status: "success",
    //   isClosable: true,
    // });
    const txt = `Select Reviewers for submission ${subId} --> ${hash}`;
    console.log(txt);
    setText(txt);
  }

  async function revealResult(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "revealResult",
      args: [subId],
    });
    // toast({
    //   title: "Reveal result process initiated",
    //   description: `Reveal result process initiated for submission ID: ${subId} --> ${hash}`,
    //   status: "success",
    //   isClosable: true,
    // });
    const txt = `Reveal Result for submission ${subId} --> ${hash}`;
    console.log(txt);
    setText(txt);
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
      const txt = `Submission created: ${newSubId}. Now confirm the assign random seed operation`;
      console.log(txt);
      setText(txt);
      // toast({
      //   title: "New review process initiated",
      //   description: `ID of the process: ${newSubId}. Confirm the 'assign random seed' transaction.`,
      //   status: "success",
      //   isClosable: true,
      // });
      assignRandomSeed(newSubId);
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "RandomWordFulfilled",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const txt = `RandomWordFulfilled: ${subId}. Now confirm the select reviewers operation`;
      console.log(txt);
      setText(txt);
      // toast({
      //   title: "Random word fulfilled by Chainlink",
      //   description: `Random word fulfilled for submission: ${subId}. Confirm the 'select reviewers' transaction`,
      //   status: "success",
      //   isClosable: true,
      // });
      selectReviewers(subId);
    },
  });

  useWatchContractEvent({
    address,
    abi,
    eventName: "VotingCompleted",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const txt = `Voting completed ${subId}. Now confirm the reveal result operation`;
      setText(txt);
      console.log(txt);
      // toast({
      //   title: "Voting completed",
      //   description: `Voting completed for submission ID: ${subId}. Confirm the 'reveal result' transaction`,
      //   status: "success",
      //   isClosable: true,
      // });
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
      const resultStr = result ? "passed" : "didn't pass";
      const txt = `Result for ${subId} is ${result}. Review process completed for submission ID: ${subId}. The submission ${subId} ${resultStr} our checks.`;
      console.log(txt);
      setText(txt);
      // toast({
      //   title: "Review process completed successfully",
      //   description: `Review process completed for submission ID: ${subId}. The submission ${subId} ${resultStr} our checks.`,
      //   status: "success",
      //   isClosable: true,
      // });
      //close the review process
    },
  });

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      pt={10}
      h="60vh"
      w="100vw"
      bg="gray.100"
    >
      <Center p={4}>
        <Text fontSize="3xl" fontWeight="bold" color="green.700">
          {text}
        </Text>
      </Center>
    </Flex>
  );
};

export default Home;
