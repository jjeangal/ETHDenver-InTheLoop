import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
describe("Main Test", () => {
    let id = 0;

    ethers.provider.on("SubmissionCreated", (subId) => {
      id = subId;
    })
  async function fixture() {
    const signers = await ethers.getSigners();
    const [
      admin,
      author1,
      author2,
      reviewer1,
      reviewer2,
      reviewer3,
      reviewer4,
    ] = signers;

    const reviewFactory = await ethers.getContractFactory("Review");

    const arrayOfZeros: Uint8Array = new Uint8Array(32).fill(0);
    const review = await reviewFactory
      .connect(admin)
      .deploy("Test License", 1000, 0, admin, arrayOfZeros, 4);

    await review.addAuthor(author1);
    await review.addAuthor(author2);

    await review.addReviewer(reviewer1);
    await review.addReviewer(reviewer2);
    await review.addReviewer(reviewer3);
    await review.addReviewer(reviewer4);

    const transaction = await review
      .connect(signers[1])
      .submitData("Are you gonna recommend this project to your friends?");

    const result = await transaction.wait();

    const options = ["Very Unlikely", "Unlikely", "Likely", "Very Likely"];
    await review.setOptions(id, options);
    await review.setThresholdToPass(id, 2); //On average at least likely

    await review.selectReviewers(id);

    return {
      review,
      admin,
      author1,
      author2,
      reviewer1,
      reviewer2,
      reviewer3,
      reviewer4,
    };
  }

  it("shouldHaveTestLicense", async function () {
    const { review } = await loadFixture(fixture);
    const license = await review.LICENSE();
    expect(license).to.equal("Test License");
  });

  it("shouldHaveBeenApproved", async function () {
    const { review, reviewer1, reviewer2, reviewer3 } = await loadFixture(
      fixture
    );
    await review.connect(reviewer1).castVote(id, 2);
    await review.connect(reviewer2).castVote(id, 1);
    await review.connect(reviewer3).castVote(id, 3);
    expect(review.revealResult(id))
      .to.emit(this.review, "ResultRevealed")
      .withArgs(id, true);
  });

  it("shouldNotHaveBeenApproved", async function () {
    const { review, reviewer1, reviewer2, reviewer3 } = await loadFixture(
      fixture
    );
    await review.connect(reviewer1).castVote(id, 2);
    await review.connect(reviewer2).castVote(id, 1);
    await review.connect(reviewer3).castVote(id, 2);
    expect(review.revealResult(id))
      .to.emit(this.review, "ResultRevealed")
      .withArgs(id, false);
  });
});
