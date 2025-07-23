import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { IServerResponse } from "@/interfaces/api-models/server-response.types";

export abstract class APIServiceBase {
  protected readonly API_BASE_URL = "/api";
  protected readonly AUTH_API_BASE_URL = "/secure";
  protected readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL??"",
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
      }
    );
  }
  protected async _post<T>(
    url: string,
    data?: any,
    option?: any
  ): Promise<IServerResponse<T>> {
    const response: AxiosResponse<IServerResponse<T>> =
      await this.axiosInstance.post(url, data ?? null, option);
    return response.data;
  }

  protected async _get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IServerResponse<T>> {
    const response: AxiosResponse<IServerResponse<T>> =
      await this.axiosInstance.get(url, config);
    return response.data;
  }

  protected async _put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IServerResponse<T>> {
    const response: AxiosResponse<IServerResponse<T>> =
      await this.axiosInstance.put(url, data ?? null, config);
    return response.data;
  }

  protected async _patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IServerResponse<T>> {
    const response: AxiosResponse<IServerResponse<T>> =
      await this.axiosInstance.patch(url, data ?? null, config);
    return response.data;
  }
  protected async _delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IServerResponse<T>> {
    const response: AxiosResponse<IServerResponse<T>> =
      await this.axiosInstance.delete(url, config);
    return response.data;
  }
}
