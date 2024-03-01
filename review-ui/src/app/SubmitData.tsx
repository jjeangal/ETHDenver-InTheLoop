// "use client";

// import {
//   Button,
//   useToast,
//   Stack,
//   Link,
//   Text,
//   Spacer,
//   Flex,
// } from "@chakra-ui/react";
// import {
//   useAccount,
//   useSimulateContract,
//   useWriteContract,
//   useReadContract,
// } from "wagmi";
// import { useCallback, useEffect } from "react";
// import { sepolia } from "wagmi/chains";
// import { reviewContract } from "./assets/reviewContract";

// export function SubmitData() {
//   // function handleNewSubmission(subId: number) {
//   //   // Handle new accounts, or lack thereof.
//   //   console.log("We have a new submission here: " + subId);
//   // }

//   // window.ethereum.on("SubmissionCreated", handleNewSubmission);
//   const toast = useToast();
//   const { status, chain } = useAccount();
//   const { address, abi } = reviewContract;
//   const {
//     data: requiredReviews,
//     refetch: fetchRequiredReviews,
//     isLoading: requiredReviewsQueryLoading,
//     isRefetching: requiredReviewsQueryRefetching,
//   } = useReadContract({
//     abi,
//     address,
//     functionName: "requiredReviews",
//   });
//   const { data: simulateData, error: simulateError } = useSimulateContract({
//     abi,
//     address,
//     functionName: "submitData",
//     args: ["piece of data"],
//   });
//   const { writeContract, reset, data, error, isPending } = useWriteContract();
//   const isConnected = status === "connected";

//   const onSendTransaction = useCallback(async () => {
//     if (simulateError || !simulateData?.request) {
//       toast({
//         title: "Error",
//         description:
//           "Not able to execute this transaction. Check your balance.",
//         status: "error",
//         isClosable: true,
//       });
//     } else {
//       writeContract(simulateData?.request);
//       await fetchRequiredReviews();
//     }
//   }, [writeContract, simulateError, simulateData?.request]);

//   useEffect(() => {
//     if (data) {
//       toast({
//         title: "Submit Data Success!",
//         description: data,
//         status: "success",
//         isClosable: true,
//       });
//     } else if (error) {
//       toast({
//         title: "Error",
//         description: "Failed to submit data",
//         status: "error",
//         isClosable: true,
//       });
//     }
//     reset();
//   }, [data, error]);

//   return chain?.id === sepolia.id && status === "connected" ? (
//     <Stack direction={["column", "column", "row"]}>
//       <Button
//         data-test-id="sign-transaction-button"
//         onClick={onSendTransaction}
//         disabled={!simulateData?.request}
//         isDisabled={isPending || !isConnected}
//       >
//         Submit Data
//       </Button>
//       {requiredReviewsQueryLoading || requiredReviewsQueryRefetching ? (
//         <Text>Fetching the number of required reviews...</Text>
//       ) : (
//         <Flex alignItems="center">
//           <Text marginRight="5px">Required reviews:</Text>
//           <Text>{requiredReviews?.toString()}</Text>
//         </Flex>
//       )}
//       <Spacer />

//       <Link isExternal href="https://sepoliafaucet.com">
//         <Button variant="outline" colorScheme="blue" isDisabled={isPending}>
//           Sepolia Faucet 1
//         </Button>
//       </Link>

//       <Link isExternal href="https://www.infura.io/faucet/sepolia">
//         <Button variant="outline" colorScheme="orange" isDisabled={isPending}>
//           Sepolia Faucet 2
//         </Button>
//       </Link>
//     </Stack>
//   ) : (
//     <Text fontSize="md" color="yellow">
//       Switch to Sepolia Ethereum Testnet to test this feature
//     </Text>
//   );
// }
