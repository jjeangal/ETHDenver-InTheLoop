import { Button } from '@chakra-ui/react';
import { registrationModuleAbi, useRegisterRootIp, useWatchRootIpRegistered } from '@story-protocol/react';
import { RegisterIPAProps } from '../services/interfaces';
import CoalNFT from "../../generated/deployedContracts";
import { stringToHex } from 'viem';

const RegisterIPButton: React.FC<RegisterIPAProps> = ({ tokenId, policyId }) => {
    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

    const contract = CoalNFT[11155111][0].contracts.CoalNFT.address;

    useWatchRootIpRegistered({
        onLogs(logs: any) {
            console.log(logs);
        }
    });

    const {
        writeContractAsync,
        isPending
    } = useRegisterRootIp();

    async function handleClick() {
        await writeContractAsync({
            functionName: 'registerRootIp',
            args: [policyId, contract, tokenId, ipName, contentHash, externalURL],
        });
    }

    return (
        <Button onClick={() => handleClick()}>
            {isPending ? 'Confirm in wallet' : 'Register IP Asset'}
        </Button>
    );
};

export default RegisterIPButton;