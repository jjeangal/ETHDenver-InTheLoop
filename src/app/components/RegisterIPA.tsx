import { Button } from '@chakra-ui/react';
import { useRegisterRootIp } from '@story-protocol/react';
import { RegisterIPAProps } from '../services/interfaces';
import CoalNFT from "../../generated/deployedContracts";
import { stringToHex } from 'viem';

const RegisterIPA: React.FC<RegisterIPAProps> = ({ tokenId, policyId }) => {
    const contract = CoalNFT[31337][0].contracts.CoalNFT.address;

    const {
        writeContractAsync
    } = useRegisterRootIp();

    const nftContract = contract;

    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

    async function handleClick() {
        if (tokenId === undefined) {
            alert('Please update tokenId in RegisterRootIp.tsx');
        }

        if (policyId === undefined) {
            alert('Please select a policy');
        }

        await writeContractAsync({
            functionName: 'registerRootIp',
            args: [policyId, nftContract, tokenId, ipName, contentHash, externalURL],
        });
    }

    return (
        <>
            <Button
                onClick={handleClick}
            >
                Register IPA
            </Button>
        </>
    );
};

export default RegisterIPA;