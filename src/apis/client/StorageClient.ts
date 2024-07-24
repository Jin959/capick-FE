import {FileNameWithUrl} from "@/types/common";

interface StorageClient {

  create(file: File, path: string, fileType: "images" | "videos", fileName?: string): Promise<FileNameWithUrl>;

  delete(fileName: string, path: string, fileType: "images" | "videos"): Promise<void>;

}

export default StorageClient;