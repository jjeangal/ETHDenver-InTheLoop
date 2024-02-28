import CoalNFT from "../../generated/deployedContracts";
import { UseAddSongParams } from "../../services/interfaces";
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

const useAddSong = ({ author, metadata, copyrights }: UseAddSongParams): any => {
  const contract = CoalNFT[31337][0].contracts.CoalNFT;
  const abi = contract.abi;

  const { error: simulateError } = useSimulateContract({
    address: contract.address,
    abi: abi,
    functionName: "addSong",
    args: [`0x${author}`, metadata, copyrights as readonly { songId: bigint; shares: bigint; }[]],
  });

  const { data, writeContract } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendTransation = () => {
    if (simulateError) {
      console.log(simulateError.cause);
    }
    writeContract({
      address: contract.address!,
      abi: abi,
      functionName: 'addSong',
      args: [`0x${author}`, metadata, copyrights as readonly { songId: bigint; shares: bigint; }[]],
    })
  }

  return {
    handleSendTransation,
  };
};

export default useAddSong;


