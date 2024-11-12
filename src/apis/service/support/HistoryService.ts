import ApiClient from "@/apis/client/ApiClient";
import ApiConfig from "@/apis/ApiConfig";
import commonError from "@/apis/error/commonError";
import {isApiResponse} from "@/apis/dto/client/response/ApiResponse";
import {handleOnApiError} from "@/apis/error/errorHandler";
import StorageOrphanFilesCreateRequest from "@/apis/dto/service/request/support/StorageOrphanFilesCreateRequest";

class HistoryService {

  private readonly apiClient: ApiClient;

  private constructor() {
    this.apiClient = ApiConfig.apiClientForClientSide();
  }

  public static create = (): HistoryService => {
    return new HistoryService();
  }

  public createStorageOrphanFileHistories = async (
    storageOrphanFilesCreateRequest: StorageOrphanFilesCreateRequest): Promise<void> => {

    try {
      await this.apiClient
        .post<void, StorageOrphanFilesCreateRequest>("history/storage/orphan-files", storageOrphanFilesCreateRequest);
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

}

export default HistoryService;