'use client'

import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type LicenseResponse = {
    amount: string;
    blockNumber: string;
    blockTimestamp: string;
    id: string;
    licensorIpId: string;
    policyId: string;
    transferable: boolean;
};

export default function Licenses() {

    const [licenses, setLicenses] = useState<LicenseResponse[]>([]);

    async function fetchLicenses() {
        const response = await fetch("https://api.storyprotocol.net/api/v1/licenses", {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'X-API-Key': 'U3RvcnlQcm90b2NvbFRlc3RBUElLRVk=',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                options: {
                    pagination: { limit: 15 }
                }
            })
        });
        console.log('fetching licenses');
        const result = await response.json();
        const data: LicenseResponse[] = result.data.map((lic: any) => {
            return {
                amount: lic.amount,
                blockNumber: lic.blockNumber,
                blockTimestamp: lic.blockTimestamp,
                id: lic.id,
                licensorIpId: lic.licensorIpId,
                policyId: lic.policyId,
                transferable: lic.transferable
            };
        });
        setLicenses(data);
        return result;
    };

    useEffect(() => {
        fetchLicenses();
    }, []);

    if (licenses.length === 0) {
        return (
            <Flex justifyContent="center" alignItems="center" mt="20vh">
                <Text mr='2'>Fetching Licenses</Text>
                <Spinner />
            </Flex>
        );
    }

    return (
        <Flex flexDirection="column" alignItems="center" mt="20vh">
            {licenses && (licenses as LicenseResponse[]).map((license: LicenseResponse) => (
                <Box key={license.id} mb="2" border="1px solid #ddd" p={4} backgroundColor="gray.800" borderRadius="md" boxShadow="md">
                    <Text>License ID: {license.id}</Text>
                    <Text>Amount: {license.amount}</Text>
                    <Text>Block Number: {license.blockNumber}</Text>
                    <Text>Block Timestamp: {license.blockTimestamp}</Text>
                    <Text>Policy ID: {license.policyId}</Text>
                    <Text>Licensor IP ID: {license.licensorIpId}</Text>
                </Box>
            ))}
        </Flex>
    );
}