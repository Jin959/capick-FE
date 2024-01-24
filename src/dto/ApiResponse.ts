interface ApiResponse<T> {

  code: string;

  message: string;

  data?: T;

}

export default ApiResponse;