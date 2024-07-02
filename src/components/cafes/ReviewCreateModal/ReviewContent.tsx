import React from 'react';
import {ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from "@chakra-ui/modal";
import {Button, Textarea} from "@chakra-ui/react";
import ReviewService from "@/apis/service/ReviewService";
import {StringMap} from "@/types/common";

interface Props {
  reviewService: ReviewService;
  review: StringMap<string>;
  onClickBefore: () => void;
  onClickDone: () => void;
  onChangeContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReviewContent = (props: Props) => {

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
          <Textarea
            placeholder="리뷰 내용 입력"
            minH="250"
            resize="none"
            maxLength={300}
            value={props.review.content}
            onChange={props.onChangeContent}
          />
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Button
            onClick={props.onClickBefore}
          >
            이전
          </Button>
          <Button
            variant='ghost'
            onClick={props.onClickDone}
          >
            완료
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default ReviewContent;