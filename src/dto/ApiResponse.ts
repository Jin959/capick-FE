interface ApiResponse<T> {

  code: number;

  message: string;

  data?: T;

}

export const isApiResponse = (object: object | unknown): object is ApiResponse<object | null> => {
  return typeof object === "object"
    && object !== null
    && "code" in object
    && "message" in object;
}

export default ApiResponse;