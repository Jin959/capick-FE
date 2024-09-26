import React, {useContext, useEffect} from 'react';
import ReviewService from "@/apis/service/ReviewService";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import {Button} from "@chakra-ui/react";
import {Modal, ModalOverlay} from "@chakra-ui/modal";
import ReviewSurvey from "@/components/review/ReviewSurvey";
import ReviewUpdateContent from "@/components/review/ReviewUpdateModal/ReviewUpdateContent";

interface Props {
  reviewService: ReviewService;
  reviewInfo: {
    reviewId: string;
    visitPurpose: string;
    content: string;
    menu: string;
    imageUrls: Array<string>;
  };
}

const ReviewUpdateModal = ({reviewService, reviewInfo}: Props) => {

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
      type: "SET_REVIEW_WITH_INIT",
      id: Number(reviewInfo.reviewId),
      visitPurpose: reviewInfo.visitPurpose,
      menu: reviewInfo.menu,
      content: reviewInfo.content,
      preservedImageUrls: reviewInfo.imageUrls
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
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getFirstSurveyType()
    });
  }

  useEffect(() => {
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getFirstSurveyType()
    });
  }, [reviewService, dispatchReview]);

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