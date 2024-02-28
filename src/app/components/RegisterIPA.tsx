import { useRegisterRootIp } from '@story-protocol/react';
import { stringToHex } from 'viem';
import CoalNFT from "../../generated/deployedContracts";
import { Button } from '@chakra-ui/react';

export default function RegisterIPA() {

    const contract = CoalNFT[31337][0].contracts.CoalNFT.address;

    const {
        writeContractAsync
    } = useRegisterRootIp();

    const tokenId = BigInt(1);
    const nftContract = contract;

    const policyId = BigInt(0); // Policy ID from RegisterPILPolicy.tsx, if want to attach policy in same transaction
    const ipName = 'Coal Song IP'; // Name of your IP, if applicable
    const contentHash = stringToHex('0x', { size: 32 }); // Content hash of your NFT, if applicable
    const externalURL = 'https://example.com';

    async function handleClick() {
        if (tokenId === undefined) {
            alert('Please update tokenId in RegisterRootIp.tsx');
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