import {useEffect, useRef, useState} from 'react';
import {NextRouter, useRouter} from "next/router";
import {Box} from "@chakra-ui/react";
import {InfoWindow, KakaoMap, Marker} from "@/types/kakao/Maps";
import {Status} from "@/types/kakao/Services";
import useMapService from "@/hooks/service/useMapService";
import KakaoMapSearchResult from "@/types/kakao/dto/KakaoMapSearchResult";
import Position from "@/apis/dto/response/Position";

const paintCafeMarkers = (map: KakaoMap, nearbyCafes: Array<KakaoMapSearchResult>, router: NextRouter): {
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
    kakao.maps.event.addListener(marker, 'click', () => router.push(
      {
        pathname: `/cafes/${cafe.place_name}/${cafe.id}`,
        query: {
          kakaoPlaceId: cafe.id,
          name: cafe.place_name,
          phone: cafe.phone,
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
  const router = useRouter();
  const mapService = useMapService();

  useEffect(() => {
    mapService.getCurrentPosition()
      .then((position) => {
        setCurrentPosition({
          latitude: position.latitude,
          longitude: position.longitude
        });
      })
      .catch(error => window.alert(error));
  }, [mapService]);

  useEffect(() => {
    if (mapRef.current !== null) {
      mapService.getKakaoMap(mapRef.current, currentPosition)
        .then((map) => {
          setMap(map);
        })
        .catch(error => window.alert(error));
    }
  }, [currentPosition]);

  useEffect(() => {
    if (map !== null) {
      mapService.getNearbyCafesOnKakaoMap(map)
        .then((cafes) => {
          setNearbyCafes(cafes);
        })
        .catch(error => window.alert(error));
      window.kakao.maps.load(() => {
        const {kakao} = window;
        const places = new kakao.maps.services.Places(map);

        kakao.maps.event.addListener(map, 'dragend', () => {
          const callback = (result: Array<KakaoMapSearchResult>, status: Status) => {
            if (status === kakao.maps.services.Status.OK) {
              setNearbyCafes(result);
            }
          };
          places.categorySearch("CE7", callback, {
            useMapBounds: true
          });
        });
      });
    }
  }, [map]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      if (map !== null) {
        eraseCafeMarkers(markersRef.current);
        eraseCafeInfoWindows(infoWindowsRef.current);
        const labels = paintCafeMarkers(map, nearbyCafes, router);
        markersRef.current = labels.markers;
        infoWindowsRef.current = labels.infoWindows;
      }
    });
  }, [nearbyCafes, map, router]);

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