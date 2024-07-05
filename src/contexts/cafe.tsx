import {createContext, Dispatch, ReactElement, useReducer} from "react";

interface State {
  name: string;
  kakaoPlaceId: string;
  kakaoDetailPageUrl: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
    roadAddress: string;
  };
}

type Action = {
  type: "SET_CAFE"
  name: string;
  kakaoPlaceId: string;
  kakaoDetailPageUrl: string;
} | {
  type: "SET_LOCATION"
  latitude: number;
  longitude: number;
  address: string;
  roadAddress: string;
}

interface Props {
  children: ReactElement;
}

const initialState: State = {
  name: "Not Available",
  kakaoPlaceId: "Not Available",
  kakaoDetailPageUrl: "Not Available",
  location: {
    latitude: 0,
    longitude: 0,
    address: "Not Available",
    roadAddress: "Not Available"
  }
}

export const CafeContext = createContext<State>(initialState);
export const CafeDispatchContext = createContext<Dispatch<Action>>(() => {});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_CAFE":
      return {
        ...state,
        name: action.name,
        kakaoPlaceId: action.kakaoPlaceId,
        kakaoDetailPageUrl: action.kakaoDetailPageUrl
      }
    case "SET_LOCATION":
      return {
        ...state,
        location: {
          ...state.location,
          latitude: action.latitude,
          longitude: action.longitude,
          address: action.address,
          roadAddress: action.roadAddress
        }
      }
    default:
      throw new Error("존재하지 않는 액션입니다.");
  }
}

const CafeProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CafeContext.Provider value={state}>
      <CafeDispatchContext.Provider value={dispatch}>
        {children}
      </CafeDispatchContext.Provider>
    </CafeContext.Provider>
  );
};

export default CafeProvider;