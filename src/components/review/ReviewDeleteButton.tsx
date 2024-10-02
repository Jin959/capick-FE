import React from 'react';
import {Button} from "@chakra-ui/react";
import reviewService from "@/apis/service/ReviewService";

interface Props {
  reviewId: string;
  reviewService: reviewService;
}

const ReviewDeleteButton = ({reviewId, reviewService}: Props) => {

  const handleOnClick = () => {

  }

  return (
    <>
      <Button
        onClick={handleOnClick}
      >
        삭제
      </Button>
    </>
  );
};

export default ReviewDeleteButton;