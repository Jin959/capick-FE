import {StringMap} from "@/types/common";

interface ReviewConstant {
  survey: {
    question: StringMap<string>;
    directInputPlaceholder: StringMap<string>;
    option: StringMap<Array<string>>;
  };
}

const reviewConstant: ReviewConstant = {
  survey: {
    question: {
      visitPurpose: "뭐하러 갔어요?",
      theme: "컨셉이나 테마가 있나요?",
      menu: "뭐 드셨어요?",
      coffeeIndex: "맛은 어땠어요?",
      priceIndex: "가격은 어땠어요?",
      spaceIndex: "가게는 넓었어요?",
      noiseIndex: "시끄러웠나요?"
    },
    directInputPlaceholder: {
      visitPurpose: "직접입력",
      menu: "싱글 오리진, 그외 음료 직접입력"
    },
    option: {
      visitPurpose: [
        "가성비 때문에 갔어요",
        "커피가 맛있어요",
        "넓어서 갔어요",
        "수다 떨기 좋아서요",
        "애완동물을 데려 갈 수 있어서 갔어요",
        "일하거나 책읽고 공부하려고요",
        "모니터가 있어요",
        "회의실이 있어요"
      ],
      theme: [
        "없어요. 일반 카페에요.",
        "애완 동물 까페 (애견, 고양이, 동물)",
        "취미 까페(보드 게임, 드로잉, 만화)",
        "스터디 까페",
        "키즈 까페",
        "그 외 컨셉 및 테마"
      ],
      menu: [
        "아이스 아메리카노",
        "핫 아메리카노",
        "아이스 라떼",
        "핫 라떼",
        "아이스 카푸치노",
        "핫 카푸치노",
        "에스프레소",
      ],
      coffeeIndex: [
        "맛있었어요!",
        "나쁘지 않아요",
        "중간은 간다",
        "별로",
        "다신 안감"
      ],
      priceIndex: [
        "가성비 굿",
        "이정도면 싼 편이지?",
        "싸지도 비싸지도 않아요",
        "살짝 비싼 느낌?",
        "다신 안감"
      ],
      spaceIndex: [
        "넓고 좋아요!",
        "나쁘지 않아요",
        "일반적입니다.",
        "살짝 좁아요",
        "자리가 두 테이블도 없어요"
      ],
      noiseIndex: [
        "왁자지껄",
        "어느정도 말소리나 소음이 있어요",
        "조용하지도 시끄럽지도 않아요",
        "조용한 편",
        "아무 소리 없는데 나 혼자 있는 듯?"
      ]
    }
  }
};

export default reviewConstant;