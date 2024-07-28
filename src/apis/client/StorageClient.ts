import StorageResponse from "@/apis/dto/client/response/StorageResponse";
import StorageCreateRequest from "@/apis/dto/client/request/StorageCreateRequest";
import StorageDeleteRequest from "@/apis/dto/client/request/StorageDeleteRequest";

interface StorageClient {

  create(storageCreateRequest: StorageCreateRequest): Promise<StorageResponse>;

  delete(storageDeleteRequest: StorageDeleteRequest): Promise<void>;

}

export default StorageClient;