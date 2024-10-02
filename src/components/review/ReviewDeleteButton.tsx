import React from 'react';
import {Button} from "@chakra-ui/react";
import reviewService from "@/apis/service/ReviewService";
import {useRouter} from "next/router";

interface Props {
  reviewId: string;
  reviewService: reviewService;
}

const ReviewDeleteButton = ({reviewId, reviewService}: Props) => {

  const router = useRouter();

  const handleOnClick = async () => {
    try {
      await reviewService.deleteReview(reviewId);
      router.push("/");
    } catch (error) {
      window.alert(error);
    }
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