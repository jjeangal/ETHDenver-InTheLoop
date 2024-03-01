import { Flex, Box, Text, Link } from "@chakra-ui/react";
import { RegisterIpProps, Policy } from "../../services/interfaces";
import RegisterIPButton from "../RegisterIPButton";
import { useState, useEffect } from "react";
import AddPolicy from '../AddPolicy';
import Policies from "../Policies";

export const RegisterIp: React.FC<RegisterIpProps> = ({ id, txHash, metadata, copyrights }) => {
  // Pinata
  const pinataGateway = "https://gateway.pinata.cloud/ipfs/";

  const [policyId, setPolicyId] = useState<bigint>();
  const [policies, setPolicies] = useState<Policy[]>([]);

  async function fetchPolicies() {
    const response = await fetch("https://api.storyprotocol.net/api/v1/policies", {
      method: "POST",
      headers: {
        accept: 'application/json',
        'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
        'content-type': 'application/json'
      }
    });

    const result = await response.json();

    const data: Policy[] = result.data.map((policy: any) => {
      return {
        blockNumber: policy.blockNumber,
        blockTimestamp: policy.blockTimestamp,
        frameworkData: policy.frameworkData,
        id: policy.id,
        mintingFee: policy.mintingFee,
        mintingFeeToken: policy.mintingFeeToken,
        pil: {
          attribution: policy.pil.attribution,
          commercialAttribution: policy.pil.commercialAttribution,
          commercialRevShare: policy.pil.commercialRevShare,
          commercialUse: policy.pil.commercialUse,
          commercializerChecker: policy.pil.commercializerChecker,
          commercializerCheckerData: policy.pil.commercializerCheckerData,
          contentRestrictions: policy.pil.contentRestrictions,
          derivativesAllowed: policy.pil.derivativesAllowed,
          derivativesApproval: policy.pil.derivativesApproval,
          derivativesAttribution: policy.pil.derivativesAttribution,
          derivativesReciprocal: policy.pil.derivativesReciprocal,
          distributionChannels: policy.pil.distributionChannels,
          id: policy.pil.id,
          territories: policy.pil.territories,
        },
        policyFrameworkManager: policy.policyFrameworkManager,
        royaltyData: policy.royaltyData,
        royaltyPolicy: policy.royaltyPolicy,
      }
    });
    setPolicies(data);
    return result;
  }

  useEffect(() => {
    fetchPolicies();
  }, []);


  return (
    <Flex flexDirection="column">
      <Box textAlign="center">
        <Text > Song info </Text>
        <Box textAlign="left" mb={4} border="1px solid #ddd" p={4} backgroundColor="white">
          <Text> Id is: {String(id)} </Text>
          <Text>
            {" "}
            Metadata link:{" "}
            <Link href={pinataGateway + metadata} isExternal>
              {pinataGateway + metadata}
            </Link>{" "}
          </Text>
          <Text> Transaction Hash: {txHash} </Text>
          {copyrights && copyrights.length > 0 ? (
            <>
              <Text> Uses copyrights from songs: </Text>
              {copyrights.map((copyright) => (
                <Box key={copyright.songId}>
                  <Text> Song id: {String(copyright.songId)} </Text>
                  <Text> Shares: {String(copyright.shares)} </Text>
                </Box>
              ))}
            </>
          ) : (
            <Text> No copyrights </Text>
          )}
        </Box>
        {/* List all policies component */}
        <Policies policies={policies} setPolicyId={setPolicyId} />
        {/* Register song as ip asset component */}
        {RegisterIPButton({ tokenId: id, policyId: policyId })}
        {/* Add a policy component */}
        <AddPolicy />
      </Box>
    </Flex>
  );
};