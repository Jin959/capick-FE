import React from 'react';
import {Button} from "@chakra-ui/react";
import mapService from "@/apis/service/MapService";
import {useRouter} from "next/router";

interface Props {
  mapService: mapService;
}

const PositionTrackingButton = ({mapService}: Props) => {

  const router = useRouter();

  const handleOnClick = async () => {
    await mapService.getCurrentPosition()
      .catch(error => window.alert(error));
    try {
      await mapService.panMapToCurrentPosition();
      await mapService.getNearbyCafesWithMarker(router);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOnClick}
      />
    </>
  );
};

export default PositionTrackingButton;