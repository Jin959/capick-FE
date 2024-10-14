import React, {useContext} from 'react';
import {Button, Text} from "@chakra-ui/react";
import reviewService from "@/apis/service/ReviewService";
import {useRouter} from "next/router";
import AlertModal from "@/components/common/modal/AlertModal";
import {ModalDispatchContext} from "@/contexts/modal";

interface Props {
  reviewId: string;
  reviewService: reviewService;
}

const ReviewDeleteButton = ({reviewId, reviewService}: Props) => {

  const router = useRouter();

  const dispatchModal = useContext(ModalDispatchContext);

  const handleOnClick = () => {
    dispatchModal({
      type: "OPEN_MODAL",
      modal: "alertModal"
    });
  }

  const handleOnConfirm = async () => {
    try {
      dispatchModal({
        type: "OPEN_MODAL",
        modal: "loadingSpinnerModal"
      });

      await reviewService.deleteReview(reviewId);

      dispatchModal({
        type: "CLOSE_MODAL",
        modal: "loadingSpinnerModal"
      });

      router.push("/");
    } catch (error) {
      window.alert(error);
      dispatchModal({
        type: "CLOSE_MODAL",
        modal: "loadingSpinnerModal"
      });
    }
  }

  return (
    <>
      <Button
        onClick={handleOnClick}
      >
        삭제
      </Button>
      <AlertModal
        onConfirm={handleOnConfirm}
      >
        <Text
          fontWeight="bold"
          textAlign="center"
        >
          삭제하면 다시 복구할 수 없습니다.
        </Text>
        <Text
          fontWeight="bold"
          textAlign="center"
        >
          리뷰를 삭제하시겠습니까?
        </Text>
      </AlertModal>
    </>
  );
};

export default ReviewDeleteButton;