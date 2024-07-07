import {createContext, Dispatch, ReactElement, useReducer} from "react";

interface State {
  reviewCreateModal: boolean;
}

// TODO: 모달 이름만 디스패치 할 수 있게 string 이 아니라 모달이 늘어나거나 변경되면 모달 이름을 유니언 타입으로 확장
type Action = {
  type: "OPEN_MODAL";
  modal: "reviewCreateModal";
} | {
  type: "CLOSE_MODAL";
  modal: "reviewCreateModal";
}

interface Props {
  children: ReactElement;
}

const initialState: State = {
  reviewCreateModal: false
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