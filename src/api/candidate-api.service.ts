import { APIServiceBase } from "./api-service-base";

export class CandidateApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/candidate`;

  
  getAppliedJobs = async (candidateId: string): any => {
    return this._get(`${this.root}/jobs/${candidateId}`);
  };
}

export const candidateApiService = new CandidateApiService();
