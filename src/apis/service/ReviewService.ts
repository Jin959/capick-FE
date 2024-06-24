import ApiClient from "@/apis/client/ApiClient";
import ApiConfig from "@/apis/ApiConfig";

class ReviewService {

  private readonly apiClient: ApiClient;

  private constructor() {
    this.apiClient = ApiConfig.apiClient();
  }

  public static create = (): ReviewService => {
    return new ReviewService();
  }

}

export default ReviewService;