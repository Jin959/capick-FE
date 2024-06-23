import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {Button, Card, Heading, ListItem, Stack, UnorderedList} from "@chakra-ui/react";
import BoxContainer from "@/components/common/container/BoxContainer";
import ReviewCreatModal from "@/components/cafes/ReviewCreatModal";

const CafeDetail: NextPage = () => {
  const router = useRouter();
  const [cafeName, kakaoPlaceId] = (router.query.cafeName ?? []) as Array<string>;

  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Heading size="md" textAlign="center">
          {cafeName}
        </Heading>
        <BoxContainer>
          <UnorderedList>
            <ListItem>주소 : {router.query.address ?? "로딩 중"}</ListItem>
            <ListItem>도로명 : {router.query.roadAddress ?? "로딩 중"}</ListItem>
          </UnorderedList>
          <Button
            colorScheme="brand"
            onClick={() => router.push((router.query.detailPageUrl ?? "/") as string)}
          >
            상세 정보 및 길찾기
          </Button>
        </BoxContainer>
        <ReviewCreatModal/>
        <Stack spacing='4'>
          {/* TODO: 리뷰 목록 렌더링 리스트로 개발하기*/}
          <Card
            direction={{base: 'column', sm: 'row'}}
            overflow='hidden'
            variant='outline'
          >
          </Card>
        </Stack>
      </PageFlexContainer>
    </>
  );
};

export default CafeDetail;