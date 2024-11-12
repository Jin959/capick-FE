import React, {ReactNode, useContext} from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay} from "@chakra-ui/modal";
import {Button} from "@chakra-ui/react";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";

interface Props {
  children: ReactNode;
  onConfirm?: () => void;
}

const AlertModal = ({children, onConfirm}: Props) => {

  const isOpen = useContext(ModalContext);
  const dispatchModal = useContext(ModalDispatchContext);

  const handleOnConfirm = () => {
    onConfirm?.();
    handleOnClose();
  }

  const handleOnClose = () => {
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "alertModal"
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen.alertModal}
        onClose={handleOnClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button
              onClick={handleOnClose}
            >
              취소
            </Button>
            <Button
              colorScheme="brand"
              onClick={handleOnConfirm}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlertModal;