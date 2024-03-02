import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { useRegisterRootIp, useRegisterDerivativeIp, useWatchRootIpRegistered } from '@story-protocol/react';
import { RegisterIPLogEntry, RegisterIPAProps } from '../../services/interfaces';
import CoalNFT from "../../../generated/deployedContracts";
import { stringToHex } from 'viem';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

const RegisterIPButton: React.FC<RegisterIPAProps> = ({ tokenId, policyId, licenses, derivativeOf }) => {
    const [ip, setIp] = useState<RegisterIPLogEntry>();
    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

    const contract = CoalNFT[11155111][0].contracts.CoalNFT.address;
    const account = useAccount();

    // Additional calldata for the royalty policy
    const royaltyContext = '0x';
    // Specify external url
    const externalUrl = 'ipfs.io/derivative';

    useWatchRootIpRegistered({
        onLogs(logs: RegisterIPLogEntry[]) {
            for (let log of logs) {
                if (log.args.caller === account.address) {
                    console.log(log);
                    setIp(log);
                    return;
                }
            }
        }
    });

    const {
        data: txRoot,
        writeContractAsync: writeRoot,
        isPending: pendingRoot
    } = useRegisterRootIp();

    const {
        data: txDerivative,
        writeContractAsync: writeDerivative,
        isPending: pendingDerivative
    } = useRegisterDerivativeIp();

    useEffect(() => {
        console.log('licenses are: ' + licenses);
    }, []);

    async function handleRoot() {
        if (policyId === undefined) {
            console.log('You need to select a policy for this');
            return;
        }
        console.log('calling registerRootIp');
        await writeRoot({
            functionName: 'registerRootIp',
            args: [policyId, contract, tokenId, ipName, contentHash, externalURL],
        });
        console.log("Registered Root IP Asset: " + txRoot);
    }

    async function handleDerivative() {
        if (licenses === undefined) {
            alert('You need a license for this');
            console.log('You need a license for this');
            return;
        }

        console.log('calling registerDerivativeIp');

        await writeDerivative({
            functionName: 'registerDerivativeIp',
            args: [
                [licenses],
                contract,
                tokenId,
                ipName,
                contentHash,
                externalUrl,
                royaltyContext,
            ],
        });

        console.log("Registered Derivative IP Asset: " + txDerivative);
    }

    return (
        <Flex m="4" width="100%" justifyContent="center" alignItems="center">
            {txRoot ? (ip ?
                <Box textAlign="left" m="4" border="1px solid #ddd" backgroundColor="gray.800" borderRadius="md" boxShadow="md">
                    <Text>Success! IP Asset registered with id {ip.args.ipId}</Text>
                </Box> :
                <Box textAlign="left" mb="4" border="1px solid #ddd" backgroundColor="gray.300" borderRadius="md" boxShadow="md">
                    <Text>In Process</Text>
                </Box>
            ) : derivativeOf ? (
                <Button disabled={pendingDerivative} onClick={() => handleDerivative()} textAlign="left" mb="4" border="1px solid #ddd" backgroundColor="gray.300" borderRadius="md" boxShadow="md">
                    {pendingDerivative ? 'Confirm in wallet' : 'Register Derivative IPA'}
                </Button>
            ) : (
                <Button disabled={pendingRoot} onClick={() => handleRoot()} textAlign="left" mb="4" border="1px solid #ddd" backgroundColor="gray.300" borderRadius="md" boxShadow="md">
                    {pendingRoot ? 'Confirm in wallet' : 'Register IPA'}
                </Button>
            )}
            {txDerivative ? <></> : null}
        </Flex>
    );
};

export default RegisterIPButton;