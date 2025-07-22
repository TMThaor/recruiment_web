import { APIServiceBase } from "./api-service-base";

export class MediaApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/media`;

  getAll = async (): Promise<any> => {
    return this._get(this.root);
  };

  getById = async (id: string): Promise<any> => {
    return this._get(`${this.root}/${id}`);
  };

  uploadFile = async (formData: FormData): Promise<any> => {
    return this._post(`${this.root}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  deleteById = async (id: string): Promise<any> => {
    return this._delete(`${this.root}/${id}`);
  };
}

export const mediaApiService = new MediaApiService();
