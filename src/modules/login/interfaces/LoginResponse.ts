export interface LoginResponse {
  data: Data;
}

export interface Data {
  tokens: Tokens;
  user_information: UserInformation;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface UserInformation {
  nickname: string;
  discord_id: string;
}
