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

const ReviewCreatModal = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [surveyType, setSurveyType] = useState("visitPurpose");

  const surveyOptions = createDataWithId(reviewConstant.survey.option[surveyType]);

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
        onClose={() => setIsOpen(false)}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader
            m="0 auto"
          >
            {reviewConstant.survey.question[surveyType]}
          </ModalHeader>
          <ModalCloseButton/>
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
            {reviewConstant.survey.directInputPlaceholder[surveyType] &&
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
          <ModalFooter>
            <Button
              // TODO: 이전 서베이를 가져오는 핸들러 개발 및 비즈니스 로직 연동
              onClick={() => setSurveyType("visitPurpose")}
            >
              이전
            </Button>
            <Button
              variant='ghost'
              // TODO: 다음 서베이를 가져오는 핸들러 개발 및 비즈니스 로직 연동
              onClick={() => setSurveyType("theme")}
            >
              다음
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*// TODO: 리뷰 내용 작성 모달*/}
    </>
  );
};

export default ReviewCreatModal;