const mapError = {
  geolocation: {
    permission: "기기 및 브라우저 위치 접근 권한을 켜주세요!",
    positionUnavailable: "우주에 계시나요? 현재 위치 정보를 가져올 수 없는 지역이어서 사용자 위치 기반 서비스 이용이 어렵습니다.",
    timeout: "허용된 시간 안에 현재 위치 정보를 가져오지 못했습니다. 관리자에게 문의해주세요.",
    compatibility: "현재 브라우저에서는 위치 정보 기능을 사용할 수 없습니다. 브라우저 및 기기를 최신 버젼으로 업데이트 해주세요.",
  },
  kakaoMap: {
    loadingMap: "지도 정보를 가져올 수 없습니다. 네트워크를 확인해 주세요.",
    searchPlace: "지도 검색 서비스 응답에 실패했습니다. 외부 서비스 설정 확인을 위해 관리자에게 문의 해주세요.",
    noMap: "탐색할 지도가 존재하지 않아 외부 지도 서비스의 부가기능을 설정할 수 없습니다. 페이지를 새로고침 해주세요."
  }
};

export default mapError;