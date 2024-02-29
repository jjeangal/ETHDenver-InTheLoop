import { Flex, Button, Heading } from '@chakra-ui/react';
import { useRegisterRootIp } from '@story-protocol/react';
import { RegisterIPAProps } from '../services/interfaces';
import CoalNFT from "../../generated/deployedContracts";
import { stringToHex } from 'viem';

const RegisterIPA: React.FC<RegisterIPAProps> = ({ tokenId, policyId }) => {
    const contract = CoalNFT[11155111][0].contracts.CoalNFT;

    const {
        writeContractAsync
    } = useRegisterRootIp();

    const nftContract = contract;

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
            args: [policyId, nftContract, tokenId, ipName, contentHash, externalURL],
        });
    }

    return (
        <Flex flexDirection="column">
            <Heading size="md">Register your IP</Heading>
            <Button onClick={handleClick}>
                Register
            </Button>
        </Flex>
    );
};

export default RegisterIPA;