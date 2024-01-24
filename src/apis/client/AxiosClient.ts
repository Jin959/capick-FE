import axios, {Axios, AxiosResponse} from "axios";
import ApiClient from "./ApiClient";
import ApiResponse from "@/dto/ApiResponse";

class AxiosClient implements ApiClient {

  private constructor(
    private readonly axiosInstance: Axios,
  ) {}

  public static of = (baseURL: string, timeout: number): AxiosClient =>  {
    return new AxiosClient(axios.create({baseURL, timeout}));
  }

  public get = async <T>(url: string): Promise<ApiResponse<T>> => {
    return await this.axiosInstance.get(url)
      .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public post = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
  return await this.axiosInstance.post(url)
    .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public delete = async <T>(url: string): Promise<ApiResponse<T>> => {
  return await this.axiosInstance.delete(url)
    .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public patch = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
  return await this.axiosInstance.patch(url)
    .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

  public put = async <T, U>(url: string, data: U): Promise<ApiResponse<T>> => {
  return await this.axiosInstance.put(url)
    .then((response: AxiosResponse<ApiResponse<T>>) => response.data)
  };

}

export default AxiosClient;
