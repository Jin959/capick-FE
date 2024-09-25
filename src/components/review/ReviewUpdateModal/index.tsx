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
      type: "INIT_REVIEW"
    });
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getFirstSurveyType()
    });

    dispatchReview({
      type: "SET_SURVEY_OPTION",
      surveyType: "visitPurpose",
      option: reviewInfo.visitPurpose
    });
    dispatchReview({
      type: "SET_SURVEY_OPTION",
      surveyType: "menu",
      option: reviewInfo.menu
    });
    dispatchReview({
      type: "SET_CONTENT",
      content: reviewInfo.content
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
            reviewId={reviewInfo.reviewId}
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