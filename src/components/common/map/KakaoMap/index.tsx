import {useEffect, useRef} from 'react';
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

const KakaoMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  const currentPosition = useRef<Position>({
    latitude: 37.571648599,
    longitude: 126.976372775
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          currentPosition.current = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        },
        () => {
          window.alert("기기 및 브라우저 위치 접근 권한을 켜주세요!");
        }
      );
    }

    window.kakao.maps.load(() => {
      const {kakao} = window;
      const mapOption = {
        center: new kakao.maps.LatLng(currentPosition.current.latitude, currentPosition.current.longitude),
        level: 3
      };
      const map = new kakao.maps.Map(mapRef.current, mapOption);
    });
  }, []);

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