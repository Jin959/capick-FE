import React, {useContext, useEffect, useState} from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {useRouter} from "next/router";
import useReviewService from "@/hooks/service/useReivewService";
import {Avatar, Box, Divider, Flex, Tag, Text} from "@chakra-ui/react";
import {parseDateAndTime} from "@/utils/func";
import ImageModal from "@/components/common/modal/ImageModal";
import {ModalDispatchContext} from "@/contexts/modal";
import ReviewProvider from "@/contexts/review";
import ReviewUpdateModal from "@/components/review/ReviewUpdateModal";
import {MemberContext} from "@/contexts/member";
import ImageListDisplay from "@/components/common/data-display/ImageListDisplay";
import ReviewDeleteButton from "@/components/review/ReviewDeleteButton";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import ReviewResponse from "@/apis/dto/service/response/ReviewResponse";
import ReviewServerSideService from "@/apis/service/ReviewServerSideService";

const ReviewPage = ({reviewResponse}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const reviewId = (router.query.reviewId ?? "0") as string;

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
  }, [reviewResponse]);

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
        {showReviewEditButtons &&
          <Flex
            justifyContent="space-around"
            alignItems="center"
          >
            <ReviewProvider>
              <>
                <ReviewUpdateModal
                  reviewId={reviewId}
                  reviewService={reviewService}
                />
                <ReviewDeleteButton
                  reviewId={reviewId}
                  reviewService={reviewService}
                />
              </>
            </ReviewProvider>
          </Flex>
        }
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
        <ImageListDisplay
          imageSrcUrls={review.imageUrls}
          imageMinWidth={"13rem"}
          imageHeight={"13rem"}
          imageQuality={5}
          onClickWithImageUrl={handleOnClick}
          onContextMenu={handleOnContextMenu}
        />
        <Text>
          {review.content}
        </Text>
      </PageFlexContainer>
    </>
  );
};

export default ReviewPage;

export const getServerSideProps: GetServerSideProps<{
  reviewResponse: ReviewResponse;
}> = async ({params}) => {
  return ReviewServerSideService.create()
    .getReview(params?.reviewId as string);
}