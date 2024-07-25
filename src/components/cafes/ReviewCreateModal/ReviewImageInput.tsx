import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Flex, Input, InputGroup, Text} from "@chakra-ui/react";
import Image from "next/image";
import UploadImageIcon from "@/../public/icons/google-material-add_photo_alternate_FILL0_wght400_GRAD0_opsz24.svg"
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import {createDataWithId} from "@/utils/func";
import {DataWithId} from "@/types/common";

const ReviewImageInput = () => {

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imagePreviews, setImagePreviews] = useState<Array<DataWithId<string>>>([]);

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const handleOnClick = () => {
    imageInputRef.current?.click();
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchReview({
      type: "SET_IMAGES",
      images: Array.from(event.target.files as FileList)
    });
  }

  useEffect(() => {
    setImagePreviews(createDataWithId(
      review.images.map(image => URL.createObjectURL(image))
    ));
  }, [review.images]);

  useEffect(() => {
    return () => {
      imagePreviews.map(preview => URL.revokeObjectURL(preview.data));
    };
  }, [imagePreviews]);

  return (
    <>
      <InputGroup
        onClick={handleOnClick}
        minH="15rem"
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
        {review.images.length === 0 ? (
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
            <Flex
              justifyContent="space-around"
              alignItems="center"
              overflow="auto"
            >
              {imagePreviews.map(
                preview => <Image
                  key={preview.id}
                  src={preview.data}
                  alt={`ReviewImage${preview.id}`}
                  width={0}
                  height={0}
                  style={{
                    margin: "0 0.2rem 0 0.2rem",
                    width: "auto",
                    height: "10rem",
                    objectFit: "contain"
                  }}
                />)}
            </Flex>
            <Button size="sm">사진 바꾸기</Button>
          </>
        )}
      </InputGroup>
    </>
  );
};

export default ReviewImageInput;