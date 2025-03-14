import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import Image from "next/image";
import {createDataWithId} from "@/utils/func";

interface Props {
  imageSrcUrls: Array<string>;
  imageMinWidth: string;
  imageHeight: string;
  imageQuality?: number;
  containerWidth?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onClickWithImageUrl?: (imageUrl: string) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const ImageListDisplay = (props: Props) => {

  const imageUrls = createDataWithId(props.imageSrcUrls);

  const imageBlurData = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMM3woAAWkBDq+z4RwAAAAASUVORK5CYII=";

  const handleOnClick = (event: React.MouseEvent<HTMLImageElement>, imageUrl: string) => {
    props.onClick?.(event);
    props.onClickWithImageUrl?.(imageUrl);
  }

  return (
    <>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        overflow="auto"
        w={props.containerWidth}
      >
        {imageUrls.map(
          imageUrl => <Box
            key={imageUrl.id}
            pos="relative"
            minW={props.imageMinWidth}
            h={props.imageHeight}
            m="0 0.2rem 0 0.2rem"
          >
            <Image
              src={imageUrl.data}
              alt={`ReviewImage${imageUrl.id}`}
              fill
              sizes="50vw"
              priority
              style={{
                objectFit: "contain"
              }}
              quality={props.imageQuality}
              placeholder="blur"
              blurDataURL={`data:image/png;base64,${imageBlurData}`}
              onClick={(event) => handleOnClick(event, imageUrl.data)}
              onContextMenu={props.onContextMenu}
            />
          </Box>
        )}
      </Flex>
    </>
  );
};

export default ImageListDisplay;