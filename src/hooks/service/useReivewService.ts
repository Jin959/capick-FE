import ReviewService from "@/apis/service/ReviewService";
import {useRef} from "react";

type UseReviewService = () => ReviewService;

const useReviewService: UseReviewService = () => {
  const reviewServiceRef = useRef<ReviewService | null>(null);
  const reviewService: ReviewService = (() => {
    if (reviewServiceRef.current === null) {
      reviewServiceRef.current = ReviewService.create();
    }
    return reviewServiceRef.current;
  })();

  return reviewService;
}

export default useReviewService;