const commonError = {
  connection: "클라이언트 앱과 외부 연동 문제가 발생했습니다.\n브라우저 또는 디바이스의 네트워크 설정을 확인해주세요.",
  internalServer: "서버 내부에서 문제가 발생했습니다. 관리자에게 문의해주세요.",
  internalClient: "클라이언트 앱 자체에서 에러가 발생했습니다. 관리자에게 문의해주세요.",
  storageClient: "외부 저장소 연동 문제가 발생했습니다. 관리자에게 문의해주세요.",
  serverSideServiceOnClientError: "SSR, 서버 측에서 사용하는 서비스 객체를 클라이언트에서 호출하였습니다. 관리자에게 문의해 주세요."
};

export default commonError;