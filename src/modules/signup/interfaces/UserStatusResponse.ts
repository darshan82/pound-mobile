export enum Status {
  'IDLE' = 'Idle',
  'NOT_FOUND' = 'Idle',
  'PASSWORD_REQUIRED' = 'SignUp',
  'PERSONAL_INFO_REQUIRED' = 'Login',
  'ADDITIONAL_INFO_REQUIRED' = 'Login',
  'CONFIRMED' = 'Login',
}

export interface UserStatusResponse {
  user_status: Status;
  discord_id: string;
}
