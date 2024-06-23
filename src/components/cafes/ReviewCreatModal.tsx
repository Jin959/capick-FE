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

const visitPurposes = [
  "가성비 때문에 갔어요",
  "커피가 맛있어요",
  "넓어서 갔어요",
  "수다 떨기 좋아서요",
  "애완동물을 데려 갈 수 있어서 갔어요",
  "일하거나 책읽고 공부하려고요",
  "모니터가 있어요",
  "회의실이 있어요"
];

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

  const visitPurposeOptions: Array<ChoiceOption> = createVisitPurposeOptionsWithId(visitPurposes);

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