import React, {useEffect, useState} from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {useRouter} from "next/router";
import useReviewService from "@/hooks/service/useReivewService";

const ReviewPage = () => {
  const router = useRouter();
  const reviewId = (router.query.reviewId || "0") as string;

  const [writer, setWriter] = useState({
    nickname: "",
    profileImageUrl: "",
  })
  const [review, setReview] = useState({
    visitPurpose: "",
    content: "",
    menu: "",
    registeredAt: "",
    imageUrls: [""]
  });

  const reviewService = useReviewService();

  useEffect(() => {
    (async () => {
      try {
        const reviewResponse = await reviewService.getReview(reviewId);
        setWriter({
          nickname: reviewResponse.writer.nickname,
          profileImageUrl: reviewResponse.writer.profile?.imageUrl ?? ""
        })
        setReview({
          visitPurpose: reviewResponse.visitPurpose,
          content: reviewResponse.content,
          menu: reviewResponse.menu,
          registeredAt: reviewResponse.registeredAt,
          imageUrls: reviewResponse.imageUrls
        });
      } catch (error) {
        window.alert(error);
      }
    })();
  }, [reviewService, reviewId]);

  return (
    <>
      <BackButton/>
      <PageFlexContainer>

      </PageFlexContainer>
    </>
  );
};

export default ReviewPage;