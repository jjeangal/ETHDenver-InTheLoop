'use client'

import { useEffect, useState } from "react";
import { Flex, Text, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { IPA } from "../services/interfaces";
import CoalNFT from "../../generated/deployedContracts";

export default function MySongs() {
    const [IPAs, setIPAs] = useState<IPA[]>([]);
    const [notIPAs, setNotIPAs] = useState<IPA[]>([]);

    const [tokenId, setTokenId] = useState<BigInt | undefined>(BigInt(0));
    const [policyId, setPolicyId] = useState<BigInt | undefined>(BigInt(0));

    const chainId = 11155111;
    const contract = CoalNFT[chainId][0].contracts.CoalNFT;

    async function fetchOwnedIPAs() {
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
    };

    useEffect(() => {
        fetchOwnedIPAs();
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center" mt="20vh">
            <Box width="50%" marginBottom="8" marginTop="8">
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Registered IP Assets
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {IPAs && (IPAs as IPA[]).map((ipa) => (
                                <Box key={ipa.id} bg="gray.50" m={5} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                                    {/* <Text>IP Collection Name {ipa.metadata.name}</Text> */}
                                    <Text>Token ID: {ipa.tokenId}</Text>
                                    {/* <Text>Token Contract: {ipa.tokenContract}</Text> */}
                                    <Text>Registration Date: {ipa.metadata.registrationDate}</Text>
                                    <Text>IP id: {ipa.id}</Text>
                                </Box>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Unregistered IP Assets
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {notIPAs && (notIPAs as IPA[]).map((ipa) => (
                                <Text></Text>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Flex>
    );
};