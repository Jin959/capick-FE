import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {Button, Card, Heading, ListItem, Stack, UnorderedList} from "@chakra-ui/react";
import BoxContainer from "@/components/common/container/BoxContainer";
import ReviewCreateModal from "@/components/cafes/ReviewCreateModal";
import useReviewService from "@/hooks/service/useReivewService";
import ReviewProvider from "@/contexts/review";

const CafeDetail: NextPage = () => {
  const router = useRouter();
  const [cafeName, kakaoPlaceId] = (router.query.cafeName ?? []) as Array<string>;
  // TODO: 첫리뷰 작성 시 DTO 의 cafe.location 프로퍼티가 필수이다. 리뷰가 하나도 없고 인코그니토 로 접속해서 카페정보가 없을때 첫 리뷰를 작성하는 시나리오를 위해 지도에서 마커를 클릭하도록 지도 페이지로 강제이동 시킬지 생각해보기
  // TODO: 그리고 첫 리뷰가 아니더라도 kakaoDetailPageUrl 와 address, roadAddress 등이 카페 상세 정보 기능 때문에 필요하다. 그냥 fetching 해야한다.
  const cafeLocation = {
    latitude: router.query.latitude,
    longitude: router.query.longitude,
    address: router.query.address,
    roadAddress: router.query.roadAddress
  }
  const cafe = {
    name: cafeName,
    kakaoPlaceId: kakaoPlaceId,
    // TODO: kakaoDetailPageUrl 도 리뷰 생성 API 스펙 상 URL 형식 유효성 검증에서 걸린다. 첫 리뷰가 아닌 2, 3 번쨰 리뷰를 작성하는 경우도 카페 조회 API 와는 연동해야한다.
    kakaoDetailPageUrl: (router.query.detailPageUrl ?? "https://map.kakao.com/") as string,
    // TODO: 첫 리뷰이면 API 스펙 상 cafe.location 프로퍼티가 필수이다. 일단 위치를 리뷰 작성 모달에 Props 로 넘기지 않고 모달 컴포넌트에서 하드코딩으로 넘겼다. 첫 리뷰인지 조건 분기하여 location 프로퍼티를 지정하도록 개발하기
    // location: cafeLocation
  };
  const reviewService = useReviewService();

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
            onClick={() => router.push(cafe.kakaoDetailPageUrl)}
          >
            상세 정보 및 길찾기
          </Button>
        </BoxContainer>
        <ReviewProvider>
          <ReviewCreateModal
            reviewService={reviewService}
            cafe={cafe}
          />
        </ReviewProvider>
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