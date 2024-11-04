import React, {useContext, useEffect} from 'react';
import ReviewService from "@/apis/service/ReviewService";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import {Button} from "@chakra-ui/react";
import {Modal, ModalOverlay} from "@chakra-ui/modal";
import ReviewSurvey from "@/components/review/ReviewSurvey";
import ReviewUpdateContent from "@/components/review/ReviewUpdateModal/ReviewUpdateContent";

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
          coffeeIndex: String(reviewResponse.coffeeIndex),
          priceIndex: String(reviewResponse.priceIndex),
          spaceIndex: String(reviewResponse.spaceIndex),
          noiseIndex: String(reviewResponse.noiseIndex),
          theme: reviewResponse.theme ?? "etc",
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