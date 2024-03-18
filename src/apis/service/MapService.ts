import Position from "@/apis/dto/response/Position";
import mapError from "@/apis/error/mapError";
import commonError from "@/apis/error/commonError";

class MapService {

  private constructor() {
  }

  public static create = (): MapService => {
    return new MapService();
  }

  public getCurrentPosition = (): Promise<Position> => {
    return new Promise((resolve, reject) => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              })
            },
            (error: GeolocationPositionError) => {
              if (error.code === error.PERMISSION_DENIED) {
                reject(new Error(mapError.geolocation.permission));
              } else if (error.code === error.POSITION_UNAVAILABLE) {
                reject(new Error(mapError.geolocation.positionUnavailable))
              } else if (error.code === error.TIMEOUT) {
                reject(new Error(mapError.geolocation.timeout));
              }
            }
          );
        } else {
          reject(new Error(mapError.geolocation.compatibility));
        }
      } catch (error) {
        reject(new Error(commonError.internalClient));
      }
    });
  }
}

export default MapService;