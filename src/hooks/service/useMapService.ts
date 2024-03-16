import MapService from "@/apis/service/MapService";
import {useRef} from "react";

type UseMapService = () => MapService;

const useMapService: UseMapService = () => {
  const mapServiceRef = useRef<MapService | null>(null);
  const mapService: MapService = (() => {
    if (mapServiceRef.current === null) {
      mapServiceRef.current = MapService.create();
    }
    return mapServiceRef.current;
  })();

  return mapService;
}

export default useMapService;