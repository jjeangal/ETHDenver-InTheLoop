import { expect } from "chai";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";
import { castVote } from "./Review.fixture";

export function shouldBehaveLikeReview(): void {
  it("shouldHaveTestLicense", async function () {
    const license = await this.review.LICENSE();
    expect(license === "Test License")
  })

  it("shouldHaveBeenApproved", async function() {
    await castVote(this.review, this.signers.reviewers[0], 2);
    await castVote(this.review, this.signers.reviewers[1], 1);
    await castVote(this.review, this.signers.reviewers[2], 3);
    expect(this.review.revealResult(0)).to.emit(this.review, "ResultRevealed").withArgs(0, true);
  })

  // it("should add amount to the review and verify the result", async function () {
  //   const amountToCount = 10;

  //   const eAmountCount = this.instance.instance.encrypt32(amountToCount);
  //   await this.review.connect(this.signers.admin).add(eAmountCount);

  //   await waitForBlock(hre);

  //   const eAmount = await this.review.connect(this.signers.admin).getReview(this.instance.publicKey);
  //   const amount = this.instance.instance.decrypt(await this.review.getAddress(), eAmount);

  //   expect(amount === amountToCount);
  // });
}
