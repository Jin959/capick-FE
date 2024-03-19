import {useEffect, useRef, useState} from 'react';
import {NextRouter, useRouter} from "next/router";
import {Box} from "@chakra-ui/react";
import {InfoWindow, KakaoMap, Marker} from "@/types/kakao/Maps";
import {Status} from "@/types/kakao/Services";
import useMapService from "@/hooks/service/useMapService";
import KakaoMapSearchResult from "@/types/kakao/dto/KakaoMapSearchResult";

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
  // TODO: map, nearbyCafes, markersRef, infoWindowsRef 와 같은 것이 굳이 해당 뷰에서 가져야할 책임이 아닐 수 있다. 확인 후 MapService 에 책임을 위임하기
  const [map, setMap] = useState<KakaoMap | null>(null);
  const [nearbyCafes, setNearbyCafes] = useState<Array<KakaoMapSearchResult>>([]);
  const markersRef = useRef<Array<Marker>>([]);
  const infoWindowsRef = useRef<Array<InfoWindow>>([]);
  const router = useRouter();
  const mapService = useMapService();

  useEffect(() => {
    (async () => {
      await mapService.getCurrentPosition()
        .catch(error => window.alert(error));
      try {
        if (mapRef.current !== null) {
          await mapService.getKakaoMap(mapRef.current);
          await mapService.getNearbyCafesOnKakaoMap();
        }
      } catch (error) {
        window.alert(error);
      }
    })();
  }, [mapService]);

  // TODO: 지도 객체에 이벤트 리스너를 다는 행위인 해당 Effect 함수를 서비스 객체로 위임하려면 setNearbyCafes 를 파라미터로 추가 하는 문제가 있음.
  useEffect(() => {
    if (map !== null) {
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