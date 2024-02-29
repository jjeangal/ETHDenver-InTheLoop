'use client';

import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { License } from "../services/interfaces";

export default function Licenses() {

    const [isOpenBought, setIsOpenBought] = useState(false);
    const [isOpenSold, setIsOpenSold] = useState(false);
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
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpenBought(!isOpenBought)}
                    color="#293655"
                >
                    Bought Licenses
                </Button>
                {isOpenBought && (
                    boughtLicenses.map((license) => (
                        <Box key={license.ipId.toString()} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                            <Text fontWeight="bold">License ID: {license.ipId.toString()}</Text>
                            <Text>Policy ID: {license.policyId.toString()}</Text>
                        </Box>
                    ))
                )}
            </Box>
            <Box width="50%" marginBottom="8" marginTop="8">
                <Button
                    width="full"
                    paddingX="4"
                    paddingY="2"
                    textAlign="left"
                    backgroundColor="gray.200"
                    borderRadius="md"
                    onClick={() => setIsOpenSold(!isOpenSold)}
                    color="#293655"
                >
                    Sold Licenses
                </Button>
                {
                    isOpenSold && (
                        soldLicenses.map((license) => (
                            <Box key={license.ipId.toString()} padding="4" backgroundColor="gray.100" marginTop="2" borderRadius="md">
                                <Text fontWeight="bold">License ID: {license.ipId.toString()}</Text>
                                <Text>Policy ID: {license.policyId.toString()}</Text>
                            </Box>
                        ))
                    )
                }
            </Box>
        </Flex >
    );
};