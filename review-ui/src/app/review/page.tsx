"use client";
import CompareSongsTile from "../../components/CompareSongsTile";
import { Box, Flex, Grid, useToast } from "@chakra-ui/react";
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
  const [accountToReviews, setAccountToReviews] = useState<
    Map<string, object[]>
  >(new Map());
  const { writeContractAsync } = useWriteContract();
  const toast = useToast();

  async function assignRandomSeed(subId: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "assignRndSeed",
      args: [subId],
    });
    toast({
      title: "Random seed requested",
      description: `Random seed for submission of ID: ${subId} requested --> ${hash}`,
      status: "success",
      isClosable: true,
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
    toast({
      title: "Reviewers selection process requested",
      description: `Reviewers selection process requested for submission ID: ${subId} --> ${hash}`,
      status: "success",
      isClosable: true,
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
    toast({
      title: "Vote casting process initiated",
      description: `Voting process initiated for submission ID: ${subId} --> ${hash}`,
      status: "success",
      isClosable: true,
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
    toast({
      title: "Reveal result process initiated",
      description: `Reveal result process initiated for submission ID: ${subId} --> ${hash}`,
      status: "success",
      isClosable: true,
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

  if (account.address === owner) {
    useWatchContractEvent({
      address,
      abi,
      eventName: "SubmissionCreated",
      onLogs(logs) {
        const newSubId = logs[0].args.submissionId;
        console.log(`Submission created: ${newSubId}`);
        toast({
          title: "New review process initiated",
          description: `ID of the process: ${newSubId}. Confirm the 'assign random seed' transaction.`,
          status: "success",
          isClosable: true,
        });
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
        toast({
          title: "Random word fulfilled by Chainlink",
          description: `Random word fulfilled for submission: ${subId}. Confirm the 'select reviewers' transaction`,
          status: "success",
          isClosable: true,
        });
        selectReviewers(subId);
      },
    });

    useWatchContractEvent({
      address,
      abi,
      eventName: "VotingCompleted",
      onLogs(logs) {
        const subId = logs[0].args.submissionId;
        console.log(`Voting completed ${subId}`);
        toast({
          title: "Voting completed",
          description: `Voting completed for submission ID: ${subId}. Confirm the 'reveal result' transaction`,
          status: "success",
          isClosable: true,
        });
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
        const resultStr = result ? "passed" : "didn't pass";
        toast({
          title: "Review process completed successfully",
          description: `Review process completed for submission ID: ${subId}. The submission ${subId} ${resultStr} our checks.`,
          status: "success",
          isClosable: true,
        });
        //close the review process
      },
    });
  }

  useWatchContractEvent({
    address,
    abi,
    eventName: "ReviewersChosen",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const reviewers = logs[0].args.reviewers;
      toast({
        title: `Reviewer's chosen for submission ID ${subId}`,
        description: `The chosen reviewers are ${JSON.stringify(reviewers, null, 2)}`,
        status: "success",
        isClosable: true,
      });
      console.log(
        `Reviewers chosen: ${subId}, ${JSON.stringify(reviewers, null, 2)}`
      );
      let data = getSubmission(subId);
      data = {
        song1: data[1][0],
        song2: data[1][1],
        id: subId
      };

      console.log(
        `Submission data for ${subId} is ${JSON.stringify(data, null, 2)}`
      );
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
          {accountToReviews
            .get(account.address as string)
            ?.map((review: any, index) => (
              <CompareSongsTile
                key={index}
                song1={review.song1}
                song2={review.song2}
                castVote={castVote}
                subId={review.subId}

              />
            ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Home;
