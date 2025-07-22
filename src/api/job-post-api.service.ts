import { APIServiceBase } from "./api-service-base";
import { IJobPost } from "@/interfaces/api-models/job-post.types";

export class JobPostApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/jobs`;

  getAllJobPosts = async (): any => {
    return this._get(this.root);
  };

  getJobPostById = async (id: string): any => {
    return this._get(`${this.root}/${id}`);
  };

  createJobPost = async (jobData: IJobPost): any => {
    return this._post(this.root, jobData);
  };

  updateJobPost = async (id: string, updateData: IJobPost): any => {
    return this._patch(`${this.root}/${id}`, updateData);
  };

  deleteJobPost = async (id: string): any => {
    return this._delete(`${this.root}/${id}`);
  };

  getCandidatesByJobId = async (jobId: string): any => {
    return this._get(`${this.root}/candidate/${jobId}`);
  };
}

export const jobPostApiService = new JobPostApiService();
