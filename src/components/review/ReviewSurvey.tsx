import React, {useCallback, useContext} from 'react';
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import reviewConstant from "@/constants/reviewConstant";
import {Button, Input, Text} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";

interface Props {
  reviewService: ReviewService;
}

const ReviewSurvey = ({reviewService}: Props) => {

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const surveyOptions = reviewService.createSurveyOptionsWithIdFrom(
    reviewConstant.survey.option[review.surveyType]
  );
  const showDirectInputPlaceholder: boolean = reviewService.isSurveyNeedDirectInput(review.surveyType);

  const handleOnClickBefore = () => {
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getBeforeSurveyType(review.surveyType)
    });
  }

  const handleOnClickNext = () => {
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getNextSurveyType(review.surveyType)
    });
  }

  const handleOnClickSurveyOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatchReview({
      type: "SET_SURVEY_OPTION",
      surveyType: review.surveyType,
      option: (event.target as HTMLButtonElement).innerText
    });
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getNextSurveyType(review.surveyType)
    });
  }

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchReview({
      type: "SET_SURVEY_OPTION",
      surveyType: event.target.name,
      option: event.target.value
    });
  }, [dispatchReview]);

  return (
    <>
      <ModalContent>
        <ModalCloseButton/>
        <ModalHeader
          m="0 auto"
        >
          {reviewConstant.survey.question[review.surveyType]}
        </ModalHeader>
        <ModalBody
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
        >
          <Text
            fontWeight="bold"
          >
            {review[review.surveyType] as string}
          </Text>
          {
            surveyOptions.map(option =>
              <Button
                key={option.id}
                m="1"
                w="90%"
                colorScheme="subBrand"
                color="black"
                onClick={handleOnClickSurveyOption}
              >
                {option.data}
              </Button>)
          }
          {showDirectInputPlaceholder &&
            <Input
              name={review.surveyType}
              placeholder={reviewConstant.survey.directInputPlaceholder[review.surveyType]}
              _placeholder={{opacity: 1, color: "black", fontWeight: "bold", textAlign: "center"}}
              m="1"
              w="90%"
              bg="subBrand.500"
              variant="filled"
              focusBorderColor="brand.main"
              maxLength={20}
              onChange={handleOnChange}
            />
          }
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
            onClick={handleOnClickNext}
          >
            다음
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ReviewSurvey;