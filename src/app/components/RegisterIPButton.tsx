import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { useRegisterRootIp, useWatchRootIpRegistered } from '@story-protocol/react';
import { RegisterIPLogEntry, RegisterIPAProps } from '../services/interfaces';
import CoalNFT from "../../generated/deployedContracts";
import { stringToHex } from 'viem';
import { useAccount } from 'wagmi';
import { useState } from 'react';

const RegisterIPButton: React.FC<RegisterIPAProps> = ({ tokenId, policyId }) => {
    const [ip, setIp] = useState<RegisterIPLogEntry>();
    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

    const contract = CoalNFT[11155111][0].contracts.CoalNFT.address;
    const account = useAccount();

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
        data: txHash,
        writeContractAsync,
        isPending
    } = useRegisterRootIp();

    async function handleClick() {
        await writeContractAsync({
            functionName: 'registerRootIp',
            args: [policyId, contract, BigInt(11), ipName, contentHash, externalURL],
        });
    }

    return (
        <Flex m="4" width="100%" justifyContent="center" alignItems="center">
            {txHash ? (ip ?
                <Box textAlign="left" mb="4" border="1px solid #ddd" backgroundColor="gray.300" borderRadius="md" boxShadow="md">
                    <Text>IP Asset registered with id {ip.args.ipId}</Text>
                </Box> :
                <Box textAlign="left" mb="4" border="1px solid #ddd" backgroundColor="gray.300" borderRadius="md" boxShadow="md">
                    <Text>Fetching Transaction</Text>
                </Box>
            ) :
                <Button disabled={isPending} onClick={() => handleClick()} textAlign="left" mb="4" border="1px solid #ddd" backgroundColor="gray.300" borderRadius="md" boxShadow="md">
                    {isPending ? 'Confirm in wallet' : 'Register IP Asset'}
                </Button>
            }
        </Flex>
    );
};

export default RegisterIPButton;