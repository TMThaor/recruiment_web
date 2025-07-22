export interface IJobPost {
  created_at: string | number | Date;
  id?: string;
  category_id?: string;
  title?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  quantity?: number;
  location?: string;
  experienceRequired?: number;
  jobType?: string;
  skills?: string;
  image?: string;
  maxSalary?: number;
  minSalary?: number;
  expire_at?: string | null;
  category?: {
    id?: string;
    name?: string;
    created_at?: string;
  };
}
