import {createContext, Dispatch, ReactElement, useReducer} from "react";
import {StringMap} from "@/types/common";

interface State extends StringMap<string | Array<File>> {
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
}

type Action = {
  type: "INIT_REVIEW";
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
}

interface Props {
  children: ReactElement;
}

const initialState: State = {
  surveyType: "Not Available",
  visitPurpose: "",
  content: "",
  menu: "",
  coffeeIndex: "",
  priceIndex: "",
  spaceIndex: "",
  noiseIndex: "",
  theme: "",
  images: []
}

export const ReviewContext = createContext<State>(initialState);

export const ReviewDispatchContext = createContext<Dispatch<Action>>(() => {});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT_REVIEW":
      return initialState
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