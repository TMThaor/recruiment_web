import { IStaff } from "@/interfaces/api-models/staff.type";
import { APIServiceBase } from "./api-service-base";

export class StaffApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/staff`;

  getAllStaff = async (): any => {
    return this._get(this.root);
  };

  getStaffById = async (id: string): any => {
    return this._get(`${this.root}/${id}`);
  };

  createStaff = async (data: IStaff): any => {
    return this._post(this.root, data);
  };

  updateStaff = async (id: string, data: IStaff): any => {
    return this._patch(`${this.root}/${id}`, data);
  };

  deleteStaff = async (id: string): any => {
    return this._delete(`${this.root}/${id}`);
  };
}

export const staffApiService = new StaffApiService();
