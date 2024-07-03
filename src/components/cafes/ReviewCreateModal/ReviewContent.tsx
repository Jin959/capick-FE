import React, {useContext} from 'react';
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import {Button, Textarea} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";

interface Props {
  reviewService: ReviewService;
  onClickDone: () => void;
}

const ReviewContent = ({reviewService, onClickDone}: Props) => {

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const handleOnClickBefore = () => {
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getBeforeSurveyType(review.surveyType)
    });
  }

  const handleOnChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatchReview({
      type: "SET_CONTENT",
      content: event.target.value
    });
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
          <Textarea
            placeholder="리뷰 내용 입력"
            minH="250"
            resize="none"
            maxLength={300}
            value={review.content}
            onChange={handleOnChangeContent}
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
            onClick={onClickDone}
          >
            완료
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ReviewContent;