import React, { useEffect, useState } from "react";
import { Box, Button, Input, Select } from "@chakra-ui/react";
import CoalNFT from "../../../generated/deployedContracts";
import { SongFormProps } from "../../services/interfaces";
import { useAccount, useReadContract, useSimulateContract, useWriteContract } from "wagmi";
import type { Address } from "viem";

export const SongForm: React.FC<SongFormProps> = ({ setState, copyright }) => {
  const { address } = useAccount();
  const [songId, setSongId] = useState(0);
  const [metadata, setMetadata] = useState("");
  const [copyrights, setCopyrigth] = useState<readonly { songId: bigint; shares: bigint; }[]>([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [artists, setArtists] = useState<string[]>([]);
  const [nature, setNature] = useState("");

  const contract = CoalNFT[31337][0].contracts.CoalNFT;
  const addr = address as Address;
  const abi = contract.abi;

  const { data: currentSongId } = useReadContract({
    address: contract.address,
    abi: contract.abi,
    functionName: "getCurrentSongId",
  });

  const { data } = useSimulateContract({
    address: contract.address,
    abi: abi,
    functionName: "addSong",
    args: [`0x${addr}`, metadata, copyrights ? copyrights : []],
  })

  const { writeContract } = useWriteContract({})

  useEffect(() => {
    if (currentSongId) {
      setSongId(Number(currentSongId));
    }
  }, [currentSongId]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setState({ state: 2 });
  //   }
  // }, [isSuccess, setState]);

  async function jsonToIpfs() {
    const response = await fetch("./ipfs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: songId,
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

  const handleSubmit = async () => {
    const res = await jsonToIpfs();
    setMetadata(res.IpfsHash);
  };

  useEffect(() => {
    if (!metadata) {
      return;
    }
    writeContract(data!.request);
  }, [metadata, data]);

  return (
    <Box>
      <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <Select placeholder="Select genre" onChange={(e) => setGenre(e.target.value)}>
        <option value="pop">Pop</option>
        <option value="rap">Rap</option>
        <option value="rock">Rock</option>
        <option value="jazz">Jazz</option>
        <option value="blues">Blues</option>
        <option value="country">Country</option>
      </Select>
      <Input placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
      <Input
        placeholder="Artists (comma separated)"
        onChange={(e) => setArtists(e.target.value.split(","))}
      />
      <Input placeholder="Contact Info" onChange={(e) => setContactInfo(e.target.value)} />
      <Select placeholder="Select nature" onChange={(e) => setNature(e.target.value)}>
        <option value="song">Song</option>
        <option value="lyrics">Lyrics</option>
        <option value="both">Both</option>
      </Select>
      <Button onClick={handleSubmit} mt={4}>
        Upload
      </Button>
    </Box>
  );
};

export default SongForm;
