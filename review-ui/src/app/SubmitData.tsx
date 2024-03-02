"use client";

import {
  Button,
  useToast,
  Stack,
  Link,
  Text,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useReadContract,
  useWatchContractEvent,
} from "wagmi";
import { useCallback, useEffect } from "react";
import { sepolia } from "wagmi/chains";
import { reviewContract } from "./assets/reviewContract";
import { ethers } from "ethers";

export function SubmitData() {

  const { address, abi } = reviewContract;
  // const { data: subData, error: subError } = useContractEvent({
  //   contractAddress: address,
  //   eventName: "SubmissionCreated",
  //   // Additional options (e.g., filter by indexed parameters)
  // });

  useWatchContractEvent({
    address,
    abi,
    eventName: "SubmissionCreated",
    onLogs(logs) {
      console.log("New logs!", logs);
    },
  });
  // useEffect(() => {
  //   if (subData) {
  //     toast({
  //       title: `Submission created: ${subData}`,
  //       description: subData,
  //       status: "success",
  //       isClosable: true,
  //     });
  //   } else if (subError) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to submit data",
  //       status: "error",
  //       isClosable: true,
  //     });
  //   }
  //   reset();
  // }, [subData, subError]);
  const toast = useToast();
  const { status, chain } = useAccount();
  const {
    data: requiredReviews,
    refetch: fetchRequiredReviews,
    isLoading: requiredReviewsQueryLoading,
    isRefetching: requiredReviewsQueryRefetching,
  } = useReadContract({
    abi,
    address,
    functionName: "requiredReviews",
  });
  const { data: simulateData, error: simulateError } = useSimulateContract({
    abi,
    address,
    functionName: "submitData",
    args: ["piece of data"],
  });
  const { writeContract, reset, data, error, isPending } = useWriteContract();
  const isConnected = status === "connected";

  const onSendTransaction = useCallback(async () => {
    if (simulateError || !simulateData?.request) {
      toast({
        title: "Error",
        description: `Not able to execute this transaction. Check your balance`,
        status: "error",
        isClosable: true,
      });
    } else {
      writeContract(simulateData?.request);
      await fetchRequiredReviews();
    }
  }, [writeContract, simulateError, simulateData?.request]);

  useEffect(() => {
    if (data) {
      toast({
        title: "Submit Data Success!",
        description: data,
        status: "success",
        isClosable: true,
      });
    } else if (error) {
      toast({
        title: "Error",
        description: "Failed to submit data",
        status: "error",
        isClosable: true,
      });
    }
    reset();
  }, [data, error]);

  return chain?.id === sepolia.id && status === "connected" ? (
    <Stack direction={["column", "column", "row"]}>
      <Button
        data-test-id="sign-transaction-button"
        onClick={onSendTransaction}
        disabled={!simulateData?.request}
        isDisabled={isPending || !isConnected}
      >
        Submit Data
      </Button>
      {requiredReviewsQueryLoading || requiredReviewsQueryRefetching ? (
        <Text>Fetching the number of required reviews...</Text>
      ) : (
        <Flex alignItems="center">
          <Text marginRight="5px">Required reviews:</Text>
          <Text>{requiredReviews?.toString()}</Text>
        </Flex>
      )}
      <Spacer />

      <Link isExternal href="https://sepoliafaucet.com">
        <Button variant="outline" colorScheme="blue" isDisabled={isPending}>
          Sepolia Faucet 1
        </Button>
      </Link>

      <Link isExternal href="https://www.infura.io/faucet/sepolia">
        <Button variant="outline" colorScheme="orange" isDisabled={isPending}>
          Sepolia Faucet 2
        </Button>
      </Link>
    </Stack>
  ) : (
    <Text fontSize="md" color="yellow">
      Switch to Sepolia Ethereum Testnet to test this feature
    </Text>
  );
}
function useContractEvent(arg0: {
  contractAddress: string;
  eventName: string;
}): { data: any; error: any } {
  throw new Error("Function not implemented.");
}
