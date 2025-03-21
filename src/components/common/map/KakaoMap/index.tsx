import {useEffect, useRef} from 'react';
import {useRouter} from "next/router";
import {Box} from "@chakra-ui/react";
import useMapService from "@/hooks/service/useMapService";
import PositionTrackingButton from "@/components/common/map/KakaoMap/PositionTrackingButton";

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
          await mapService.getNearbyCafesWithMarker(router);
          await mapService.addMapListenerToGetCafesOn("dragend", router);
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
        zIndex="base"
        ref={mapRef}
      >
        <PositionTrackingButton
          zIndex="docked"
          mapService={mapService}
        />
      </Box>
    </>
  );
};

export default KakaoMap;