export type UserRecord = {
  id: number;
  name: string;
  email: string;
  pwHash: string;
  created_utc: Date;
  updated_utc: Date;
  last_login: Date;
  reset_password: boolean;
  is_admin: boolean;
  is_active: boolean;
};
