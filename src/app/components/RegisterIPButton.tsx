import { Flex, Button } from '@chakra-ui/react';
import { useRegisterRootIp } from '@story-protocol/react';
import { RegisterIPAProps } from '../services/interfaces';
import CoalNFT from "../../generated/deployedContracts";
import { stringToHex } from 'viem';

const RegisterIPButton: React.FC<RegisterIPAProps> = ({ tokenId, policyId }) => {
    const contract = CoalNFT[11155111][0].contracts.CoalNFT.address;

    const {
        writeContractAsync
    } = useRegisterRootIp();

    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

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
            args: [policyId, contract, tokenId, ipName, contentHash, externalURL],
        });
    }

    return (
        <Button onClick={handleClick}>
            Register as IP Asset
        </Button>
    );
};

export default RegisterIPButton;