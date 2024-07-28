import ApiResponse from "@/apis/dto/client/response/ApiResponse";

interface ApiClient {

  get<T>(url: string): Promise<ApiResponse<T>>;

  post<T, U>(url: string, data: U): Promise<ApiResponse<T>>;

  delete<T>(url: string): Promise<ApiResponse<T>>;

  patch<T, U>(url: string, data: U): Promise<ApiResponse<T>>;

  put<T, U>(url: string, data: U): Promise<ApiResponse<T>>;

}

export default ApiClient;
