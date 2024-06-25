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
import {Button, Input} from "@chakra-ui/react";
import reviewConstant from "@/constants/reviewConstant";
import {createDataWithId} from "@/utils/func";
import ReviewService from "@/apis/service/ReviewService";

interface Props {
  reviewService: ReviewService;
}

const ReviewCreatModal = ({reviewService}: Props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [surveyType, setSurveyType] = useState(reviewService.getFirstSurvey);

  const surveyOptions = createDataWithId(reviewConstant.survey.option[surveyType]);

  const showContentTextarea: boolean = reviewService.isSurveyEnd(surveyType);
  const showDirectInputPlaceholder: boolean = reviewService.isNeedDirectInput(surveyType);

  const handleOnCloseModal = () => {
    setIsOpen(false);
    setSurveyType(reviewService.getFirstSurvey());
  }

  const handleOnClickBefore = () => {
    setSurveyType(reviewService.getBeforeSurveyType(surveyType));
  };

  const handleOnClickNext = () => {
    if (!reviewService.isSurveyEnd(surveyType)) {
      setSurveyType(reviewService.getNextSurveyType(surveyType));
    } else {
      // setIsOpen(false);
    }
  };

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
        <ModalContent>
          <ModalCloseButton/>
          {showContentTextarea ? (
            <>
              <ModalHeader
                m="0 auto"
              >
                한마디
              </ModalHeader>
              {/*// TODO: 리뷰 내용 작성 기능 개발하기, 이 부분만 다르게 할지 아예 다른 모달로 분리할지 고민하기*/}
              <ModalBody>
              </ModalBody>
            </>
          ) : (
            <>
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
                {
                  surveyOptions.map(option =>
                    <Button
                      key={option.id}
                      m="1"
                      w="90%"
                      colorScheme="subBrand"
                      color="black"
                    >
                      {option.data}
                    </Button>)
                }
                {showDirectInputPlaceholder &&
                  <Input
                    placeholder={reviewConstant.survey.directInputPlaceholder[surveyType]}
                    _placeholder={{opacity: 1, color: "black", fontWeight: "bold", textAlign: "center"}}
                    m="1"
                    w="90%"
                    bg="subBrand.500"
                    variant="filled"
                    focusBorderColor="brand.main"
                  />
                }
              </ModalBody>
            </>
          )}
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
      </Modal>
    </>
  );
};

export default ReviewCreatModal;