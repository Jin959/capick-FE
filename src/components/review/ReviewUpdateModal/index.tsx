import React, {useContext, useEffect} from 'react';
import ReviewService from "@/apis/service/ReviewService";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import {Button} from "@chakra-ui/react";
import {Modal, ModalOverlay} from "@chakra-ui/modal";
import ReviewSurvey from "@/components/review/ReviewSurvey";
import ReviewUpdateContent from "@/components/review/ReviewUpdateModal/ReviewUpdateContent";
import reviewConstant from "@/constants/reviewConstant";
import {getKeyByValue} from "@/utils/func";
import {StringMap} from "@/types/common";

interface Props {
  reviewId: string;
  reviewService: ReviewService;
}

const ReviewUpdateModal = ({reviewId, reviewService}: Props) => {

  const isOpen = useContext(ModalContext);
  const dispatchModal = useContext(ModalDispatchContext);
  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const showReviewContent: boolean = reviewService.isSurveyEnd(review.surveyType);

  const handleOnClick = () => {
    dispatchModal({
      type: "OPEN_MODAL",
      modal: "reviewUpdateModal"
    });
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getFirstSurveyType()
    });
  }

  const handleOnClose = () => {
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "reviewUpdateModal"
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const reviewResponse = await reviewService.getReviewDetail(reviewId);
        dispatchReview({
          type: "SET_REVIEW_WITH_INIT",
          id: Number(reviewId),
          visitPurpose: reviewResponse.visitPurpose,
          menu: reviewResponse.menu,
          content: reviewResponse.content,
          coffeeIndex: getKeyByValue(reviewConstant.survey.option["coffeeIndex"] as StringMap<number>,
            reviewResponse.coffeeIndex),
          priceIndex: getKeyByValue(reviewConstant.survey.option["priceIndex"] as StringMap<number>,
            reviewResponse.priceIndex),
          spaceIndex: getKeyByValue(reviewConstant.survey.option["spaceIndex"] as StringMap<number>,
            reviewResponse.spaceIndex),
          noiseIndex: getKeyByValue(reviewConstant.survey.option["noiseIndex"] as StringMap<number>,
            reviewResponse.noiseIndex),
          theme: getKeyByValue(reviewConstant.survey.option["theme"] as StringMap<string>,
            reviewResponse.theme),
          preservedImageUrls: reviewResponse.imageUrls
        });
      } catch (error) {
        window.alert(error);
      }
    })();
  }, [reviewService, reviewId, dispatchReview]);

  return (
    <>
      <Button
        colorScheme="brand"
        onClick={handleOnClick}
      >
        수정
      </Button>
      <Modal
        isOpen={isOpen.reviewUpdateModal}
        onClose={handleOnClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay/>
        {showReviewContent ?
          <ReviewUpdateContent
            reviewService={reviewService}
          />
          : <ReviewSurvey
            reviewService={reviewService}
          />
        }
      </Modal>
    </>
  );
};

export default ReviewUpdateModal;