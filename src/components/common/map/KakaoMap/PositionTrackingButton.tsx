import React from 'react';
import {Button} from "@chakra-ui/react";
import mapService from "@/apis/service/MapService";
import {useRouter} from "next/router";
import Image from "next/image";
import PositionTrackingIcon from "@/../public/icons/google-material-my_location_FILL0_wght400_GRAD0_opsz24.svg"

interface Props {
  zIndex: string;
  mapService: mapService;
}

const PositionTrackingButton = ({mapService, zIndex}: Props) => {

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
        pos="absolute"
        right="1.5"
        bottom="1.5"
        padding="0"
        bg="white"
        shadow="dark-lg"
        zIndex={zIndex}
        onClick={handleOnClick}
      >
        <Image src={PositionTrackingIcon} alt="TrackPosition"/>
      </Button>
    </>
  );
};

export default PositionTrackingButton;