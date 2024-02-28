'use client';

import { useState } from "react";
import { useRegisterRootIp } from '@story-protocol/react';
import { stringToHex } from 'viem';
import CoalNFT from "../../generated/deployedContracts";
import { SongNft } from "../services/interfaces";

export default function Licenses() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [unlicensedSongs, setUnlicensedSongs] = useState<SongNft[]>([]);
    const [licensedSongs, setLicensedSongs] = useState<SongNft[]>([]);

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

        // await writeContractAsync({
        //     functionName: 'registerRootIp',
        //     args: [policyId, nftContract, tokenId, ipName, contentHash, externalURL],
        // });
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-1/2 mb-8 mt-8">
                <button
                    className="w-full px-4 py-2 text-left bg-gray-200 rounded"
                    onClick={() => setIsOpen1(!isOpen1)}
                    style={{ color: "#293655" }}
                >
                    Unlicensed Songs
                </button>

            </div>
            <div className="w-1/2">
                <button
                    className="w-full px-4 py-2 text-left bg-gray-200 rounded"
                    onClick={() => setIsOpen2(!isOpen2)}
                    style={{ color: "#293655" }}
                >
                    Licensed Songs
                </button>

            </div>
        </div>
    );
};