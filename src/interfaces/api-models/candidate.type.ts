export interface IAppliedJob {
  id: string;
  candidate_id: string;
  job_id: string;
  cv: string;
  status: string;
  created_at: string;
  updated_at: string;

  // Candidate info
  fullname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  education: string;

  // Job info (nested)
  job: {
    id: string;
    category_id: string;
    title: string;
    description: string;
    requirements: string;
    benefits: string;
    quantity: number;
    location: string;
    experienceRequired: number;
    jobType: string;
    skills: string;
    minSalary: number;
    maxSalary: number;
    image: string;
    created_at: string;
    category: {
      id: string;
      name: string;
      created_at: string;
    };
  };
}
