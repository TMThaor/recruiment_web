import { APIServiceBase } from "./api-service-base";

export class CategoryApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/category`;

  getAllCategory = async (): any => {
    return this._get(this.root);
  };

  createCategory = async (data: { name: string }): any => {
    return this._post(this.root, data);
  };

  updateCategory = async (id: string, data: { name: string }): any => {
    return this._patch(`${this.root}/${id}`, data);
  };

  deleteCategory = async (id: string): any => {
    return this._delete(`${this.root}/${id}`);
  };
}

export const categoryApiService = new CategoryApiService();
