interface StorageCreateRequest {
  file: File;
  path: string;
  fileType: "images" | "videos";
  fileName?: string;
}

export default StorageCreateRequest;