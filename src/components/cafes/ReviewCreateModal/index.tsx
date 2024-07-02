import React, {useContext, useState} from 'react';
import {Modal, ModalOverlay} from "@chakra-ui/modal";
import {Button} from "@chakra-ui/react";
import reviewConstant from "@/constants/reviewConstant";
import ReviewService from "@/apis/service/ReviewService";
import {StringMap} from "@/types/common";
import {MemberContext} from "@/contexts/member";
import {useRouter} from "next/router";
import ReviewSurvey from "@/components/cafes/ReviewCreateModal/ReviewSurvey";
import ReviewContent from "@/components/cafes/ReviewCreateModal/ReviewContent";

interface Props {
  reviewService: ReviewService;
  cafe: {
    name: string;
    kakaoPlaceId: string;
    kakaoDetailPageUrl: string;
    location?: {
      latitude: number;
      longitude: number;
      address: string;
      roadAddress: string;
    };
  };
}

const initialReview: StringMap<string> = {
  visitPurpose: "",
  content: "",
  menu: "",
  coffeeIndex: "",
  priceIndex: "",
  spaceIndex: "",
  noiseIndex: "",
  theme: ""
};

const ReviewCreateModal = ({reviewService, cafe}: Props) => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [surveyType, setSurveyType] = useState(reviewService.getFirstSurvey);
  const [review, setReview] = useState(initialReview);

  const showReviewContent: boolean = reviewService.isSurveyEnd(surveyType);

  const member = useContext(MemberContext);

  const handleOnCloseModal = () => {
    setIsOpen(false);
    setSurveyType(reviewService.getFirstSurvey());
    setReview(initialReview);
  }

  const handleOnClickBefore = () => {
    setSurveyType(reviewService.getBeforeSurveyType(surveyType));
  }

  const handleOnClickNext = () => {
    setSurveyType(reviewService.getNextSurveyType(surveyType));
  }

  const handleOnClickSurveyOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setReview(review => (
      {...review, [surveyType]: (event.target as HTMLButtonElement).innerText}
    ));
    setSurveyType(reviewService.getNextSurveyType(surveyType));
  }

  const handleOnChangeSurveyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(review => ({...review, [surveyType]: event.target.value}));
  }

  const handleOnChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(review => ({...review, content: event.target.value}));
  }

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
      });
      router.push(`/cafes/${cafe.name}/${cafe.kakaoPlaceId}/reviews/${reviewResponse.id}`);
    } catch (error) {
      window.alert(error);
    }
    setIsOpen(false);
    setSurveyType(reviewService.getFirstSurvey());
    setReview(initialReview);
  }

  return (
    <>
      <Button
        colorScheme="brand"
        onClick={() => setIsOpen(true)}
      >
        리뷰 작성
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleOnCloseModal}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay/>
        {showReviewContent ?
          <ReviewContent
            reviewService={reviewService}
            review={review}
            onClickBefore={handleOnClickBefore}
            onClickDone={handleOnClickDone}
            onChangeContent={handleOnChangeContent}
          />
          :
          <ReviewSurvey
            reviewService={reviewService}
            surveyType={surveyType}
            review={review}
            onClickBefore={handleOnClickBefore}
            onClickNext={handleOnClickNext}
            onClickSurveyOption={handleOnClickSurveyOption}
            onChangeSurveyInput={handleOnChangeSurveyInput}
          />
        }
      </Modal>
    </>
  );
};

export default ReviewCreateModal;