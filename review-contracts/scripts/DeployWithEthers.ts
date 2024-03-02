import { ethers } from "ethers";
import { Review, Review__factory } from "../types";
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  
  console.log("Deploying Review Contract");
  const provider = setupProvider();
  const privateKey = process.env.PRIVATE_KEY_0 ?? "";
  const wallet = new ethers.Wallet(privateKey, provider); //ethers.Wallet.fromPhrase() for mnemonic
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }


  const subId = Number(process.env.VRF_SUBSCRIPTION_ID);
  const coordinator = process.env.VRF_COORDINATOR ?? "";
  const keyHash = process.env.VRF_KEY_HASH ?? "";
  const requiredReviewers = 1;

  const reviewFactory = new Review__factory(wallet);
  const reviewContract = (await reviewFactory.deploy("MIT License", 1000, subId, coordinator, keyHash, requiredReviewers)) as Review;
  await reviewContract.waitForDeployment();
  const reviewContractAddress = await reviewContract.getAddress();
  console.log(`Review contract deployed to the address ${reviewContractAddress}`)

  const author = process.env.WALLET_ADDRESS_0 ?? "";
  await reviewContract.addAuthor(author);
  await reviewContract.addReviewer(author);

  const reviewer = process.env.WALLET_ADDRESS_1 ?? "";
  await reviewContract.addReviewer(reviewer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});