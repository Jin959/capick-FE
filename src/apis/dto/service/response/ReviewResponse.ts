import MemberResponse from "@/apis/dto/service/response/MemberResponse";

interface ReviewResponse {
  id: number;
  writer: MemberResponse;
  visitPurpose: string;
  content: string;
  menu: string;
  registeredAt: string;
  imageUrls: Array<string>;
}

export default ReviewResponse;