import React, {useContext} from 'react';
import {ModalContext} from "@/contexts/modal";
import {Modal, ModalBody, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {Spinner} from "@chakra-ui/react";

const LoadingSpinnerModal = () => {

  const isOpen = useContext(ModalContext);

  return (
    <>
      <Modal
        isOpen={isOpen.loadingSpinnerModal}
        onClose={() => {}}
        isCentered
        closeOnEsc={false}
        closeOnOverlayClick={false}
        size="xs"
      >
        <ModalOverlay/>
        <ModalContent
          w="min"
        >
          <ModalBody
            m="0 auto"
          >
            <Spinner
              thickness='4px'
              speed='0.5s'
              emptyColor='gray.200'
              color='brand.main'
              size='xl'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoadingSpinnerModal;