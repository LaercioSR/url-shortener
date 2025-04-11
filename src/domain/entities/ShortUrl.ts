export interface IShortUrl {
  id: string;
  original_url: string;
  click_count: number;
  user_id?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
