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

interface ChoiceOption {
  id: number;
  option: string;
}

const createVisitPurposeOptionsWithId = (visitPurposes: Array<string>) => {
  let id = 1;
  return visitPurposes.map(
    (visitPurpose) => ({
      id: id++,
      option: visitPurpose
    })
  );
}

const ReviewCreatModal = () => {

  const [isOpen, setIsOpen] = useState(false);

  const visitPurposeOptions: Array<ChoiceOption> = createVisitPurposeOptionsWithId(reviewConstant.survey.visitPurpose);

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
            뭐하러 갔어요?
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
          >
            {
              visitPurposeOptions.map(visitPurposeOption =>
                <Button
                  key={visitPurposeOption.id}
                  m="1"
                  w="90%"
                  colorScheme="subBrand"
                  color="black"
                >
                  {visitPurposeOption.option}
                </Button>)
            }
            <Input
              placeholder="직접입력"
              _placeholder={{opacity: 1, color: "black", fontWeight: "bold", textAlign: "center"}}
              m="1"
              w="90%"
              bg="subBrand.500"
              variant="filled"
              focusBorderColor="brand.main"
            />
          </ModalBody>
          <ModalFooter>
            <Button>
              이전
            </Button>
            <Button
              variant='ghost'
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