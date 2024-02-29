import { expect } from "chai";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";
import { castVote } from "./PeerReview.fixture";

export function shouldBehaveLikePeerReview(): void {
  it("shouldHaveTestLicense", async function () {
    const license = await this.peerReview.LICENSE();
    expect(license === "Test License")
  })

  it("shouldHaveBeenApproved", async function() {
    await castVote(this.peerReview, this.signers[3], 2);
    await castVote(this.peerReview, this.signers[4], 1);
    await castVote(this.peerReview, this.signers[5], 3);
    expect(this.peerReview.revealResult(0)).to.emit(this.peerReview, "ResultRevealed").withArgs(0, true);
  })

  // it("should add amount to the peerReview and verify the result", async function () {
  //   const amountToCount = 10;

  //   const eAmountCount = this.instance.instance.encrypt32(amountToCount);
  //   await this.peerReview.connect(this.signers.admin).add(eAmountCount);

  //   await waitForBlock(hre);

  //   const eAmount = await this.peerReview.connect(this.signers.admin).getPeerReview(this.instance.publicKey);
  //   const amount = this.instance.instance.decrypt(await this.peerReview.getAddress(), eAmount);

  //   expect(amount === amountToCount);
  // });
}
