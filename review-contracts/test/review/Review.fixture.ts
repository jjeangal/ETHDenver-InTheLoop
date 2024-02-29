import axios from "axios";
import { ethers } from "hardhat";
import hre from "hardhat";
import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";

import type { Review } from "../../typechain-types";
import { waitForBlock } from "../../utils/block";

export async function deployReviewFixture(): Promise<{ review: Review; address: string }> {
  const signers = await ethers.getSigners();
  const admin = signers[0];

  const reviewFactory = await ethers.getContractFactory("Review");
  const review = await reviewFactory.connect(admin).deploy("Test License", 1000, 0, "0x0", "0");

  const address = await review.getAddress();
  return { review, address };
}

export async function addAuthors(review: Review, signers: SignerWithAddress[]) {
  await review.addAuthor(signers[1]);
  await review.addAuthor(signers[2]);
}

export async function setupReviewersAndKeywords(review: Review, signers: SignerWithAddress[]) {
  for (let i = 3; i < 7; i++) {
    review.addReviewer(signers[i]);
  }
}

export async function submitData(review: Review, signers: SignerWithAddress[]) {
  const transaction = await review.connect(signers[1]).submitData("Are you gonna recommend this project to your friends?")
  await transaction.wait();

  const options = ["Very Unlikely", "Unlikely", "Likely", "Very Likely"]
  await review.setOptions(0, options);
  await review.setThresholdToPass(0, 2); //On average at least likely

  await review.selectReviewers(0);
}

export async function castVote(review: Review, reviewer: any, option: number) {
  const transaction = await review.connect(reviewer).castVote(0, option); //add FHE instance
  await transaction.wait();
}