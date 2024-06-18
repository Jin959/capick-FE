import Position from "@/apis/dto/response/Position";
import mapError from "@/apis/error/mapError";
import {InfoWindow, KakaoMap, MapEvent, MapLevel, MapOption, Marker} from "@/types/kakao/Maps";
import MapKakaoSearchResponse from "@/apis/dto/response/MapKakaoSearchResponse";
import {Status} from "@/types/kakao/Services";
import {NextRouter} from "next/router";

class MapService {

  private static readonly KAKAO_MAP_MIN_LEVEL: MapLevel = 1;
  private static readonly KAKAO_MAP_MAX_LEVEL: MapLevel = 8;
  private static readonly KAKAO_MAP_DEFAULT_LEVEL: MapLevel = 5;

  private currentPosition: Position;
  private map: KakaoMap | null;
  private nearbyCafes: Array<MapKakaoSearchResponse>;
  private markers: Array<Marker>;
  private infoWindows: Array<InfoWindow>;

  private constructor() {
    this.currentPosition = {
      latitude: 37.571648599,
      longitude: 126.976372775
    };
    this.map = null;
    this.nearbyCafes = [];
    this.markers = [];
    this.infoWindows = [];
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

  public panMapToCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      window.kakao.maps.load(() => {
        if (this.map !== null) {
          const {kakao} = window;
          this.map.setCenter(new kakao.maps.LatLng(this.currentPosition.latitude, this.currentPosition.longitude));
          resolve("SUCCESS");
        } else {
          reject(mapError.kakaoMap.noMap);
        }
      });
    })
  }

  public getNearbyCafesWithMarker = (router: NextRouter) => {
    return new Promise((resolve, reject) => {
      window.kakao.maps.load(() => {
        if (this.map !== null) {
          const {kakao} = window;
          const places = new kakao.maps.services.Places(this.map);

          const callback = (result: Array<MapKakaoSearchResponse>, status: Status) => {
            if (status === kakao.maps.services.Status.OK) {
              this.nearbyCafes = result;
              this.createCafeMarkersAndInfoWindows(router)
                .catch(error => window.alert(error));
              resolve(result);
            } else if (status === kakao.maps.services.Status.ERROR) {
              reject(new Error(mapError.kakaoMap.searchPlace));
            }
          }

          places.categorySearch("CE7", callback, {
            useMapCenter: true,
            radius: 1000
          });
        } else {
          reject(mapError.kakaoMap.noMap);
        }
      });
    });
  }

  public addMapListenerToGetCafesOn = (eventType: MapEvent, router: NextRouter) => {
    return new Promise((resolve, reject) => {
      window.kakao.maps.load(() => {
        if (this.map !== null) {
          const {kakao} = window;
          const places = new kakao.maps.services.Places(this.map);

          kakao.maps.event.addListener(this.map, eventType, () => {
            this.deleteCafeMarkers();
            this.deleteCafeInfoWindows();

            const callback = (result: Array<MapKakaoSearchResponse>, status: Status) => {
              const {kakao} = window;
              if (status === kakao.maps.services.Status.OK) {
                this.nearbyCafes = result;
                this.createCafeMarkersAndInfoWindows(router)
                  .catch(error => window.alert(error));
              } else if (status === kakao.maps.services.Status.ERROR) {
                window.alert(mapError.kakaoMap.searchPlace);
              }
            }

            places.categorySearch("CE7", callback, {
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

  private createCafeMarkersAndInfoWindows = (router: NextRouter) => {
    return new Promise((resolve, reject) => {
      const {kakao} = window;
      this.nearbyCafes.map((cafe: MapKakaoSearchResponse) => {
        if (this.map !== null) {
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(cafe.y, cafe.x),
            title: cafe.place_name
          });
          this.markers.push(marker);

          kakao.maps.event.addListener(marker, 'click', () => router.push(
            {
              pathname: `/cafes/${cafe.place_name}/${cafe.id}`,
              query: {
                kakaoPlaceId: cafe.id,
                name: cafe.place_name,
                address: cafe.address_name,
                roadAddress: cafe.road_address_name,
                longitude: cafe.x,
                latitude: cafe.y,
                detailPageUrl: cafe.place_url,
                distance: cafe.distance
              },
            },
            `/cafes/${cafe.place_name}/${cafe.id}`
          ));

          const infoWindow = new kakao.maps.InfoWindow({
            content: `<div style="padding: 3px; width: max-content;">
                        ${cafe.place_name}
                      </div>`
          });
          infoWindow.open(this.map, marker);
          this.infoWindows.push(infoWindow);
        } else {
          reject(mapError.kakaoMap.noMap);
        }
      });
      resolve("SUCCESS");
    });
  }

  private deleteCafeMarkers = () => {
    this.markers.map((marker: Marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  private deleteCafeInfoWindows = () => {
    this.infoWindows.map((infoWindow: InfoWindow) => {
      infoWindow.close();
    });
    this.infoWindows = [];
  }

}

export default MapService;