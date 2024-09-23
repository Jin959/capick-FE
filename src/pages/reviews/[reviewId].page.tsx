import React, {useEffect, useState} from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {useRouter} from "next/router";
import useReviewService from "@/hooks/service/useReivewService";
import {Avatar, Box, Divider, Flex, Tag, Text} from "@chakra-ui/react";
import Image from "next/image";
import {createDataWithId, parseDateAndTime} from "@/utils/func";

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

  const reviewImageUrls = createDataWithId(review.imageUrls);

  const handleOnContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  }

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
          registeredAt: parseDateAndTime(reviewResponse.registeredAt),
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
        <Flex
          justifyContent="space-around"
          alignItems="center"
          overflow="auto"
        >
          {reviewImageUrls.map(
            imageUrl => <Box
              key={imageUrl.id}
              pos="relative"
              minW="13rem"
              h="13rem"
              m="0 0.2rem 0 0.2rem"
            >
              <Image
                src={imageUrl.data}
                alt={`ReviewImage${imageUrl.id}`}
                fill
                style={{
                  objectFit: "contain"
                }}
                quality={5}
                onContextMenu={handleOnContextMenu}
              />
            </Box>
          )}
        </Flex>
        <Text>
          {review.content}
        </Text>
      </PageFlexContainer>
    </>
  );
};

export default ReviewPage;