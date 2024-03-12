import {useEffect, useRef, useState} from 'react';
import {Box} from "@chakra-ui/react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Position {
  latitude: number;
  longitude: number;
}

const KAKAO_MAP_MIN_LEVEL = 1;
const KAKAO_MAP_MAX_LEVEL = 8;
const KAKAO_MAP_DEFAULT_LEVEL = 4;

const KakaoMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>({
    latitude: 37.571648599,
    longitude: 126.976372775
  })
  const [map, setMap] = useState<any>({})
  const [nearbyCafes, setNearbyCafes] = useState<Array<object>>([]);

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
      const {kakao} = window;
      const mapOption = {
        center: new kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
        level: KAKAO_MAP_DEFAULT_LEVEL
      };
      const map = new kakao.maps.Map(mapRef.current, mapOption);
      setMap(map);

      map.setMinLevel(KAKAO_MAP_MIN_LEVEL);
      map.setMaxLevel(KAKAO_MAP_MAX_LEVEL);

      map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.TOPRIGHT);

      const places = new kakao.maps.services.Places(map);
      const callback = (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setNearbyCafes(result);
        }
      };
      places.categorySearch("CE7", callback, {
        useMapCenter: true,
        radius: 1000
      });
    });
  }, [currentPosition]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const {kakao} = window;
      nearbyCafes.map((cafe: any) => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(cafe.y, cafe.x),
          title: cafe.place_name
        });
        const infoWindow = new kakao.maps.InfoWindow({
          content: `<div style="padding: 3px; width: max-content;">
                      ${cafe.place_name}
                    </div>`
        });
        infoWindow.open(map, marker);
      });
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