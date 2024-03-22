import Position from "@/apis/dto/response/Position";
import mapError from "@/apis/error/mapError";
import {KakaoMap, MapEvent, MapLevel, MapOption} from "@/types/kakao/Maps";
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

  public getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
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
              reject(mapError.geolocation.permission);
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              reject(mapError.geolocation.positionUnavailable);
            } else if (error.code === error.TIMEOUT) {
              reject(mapError.geolocation.timeout);
            }
          }
        );
      } else {
        reject(mapError.geolocation.compatibility);
      }
    });
  }

  public getMap = async (mapDivElement: HTMLDivElement) => {
    try {
      if (this.map === null) {
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
        });
      }
      return this.map;
    } catch (error) {
      throw new Error(mapError.kakaoMap.loadingMap);
    }
  }

  public getNearbyCafes = () => {
    return new Promise((resolve, reject) => {
      window.kakao.maps.load(() => {
        if (this.map !== null) {
          const {kakao} = window;
          const places = new kakao.maps.services.Places(this.map);
          places.categorySearch("CE7", this.fetchNearbyCafes, {
            useMapCenter: true,
            radius: 1000
          });
          resolve(this.nearbyCafes);
        } else {
          reject(mapError.kakaoMap.noMap);
        }
      });
    });
  }

  public addMapListenerToGetCafesOn = (eventType: MapEvent) => {
    return new Promise((resolve, reject) => {
      window.kakao.maps.load(() => {
        if (this.map !== null) {
          const {kakao} = window;
          const places = new kakao.maps.services.Places(this.map);

          kakao.maps.event.addListener(this.map, eventType, () => {
            places.categorySearch("CE7", this.fetchNearbyCafes, {
              useMapBounds: true
            });
          });
          resolve("SUCCESS");
        } else {
          reject(mapError.kakaoMap.noMap);
        }
      });
    });
  }

  private fetchNearbyCafes = (result: Array<KakaoMapSearchResult>, status: Status) => {
    const {kakao} = window;
    if (status === kakao.maps.services.Status.OK) {
      this.nearbyCafes = result;
    } else if (status === kakao.maps.services.Status.ERROR) {
      window.alert(mapError.kakaoMap.searchPlace);
    }
  }

}

export default MapService;