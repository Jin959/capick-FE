import React, {useContext, useRef} from 'react';
import {Button, Input, InputGroup, Text} from "@chakra-ui/react";
import Image from "next/image";
import UploadImageIcon from "@/../public/icons/google-material-add_photo_alternate_FILL0_wght400_GRAD0_opsz24.svg"
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";

const ReviewImageInput = () => {

  const imageInputRef = useRef<HTMLInputElement>(null);

  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);

  const handleOnClick = () => {
    imageInputRef.current?.click();
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchReview({
      type: "SET_IMAGES",
      images: Array.from(event.target.files as FileList)
    })
  }

  return (
    <>
      <InputGroup
        onClick={handleOnClick}
        minH="150"
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
          ref={imageInputRef}
          onChange={handleOnChange}
          display="none"
        />
        <Image
          src={UploadImageIcon}
          alt="UploadImage"
          width={50}
        />
        <Text>사진을 선택해주세요</Text>
        <Button size="sm">사진 첨부</Button>
      </InputGroup>
    </>
  );
};

export default ReviewImageInput;