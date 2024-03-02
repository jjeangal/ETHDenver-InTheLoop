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
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const account = useAccount();
  const [accountToReviews, setAccountToReviews] = useState<
    Map<string, object[]>
  >(new Map());
  const { writeContractAsync } = useWriteContract();
  const toast = useToast();
  async function castVote(subId: number, option: number) {
    const hash = await writeContractAsync({
      abi: reviewContract.abi,
      address: reviewContract.address,
      functionName: "castVote",
      args: [subId, option],
    });
    // toast({
    //   title: "Vote casting process initiated",
    //   description: `Voting process initiated for submission ID: ${subId} --> ${hash}`,
    //   status: "success",
    //   isClosable: true,
    // });

    console.log(`Cast Vote --> ${hash}`);
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
    eventName: "ResultRevealed",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const result = logs[0].args.result;
      console.log(`Result for ${subId} is ${result}`);
      const resultStr = result ? "passed" : "didn't pass";
      // toast({
      //   title: "Review process completed successfully",
      //   description: `Review process completed for submission ID: ${subId}. The submission ${subId} ${resultStr} our checks.`,
      //   status: "success",
      //   isClosable: true,
      // });
      //close the review process
    },
  });

  const fillAccountToReviewers = (subId: any, reviewers: any) => {
    let data = getSubmission(subId);
    data = {
      song1: [60, 48, 37, 70, 65, 69, 46],
      song2: [37, 70, 45, 58, 65, 46],
      id: subId,
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
  };

  useEffect(() => {
  fillAccountToReviewers(13, ["0x14b8b257ed2c330d1283f4dfb28a66c8475c54bb"]);

  }, []);

  useWatchContractEvent({
    address,
    abi,
    eventName: "ReviewersChosen",
    onLogs(logs) {
      const subId = logs[0].args.submissionId;
      const reviewers = logs[0].args.reviewers;
      // toast({
      //   title: `Reviewer's chosen for submission ID ${subId}`,
      //   description: `The chosen reviewers are ${JSON.stringify(
      //     reviewers,
      //     null,
      //     2
      //   )}`,
      //   status: "success",
      //   isClosable: true,
      // });
      console.log(
        `Reviewers chosen: ${subId}, ${JSON.stringify(reviewers, null, 2)}`
      );
      fillAccountToReviewers(subId, reviewers);
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
