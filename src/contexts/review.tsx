import {createContext, Dispatch, ReactElement, useReducer} from "react";
import {StringMap} from "@/types/common";

interface State extends StringMap<number | string | Array<File> | Array<string>> {
  id: number;
  surveyType: string;
  visitPurpose: string;
  content: string;
  menu: string;
  coffeeIndex: string;
  priceIndex: string;
  spaceIndex: string;
  noiseIndex: string;
  theme: string;
  images: Array<File>;
  preservedImageUrls: Array<string>;
}

type Action = {
  type: "INIT_REVIEW";
} | {
  type: "SET_REVIEW_WITH_INIT";
  id: number;
  visitPurpose: string;
  menu: string;
  content: string;
  coffeeIndex: string;
  priceIndex: string;
  spaceIndex: string;
  noiseIndex: string;
  theme: string;
  preservedImageUrls: Array<string>;
} | {
  type: "SET_SURVEY_TYPE";
  surveyType: string;
} | {
  type: "SET_SURVEY_OPTION";
  surveyType: string;
  option: string;
} | {
  type: "SET_CONTENT";
  content: string;
} | {
  type: "SET_IMAGES";
  images: Array<File>;
} | {
  type: "SET_PRESERVED_IMAGE_URLS";
  preservedImageUrls: Array<string>;
}

interface Props {
  children: ReactElement;
}

const initialState: State = {
  id: 0,
  surveyType: "Not Available",
  visitPurpose: "",
  content: "",
  menu: "",
  coffeeIndex: "",
  priceIndex: "",
  spaceIndex: "",
  noiseIndex: "",
  theme: "",
  images: [],
  preservedImageUrls: []
}

export const ReviewContext = createContext<State>(initialState);

export const ReviewDispatchContext = createContext<Dispatch<Action>>(() => {});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT_REVIEW":
      return initialState
    case "SET_REVIEW_WITH_INIT":
      return {
        ...initialState,
        id: action.id,
        visitPurpose: action.visitPurpose,
        menu: action.menu,
        content: action.content,
        coffeeIndex: action.coffeeIndex,
        priceIndex: action.priceIndex,
        spaceIndex: action.spaceIndex,
        noiseIndex: action.noiseIndex,
        theme: action.theme,
        preservedImageUrls: action.preservedImageUrls
      }
    case "SET_SURVEY_TYPE":
      return {
        ...state,
        surveyType: action.surveyType
      }
    case "SET_SURVEY_OPTION":
      return {
        ...state,
        [action.surveyType]: action.option
      }
    case "SET_CONTENT":
      return {
        ...state,
        content: action.content
      }
    case "SET_IMAGES":
      return {
        ...state,
        images: action.images
      }
    case "SET_PRESERVED_IMAGE_URLS":
      return {
        ...state,
        preservedImageUrls: action.preservedImageUrls
      }
    default:
      throw new Error("존재하지 않는 액션입니다.");
  }
}

const ReviewProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReviewContext.Provider value={state}>
      <ReviewDispatchContext.Provider value={dispatch}>
        {children}
      </ReviewDispatchContext.Provider>
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;