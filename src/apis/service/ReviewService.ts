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
import HistoryService from "@/apis/service/support/HistoryService";
import StorageResponse from "@/apis/dto/client/response/StorageResponse";
import ReviewUpdateRequest from "@/apis/dto/service/request/ReviewUpdateRequest";

class ReviewService {

  private static readonly SURVEY_END: string = "end";

  private readonly apiClient: ApiClient;
  private readonly storageClient: StorageClient;
  private readonly historyService: HistoryService;
  private readonly nullResponse: ReviewResponse;
  private readonly surveyTypes: Array<string>;
  private readonly surveyTypesWithDirectInput: Array<string>;

  private constructor() {
    this.apiClient = ApiConfig.apiClientForClientSide();
    this.storageClient = ApiConfig.storageClient();
    this.historyService = HistoryService.create();
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
      this.ifNumberOfImagesExceededThrow(images);
      storageResponses = await this.getImageUrlsByUploadOrThrow(images, path, fileName);
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
      await this.ifUploadedCreateStorageOrphanFileHistories(storageResponses, path);
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

  public getReviewDetail = async (reviewId: string | number): Promise<ReviewResponse> => {
    try {
      const response = await this.apiClient
        .get<ReviewResponse>("/reviews/" + reviewId + "/detail");
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  // TODO: Cafe 조회 API 가 없어서 fileName 에 CafeKakaoPlaceId 로 하드코딩 했는데 카페 조회 개발 후 수정하기
  public updateReview = async (
    reviewId: string | number, reviewUpdateRequest: ReviewUpdateRequest, newImages: Array<File>): Promise<ReviewResponse> => {

    const fileName = `CafeKakaoPlaceId_${reviewUpdateRequest.writerId}`;
    const path = "reviews";
    let storageResponses: Array<StorageResponse> = [];

    this.ifNumberOfImagesExceededThrow(newImages, reviewUpdateRequest.imageUrls ?? []);

    if (newImages.length !== 0) {
      storageResponses = await this.getImageUrlsByUploadOrThrow(newImages, path, fileName);
    }

    const newImageUrls = storageResponses.map(storageResponse => storageResponse.url);
    reviewUpdateRequest.imageUrls = Array.of(...(reviewUpdateRequest.imageUrls ?? []), ...newImageUrls);

    try {
      const response = await this.apiClient
        .patch<ReviewResponse, ReviewUpdateRequest>("/reviews/" + reviewId, reviewUpdateRequest);
      return response.data ?? this.nullResponse;
    } catch (error) {
      console.error(error);
      await this.ifUploadedCreateStorageOrphanFileHistories(storageResponses, path);
      if (isApiResponse(error)) {
        handleOnApiError(error);
      }
      throw new Error(commonError.connection);
    }
  }

  public deleteReview = async (reviewId: string | number): Promise<void> => {
    try {
      await this.apiClient
        .delete<void>(`/reviews/${reviewId}`);
    } catch (error) {
      console.error(error);
      if (isApiResponse(error)) {
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

  public createSurveyOptionsWithIdFrom = (
    data: Array<string> | StringMap<string | number>): Array<DataWithId<string | number>> => {

    if (Array.isArray(data)) {
      return createDataWithId(data);
    } else {
      return createDataWithId(data, "key");
    }
  }

  public isSurveyOptionSelected = (selectedOption: string): boolean => {
    return selectedOption.length > 0;
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

  private getImageUrlsByUploadOrThrow = async (
    images: Array<File>, path: string, fileName: string): Promise<Array<StorageResponse>> => {

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

  private ifUploadedCreateStorageOrphanFileHistories = async (
    storageResponses: Array<StorageResponse>, domain: "review" | "reviews") => {

    if (storageResponses.length !== 0) {
      await this.historyService.createStorageOrphanFileHistories({
        orphanFiles: storageResponses.map(storageResponse => ({
          fileName: storageResponse.name,
          fileType: "images",
          domain: domain,
          url: storageResponse.url
        }))
      });
    }
  }

  private ifImagesExtensionIsNotValidThrow = (images: Array<File>): void => {
    for (let image of images) {
      if (!isImageFileExtension(image)) {
        throw new Error(reviewError.image.invalidImageExtension);
      }
    }
  }

  private ifNumberOfImagesExceededThrow = (...images: Array<Array<string | File>>): void => {
    if (this.countAllImagesNumber(...images) > 3) {
      throw new Error(reviewError.image.numberOfImageExceeded);
    }
  }
}

export default ReviewService;