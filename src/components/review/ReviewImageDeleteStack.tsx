import React, {useContext, useState} from 'react';
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import ImageListDisplay from "@/components/common/data-display/ImageListDisplay";
import {Button, Flex} from "@chakra-ui/react";

const ReviewImageDeleteStack = () => {

  const [deprecatedImageUrls, setDeprecatedImageUrls] = useState<Array<string>>([]);

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const handleOnClick = () => {
    dispatchReview({
      type: "SET_PRESERVED_IMAGE_URLS",
      preservedImageUrls: [...deprecatedImageUrls, ...review.preservedImageUrls]
    });
    setDeprecatedImageUrls([]);
  }

  const handleOnClickWithImageUrl = (targetImageUrl: string) => {
    const restPreservedImageUrls = review.preservedImageUrls.filter(imageUrl => imageUrl !== targetImageUrl);
    dispatchReview({
      type: "SET_PRESERVED_IMAGE_URLS",
      preservedImageUrls: restPreservedImageUrls
    });
    setDeprecatedImageUrls([...deprecatedImageUrls, targetImageUrl]);
  }

  return (
    <>
      <Flex
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <ImageListDisplay
          imageSrcUrls={review.preservedImageUrls}
          imageMinWidth="13rem"
          imageHeight="13rem"
          containerWidth="100%"
          onClickWithImageUrl={handleOnClickWithImageUrl}
        />
        <Button
          size="sm"
          m="0.3rem"
          onClick={handleOnClick}
        >
          삭제 선택 초기화
        </Button>
      </Flex>
    </>
  );
};

export default ReviewImageDeleteStack;