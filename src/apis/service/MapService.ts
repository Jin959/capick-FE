import Position from "@/apis/dto/response/Position";
import mapError from "@/apis/error/mapError";
import commonError from "@/apis/error/commonError";
import {KakaoMap, MapLevel, MapOption} from "@/types/kakao/Maps";
import KakaoMapSearchResult from "@/types/kakao/dto/KakaoMapSearchResult";
import {Status} from "@/types/kakao/Services";

class MapService {

  private readonly KAKAO_MAP_MIN_LEVEL: MapLevel;
  private readonly KAKAO_MAP_MAX_LEVEL: MapLevel;
  private readonly KAKAO_MAP_DEFAULT_LEVEL: MapLevel;

  private constructor() {
    this.KAKAO_MAP_MIN_LEVEL = 1;
    this.KAKAO_MAP_MAX_LEVEL = 8;
    this.KAKAO_MAP_DEFAULT_LEVEL = 5;
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

  public getKakaoMap = (mapDivElement: HTMLDivElement, currentPosition: Position): Promise<KakaoMap> => {
    return new Promise((resolve, reject) => {
      try {
        window.kakao.maps.load(() => {
          const {kakao} = window;

          const mapOption: MapOption = {
            center: new kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
            level: this.KAKAO_MAP_DEFAULT_LEVEL
          };

          const map = new kakao.maps.Map(mapDivElement, mapOption);
          map.setMinLevel(this.KAKAO_MAP_MIN_LEVEL);

          map.setMaxLevel(this.KAKAO_MAP_MAX_LEVEL);
          map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.TOPRIGHT);

          resolve(map);
        });
      } catch (error) {
        reject(new Error(mapError.kakaoMap.loading));
      }
    });
  }

  public getNearbyCafesOnKakaoMap = (map: KakaoMap): Promise<Array<KakaoMapSearchResult>> => {
    return new Promise((resolve, reject) => {
      try {
        window.kakao.maps.load(() => {
          const {kakao} = window;
          const places = new kakao.maps.services.Places(map);
          const callback = (result: Array<KakaoMapSearchResult>, status: Status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result);
            } else if (status === kakao.maps.services.Status.ERROR) {
              reject(new Error(mapError.kakaoMap.search));
            }
          };
          places.categorySearch("CE7", callback, {
            useMapCenter: true,
            radius: 1000
          });
        });
      } catch (error) {
        reject(new Error(mapError.kakaoMap.cafes));
      }
    });
  }

}

export default MapService;