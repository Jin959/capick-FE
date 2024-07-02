import React from 'react';
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import reviewConstant from "@/constants/reviewConstant";
import {Button, Input, Text} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import {StringMap} from "@/types/common";

interface Props {
  reviewService: ReviewService;
  surveyType: string;
  review: StringMap<string>;
  onClickBefore: () => void;
  onClickNext: () => void;
  onClickSurveyOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeSurveyInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReviewSurvey = (props: Props) => {

  const surveyOptions = props.reviewService.createSurveyOptionsWithIdFrom(
    reviewConstant.survey.option[props.surveyType]
  );
  const showDirectInputPlaceholder: boolean = props.reviewService.isNeedDirectInput(props.surveyType);

  return (
    <>
      <ModalContent>
        <ModalCloseButton/>
        <ModalHeader
          m="0 auto"
        >
          {reviewConstant.survey.question[props.surveyType]}
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
            {props.review[props.surveyType]}
          </Text>
          {
            surveyOptions.map(option =>
              <Button
                key={option.id}
                m="1"
                w="90%"
                colorScheme="subBrand"
                color="black"
                onClick={props.onClickSurveyOption}
              >
                {option.data}
              </Button>)
          }
          {showDirectInputPlaceholder &&
            <Input
              name={reviewConstant.survey.directInputPlaceholder[props.surveyType]}
              placeholder={reviewConstant.survey.directInputPlaceholder[props.surveyType]}
              _placeholder={{opacity: 1, color: "black", fontWeight: "bold", textAlign: "center"}}
              m="1"
              w="90%"
              bg="subBrand.500"
              variant="filled"
              focusBorderColor="brand.main"
              maxLength={20}
              onChange={props.onChangeSurveyInput}
            />
          }
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            onClick={props.onClickBefore}
          >
            이전
          </Button>
          <Button
            variant='ghost'
            onClick={props.onClickNext}
          >
            다음
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ReviewSurvey;