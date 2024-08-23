import React from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {useRouter} from "next/router";
import useReviewService from "@/hooks/service/useReivewService";

const ReviewPage = () => {
  const router = useRouter();
  const reviewId = (router.query.reviewId || "0") as string;

  const reviewService = useReviewService();

  return (
    <>
      <BackButton/>
      <PageFlexContainer>

      </PageFlexContainer>
    </>
  );
};

export default ReviewPage;