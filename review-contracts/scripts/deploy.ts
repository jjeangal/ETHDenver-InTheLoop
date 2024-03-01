// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";

async function main() {

  const signers = await hre.ethers.getSigners();
  const admin = signers[0];

  const reviewFactory = await hre.ethers.getContractFactory("Review");

  // const arrayOfZeros: Uint8Array = new Uint8Array(32).fill(0);
  const subId = Number(process.env.VRF_SUBSCRIPTION_ID);
  const coordinator = process.env.VRF_COORDINATOR ?? "";
  const keyHash = process.env.VRF_KEY_HASH ?? "";

  console.log("Trying to deploy a contract with " + subId + ", " + coordinator + ", " + keyHash + " using account " + admin.address);
  
  const review = await reviewFactory.connect(admin).deploy("MIT License", 1000, subId, coordinator, keyHash, 1);
  const tx = await review.waitForDeployment();

  console.log("Deployed address " + review.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
