import React, {useContext, useEffect, useState} from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {useRouter} from "next/router";
import useReviewService from "@/hooks/service/useReivewService";
import {Avatar, Box, Divider, Flex, Tag, Text} from "@chakra-ui/react";
import Image from "next/image";
import {createDataWithId, parseDateAndTime} from "@/utils/func";
import ImageModal from "@/components/common/modal/ImageModal";
import {ModalDispatchContext} from "@/contexts/modal";
import ReviewProvider from "@/contexts/review";
import ReviewUpdateModal from "@/components/review/ReviewUpdateModal";
import {MemberContext} from "@/contexts/member";

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
  const [imageModalUrl, setImageModalUrl] = useState("");

  const member = useContext(MemberContext);
  const dispatchModal = useContext(ModalDispatchContext);

  const reviewService = useReviewService();
  const showReviewEditButtons: boolean = reviewService.isReviewWriter(member.nickname, writer.nickname);

  const reviewImageUrls = createDataWithId(review.imageUrls);

  const handleOnContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
  }

  const handleOnClick = (imageUrl: string) => {
    dispatchModal({
      type: "OPEN_MODAL",
      modal: "imageModal"
    });
    setImageModalUrl(imageUrl);
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
        <ImageModal
          imageUrl={imageModalUrl}
        />
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
        {showReviewEditButtons &&
          <Flex
            justifyContent="space-around"
            alignItems="center"
          >
            <ReviewProvider>
              <ReviewUpdateModal
                reviewService={reviewService}
                reviewInfo={{
                  reviewId: reviewId,
                  visitPurpose: review.visitPurpose,
                  content: review.content,
                  menu: review.menu,
                  imageUrls: review.imageUrls
                }}
              />
            </ReviewProvider>
          </Flex>
        }
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
                onClick={() => handleOnClick(imageUrl.data)}
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