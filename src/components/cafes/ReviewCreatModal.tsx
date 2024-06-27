import React, {useState} from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/modal";
import {Button, Input, Text, Textarea} from "@chakra-ui/react";
import reviewConstant from "@/constants/reviewConstant";
import {createDataWithId} from "@/utils/func";
import ReviewService from "@/apis/service/ReviewService";
import {StringMap} from "@/types/common";

interface Props {
  reviewService: ReviewService;
}

const initialReview = {
  visitPurpose: "",
  content: "",
  menu: "",
  coffeeIndex: "",
  priceIndex: "",
  spaceIndex: "",
  noiseIndex: "",
  theme: ""
};

const ReviewCreatModal = ({reviewService}: Props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [surveyType, setSurveyType] = useState(reviewService.getFirstSurvey);
  const [review, setReview] = useState<StringMap<string>>(initialReview);

  const surveyOptions = createDataWithId(reviewConstant.survey.option[surveyType]);

  const showContentTextarea: boolean = reviewService.isSurveyEnd(surveyType);
  const showDirectInputPlaceholder: boolean = reviewService.isNeedDirectInput(surveyType);

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

  const handleOnClickDone = () => {
    setIsOpen(false);
    setSurveyType(reviewService.getFirstSurvey());
    setReview(initialReview);
  }

  const handleOnClickSurveyOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setReview(review => (
      {...review, [surveyType]: (event.target as HTMLButtonElement).innerText}
    ));
  }

  const handleOnChangeSurveyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(review => ({...review, [surveyType]: event.target.value}));
  }

  const handleOnChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(review => ({...review, ["content"]: event.target.value}));
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
        {showContentTextarea ? (
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
                onClick={handleOnClickDone}
              >
                완료
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalCloseButton/>
            <ModalHeader
              m="0 auto"
            >
              {reviewConstant.survey.question[surveyType]}
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
                {review[surveyType]}
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
                  name={reviewConstant.survey.directInputPlaceholder[surveyType]}
                  placeholder={reviewConstant.survey.directInputPlaceholder[surveyType]}
                  _placeholder={{opacity: 1, color: "black", fontWeight: "bold", textAlign: "center"}}
                  m="1"
                  w="90%"
                  bg="subBrand.500"
                  variant="filled"
                  focusBorderColor="brand.main"
                  maxLength={20}
                  onChange={handleOnChangeSurveyInput}
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
        )}
      </Modal>
    </>
  );
};

export default ReviewCreatModal;