import {LatLng, LatLngBounds, KakaoMap} from "@/types/kakao/Maps";
import MapKakaoSearchResponse from "@/apis/dto/response/MapKakaoSearchResponse";

interface Services {
  Places: Places;
  Status: Status;
  SortBy: SortBy;
}

export default Services;

export interface Places {
  new(map?: KakaoMap): Places;

  setMap: (map: KakaoMap) => void;
  keywordSearch: (keyword: string, callback: SearchCallback, options: SearchOption) => void;
  categorySearch: (code: string, callback: SearchCallback, options: SearchOption) => void;
}

export type SearchCallback = (result: Array<MapKakaoSearchResponse>, status: Status, pagination: Pagination) => void;

export interface SearchOption {
  category_group_code?: string;
  location?: LatLng;
  x?: number;
  y?: number;
  radius?: number;
  bounds?: LatLngBounds;
  rect?: string;
  size?: number;
  page?: number;
  sort?: SortBy;
  useMapCenter?: boolean;
  useMapBounds?: boolean;
}

export interface Pagination {
  totalCount: number;
  hasNextPage: number;
  hasPrevPage: number;
  current: number;
}

export interface Status {
  OK: Status;
  ZERO_RESULT: Status;
  ERROR: Status;
}

export interface SortBy {
  ACCURACY: SortBy;
  DISTANCE: SortBy;
}