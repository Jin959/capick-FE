import axios, {Axios, AxiosInstance, AxiosResponse} from "axios";
import ApiClient from "./ApiClient";
import ApiResponse from "@/apis/dto/client/response/ApiResponse";

class AxiosClient implements ApiClient {

  private constructor(
    private readonly axiosInstance: Axios,
  ) {}

  public static of = (baseURL?: string, timeout?: number): AxiosClient => {
    const axiosInstance = axios.create({baseURL, timeout});
    this.setAxiosErrorResponseType(axiosInstance);
    return new AxiosClient(axiosInstance);
  }

  private static setAxiosErrorResponseType(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(null, error => {
      return Promise.reject(error.response.data);
    });
  }

  public get = async <T>(url: string): Promise<ApiResponse<T>> => {
    return await this.axiosInstance.get(url)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public post = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
    return await this.axiosInstance.post(url, data)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public delete = async <T>(url: string): Promise<ApiResponse<T>> => {
    return await this.axiosInstance.delete(url)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public patch = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
    return await this.axiosInstance.patch(url, data)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public put = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
    return await this.axiosInstance.put(url, data)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

}

export default AxiosClient;
