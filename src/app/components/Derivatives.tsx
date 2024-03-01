'use client';
import { useState, useEffect } from "react";
import { Derivatives } from "../services/interfaces";
import { Flex, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text } from "@chakra-ui/react";

export default function Derivatives() {
    const [requests, setRequests] = useState<Derivatives[]>([]);
    const [demands, setDemands] = useState<Derivatives[]>([]);

    useEffect(() => {
        setRequests([
            {
                ipId: BigInt(0),
                policyId: BigInt(0),
            }
        ]);
        setDemands([
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
                                    Your Requests
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {requests.length > 0 ? requests.map((request) => (
                                <Box key={request.ipId.toString()} padding="4" backgroundColor="gray.300" marginTop="2" borderRadius="md">
                                    <Box fontWeight="bold">License ID: {request.ipId.toString()}</Box>
                                    <Box>Policy ID: {request.policyId.toString()}</Box>
                                </Box>
                            )) : <Text>No ongoing requests</Text>}
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    OnGoing Demands
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {demands.length > 0 ? demands.map((demand) => (
                                <Box key={demand.ipId.toString()} padding="4" backgroundColor="gray.300" marginTop="2" borderRadius="md">
                                    <Box fontWeight="bold">License ID: {demand.ipId.toString()}</Box>
                                    <Box>Policy ID: {demand.policyId.toString()}</Box>
                                </Box>
                            )) : <Text>No ongoing demands</Text>}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Flex>
    );
};