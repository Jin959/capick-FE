import AxiosClient from "@/apis/client/AxiosClient";
import ApiClient from "@/apis/client/ApiClient";

class ApiConfig {

  public static apiClient(): ApiClient {
    return AxiosClient.of(process.env.NEXT_PUBLIC_CAPICK_API_URL, 3000);
  }

}

export default ApiConfig;
