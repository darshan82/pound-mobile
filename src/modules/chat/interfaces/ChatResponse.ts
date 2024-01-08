import { MessageType } from "./MessageType";

export interface ChatResponse {
  profile: ProfileResponse,
  messages: MessageType[]
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
