import React, {useContext} from 'react';
import {Button, ListItem, UnorderedList} from "@chakra-ui/react";
import BoxContainer from "@/components/common/container/BoxContainer";
import {CafeContext} from "@/contexts/cafe";

const CafeDetail = () => {

  const cafe = useContext(CafeContext);

  return (
    <>
      <BoxContainer>
        <UnorderedList>
          <ListItem>주소 : {cafe.location?.address}</ListItem>
          <ListItem>도로명 : {cafe.location?.roadAddress}</ListItem>
        </UnorderedList>
        <Button
          colorScheme="brand"
          onClick={() => window.open(cafe.kakaoDetailPageUrl)}
        >
          상세 정보 및 길찾기
        </Button>
      </BoxContainer>
    </>
  );
};

export default CafeDetail;