import React, {useContext} from 'react';
import {Modal, ModalOverlay} from "@chakra-ui/modal";
import {Button} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import ReviewSurvey from "@/components/review/ReviewSurvey";
import ReviewCreateContent from "@/components/review/ReviewCreateModal/ReviewCreateContent";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";

interface Props {
  reviewService: ReviewService;
}

const ReviewCreateModal = ({reviewService}: Props) => {

  const isOpen = useContext(ModalContext);
  const dispatchModal = useContext(ModalDispatchContext);
  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const showReviewContent: boolean = reviewService.isSurveyEnd(review.surveyType);

  const handleOnClick = () => {
    dispatchModal({
      type: "OPEN_MODAL",
      modal: "reviewCreateModal"
    });
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getFirstSurveyType()
    });
  }

  const handleOnClose = () => {
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "reviewCreateModal"
    });
  }

  return (
    <>
      <Button
        colorScheme="brand"
        onClick={handleOnClick}
      >
        리뷰 작성
      </Button>
      <Modal
        isOpen={isOpen.reviewCreateModal}
        onClose={handleOnClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay/>
        {showReviewContent ?
          <ReviewCreateContent
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

export default ReviewCreateModal;