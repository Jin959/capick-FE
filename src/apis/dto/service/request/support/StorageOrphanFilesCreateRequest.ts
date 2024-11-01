import StorageOrphanFileCreateRequest from "@/apis/dto/service/request/support/StorageOrphanFileCreateRequest";

interface StorageOrphanFilesCreateRequest {
  orphanFiles: Array<StorageOrphanFileCreateRequest>
}

export default StorageOrphanFilesCreateRequest;