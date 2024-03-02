import { useReadContract, useSimulateContract, useWriteContract } from "wagmi";
import { reviewContract } from "../app/assets/reviewContract";
import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
export function assignRandomSeed(subId: number) {
  const { writeContract } = useWriteContract();
  writeContract(
    abi: reviewContract.abi,
    address: reviewContract.address,
    functionName: "assignRndSeed",
    args: [subId],
  );
}

export function selectReviewers(subId: number) {
  const toast = useToast();

  const { data: simulateData, error: simulateError } = useSimulateContract({
    abi: reviewContract.abi,
    address: reviewContract.address,
    functionName: "selectReviewers",
    args: [subId],
  });
  const { writeContract, reset, data, error, isPending } = useWriteContract();
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
    }
  }, [writeContract, simulateError, simulateData?.request]);
}

export function castVote(subId: number, option: number) {
  const toast = useToast();

  const { data: simulateData, error: simulateError } = useSimulateContract({
    abi: reviewContract.abi,
    address: reviewContract.address,
    functionName: "castVote",
    args: [subId, option],
  });
  const { writeContract, reset, data, error, isPending } = useWriteContract();
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
    }
  }, [writeContract, simulateError, simulateData?.request]);
}

export function revealResult(subId: number) {
  const toast = useToast();

  const { data: simulateData, error: simulateError } = useSimulateContract({
    abi: reviewContract.abi,
    address: reviewContract.address,
    functionName: "revealResult",
    args: [subId],
  });
  const { writeContract, reset, data, error, isPending } = useWriteContract();
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
    }
  }, [writeContract, simulateError, simulateData?.request]);
}

export function getSubmission(subId: number) {
  return useReadContract({
    abi: reviewContract.abi,
    address: reviewContract.address,
    functionName: "getSubmission",
    args: [subId],
  });
}
