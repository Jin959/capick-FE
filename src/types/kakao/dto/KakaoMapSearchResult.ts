interface KakaoMapSearchResult {
  id: number;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: number;
  y: number;
  place_url: string;
  distance: string;
}

export default KakaoMapSearchResult;