import ReviewResponse from "@/apis/dto/service/response/ReviewResponse";
import ApiClient from "@/apis/client/ApiClient";
import ApiConfig from "@/apis/ApiConfig";
import commonError from "@/apis/error/commonError";
import {isApiResponse} from "@/apis/dto/client/response/ApiResponse";
import {GetServerSidePropsResult} from "next/types";

class ReviewServerSideService {

  private readonly apiClient: ApiClient;
  private readonly nullResponse: ReviewResponse;

  private constructor() {
    this.apiClient = ApiConfig.apiClientForServerSide();
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
  }

  public static create = (): ReviewServerSideService => {
    if (typeof window !== "undefined") {
      throw Error(commonError.serverSideServiceOnClientError);
    }
    return new ReviewServerSideService();
  }

  public getReview = async (reviewId: string | number): Promise<GetServerSidePropsResult<{
    reviewResponse: ReviewResponse
  }>> => {
    try {
      const response = await this.apiClient
        .get<ReviewResponse>("/reviews/" + reviewId);
      const reviewResponse = response.data ?? this.nullResponse;
      return {
        props: {
          reviewResponse
        }
      };
    } catch (error) {
      if (isApiResponse(error)) {
        if (error.code === 404) {
          return {
            notFound: true
          };
        }
      }
      return {
        redirect: {
          destination: '/500',
          permanent: false
        }
      };
    }
  }

}

export default ReviewServerSideService;