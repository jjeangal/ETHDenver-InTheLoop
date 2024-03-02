'use client'

import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

interface CreateTx {
    id: string;
    createdAt: string;
    actionType: string;
    initiator: `0x${string}` | undefined;
    ipId: string;
    resourceId: string;
    resourceType: string;
}

export default function ProfileLicenses() {
    const [boughtLicenses, setBoughtLicenses] = useState<CreateTx[]>([]);
    const [soldLicenses, setSoldLicenses] = useState<CreateTx[]>([]);
    const account = useAccount();

    async function fetchLicenses() {
        const response = await fetch("https://api.storyprotocol.net/api/v1/transactions", {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                options: {
                    pagination: { limit: 20 },
                    where: {
                        actionType: 'Create'
                    }
                }
            })
        });
        const result = await response.json();
        console.log(result);
    };

    useEffect(() => {
        fetchLicenses();
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center">
            <Box width="50%" marginBottom="8" marginTop="8">
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Bought Licenses
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {boughtLicenses.map((license) => (
                                <Box key={license.ipId.toString()} m={5} p={3} border="1px solid #ddd" backgroundColor="gray.800" borderRadius="md" boxShadow="md">
                                    <Text fontWeight="bold">License ID: {license.ipId.toString()}</Text>
                                </Box>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Sold Licenses
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {soldLicenses.map((license) => (
                                <Box key={license.ipId.toString()} m={5} p={3} border="1px solid #ddd" backgroundColor="gray.800" borderRadius="md" boxShadow="md">
                                    <Text fontWeight="bold">License ID: {license.ipId.toString()}</Text>
                                </Box>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Flex>
    );
};