import ApiClient from "@/apis/client/ApiClient";
import ApiConfig from "@/apis/ApiConfig";
import ReviewCreateRequest from "@/apis/dto/service/request/ReviewCreateRequest";
import ReviewResponse from "@/apis/dto/service/response/ReviewResponse";
import {isApiResponse} from "@/apis/dto/client/response/ApiResponse";
import {handleOnApiError} from "@/apis/error/errorHandler";
import commonError from "@/apis/error/commonError";
import {StringMap} from "@/types/common";
import {createDataWithId, isImageFileExtension} from "@/utils/func";
import reviewError from "@/apis/error/reviewError";
import StorageClient from "@/apis/client/StorageClient";
import StorageResponse from "@/apis/dto/client/response/StorageResponse";

class ReviewService {

  private static readonly SURVEY_END: string = "end";

  private readonly apiClient: ApiClient;
  private readonly storageClient: StorageClient;
  private readonly nullResponse: ReviewResponse;
  private readonly surveyTypes: Array<string>;
  private readonly surveyTypesWithDirectInput: Array<string>;

  private constructor() {
    this.apiClient = ApiConfig.apiClient();
    this.storageClient = ApiConfig.storageClient();
    this.nullResponse = {
      id: 0,
      writer: {
        id: 0,
        nickname: "Not Available"
      },
      visitPurpose: "Not Available",
      content: "Not Available",
      menu: "Not Available",
      registeredAt: "Not Available",
      imageUrls: []
    };
    this.surveyTypes = ["visitPurpose", "theme", "menu", "coffeeIndex", "priceIndex", "spaceIndex", "noiseIndex"];
    this.surveyTypesWithDirectInput = ["visitPurpose", "menu"];
  }

  public static create = (): ReviewService => {
    return new ReviewService();
  }

  public createReview = async (reviewCreateRequest: ReviewCreateRequest, images: Array<File>) => {
    const fileName = `${reviewCreateRequest.cafe.kakaoPlaceId}_${reviewCreateRequest.writerId}`;
    const path = reviewCreateRequest.cafe.name.split(' ').join('_');
    let storageResponses: Array<StorageResponse> = [];
    if (images.length !== 0) {
      storageResponses = await this.uploadImagesAndGetUrls(images, path, fileName);
    }
    try {
      reviewCreateRequest.imageUrls = storageResponses.map(
        storageResponse => storageResponse.url
      );
      const response = await this.apiClient
        .post<ReviewResponse, ReviewCreateRequest>("/reviews/new", reviewCreateRequest);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      // TODO: 파일 업로드 URL을 자체 백엔드 서버에 전송해야해서 업로드 후 API 요청을 했다 만약 에러가 생기면 롤백해야해서 여기에서 수행했는데 다른 좋은 방법이 있는지 고민해보기
      await this.rollbackUploadImages(
        storageResponses.map(storageResponse => storageResponse.name), path);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public getNextSurveyType = (surveyType: string) => {
    const nextIndex = this.surveyTypes.indexOf(surveyType) + 1;
    if (nextIndex >= this.surveyTypes.length) return ReviewService.SURVEY_END;
    else return this.surveyTypes[nextIndex];
  }

  public getBeforeSurveyType = (surveyType: string) => {
    const beforeIndex = this.surveyTypes.indexOf(surveyType) - 1;
    if (surveyType === ReviewService.SURVEY_END) return this.surveyTypes[this.surveyTypes.length - 1];
    else if (beforeIndex < 0) return this.surveyTypes[0];
    else return this.surveyTypes[beforeIndex];
  }

  public getFirstSurveyType = () => {
    return this.surveyTypes[0];
  }

  public isSurveyEnd = (surveyType: string) => {
    return surveyType === ReviewService.SURVEY_END;
  }

  public isNeedDirectInput = (surveyType: string) => {
    return this.surveyTypesWithDirectInput.indexOf(surveyType) !== -1
  }

  public createSurveyOptionsWithIdFrom = (data: Array<string> | StringMap<string | number>) => {
    if (Array.isArray(data)) {
      return createDataWithId(data);
    } else {
      return createDataWithId(data, "key");
    }
  }

  private async uploadImagesAndGetUrls(images: Array<File>, path: string, fileName: string) {
    this.ifNumberOfImagesExceededThrow(images);
    this.ifImagesExtensionIsNotValidThrow(images);

    try {
      return Promise.all(images.map(
        image => this.storageClient.create({
          file: image,
          path: path,
          fileType: "images",
          fileName: fileName
        })
      ));
    } catch (error) {
      console.error(error);
      throw new Error(commonError.storageClient);
    }
  }

  private async rollbackUploadImages(fileNames: Array<string>, path: string) {
    try {
      await Promise.all(fileNames.map(
        fileName => this.storageClient.delete({
          fileName: fileName,
          path: path,
          fileType: "images"
        })
      ));
    } catch (error) {
      console.error(error);
      throw new Error(commonError.storageClient);
    }
  }

  private ifImagesExtensionIsNotValidThrow(images: Array<File>) {
    for (let image of images) {
      if (!isImageFileExtension(image)) {
        throw new Error(reviewError.image.invalidImageExtension);
      }
    }
  }

  private ifNumberOfImagesExceededThrow(images: Array<File>) {
    if (images.length > 3) {
      throw new Error(reviewError.image.numberOfImageExceeded);
    }
  }
}

export default ReviewService;