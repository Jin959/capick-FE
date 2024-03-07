import {NextPage} from "next";
import KakaoMap from "@/components/common/map/KakaoMap";
import {Box, Heading} from "@chakra-ui/react";

const Map: NextPage = () => {

  return (
    <>
      <Heading size="md" textAlign="center">
        내 근처 까페
      </Heading>
      <Box p="2"></Box>
      <KakaoMap/>
    </>
  );
};

export default Map;