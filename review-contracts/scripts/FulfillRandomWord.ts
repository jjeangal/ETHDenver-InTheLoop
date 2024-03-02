import { ethers, getBigInt } from "ethers";
import { Review, Review__factory } from "../types";
import * as dotenv from 'dotenv';
dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  return provider;
}

async function main() {
  
    const [address, reqId, ...args] = process.argv.slice(2);
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

  await reviewContract.rawFulfillRandomWords(reqId, [983745]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});