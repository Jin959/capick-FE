import ApiResponse from "@/apis/dto/ApiResponse";
import commonError from "@/apis/error/commonError";

export const handleOnApiError = (error: ApiResponse<object | undefined>) => {
  if (400 <= error.code && error.code < 500) {
    throw new Error(error.message);
  } else if (500 <= error.code && error.code < 600) {
    throw new Error(commonError.internalServer);
  }
};