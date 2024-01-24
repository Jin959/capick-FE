import ApiConfig from "@/apis/ApiConfig";
import ApiClient from "@/apis/client/ApiClient";

class MemberService {

  private readonly apiClient: ApiClient;

  private constructor() {
    this.apiClient = ApiConfig.apiClient();
  }

  public static create = (): MemberService => {
    return new MemberService();
  }

  public getMember = (memberId: string) => {
    this.apiClient.get(memberId);
  };
}

export default MemberService;
