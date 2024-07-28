import MemberResponse from "@/apis/dto/service/response/MemberResponse";

interface ReviewResponse {
  id: number;
  writer: MemberResponse;
  visitPurpose: string;
  content: string;
  menu: string;
  registeredAt: string;
  // TODO: 이미지가 없는 경우 빈 배열이 온다. 개발 후 확인해보기
  imageUrls: Array<string>;
}

export default ReviewResponse;