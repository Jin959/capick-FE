import ApiResponse from "@/apis/dto/ApiResponse";

export const handleOnApiError = (error: ApiResponse<object | undefined>) => {
  if (400 <= error.code && error.code < 500) {
    throw new Error(error.message);
  } else if (500 <= error.code && error.code < 600) {
    throw new Error("서버 내부에서 문제가 발생했습니다. 관리자에게 문의해주세요.");
  }
};