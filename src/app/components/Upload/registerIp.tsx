import { Flex, Box, Text, Link, Heading } from "@chakra-ui/react";
import { ReviewSongProps } from "../../services/interfaces";
import RegisterIPA from "../RegisterIPA";
import { useState } from "react";
import AddPolicy from '../AddPolicy';

export const ReviewSong: React.FC<ReviewSongProps> = ({ id, txHash, metadata, copyrights }) => {
  // Pinata
  const pinataGateway = "https://gateway.pinata.cloud/ipfs/";

  const [policyId, setPolicyId] = useState<bigint>();

  return (
    <Flex flexDirection="column">
      <Box textAlign="center">
        <Heading>Review Song</Heading>
        <Box>
          <Text> Song info: </Text>
          <Text> Id is: {String(id)} </Text>
          <Text>
            {" "}
            Metadata link:{" "}
            <Link href={pinataGateway + metadata} isExternal>
              {pinataGateway + metadata}
            </Link>{" "}
          </Text>
          <Text> Transaction Hash: {txHash} </Text>
          <Text> Uses copyrights from songs: </Text>
          {copyrights ? copyrights.map((copyright) => (
            <Box key={copyright.songId}>
              <Text> Song id: {String(copyright.songId)} </Text>
              <Text> Shares: {String(copyright.shares)} </Text>
            </Box>
          )) : <Text> No copyrights </Text>}
        </Box>
        {RegisterIPA({ tokenId: id, policyId: policyId })}
        <AddPolicy />
      </Box>
    </Flex>
  );
};