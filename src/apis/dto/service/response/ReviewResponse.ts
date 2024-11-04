import MemberResponse from "@/apis/dto/service/response/MemberResponse";

interface ReviewResponse {
  id: number;
  writer: MemberResponse;
  visitPurpose: string;
  content: string;
  menu: string;
  coffeeIndex?: number;
  priceIndex?: number;
  spaceIndex?: number;
  noiseIndex?: number;
  theme?: string;
  registeredAt: string;
  imageUrls: Array<string>;
}

export default ReviewResponse;