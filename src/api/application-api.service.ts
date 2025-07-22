import { APIServiceBase } from "./api-service-base";

export interface IApplication {
  id: string;
  candidate_id: string | null;
  job_id: string;
  cv: string;
  status: string;
  created_at: string;
  updated_at: string;
  dateOfBirth: string;
  education: string;
  email: string;
  fullname: string;
  phoneNumber: string;
}

export class ApplicationApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/application`;

  getAllApplications = async (): any => {
    return this._get(this.root);
  };

  getApplicationsByJobId = async (jobId: string): any => {
    return this._get(`${this.root}?job_id=${jobId}`);
  };

  updateApplicationStatus = async (id: string, status: string): any => {
    return this._patch(`${this.root}/update-status/${id}`, { status: status });
  };

  scheduleInterview = async (id: string, scheduleInfo: any): any => {
    return this._patch(`${this.root}/interview/${id}`, scheduleInfo);
  };
  sendOffer = async (id: string, offerInfo: any): any => {
    return this._patch(`${this.root}/send-offer/${id}`, offerInfo);
  };
  rejectApplication = async (id: string): any => {
    return this._patch(`${this.root}/reject/${id}`);
  };
  hireApplication = async (id: string): any => {
    return this._patch(`${this.root}/hire/${id}`);
  };
  deleteApplication = async (id: string): any => {
    return this._delete(`${this.root}/${id}`);
  };
}

export const applicationApiService = new ApplicationApiService();
