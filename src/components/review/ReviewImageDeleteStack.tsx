import React, {useContext, useState} from 'react';
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import ImageListDisplay from "@/components/common/data-display/ImageListDisplay";
import {Button, Flex} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";

interface Props {
  reviewService: ReviewService;
}

const ReviewImageDeleteStack = ({reviewService}: Props) => {

  const [deprecatedImageUrls, setDeprecatedImageUrls] = useState<Array<string>>([]);

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const handleOnClickButton = () => {
    dispatchReview({
      type: "SET_PRESERVED_IMAGE_URLS",
      preservedImageUrls: [...deprecatedImageUrls, ...review.preservedImageUrls]
    });
    setDeprecatedImageUrls([]);
  }

  const handleOnClickImage = (imageUrl: string) => {
    dispatchReview({
      type: "SET_PRESERVED_IMAGE_URLS",
      preservedImageUrls: reviewService.updateImageUrlsByDeleting(review.preservedImageUrls, imageUrl)
    });
    setDeprecatedImageUrls([...deprecatedImageUrls, imageUrl]);
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
          onClickWithImageUrl={handleOnClickImage}
        />
        <Button
          size="sm"
          m="0.3rem"
          onClick={handleOnClickButton}
        >
          삭제 선택 초기화
        </Button>
      </Flex>
    </>
  );
};

export default ReviewImageDeleteStack;