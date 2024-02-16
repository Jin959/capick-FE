interface MemberResponse {
  id: number;
  nickname: string;
  email?: string;
  profile?: {
    imageUrl?: string;
    introduction?: string;
  }
  preferTown?: {
    latitude: number;
    longitude: number;
    state: string;
    city: string;
    street: string;
    number: string;
  }
}

export default MemberResponse;