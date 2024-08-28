import React, {useEffect, useState} from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {useRouter} from "next/router";
import useReviewService from "@/hooks/service/useReivewService";
import {Avatar, Box, Divider, Flex, Tag, Text} from "@chakra-ui/react";

const ReviewPage = () => {
  const router = useRouter();
  const reviewId = (router.query.reviewId ?? "Not Available") as string;

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
    if (reviewId === "Not Available") return;
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
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex
            alignItems="center"
          >
            <Avatar src={writer.profileImageUrl}/>
            <Box p="2"/>
            <Text as='b'>
              {writer.nickname}
            </Text>
          </Flex>
          <Text>
            {review.registeredAt}
          </Text>
        </Flex>
        <Divider/>
        <Box>
          <Tag
            w="fit-content"
            mr="2"
            mb="1"
            colorScheme="brand"
          >
            {review.menu}
          </Tag>
          <Tag
            w="fit-content"
          >
            {review.visitPurpose}
          </Tag>
        </Box>
        <Divider/>
        <Text>
          {review.content}
        </Text>
      </PageFlexContainer>
    </>
  );
};

export default ReviewPage;