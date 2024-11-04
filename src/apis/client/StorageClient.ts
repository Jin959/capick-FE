import StorageResponse from "@/apis/dto/client/response/StorageResponse";
import StorageCreateRequest from "@/apis/dto/client/request/StorageCreateRequest";

interface StorageClient {

  create(storageCreateRequest: StorageCreateRequest): Promise<StorageResponse>;

}

export default StorageClient;