import CafeCreateRequest from "@/apis/dto/service/request/CafeCreateRequest";

interface ReviewCreateRequest {
  writerId: number;
  cafe: CafeCreateRequest;
  visitPurpose: string;
  content: string;
  menu: string;
  coffeeIndex: number;
  priceIndex: number;
  spaceIndex: number;
  noiseIndex: number;
  theme: string;
  imageUrls?: Array<string>;
}

export default ReviewCreateRequest;