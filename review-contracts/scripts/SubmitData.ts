import { ethers, getBigInt } from "ethers";
import { Review, Review__factory } from "../types";
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  
    const [address, ...args] = process.argv.slice(2);
  console.log(`Submitting data for review contract of address ${address}`);

  const provider = setupProvider();

  const privateKey = process.env.PRIVATE_KEY_0 ?? "";
  const wallet = new ethers.Wallet(privateKey, provider); //ethers.Wallet.fromPhrase() for mnemonic
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  const reviewFactory = new Review__factory(wallet);
  const reviewContract = await reviewFactory.attach(address) as Review;

  const song1 = [60, 56, 70, 64, 66, 36, 40];
  const song2 = [59, 55, 69, 63, 65, 35, 39];

  const tx = await reviewContract.submitData([song1, song2]);
  const receipt = await tx.wait();

  const subId = getBigInt(receipt?.logs[0]?.topics[1] || 0);

  console.log("Submitted data with submission ID: " + subId);

  await reviewContract.setOptions(subId, ["Very different", "Somewhat different", "Hard to tel", "Somewhat similar", "Very similar"]);
  await reviewContract.setThresholdToPass(subId, 3);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});