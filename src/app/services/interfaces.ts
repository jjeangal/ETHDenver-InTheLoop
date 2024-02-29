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

export interface RegisterStepsProps {
  state: 0 | 1 | 2;
}

export interface SongFormProps {
  setState: React.Dispatch<React.SetStateAction<RegisterStepsProps>>;
  setMetadata: React.Dispatch<React.SetStateAction<string>>;
  setTxHash: React.Dispatch<React.SetStateAction<string>>;
  setSongId: React.Dispatch<React.SetStateAction<bigint>>;
  metadata: string;
  copyrights: Copyright[] | null;
}
