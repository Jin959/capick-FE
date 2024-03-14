import {useEffect, useRef, useState} from 'react';
import {Box} from "@chakra-ui/react";
import {InfoWindow, KakaoMap, MapOption, Marker} from "@/types/kakao/Maps";
import {Status} from "@/types/kakao/Services";
import KakaoMapSearchResult from "@/types/kakao/dto/KakaoMapSearchResult";

interface Position {
  latitude: number;
  longitude: number;
}

const KAKAO_MAP_MIN_LEVEL = 1;
const KAKAO_MAP_MAX_LEVEL = 8;
const KAKAO_MAP_DEFAULT_LEVEL = 5;

const paintCafeMarkers = (map: KakaoMap, nearbyCafes: Array<KakaoMapSearchResult>): {
  markers: Array<Marker>, infoWindows: Array<InfoWindow>
} => {
  const {kakao} = window;
  const markers: Array<Marker> = [];
  const infoWindows: Array<InfoWindow> = [];
  nearbyCafes.map((cafe: KakaoMapSearchResult) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(cafe.y, cafe.x),
      title: cafe.place_name
    });
    markers.push(marker);
    const infoWindow = new kakao.maps.InfoWindow({
      content: `<div style="padding: 3px; width: max-content;">
                        ${cafe.place_name}
                      </div>`
    });
    infoWindow.open(map, marker);
    infoWindows.push(infoWindow);
  });
  return {markers, infoWindows};
};

const eraseCafeMarkers = (markers: Array<Marker>) => {
  markers.map((marker: Marker) => {
    marker.setMap(null);
  });
};

const eraseCafeInfoWindows = (infoWindows: Array<InfoWindow>) => {
  infoWindows.map((infoWindow: InfoWindow) => {
    infoWindow.close();
  });
};

const KakaoMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({
    latitude: 37.571648599,
    longitude: 126.976372775
  });
  const [map, setMap] = useState<KakaoMap | null>(null);
  const [nearbyCafes, setNearbyCafes] = useState<Array<KakaoMapSearchResult>>([]);
  const markersRef = useRef<Array<Marker>>([]);
  const infoWindowsRef = useRef<Array<InfoWindow>>([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          window.alert("기기 및 브라우저 위치 접근 권한을 켜주세요!");
        }
      );
    }
  }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      if (mapRef.current !== null) {
        const {kakao} = window;
        const mapOption: MapOption = {
          center: new kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
          level: KAKAO_MAP_DEFAULT_LEVEL
        };
        const map = new kakao.maps.Map(mapRef.current, mapOption);
        setMap(map);

        map.setMinLevel(KAKAO_MAP_MIN_LEVEL);
        map.setMaxLevel(KAKAO_MAP_MAX_LEVEL);

        map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.TOPRIGHT);

        kakao.maps.event.addListener(map, 'idle', () => {
          const callback = (result: Array<KakaoMapSearchResult>, status: Status) => {
            if (status === kakao.maps.services.Status.OK) {
              setNearbyCafes(result);
            }
          };
          places.categorySearch("CE7", callback, {
            useMapCenter: true,
            radius: 1000
          });
        });

        const places = new kakao.maps.services.Places(map);
        const callback = (result: Array<KakaoMapSearchResult>, status: Status) => {
          if (status === kakao.maps.services.Status.OK) {
            setNearbyCafes(result);
          }
        };
        places.categorySearch("CE7", callback, {
          useMapCenter: true,
          radius: 1000
        });
      }
    });
  }, [currentPosition]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      if (map !== null) {
        eraseCafeMarkers(markersRef.current);
        eraseCafeInfoWindows(infoWindowsRef.current);
        const labels = paintCafeMarkers(map, nearbyCafes);
        markersRef.current = labels.markers;
        infoWindowsRef.current = labels.infoWindows;
      }
    });
  }, [nearbyCafes, map]);

  return (
    <>
      <Box
        w="full"
        h="70vh"
        ref={mapRef}
      />
    </>
  );
};

export default KakaoMap;