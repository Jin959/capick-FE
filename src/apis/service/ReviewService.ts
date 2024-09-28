import ApiClient from "@/apis/client/ApiClient";
import ApiConfig from "@/apis/ApiConfig";
import ReviewCreateRequest from "@/apis/dto/service/request/ReviewCreateRequest";
import ReviewResponse from "@/apis/dto/service/response/ReviewResponse";
import {isApiResponse} from "@/apis/dto/client/response/ApiResponse";
import {handleOnApiError} from "@/apis/error/errorHandler";
import commonError from "@/apis/error/commonError";
import {DataWithId, StringMap} from "@/types/common";
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

  public createReview = async (reviewCreateRequest: ReviewCreateRequest, images: Array<File>): Promise<ReviewResponse> => {
    const fileName = `${reviewCreateRequest.cafe.kakaoPlaceId}_${reviewCreateRequest.writerId}`;
    const path = "reviews";
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
      await this.rollbackUploadImages(path,
        storageResponses.map(storageResponse => storageResponse.name));
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public getReview = async (reviewId: string | number): Promise<ReviewResponse> => {
    try {
      const response = await this.apiClient
        .get<ReviewResponse>("/reviews/" + reviewId);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        if (error.code == 404) {
          window.location.href = "/";
        }
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public getNextSurveyType = (surveyType: string): string => {
    const nextIndex = this.surveyTypes.indexOf(surveyType) + 1;
    if (nextIndex >= this.surveyTypes.length) return ReviewService.SURVEY_END;
    else return this.surveyTypes[nextIndex];
  }

  public getBeforeSurveyType = (surveyType: string): string => {
    const beforeIndex = this.surveyTypes.indexOf(surveyType) - 1;
    if (surveyType === ReviewService.SURVEY_END) return this.surveyTypes[this.surveyTypes.length - 1];
    else if (beforeIndex < 0) return this.surveyTypes[0];
    else return this.surveyTypes[beforeIndex];
  }

  public getFirstSurveyType = (): string => {
    return this.surveyTypes[0];
  }

  public isSurveyEnd = (surveyType: string): boolean => {
    return surveyType === ReviewService.SURVEY_END;
  }

  public isSurveyNeedDirectInput = (surveyType: string): boolean => {
    return this.surveyTypesWithDirectInput.indexOf(surveyType) !== -1
  }

  public createSurveyOptionsWithIdFrom = (data: Array<string> | StringMap<string | number>): Array<DataWithId<string | number>> => {
    if (Array.isArray(data)) {
      return createDataWithId(data);
    } else {
      return createDataWithId(data, "key");
    }
  }

  public isEmptyImages = (reviewImages: Array<string | File>):boolean => {
    return reviewImages.length === 0;
  }

  public isReviewWriter = (viewerNickname: string, writerNickname: string): boolean => {
    return viewerNickname === writerNickname;
  }

  public countAllImagesNumber = (...allImages: Array<Array<string | File>>): number => {
    return allImages.reduce(
      (imageCount, currentImages) => imageCount + currentImages.length, 0);
  }

  public updateImageUrlsByDeleting = (imageUrls: Array<string >, targetImageUrl: string ): Array<string> => {
    return imageUrls.filter(image => image !== targetImageUrl);
  }

  private uploadImagesAndGetUrls = async (images: Array<File>, path: string, fileName: string): Promise<Array<StorageResponse>> => {
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

  private rollbackUploadImages = async (path: string, fileNames: Array<string>): Promise<void> => {
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

  private ifImagesExtensionIsNotValidThrow = (images: Array<File>): void => {
    for (let image of images) {
      if (!isImageFileExtension(image)) {
        throw new Error(reviewError.image.invalidImageExtension);
      }
    }
  }

  private ifNumberOfImagesExceededThrow = (images: Array<File>): void => {
    if (images.length > 3) {
      throw new Error(reviewError.image.numberOfImageExceeded);
    }
  }
}

export default ReviewService;