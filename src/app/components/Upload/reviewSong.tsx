import React, { useState } from "react";
import CoalNFT from "../../../generated/deployedContracts";
import { useAccount, useWatchContractEvent } from "wagmi";
import { AddSongEventArgs } from "../../services/interfaces";

export const ReviewSong = () => {
  const [contractCall, setContractCall] = useState<AddSongEventArgs>();
  const [txHash, setTxHash] = useState<string>();

  // Pinata
  const pinataGateway = "https://gateway.pinata.cloud/ipfs/";

  // Wallet
  const { address } = useAccount();

  // Contract
  const contract = CoalNFT[31337][0].contracts.CoalNFT;

  const unwatch = useWatchContractEvent({
    address: contract.address,
    abi: contract.abi,
    eventName: "SongAdded",
    onLogs(logs) {
      console.log('New logs!', logs)
    }
  });

  const showCopyrights = () => {
    return contractCall?.copyrights?.map((cp, index) => (
      <p key={index} className="text-blue-500">
        Song ID: {cp.songId.toString()}, Shares: {cp.shares.toString()}
      </p>
    ));
  };

  const contractCallInfo = () => {
    return (
      <div className="bg-gray-200 p-4 rounded text-gray-900 w-1/2 mx-auto overflow-auto">
        <p className="font-bold"> Song info: </p>
        <p> Id is: {contractCall?.id?.toString()} </p>
        <p> Author: {contractCall?.author} </p>
        <p>
          {" "}
          Metadata link:{" "}
          <a href={pinataGateway + contractCall?.metadata} target="_blank" rel="noopener noreferrer">
            {pinataGateway + contractCall?.metadata}
          </a>{" "}
        </p>
        <p> Transaction Hash: {txHash} </p>
        <p> Uses copyrights from songs: </p>
        {showCopyrights()}
      </div>
    );
  };

  return (
    <div className="font-sans">
      <h1 className="text-center">Review Song</h1>
      {contractCall ? contractCallInfo() : <p> Transaction Loading </p>}
    </div>
  );
};
