import {useEffect, useRef} from 'react';
import {useRouter} from "next/router";
import {Box} from "@chakra-ui/react";
import useMapService from "@/hooks/service/useMapService";

const KakaoMap = () => {

  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const mapService = useMapService();

  useEffect(() => {
    (async () => {
      await mapService.getCurrentPosition()
        .catch(error => window.alert(error));
      try {
        if (mapRef.current !== null) {
          await mapService.getMap(mapRef.current);
          await mapService.getNearbyCafes();
          await mapService.addMapListenerToGetCafesOn("dragend", router);
          await mapService.createCafeMarkers(router);
        }
      } catch (error) {
        window.alert(error);
      }
    })();
  }, [mapService, router]);

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