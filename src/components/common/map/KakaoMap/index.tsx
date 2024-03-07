import {useEffect, useRef} from 'react';
import {Box} from "@chakra-ui/react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);

  const lat = 37.5642135;
  const lon = 127.0016985;

  useEffect(() => {
    window.kakao.maps.load(() => {
      const {kakao} = window;
      const mapOption = {
        center: new kakao.maps.LatLng(lat, lon),
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