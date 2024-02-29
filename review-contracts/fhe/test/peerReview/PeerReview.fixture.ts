import axios from "axios";
import { ethers } from "hardhat";
import hre from "hardhat";

import type { PeerReview } from "../../types";
import { waitForBlock } from "../../utils/block";

export async function deployPeerReviewFixture(): Promise<{ peerReview: PeerReview; address: string }> {
  const signers = await ethers.getSigners();
  const admin = signers[0];

  const peerReviewFactory = await ethers.getContractFactory("PeerReview");
  const peerReview = await peerReviewFactory.connect(admin).deploy("Test License", 1000);

  const address = await peerReview.getAddress();
  return { peerReview, address };
}

export async function addAuthors(peerReview: PeerReview, signers: any) {
  await peerReview.addAuthor(signers[1]);
  await peerReview.addAuthor(signers[2]);
}

export async function setupReviewersAndKeywords(peerReview: PeerReview, signers: any) {
  const keywords = [["gasless"], ["scalability"], ["security"], ["usability"]];
  for (let i = 3; i < 7; i++) {
    peerReview.addReviewer(signers[i], keywords[i]);
  }
}

export async function submitData(peerReview: PeerReview, signers: any) {
  await getTokensFromFaucet(signers, 1);
  const transaction = await peerReview.connect(signers[1]).submitData("Are you gonna recommend this project to your friends?")
  await transaction.wait();

  const options = ["Very Unlikely", "Unlikely", "Likely", "Very Likely"]
  await peerReview.setOptions(0, options);
  await peerReview.setThresholdToPass(0, 2); //On average at least likely

  await peerReview.findReviewers(0);
}

export async function castVote(peerReview: PeerReview, reviewer: any, option: number) {
  const encOption = this.instance.instance.encrypt32(option);
  const transaction = await peerReview.connect(reviewer).castVote(0, encOption); //add FHE instance
  await transaction.wait();
}

export async function getTokensFromFaucetBySignedId(signerId: number = 0) {
  if (hre.network.name === "localfhenix") {
    const signers = await hre.ethers.getSigners();

    if ((await hre.ethers.provider.getBalance(signers[signerId].address)).toString() === "0") {
      console.log("Balance for signer is 0 - getting tokens from faucet");
      await getTokensFromFaucet(signers, signerId);
    }
  }
}

export async function getTokensFromFaucet(signers: any, signerId: number = 0) {
      await axios.get(`http://localhost:6000/faucet?address=${signers[signerId].address}`);
      await waitForBlock(hre);
}

