import React, {useCallback, useContext} from 'react';
import ReviewService from "@/apis/service/ReviewService";
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import ReviewImageInput from "@/components/review/ReviewImageInput";
import {Box, Button, Textarea, Text} from "@chakra-ui/react";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import {ModalDispatchContext} from "@/contexts/modal";

interface Props {
  reviewService: ReviewService;
}

const ReviewUpdateContent = ({reviewService}: Props) => {

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
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "reviewUpdateModal"
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
          <Text
            fontWeight="bold"
            textAlign="center"
          >
            추가할 새 이미지
          </Text>
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

export default ReviewUpdateContent;