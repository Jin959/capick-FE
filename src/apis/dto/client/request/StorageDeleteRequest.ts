interface StorageDeleteRequest {
  fileName: string;
  path: string;
  fileType: "images" | "videos";
}

export default StorageDeleteRequest;