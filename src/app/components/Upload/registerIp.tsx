import { Flex, Box, Text, Link, Button } from "@chakra-ui/react";
import { RegisterIpProps, Policy } from "../../services/interfaces";
import RegisterIPButton from "./RegisterIPButton";
import { useState, useEffect } from "react";
import AddPolicy from '../AddPolicy';
import Policies from "../Policies";
import { useMintLicense, useReadPolicyIdsForIp } from "@story-protocol/react"
import erc1155abi from "../../../generated/erc1155.abi";
import CoalNFT from "../../../generated/deployedContracts";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { decodeEventLog } from "viem";

export const RegisterIp: React.FC<RegisterIpProps> = ({ id, txHash, metadata, copyrights }) => {
  // Pinata
  const pinataGateway = "https://gateway.pinata.cloud/ipfs/";
  const contract = CoalNFT[11155111][0].contracts.CoalNFT;

  const [ipaId, setIpaId] = useState<bigint>();
  const [policyId, setPolicyId] = useState<bigint>();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [licenseID, setLicenseID] = useState<bigint>();
  // Additional calldata for the royalty policy
  const royaltyContext = '0x';

  async function fetchIPA() {
    const response = await fetch("https://api.storyprotocol.net/api/v1/assets", {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        options: {
          pagination: { limit: 15 },
          where: {
            tokenContract: contract.address,
            tokenId: '4'
          }
        }
      })
    });

    const result = await response.json();
    const data = result.data[0].id;
    setIpaId(data);
  }

  async function fetchPolicies() {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
        'content-type': 'application/json'
      },
      orderDirection: 'ASC',
      body: JSON.stringify({ options: { orderDirection: 'ASC' } })
    };

    const response = await fetch("https://api.storyprotocol.net/api/v1/policies", options);
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
  }

  const { writeContractAsync, isPending, data: mintTxHash } = useMintLicense();
  const { address } = useAccount();

  const mintTxReceipt = useWaitForTransactionReceipt({
    hash: mintTxHash,
  });

  const { data: policyIds } = useReadPolicyIdsForIp({
    args: [false, ipaId]
  });

  function handleMint() {
    if (ipaId === undefined) {
      alert('Still fetching copyright IP Asset');
    }

    writeContractAsync({
      functionName: 'mintLicense',
      args: [policyIds, ipaId, copyrights[0]?.songId, address, royaltyContext],
    });

    console.log(ipaId);
  }

  useEffect(() => {
    if (!mintTxReceipt.isFetchedAfterMount) return; // skip any previous fetches (cached)
    if (!mintTxReceipt.data) return;

    for (const log of mintTxReceipt.data.logs) {
      const topics = decodeEventLog({
        abi: erc1155abi,
        ...log,
      });

      if (topics.eventName === "TransferSingle") {
        const licenseTokenId = String((topics.args as any as { id: bigint }).id);
        console.log("Minted license tokenId: " + licenseTokenId);
        setLicenseID(BigInt(licenseTokenId));
      }
    }
  }, [mintTxReceipt]);

  useEffect(() => {
    fetchIPA();
    fetchPolicies();
  }, []);

  return (
    <Flex flexDirection="column" marginTop="20vh">
      <Box textAlign="center" width="70vw">
        <Box textAlign="left" mb={4} border="1px solid #ddd" p={4} backgroundColor="gray.800" borderRadius="md" boxShadow="md">
          <Text> Id is: {String(id)} </Text>
          <Text>
            {" "}
            Metadata link:{" "}
            <Link href={pinataGateway + metadata} isExternal>
              {pinataGateway + metadata}
            </Link>{" "}
          </Text>
          <Text> Transaction Hash: {txHash} </Text>
        </Box>
        {copyrights[0] && (
          <Box textAlign="left" mb={4} border="1px solid #ddd" p={4} backgroundColor="gray.800" borderRadius="md" boxShadow="md">
            <Text fontSize="l">Identified Existing Similar IP Asset</Text>
            <Text>
              Copyrigth detected at {String(copyrights[0]?.shares)}% with CoalNFT {String(copyrights[0]?.songId)} and policy id {policyIds?.toString()}
            </Text>
            <Button disabled={isPending} onClick={() => handleMint()}>Mint License</Button>
            {mintTxHash &&
              <Text>hash: {mintTxHash}</Text>
            }
          </Box>
        )}
        {/* List all policies component */}
        <Policies policies={policies} setPolicyId={setPolicyId} />
        {/* Register song as ip asset component */}
        {RegisterIPButton({ tokenId: id, policyId: policyId, licenses: licenseID, derivativeOf: copyrights[0] })}
        {/* Add a policy component */}
        <AddPolicy />
      </Box>
    </Flex>
  );
};