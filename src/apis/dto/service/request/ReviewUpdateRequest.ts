interface ReviewUpdateRequest {
  writerId: number;
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

export default ReviewUpdateRequest;