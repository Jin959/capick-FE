interface StorageOrphanFileCreateRequest {
  fileName: string;
  fileType: string;
  domain: "review" | "reviews" | "member" | "members";
  url: string;
}

export default StorageOrphanFileCreateRequest;