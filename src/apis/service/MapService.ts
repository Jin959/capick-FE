import Position from "@/apis/dto/response/Position";
import mapError from "@/apis/error/mapError";
import commonError from "@/apis/error/commonError";
import {KakaoMap, MapLevel, MapOption} from "@/types/kakao/Maps";
import KakaoMapSearchResult from "@/types/kakao/dto/KakaoMapSearchResult";
import {Status} from "@/types/kakao/Services";

class MapService {

  private static readonly KAKAO_MAP_MIN_LEVEL: MapLevel = 1;
  private static readonly KAKAO_MAP_MAX_LEVEL: MapLevel = 8;
  private static readonly KAKAO_MAP_DEFAULT_LEVEL: MapLevel = 5;

  private currentPosition: Position;
  private map: KakaoMap | null;
  private nearbyCafes: Array<KakaoMapSearchResult>;

  private constructor() {
    this.currentPosition = {
      latitude: 37.571648599,
      longitude: 126.976372775
    };
    this.map = null;
    this.nearbyCafes = [];
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
              this.currentPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              resolve(this.currentPosition);
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

  public getKakaoMap = (mapDivElement: HTMLDivElement): Promise<KakaoMap> => {
    return new Promise((resolve, reject) => {
      try {
        if (this.map !== null) {
          resolve(this.map);
        }

        window.kakao.maps.load(() => {
          const {kakao} = window;

          const mapOption: MapOption = {
            center: new kakao.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude),
            level: MapService.KAKAO_MAP_DEFAULT_LEVEL
          };

          const newMap = new kakao.maps.Map(mapDivElement, mapOption);
          newMap.setMinLevel(MapService.KAKAO_MAP_MIN_LEVEL);

          newMap.setMaxLevel(MapService.KAKAO_MAP_MAX_LEVEL);
          newMap.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.TOPRIGHT);

          this.map = newMap;
          resolve(newMap);
        });
      } catch (error) {
        reject(new Error(mapError.kakaoMap.loading));
      }
    });
  }

  public getNearbyCafesOnKakaoMap = (): Promise<Array<KakaoMapSearchResult>> => {
    return new Promise((resolve, reject) => {
      try {
        window.kakao.maps.load(() => {
          if (this.map !== null) {
            const {kakao} = window;
            const places = new kakao.maps.services.Places(this.map);
            const callback = (result: Array<KakaoMapSearchResult>, status: Status) => {
              if (status === kakao.maps.services.Status.OK) {
                this.nearbyCafes = result;
                resolve(result);
              } else if (status === kakao.maps.services.Status.ERROR) {
                reject(new Error(mapError.kakaoMap.search));
              }
            };
            places.categorySearch("CE7", callback, {
              useMapCenter: true,
              radius: 1000
            });
          }
        });
      } catch (error) {
        reject(new Error(mapError.kakaoMap.cafes));
      }
    });
  }

}

export default MapService;