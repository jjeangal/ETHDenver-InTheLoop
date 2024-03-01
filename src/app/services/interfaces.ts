export interface RegisterIPAProps {
  tokenId: BigInt | undefined;
  policyId: BigInt | undefined;
}

export interface IPA {
  id: bigint;
  owner: string;
}

export interface License {
  ipId: bigint;
  policyId: bigint;
}

export interface Derivatives {
  ipId: bigint;
  policyId: bigint;
}

export interface Copyright {
  songId: bigint;
  shares: bigint;
}

export interface UseAddSongParams {
  author: string;
  metadata: string;
  copyrights: Copyright[];
}

export interface AddSongEventArgs {
  id?: bigint;
  date?: bigint;
  author?: string;
  metadata?: string;
  copyrights?: ReadonlyArray<Copyright>;
}

export interface ReviewSongProps {
  id: bigint;
  txHash: string;
  metadata: string;
  copyrights: Copyright[];
}

export interface GoResponse {
  Id: bigint;
  Title: string;
  Author: string;
  MatchingRate: number;
}

export interface UploadStepsProps {
  state: 0 | 1 | 2;
}

export type TxOptions = {
  waitForTransaction?: boolean;
  gasPrice?: bigint;
  numBlockConfirmations?: number;
};

export type PolicyParameters = {
  attribution: boolean;
  commercialUse: boolean;
  commercialAttribution: boolean;
  commercializerChecker: string;
  commercializerCheckerData: string;
  commercialRevShare: number;
  derivativesAllowed: boolean;
  derivativesAttribution: boolean;
  derivativesApproval: boolean;
  derivativesReciprocal: boolean;
  territories: string[];
  distributionChannels: string[];
  contentRestrictions: string[];
};

export type RegistrationParams = {
  transferable: boolean;
  royaltyPolicy: string;
  mintingFee: bigint;
  mintingFeeToken: string;
  policy: PolicyParameters;
};

export type Policy = {
  blockNumber: string;
  blockTimestamp: string;
  frameworkData: string;
  id: string;
  mintingFee: string;
  mintingFeeToken: string;
  pil: {
    attribution: boolean;
    commercialAttribution: boolean;
    commercialRevShare: string;
    commercialUse: boolean;
    commercializerChecker: string;
    commercializerCheckerData: string;
    contentRestrictions: string[];
    derivativesAllowed: boolean;
    derivativesApproval: boolean;
    derivativesAttribution: boolean;
    derivativesReciprocal: boolean;
    distributionChannels: string[];
    id: string;
    territories: string[];
  };
  policyFrameworkManager: string;
  royaltyData: string;
  royaltyPolicy: string;
};

export interface SongFormProps {
  setState: React.Dispatch<React.SetStateAction<UploadStepsProps>>;
  setMetadata: React.Dispatch<React.SetStateAction<string>>;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
  setSongId: React.Dispatch<React.SetStateAction<bigint>>;
  metadata: string;
  copyrights: Copyright[] | null;
}
