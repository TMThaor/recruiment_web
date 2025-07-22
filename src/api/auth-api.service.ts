import { APIServiceBase } from "./api-service-base";

interface LoginData {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

export class AuthApiService extends APIServiceBase {
  private readonly root = `${this.API_BASE_URL}/auth`;

  login = async (data: LoginData): any => {
    return this._post(`${this.root}/login`, data);
  };
}

export const authApiService = new AuthApiService();
