import { ethers } from "hardhat";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";
import type { Signers } from "../types";
import { shouldBehaveLikeReview } from "./Review.behavior";
import { addAuthors, castVote, deployReviewFixture, setupReviewersAndKeywords as setupReviewers, submitData } from "./Review.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    // get tokens from faucet if we're on localfhenix and don't have a balance

    // deploy test contract
    const { review, address } = await deployReviewFixture();
    
    this.review = review;

    // set admin account/signer
    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.authors = [signers[1], signers[2]];
    this.signers.reviewers = [signers[3], signers[4], signers[5], signers[6]];

    await addAuthors(review, signers);
    await setupReviewers(review, signers);

    await submitData(review, signers);

    // wait for deployment block to finish
    await waitForBlock(hre);
  });

  describe("Review", function () {
    shouldBehaveLikeReview();
  });
});
