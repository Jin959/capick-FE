import ApiConfig from "@/apis/ApiConfig";
import ApiClient from "@/apis/client/ApiClient";
import {isApiResponse} from "@/apis/dto/client/response/ApiResponse";
import {handleOnApiError} from "@/apis/error/errorHandler";
import commonError from "@/apis/error/commonError";
import MemberCreateRequest from "@/apis/dto/service/request/MemberCreateRequest";
import MemberResponse from "@/apis/dto/service/response/MemberResponse";
import MemberNicknameRequest from "@/apis/dto/service/request/MemberNicknameRequest";
import MemberPasswordRequest from "@/apis/dto/service/request/MemberPasswordRequest";
import MemberDeleteRequest from "@/apis/dto/service/request/MemberDeleteRequest";
import memberError from "@/apis/error/memberError";

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

  public createMember = async (memberCreateRequest: MemberCreateRequest): Promise<MemberResponse> => {
    try {
      const response = await this.apiClient
        .post<MemberResponse, MemberCreateRequest>("/members/new", memberCreateRequest);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public getMember = async (memberId: string | number): Promise<MemberResponse> => {
    try {
      const response = await this.apiClient
        .get<MemberResponse>("/members/" + memberId);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public updateMemberNickname = async (memberNicknameRequest: MemberNicknameRequest): Promise<MemberResponse> => {
    try {
      const response = await this.apiClient
        .patch<MemberResponse, MemberNicknameRequest>("/members/me/nickname", memberNicknameRequest);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public updateMemberPassword = async (memberPasswordRequest: MemberPasswordRequest): Promise<void> => {
    this.ifPasswordUnchangedThrow(memberPasswordRequest.password, memberPasswordRequest.newPassword);
    try {
      await this.apiClient
        .patch<void, MemberPasswordRequest>("/members/me/password", memberPasswordRequest);
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public deleteMember = async (memberDeleteRequest: MemberDeleteRequest): Promise<void> => {
    this.ifNotAgreeWarningThrow(memberDeleteRequest.agreement);
    try {
      await this.apiClient
        .delete<void>(`/members/${memberDeleteRequest.id}`);
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public isNotValidMember = (email: string, password: string, nickname: string, confirmPassword: string): boolean => {
    return this.isNotValidEmail(email) || this.isNotValidPassword(password)
      || this.isNotValidNickname(nickname) || this.isNotPasswordConfirm(password, confirmPassword);
  }

  public isNotValidPasswordChange = (password: string, newPassword: string, confirmPassword: string): boolean => {
    return password.length === 0
      || this.isNotValidPassword(newPassword)
      || this.isNotPasswordConfirm(newPassword, confirmPassword);
  }

  public isNotValidEmailAndNotEmpty = (email: string): boolean => {
    return this.isNotValidEmail(email) && email.length > 0;
  }

  public isNotValidEmail(email: string): boolean {
    return !this.emailRegExp.test(email);
  }

  public isNotValidPasswordAndNotEmpty = (password: string): boolean => {
    return this.isNotValidPassword(password) && password.length > 0;
  }

  public isNotValidPassword(password: string): boolean {
    return !this.passwordRegExp.test(password);
  }

  public isNotValidNicknameAndNotEmpty = (nickname: string): boolean => {
    return this.isNotValidNickname(nickname) && nickname.length > 0;
  }

  public isNotValidNickname(nickname: string): boolean {
    return !this.nicknameRegExp.test(nickname);
  }

  public isNotPasswordConfirmAndNotEmpty = (password: string, confirmPassword: string): boolean => {
    return this.isNotPasswordConfirm(password, confirmPassword) && password.length > 0
  }

  public isNotPasswordConfirm(password: string, confirmPassword: string): boolean {
    return password !== confirmPassword;
  }

  private ifPasswordUnchangedThrow(password: string, newPassword: string): void {
    if (password === newPassword) {
      throw new Error(memberError.password.duplicate);
    }
  }

  private ifNotAgreeWarningThrow(agreement: boolean): void {
    if (!agreement) {
      throw new Error(memberError.deleteAccount.notAgreed);
    }
  }
}

export default MemberService;
