import ApiConfig from "@/apis/ApiConfig";
import ApiClient from "@/apis/client/ApiClient";
import MemberCreateRequest from "@/dto/request/MemberCreateRequest";
import MemberResponse from "@/dto/response/MemberResponse";
import {isApiResponse} from "@/dto/ApiResponse";

class MemberService {

  private readonly apiClient: ApiClient;
  private readonly emailRegExp: RegExp;
  private readonly passwordRegExp: RegExp;
  private readonly nicknameRegExp: RegExp;

  private constructor() {
    this.apiClient = ApiConfig.apiClient();
    this.emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    this.passwordRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()?])(?=\S+$)[0-9a-zA-Z!@#$%^&*()?]{8,20}$/;
    this.nicknameRegExp = /^(?=.*[.\w가-힇ぁ-ゔァ-ヴー々〆〤一-龥])(?=\S+$)[.\w가-힇ぁ-ゔァ-ヴー々〆〤一-龥]{1,20}$/;
  }

  public static create = (): MemberService => {
    return new MemberService();
  }

  public createMember = async (memberCreateRequest: MemberCreateRequest) => {
    try {
      const response = await this.apiClient
        .post<MemberResponse, MemberCreateRequest>("/members/new", memberCreateRequest);

      return response.data ?? {
        id: 0,
        nickname: "Not Available"
      };
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        if (400 <= error.code && error.code < 500) {
          throw new Error(error.message);
        } else if (500 <= error.code && error.code < 600) {
          throw new Error("서버 내부에서 문제가 발생했습니다. 관리자에게 문의해주세요.");
        }
      }
      throw new Error("클라이언트 앱과 외부 연동 문제가 발생했습니다.\n브라우저 또는 디바이스의 네트워크 설정을 확인해주세요.");
    }
  }

  public getMember = (memberId: string) => {
    this.apiClient.get(memberId);
  }

  public isNotValidMember = (email: string, password: string, nickname: string, confirmPassword: string) => {
    return email.length === 0 || password.length === 0 || nickname.length === 0
      || this.isNotValidEmailAndNotEmpty(email) || this.isNotValidPasswordAndNotEmpty(password)
      || this.isNotValidNicknameAndNotEmpty(nickname) || this.isNotPasswordConfirmAndNotEmpty(password, confirmPassword);
  }

  public isNotValidEmailAndNotEmpty = (email: string) => {
    return !this.emailRegExp.test(email) && email.length > 0;
  }

  public isNotValidPasswordAndNotEmpty = (password: string) => {
    return !this.passwordRegExp.test(password) && password.length > 0;
  }

  public isNotValidNicknameAndNotEmpty = (nickname: string) => {
    return !this.nicknameRegExp.test(nickname) && nickname.length > 0;
  }

  public isNotPasswordConfirmAndNotEmpty = (password: string, confirmPassword: string) => {
    return password !== confirmPassword && password.length > 0
  }

}

export default MemberService;
