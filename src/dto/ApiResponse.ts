interface ApiResponse<T> {

  code: number;

  message: string;

  data?: T;

}

export default ApiResponse;