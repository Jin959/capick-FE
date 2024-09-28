import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Button, Input, InputGroup, Text} from "@chakra-ui/react";
import Image from "next/image";
import UploadImageIcon from "@/../public/icons/google-material-add_photo_alternate_FILL0_wght400_GRAD0_opsz24.svg"
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import ImageListDisplay from "@/components/common/data-display/ImageListDisplay";
import ReviewService from "@/apis/service/ReviewService";

interface Props {
  reviewService: ReviewService;
}

const ReviewImageInput = ({reviewService}: Props) => {

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const handleOnClick = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const showUploadImageIcon: boolean = reviewService.isEmptyImages(review.images);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchReview({
      type: "SET_IMAGES",
      images: Array.from(event.target.files as FileList)
    });
  }

  useEffect(() => {
    setImagePreviews(
      review.images.map(image => URL.createObjectURL(image))
    );
  }, [review.images]);

  useEffect(() => {
    return () => {
      imagePreviews.map(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <>
      <InputGroup
        onClick={handleOnClick}
        minH="10rem"
        p="1rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        border="dashed"
        borderColor="gray.300"
        borderRadius="md"
      >
        <Input
          type="file"
          multiple={true}
          accept="image/*"
          capture="environment"
          ref={imageInputRef}
          onChange={handleOnChange}
          display="none"
        />
        {showUploadImageIcon ? (
          <>
            <Image
              src={UploadImageIcon}
              alt="UploadImage"
              width={50}
            />
            <Text>사진을 선택해주세요</Text>
            <Button size="sm">사진 선택</Button>
          </>
        ) : (
          <>
            <ImageListDisplay
              imageSrcUrls={imagePreviews}
              imageHeight="13rem"
              imageMinWidth="13rem"
              containerWidth="100%"
            />
            <Button
              size="sm"
              mt="1rem"
            >
              사진 바꾸기
            </Button>
          </>
        )}
      </InputGroup>
    </>
  );
};

export default ReviewImageInput;