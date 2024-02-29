import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";

import type { Review } from "../types";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    Review: Review;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  authors: SignerWithAddress[];
  reviewers: SignerWithAddress[];
}
