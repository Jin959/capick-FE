import React, {useCallback, useContext} from 'react';
import {useRouter} from "next/router";
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import {Button, Textarea, Box} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import reviewConstant from "@/constants/reviewConstant";
import {StringMap} from "@/types/common";
import {CafeContext} from "@/contexts/cafe";
import {MemberContext} from "@/contexts/member";
import {ModalDispatchContext} from "@/contexts/modal";
import ReviewImageInput from "@/components/review/ReviewCreateModal/ReviewImageInput";

interface Props {
  reviewService: ReviewService;
}

const ReviewContent = ({reviewService}: Props) => {

  const router = useRouter();

  const member = useContext(MemberContext);
  const cafe = useContext(CafeContext);
  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);
  const dispatchModal = useContext(ModalDispatchContext);

  const handleOnClickBefore = () => {
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getBeforeSurveyType(review.surveyType)
    });
  }

  const handleOnChangeTextarea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatchReview({
      type: "SET_CONTENT",
      content: event.target.value
    });
  }, [dispatchReview]);

  const handleOnClickDone = async () => {
    try {
      const reviewResponse = await reviewService.createReview({
        writerId: member.id,
        cafe: {
          name: cafe.name,
          kakaoPlaceId: cafe.kakaoPlaceId,
          kakaoDetailPageUrl: cafe.kakaoDetailPageUrl,
          // TODO: 일단 하드코딩으로 개발함. 첫 리뷰이면 DTO 의 cafe.location 프로퍼티가 필수이다. [cafeName] 페이지와 카페 조회 API 와 연동하고 첫 리뷰인지 조건 분기 개발하기
          location: {
            latitude: 37.57122962143047,
            longitude: 126.97629649901215,
            address: "서울 종로구 세종로 185-2",
            roadAddress: "서울 종로구 세종대로 167"
          }
        },
        visitPurpose: review.visitPurpose,
        content: review.content,
        menu: review.menu,
        coffeeIndex: (reviewConstant.survey.option["coffeeIndex"] as StringMap<number>)[review.coffeeIndex],
        priceIndex: (reviewConstant.survey.option["priceIndex"] as StringMap<number>)[review.priceIndex],
        spaceIndex: (reviewConstant.survey.option["spaceIndex"] as StringMap<number>)[review.spaceIndex],
        noiseIndex: (reviewConstant.survey.option["noiseIndex"] as StringMap<number>)[review.noiseIndex],
        theme: (reviewConstant.survey.option["theme"] as StringMap<string>)[review.theme]
      }, review.images);

      dispatchModal({
        type: "CLOSE_MODAL",
        modal: "reviewCreateModal"
      });
      dispatchReview({
        type: "INIT_REVIEW"
      });
      dispatchReview({
        type: "SET_SURVEY_TYPE",
        surveyType: reviewService.getFirstSurveyType()
      });

      router.push(`/reviews/${reviewResponse.id}`);
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <>
      <ModalContent>
        <ModalCloseButton/>
        <ModalHeader
          m="0 auto"
        >
          한마디
        </ModalHeader>
        <ModalBody>
          <ReviewImageInput/>
          <Box p="2"/>
          <Textarea
            placeholder="리뷰 내용 입력"
            minH="6rem"
            resize="none"
            maxLength={300}
            value={review.content}
            onChange={handleOnChangeTextarea}
          />
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            onClick={handleOnClickBefore}
          >
            이전
          </Button>
          <Button
            variant='ghost'
            onClick={handleOnClickDone}
          >
            완료
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ReviewContent;