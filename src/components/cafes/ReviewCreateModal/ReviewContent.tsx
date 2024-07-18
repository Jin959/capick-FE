import React, {useContext, useRef, useState} from 'react';
import {useRouter} from "next/router";
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import {Button, Input, InputGroup, Textarea, Text, Box} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import {ReviewContext, ReviewDispatchContext} from "@/contexts/review";
import reviewConstant from "@/constants/reviewConstant";
import {StringMap} from "@/types/common";
import {CafeContext} from "@/contexts/cafe";
import {MemberContext} from "@/contexts/member";
import {ModalDispatchContext} from "@/contexts/modal";
import Image from "next/image";
import UploadImageIcon from "@/../public/icons/google-material-add_photo_alternate_FILL0_wght400_GRAD0_opsz24.svg"

interface Props {
  reviewService: ReviewService;
}

const ReviewContent = ({reviewService}: Props) => {

  const router = useRouter();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Array<File>>([]);

  const member = useContext(MemberContext);
  const cafe = useContext(CafeContext);
  const review = useContext(ReviewContext);
  const dispatchReview = useContext(ReviewDispatchContext);
  const dispatchModal = useContext(ModalDispatchContext);

  const handleOnClickBefore = () => {
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getBeforeSurveyType(review.surveyType)
    });
  }

  const handleOnClickUpload = (event: React.MouseEvent<HTMLDivElement>) => {
    imageInputRef.current?.click();
  }

  const handleOnChangeImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files as FileList));
  }

  const handleOnChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatchReview({
      type: "SET_CONTENT",
      content: event.target.value
    });
  }

  const handleOnClickDone = async () => {
    try {
      const reviewResponse = await reviewService.createReview({
        writerId: member.id,
        cafe: {
          name: cafe.name,
          kakaoPlaceId: cafe.kakaoPlaceId,
          kakaoDetailPageUrl: cafe.kakaoDetailPageUrl,
          // TODO: 일단 하드코딩으로 개발함. 첫 리뷰이면 DTO 의 cafe.location 프로퍼티가 필수이다. [cafeName] 페이지와 카페 조회 API 와 연동하고 첫 리뷰인지 조건 분기 개발하기
          location: {
            latitude: 37.57122962143047,
            longitude: 126.97629649901215,
            address: "서울 종로구 세종로 185-2",
            roadAddress: "서울 종로구 세종대로 167"
          }
        },
        visitPurpose: review.visitPurpose,
        content: review.content,
        menu: review.menu,
        coffeeIndex: (reviewConstant.survey.option["coffeeIndex"] as StringMap<number>)[review.coffeeIndex],
        priceIndex: (reviewConstant.survey.option["priceIndex"] as StringMap<number>)[review.priceIndex],
        spaceIndex: (reviewConstant.survey.option["spaceIndex"] as StringMap<number>)[review.spaceIndex],
        noiseIndex: (reviewConstant.survey.option["noiseIndex"] as StringMap<number>)[review.noiseIndex],
        theme: (reviewConstant.survey.option["theme"] as StringMap<string>)[review.theme]
      });
      router.push(`/cafes/${cafe.name}/${cafe.kakaoPlaceId}/reviews/${reviewResponse.id}`);
    } catch (error) {
      window.alert(error);
    }
    dispatchModal({
      type: "CLOSE_MODAL",
      modal: "reviewCreateModal"
    });
    dispatchReview({
      type: "INIT_REVIEW"
    });
    dispatchReview({
      type: "SET_SURVEY_TYPE",
      surveyType: reviewService.getFirstSurveyType()
    });
  }

  return (
    <>
      <ModalContent>
        <ModalCloseButton/>
        <ModalHeader
          m="0 auto"
        >
          한마디
        </ModalHeader>
        <ModalBody>
          <InputGroup
            onClick={handleOnClickUpload}
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
              onChange={handleOnChangeImageInput}
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
          <Box p="2"/>
          <Textarea
            placeholder="리뷰 내용 입력"
            minH="100"
            resize="none"
            maxLength={300}
            value={review.content}
            onChange={handleOnChangeTextarea}
          />
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            onClick={handleOnClickBefore}
          >
            이전
          </Button>
          <Button
            variant='ghost'
            onClick={handleOnClickDone}
          >
            완료
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ReviewContent;