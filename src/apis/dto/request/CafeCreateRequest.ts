import Location from "@/apis/dto/Location";

interface CafeCreateRequest {
  name: string;
  kakaoPlaceId: string;
  kakaoDetailPageUrl: string;
  location?: Location;
}

export default CafeCreateRequest;