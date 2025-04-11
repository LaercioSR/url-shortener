export interface IUser {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
