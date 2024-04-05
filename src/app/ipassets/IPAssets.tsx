'use client'

import { IPA } from "../services/interfaces";
import CoalNFT from "../../generated/deployedContracts";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

export default function IPAssets() {

    const [IPAs, setIPAs] = useState<IPA[]>([]);

    const chainId = 11155111;
    const contract = CoalNFT[chainId][0].contracts.CoalNFT;

    async function fetchIPAs() {
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
                        chainId: chainId
                    }
                }
            })
        });

        const result = await response.json();

        const data: IPA[] = result.data.map((ipa: any) => {
            return {
                blockNumber: ipa.blockNumber,
                blockTimestamp: ipa.blockTimestamp,
                chainId: ipa.chainId,
                childIpIds: ipa.childIpIds,
                id: ipa.id,
                metadata: {
                    hash: ipa.metadata.hash,
                    name: ipa.metadata.name,
                    registrant: ipa.metadata.registrant,
                    registrationDate: ipa.metadata.registrationDate,
                    uri: ipa.metadata.uri,
                },
                metadataResolverAddress: ipa.metadataResolverAddress,
                parentIpIds: ipa.parentIpIds,
                rootIpIds: ipa.rootIpIds,
                tokenContract: ipa.tokenContract,
                tokenId: ipa.tokenId,
            }
        });
        setIPAs(data);
    }

    useEffect(() => {
        fetchIPAs();
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center" mt="20vh">
            {IPAs && (IPAs as IPA[]).map((ipa) => (
                <Box key={ipa.id} m={5} p={3} border="1px solid #ddd" backgroundColor="gray.800" borderRadius="md" boxShadow="md">
                    {/* <Text>IP Collection Name {ipa.metadata.name}</Text> */}
                    <Text>Token ID: {ipa.tokenId}</Text>
                    <Text>Registrant: {ipa.metadata.registrant}</Text>
                    {/* <Text>Token Contract: {ipa.tokenContract}</Text> */}
                    <Text>Registration Date: {ipa.metadata.registrationDate}</Text>
                    <Text>IP id: {ipa.id}</Text>
                    {/* <Button onClick={() => { useMintLicense(policyId, ipId, amount, minter, royaltyContext)   }} /> */}
                </Box>
            ))}
        </Flex>
    );
}
