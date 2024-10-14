import React, {useContext, useState} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay} from "@chakra-ui/modal";
import {ModalContext, ModalDispatchContext} from "@/contexts/modal";
import Image from "next/image";
import {Flex, Spinner} from "@chakra-ui/react";

interface Props {
  imageUrl: string;
}

const ImageModal = ({imageUrl}: Props) => {

  const [isLoaded, setIsLoaded] = useState(false);

  const isOpen = useContext(ModalContext);
  const dispatchModal = useContext(ModalDispatchContext);

  const handleOnClose = () => {
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "imageModal"
    });
    setIsLoaded(false);
  }

  const handleOnContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  }

  const handleOnLoad = () => {
    setIsLoaded(true);
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
            <Flex
              justifyContent="center"
              alignItems="center"
              pos="relative"
              h="30rem"
              m="32px 0 32px 0"
            >
              {!isLoaded &&
                <Spinner
                  thickness='4px'
                  speed='0.5s'
                  emptyColor='gray.200'
                  color='brand.main'
                  size='xl'
                />
              }
              <Image
                hidden={!isLoaded}
                src={imageUrl}
                alt={"Image"}
                fill
                sizes="75vw"
                priority
                style={{
                  objectFit: "contain"
                }}
                onContextMenu={handleOnContextMenu}
                onLoad={handleOnLoad}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;