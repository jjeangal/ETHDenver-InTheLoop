export interface Copyright {
  songId: bigint;
  shares: bigint;
}

export interface UseAddSongParams {
  author: string;
  metadata: string;
  copyrights: Copyright[];
}

export interface SongNft {
  id: bigint;
  owner: string;
}

export interface AddSongEventArgs {
  id?: bigint;
  date?: bigint;
  author?: string;
  metadata?: string;
  copyrights?: ReadonlyArray<Copyright>;
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
  copyright: Copyright | null;
}
