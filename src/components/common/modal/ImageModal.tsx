import React, {useContext} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";
import Image from "next/image";
import {Box} from "@chakra-ui/react";

interface Props {
  imageUrl: string;
}

const ImageModal = ({imageUrl}: Props) => {

  const isOpen = useContext(ModalContext);
  const dispatchModal = useContext(ModalDispatchContext);

  const handleOnClose = () => {
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "imageModal"
    });
  }

  const handleOnContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  }

  return (
    <>
      <Modal
        isOpen={isOpen.imageModal}
        onClose={handleOnClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalCloseButton/>
          <ModalBody>
            <Box
              pos="relative"
              h="30rem"
              m="32px 0 32px 0"
            >
              <Image
                src={imageUrl}
                alt={"ReviewImage"}
                fill
                style={{
                  objectFit: "contain"
                }}
                onContextMenu={handleOnContextMenu}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;