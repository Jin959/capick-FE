import {createContext, Dispatch, ReactElement, useReducer} from "react";

interface State {
  imageModal: boolean;
  alertModal: boolean;
  reviewCreateModal: boolean;
  reviewUpdateModal: boolean;
}

type Action = {
  type: "OPEN_MODAL";
  modal: "imageModal" | "alertModal" | "reviewCreateModal" | "reviewUpdateModal";
} | {
  type: "CLOSE_MODAL";
  modal: "imageModal" | "alertModal" | "reviewCreateModal" | "reviewUpdateModal";
}

interface Props {
  children: ReactElement;
}

const initialState: State = {
  imageModal: false,
  alertModal: false,
  reviewCreateModal: false,
  reviewUpdateModal: false
}

export const ModalContext = createContext<State>(initialState);
export const ModalDispatchContext = createContext<Dispatch<Action>>(() => {});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        [action.modal]: true
      }
    case "CLOSE_MODAL":
      return {
        ...state,
        [action.modal]: false
      }
    default:
      throw new Error("존재하지 않는 액션입니다.");
  }
}

const ModalProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

export default ModalProvider;