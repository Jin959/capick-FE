import ApiConfig from "@/apis/ApiConfig";
import ApiClient from "@/apis/client/ApiClient";
import MemberCreateRequest from "@/dto/request/MemberCreateRequest";
import MemberResponse from "@/dto/response/MemberResponse";
import {isApiResponse} from "@/dto/ApiResponse";
import ApiErrorHandler from "@/apis/error/ApiErrorHandler";

class MemberService {

  private readonly apiClient: ApiClient;
  private readonly nullResponse: MemberResponse;
  private readonly emailRegExp: RegExp;
  private readonly passwordRegExp: RegExp;
  private readonly nicknameRegExp: RegExp;

  private constructor() {
    this.apiClient = ApiConfig.apiClient();
    this.nullResponse = {
      id: 0,
      nickname: "Not Available"
    };
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
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        ApiErrorHandler(error);
      }
      throw new Error("클라이언트 앱과 외부 연동 문제가 발생했습니다.\n브라우저 또는 디바이스의 네트워크 설정을 확인해주세요.");
    }
  }

  public getMember = async (memberId: string | number) => {
    try {
      const response = await this.apiClient
        .get<MemberResponse>("/members/" + memberId);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        ApiErrorHandler(error);
      }
      throw new Error("클라이언트 앱과 외부 연동 문제가 발생했습니다.\n브라우저 또는 디바이스의 네트워크 설정을 확인해주세요.");
    }
  }

  public isNotValidMember = (email: string, password: string, nickname: string, confirmPassword: string) => {
    return this.isNotValidEmail(email) || this.isNotValidPassword(password)
      || this.isNotValidNickname(nickname) || this.isNotPasswordConfirm(password, confirmPassword);
  }

  public isNotValidPasswordChange = (password: string, newPassword: string, confirmPassword: string) => {
    return password.length === 0
      || this.isNotValidPassword(newPassword)
      || this.isNotPasswordConfirm(newPassword, confirmPassword);
  }

  public isNotValidEmailAndNotEmpty = (email: string) => {
    return this.isNotValidEmail(email) && email.length > 0;
  }

  public isNotValidEmail(email: string) {
    return !this.emailRegExp.test(email);
  }

  public isNotValidPasswordAndNotEmpty = (password: string) => {
    return this.isNotValidPassword(password) && password.length > 0;
  }

  public isNotValidPassword(password: string) {
    return !this.passwordRegExp.test(password);
  }

  public isNotValidNicknameAndNotEmpty = (nickname: string) => {
    return this.isNotValidNickname(nickname) && nickname.length > 0;
  }

  public isNotValidNickname(nickname: string) {
    return !this.nicknameRegExp.test(nickname);
  }

  public isNotPasswordConfirmAndNotEmpty = (password: string, confirmPassword: string) => {
    return this.isNotPasswordConfirm(password, confirmPassword) && password.length > 0
  }

  public isNotPasswordConfirm(password: string, confirmPassword: string) {
    return password !== confirmPassword;
  }
}

export default MemberService;
