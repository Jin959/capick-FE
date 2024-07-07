import React, {useContext, useEffect} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {Button, Card, Heading, ListItem, Stack, UnorderedList} from "@chakra-ui/react";
import BoxContainer from "@/components/common/container/BoxContainer";
import ReviewCreateModal from "@/components/cafes/ReviewCreateModal";
import useReviewService from "@/hooks/service/useReivewService";
import ReviewProvider from "@/contexts/review";
import {CafeContext, CafeDispatchContext} from "@/contexts/cafe";

type NextPageWithCafeContext = NextPage & {
  requireCafeContext: boolean;
}

const CafePage: NextPageWithCafeContext = () => {

  const router = useRouter();

  const cafe = useContext(CafeContext);
  const dispatchCafe = useContext(CafeDispatchContext);

  const [cafeName, kakaoPlaceId] = (router.query.cafe ?? []) as Array<string>;
  const reviewService = useReviewService();

  useEffect(() => {
    dispatchCafe({
      type: "SET_CAFE",
      name: cafeName,
      kakaoPlaceId: kakaoPlaceId,
      // TODO: kakaoDetailPageUrl 도 리뷰 생성 API 스펙 상 URL 형식 유효성 검증에서 걸린다. 첫 리뷰가 아닌 2, 3 번쨰 리뷰를 작성하는 경우도 카페 조회 API 와는 연동해야한다.
      kakaoDetailPageUrl: (router.query.detailPageUrl ?? "https://map.kakao.com/") as string,
    });
    // TODO: 첫리뷰 작성 시 DTO 의 cafe.location 프로퍼티가 필수이다. 리뷰가 하나도 없고 인코그니토 로 접속해서 카페정보가 없을때 첫 리뷰를 작성하는 시나리오를 위해 지도에서 마커를 클릭하도록 지도 페이지로 강제이동 시킬지 생각해보기
    // TODO: 그리고 첫 리뷰가 아니더라도 kakaoDetailPageUrl 와 address, roadAddress 등이 카페 상세 정보 기능 때문에 필요하다. 그냥 fetching 해야한다.
    // TODO: 첫 리뷰이면 API 스펙 상 cafe.location 프로퍼티가 필수이다. 일단 위치를 리뷰 컨텐트 컴포넌트에서 하드코딩했다. 첫 리뷰인지 조건 분기하여 location 프로퍼티를 지정하도록 개발하기
    dispatchCafe({
      type: "SET_LOCATION",
      latitude: (router.query.latitude ?? 0) as number,
      longitude: (router.query.longitude ?? 0) as number,
      address: (router.query.address ?? "Not Available") as string,
      roadAddress: (router.query.roadAddress ?? "Not Available") as string
    });
  }, [cafeName, kakaoPlaceId, router.query, dispatchCafe]);

  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Heading size="md" textAlign="center">
          {cafeName}
        </Heading>
        <BoxContainer>
          <UnorderedList>
            <ListItem>주소 : {cafe.location?.address}</ListItem>
            <ListItem>도로명 : {cafe.location?.roadAddress}</ListItem>
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

CafePage.requireCafeContext = true;

export default CafePage;