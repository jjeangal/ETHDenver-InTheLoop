'use client';

import { useState, useEffect } from "react";
import { Derivatives } from "../services/interfaces";
import { Flex, Box, Button, Text } from "@chakra-ui/react";

export default function Derivatives() {
    const [isOpenRequests, setIsOpenRequests] = useState(false);
    const [isOpenDemands, setIsOpenDemands] = useState(false);
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
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpenRequests(!isOpenRequests)}
                    color="#293655"
                >
                    Your Requests
                </Button>
                {isOpenRequests ? (
                    requests.length > 0 ? requests.map((request) => (
                        <Box key={request.ipId.toString()} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                            <Box fontWeight="bold">License ID: {request.ipId.toString()}</Box>
                            <Box>Policy ID: {request.policyId.toString()}</Box>
                        </Box>
                    )) : <Text>No ongoing requests</Text>
                ) : null}
            </Box>
            <Box width="50%" marginBottom="8" marginTop="8">
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpenDemands(!isOpenDemands)}
                    color="#293655"
                >
                    OnGoing Demands
                </Button>
                {isOpenDemands ? (
                    demands.length > 0 ? demands.map((demand) => (
                        <Box key={demand.ipId.toString()} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                            <Box fontWeight="bold">License ID: {demand.ipId.toString()}</Box>
                            <Box>Policy ID: {demand.policyId.toString()}</Box>
                        </Box>
                    )) : <Text>No ongoing demands</Text>
                ) : null}
            </Box>
        </Flex>
    )
}