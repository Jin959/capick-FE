import Position from "@/apis/dto/response/Position";

class MapService {

  private constructor() {}

  public static create = (): MapService => {
    return new MapService();
  }

  public getCurrentPosition = (): Promise<Position> => {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          },
          () => {
            window.alert("기기 및 브라우저 위치 접근 권한을 켜주세요!");
          }
        );
      }
    });
  }

}

export default MapService;