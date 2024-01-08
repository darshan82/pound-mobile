export interface LiveResponse {
  profile: ProfileResponse,
}

export interface ProfileResponse {
  avatar: string;
  avatarHalf: string;
  coins: number;
  rank: number;
  score: number;
  streak: number;
  username: string;
  id: string;
}
