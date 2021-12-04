export type UserRecord = {
  id: number;
  name: string;
  email: string;
  pw_hash: string;
  created_utc: Date;
  updated_utc: Date;
  is_active: boolean;
};
