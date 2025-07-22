import { API_BASE_URL } from "@/config/constants";
import { APIServiceBase } from "./api-service-base";

interface IAdminAccount {
  id: string;
  username: string;
  role: string;
  admin: {
    id: string;
    account_id: string;
    fullname: string;
    email: string | null;
  };
}

interface ICreateAdminAccount {
  username: string;
  password: string;
  fullname: string;
  email?: string | null;
}

interface IUpdateAdminAccount {
  fullname?: string;
  email?: string | null;
}

export class UserApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/user`;

  getAllAdminAccount = async (): any => {
    return this._get(`${this.root}/admin-account`);
  };

  createAdminAccount = async (data: ICreateAdminAccount): any => {
    return this._post(`${this.root}/create-admin-account`, data);
  };

  updateAdminAccount = async (id: string, data: IUpdateAdminAccount): any => {
    return this._patch(`${this.root}/${id}`, data);
  };

  deleteAdminAccount = async (id: string): any => {
    return this._delete(`${this.root}/${id}`);
  };

  createCandidateAccount = async (data: any): Promise<any> => {
    return this._post(`${this.root}/create`, data);
  };

  findAllUsers = async (
    query: string,
    skip: number,
    take: number
  ): Promise<any> => {
    return this._get(`${this.root}?query=${query}&skip=${skip}&take=${take}`);
  };

  findCandidateById = async (id: string): any => {
    return this._get(`${this.root}/${id}`);
  };
}

export const userApiService = new UserApiService();
