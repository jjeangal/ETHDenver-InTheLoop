'use client'

import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { License } from "../services/interfaces";

export default function Licenses() {
    const [boughtLicenses, setBoughtLicenses] = useState<License[]>([]);
    const [soldLicenses, setSoldLicenses] = useState<License[]>([]);

    useEffect(() => {
        setBoughtLicenses([
            {
                ipId: BigInt(0),
                policyId: BigInt(0),
            }
        ]);
        setSoldLicenses([
            {
                ipId: BigInt(1),
                policyId: BigInt(0),
            }
        ]);
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
                                <Box key={license.ipId.toString()} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                                    <Text fontWeight="bold">License ID: {license.ipId.toString()}</Text>
                                    <Text>Policy ID: {license.policyId.toString()}</Text>
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
                                <Box key={license.ipId.toString()} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                                    <Text fontWeight="bold">License ID: {license.ipId.toString()}</Text>
                                    <Text>Policy ID: {license.policyId.toString()}</Text>
                                </Box>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Flex>
    );
};