import { Button } from '@chakra-ui/react';
import { registrationModuleAbi, useRegisterRootIp } from '@story-protocol/react';
import { RegisterIPAProps } from '../services/interfaces';
import CoalNFT from "../../generated/deployedContracts";
import { stringToHex } from 'viem';

const RegisterIPButton: React.FC<RegisterIPAProps> = ({ tokenId, policyId }) => {
    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

    const contract = CoalNFT[11155111][0].contracts.CoalNFT.address;

    useWatchContractEvent({
        address: '0x613128e88b568768764824f898C8135efED97fA6',
        abi: registrationModuleAbi,
        eventName: 'PolicyRegistered',
        onLogs(logs) {
            console.log(logs);
        }
    });

    const {
        writeContractAsync,
        isPending,
        data: txHash,
    } = useRegisterRootIp();

    async function handleClick() {
        if (tokenId === undefined) {
            console.log('Please update tokenId in RegisterRootIp.tsx');
            alert('Please update tokenId in RegisterRootIp.tsx');
            return;
        }

        if (policyId === undefined) {
            console.log('Please select a policy');
            alert('Please select a policy');
            return;
        }

        await writeContractAsync({
            functionName: 'registerRootIp',
            args: [policyId, contract, BigInt(4), ipName, contentHash, externalURL],
        });

        if (txHash != undefined) {
            alert('IP Asset Registered');
        };
    }

    return (
        <Button onClick={handleClick}>
            {isPending ? 'Confirm in wallet' : 'Register IP Asset'}
        </Button>
    );
};

export default RegisterIPButton;

function useWatchContractEvent(arg0: { address: string; abi: any; eventName: string; onLogs(logs: any): void; }) {
    throw new Error('Function not implemented.');
}
