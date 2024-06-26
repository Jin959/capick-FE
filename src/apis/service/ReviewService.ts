import ApiClient from "@/apis/client/ApiClient";
import ApiConfig from "@/apis/ApiConfig";

class ReviewService {

  private static readonly SURVEY_END: string = "end";

  private readonly apiClient: ApiClient;
  private readonly surveyTypes: Array<string>;
  private readonly surveyTypesWithDirectInput: Array<string>;

  private constructor() {
    this.apiClient = ApiConfig.apiClient();
    this.surveyTypes = ["visitPurpose", "theme", "menu", "coffeeIndex", "priceIndex", "spaceIndex", "noiseIndex"];
    this.surveyTypesWithDirectInput = ["visitPurpose", "menu"];
  }

  public static create = (): ReviewService => {
    return new ReviewService();
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

  public getFirstSurvey = () => {
    return this.surveyTypes[0];
  }

  public isSurveyEnd = (surveyType: string) => {
    return surveyType === ReviewService.SURVEY_END;
  }

  public isNeedDirectInput = (surveyType: string) => {
    return this.surveyTypesWithDirectInput.indexOf(surveyType) !== -1
  }

}

export default ReviewService;