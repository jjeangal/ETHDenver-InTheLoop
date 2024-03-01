import { Button, Text } from '@chakra-ui/react';
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
        <>
            {txHash ? (ip ?
                <Text>IP Asset registered with id {ip.args.ipId}</Text> :
                <Text>Fetching Transaction</Text>) :
                <Button disabled={isPending} onClick={() => handleClick()}>
                    {isPending ? 'Confirm in wallet' : 'Register IP Asset'}
                </Button>
            }
        </>
    );
};

export default RegisterIPButton;