import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import CoalNFT from "../../../generated/deployedContracts";
import { SongFormProps } from "../../services/interfaces";
import { useAccount, useReadContract, useSimulateContract, useWaitForTransactionReceipt, useWatchContractEvent, useWriteContract } from "wagmi";

type Address = `0x${string}` | undefined

export const SongForm: React.FC<SongFormProps> = ({ setState, setMetadata, setTxHash, setSongId, metadata, copyrights }) => {
  const { address } = useAccount();
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [artists, setArtists] = useState<string[]>([]);
  const [nature, setNature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contract = CoalNFT[11155111][0].contracts.CoalNFT;
  const addr = address as Address | undefined;
  const abi = contract.abi;

  const { data: currentSongId } = useReadContract({
    address: contract.address,
    abi: contract.abi,
    functionName: "getCurrentSongId",
  });

  useEffect(() => {
    if (currentSongId) {
      setSongId(currentSongId);
    }
    console.log(currentSongId);
  }, [currentSongId]);

  const { error: estimateError } = useSimulateContract({
    address: contract.address,
    abi: abi,
    functionName: "addSong",
    args: [addr!, metadata, copyrights ? (copyrights as readonly {
      songId: bigint;
      shares: bigint;
    }[]) : []],
  })

  const { data, writeContract } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,

  } = useWaitForTransactionReceipt({
    hash: data,
  })

  async function jsonToIpfs() {
    const response = await fetch("./ipfs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: String(currentSongId),
        name: name,
        genre: genre,
        author: author,
        contactInfo: contactInfo,
        artists: artists,
        nature: nature,
      }),
    });
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    if (txSuccess) {
      setTxHash(String(data));
      setState({ state: 2 });
    } else if (txError) {
      console.log(txError);
    }
  }, [txSuccess, txError])

  async function handleSendTransation() {
    if (estimateError) {
      console.log(estimateError);
      return;
    }
    setIsSubmitting(true);
    const res = await jsonToIpfs();
    setMetadata(res.data);
    writeContract({
      address: contract.address,
      abi: abi,
      functionName: "addSong",
      args: [addr!, res.data, copyrights ? copyrights : []],
    })
  }

  // Update your useEffect that handles txSuccess and txError
  useEffect(() => {
    if (txSuccess || txError) {
      setIsSubmitting(false); // Set isSubmitting to false when the transaction is mined or if there's an error
    }
  }, [txSuccess, txError])

  return (
    <Box>
      {copyrights ? (
        copyrights[0].shares > 0.05 ? (
          <Text>
            There is a 0.{String(copyrights[0].shares)} similarity rate with song {String(copyrights[0].songId)}
          </Text>
        ) : (
          <Text>Copyright infringement below 5%</Text>
        )
      ) : (
        <Text>No cop</Text>
      )}
      <Input placeholder="Name" onChange={(e) => setName(e.target.value)} mb="4" mt="4" />
      <Select placeholder="Select genre" onChange={(e) => setGenre(e.target.value)} mb="4">
        <option value="pop">Pop</option>
        <option value="rap">Rap</option>
        <option value="rock">Rock</option>
        <option value="jazz">Jazz</option>
        <option value="blues">Blues</option>
        <option value="country">Country</option>
      </Select>
      <Input placeholder="Author" onChange={(e) => setAuthor(e.target.value)} mb="4" />
      <Input
        placeholder="Artists (comma separated)"
        onChange={(e) => setArtists(e.target.value.split(","))}
        mb="4"
      />
      <Input placeholder="Contact Info" onChange={(e) => setContactInfo(e.target.value)} mb="4" />
      <Select placeholder="Select nature" onChange={(e) => setNature(e.target.value)} mb="8">
        <option value="song">Song</option>
        <option value="lyrics">Lyrics</option>
        <option value="both">Both</option>
      </Select>
      <Flex justifyContent="center">
        <Button disabled={isSubmitting} onClick={handleSendTransation}>
          {isSubmitting ? "In Process..." : "Upload"}
        </Button>
      </Flex>
    </Box >
  );
};

export default SongForm;
