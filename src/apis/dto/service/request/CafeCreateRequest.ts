import Location from "@/apis/dto/service/Location";

interface CafeCreateRequest {
  name: string;
  kakaoPlaceId: string;
  kakaoDetailPageUrl: string;
  location?: Location;
}

export default CafeCreateRequest;