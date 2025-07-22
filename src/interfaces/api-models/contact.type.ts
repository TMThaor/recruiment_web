export interface IContact {
  id: string;
  fullName: string;
  email: string;
  message: string;
  isReplied?: boolean;
  repliedBy?: string;
  created_at: string;
}
