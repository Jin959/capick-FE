import {createContext, Dispatch, ReactElement, useReducer} from "react";

interface State {
  id: number;
  nickname: string;
}

type Action = {
  type: "SET_MEMBER";
  id: number;
  nickname: string;
}

interface Props {
  children: ReactElement;
}

export const MemberContext = createContext<State>({
  id: 0,
  nickname: ""
});
export const MemberDispatchContext = createContext<Dispatch<Action>>(() => {});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MEMBER":
      return {
        ...state,
        id: action.id,
        nickname: action.nickname,
      }
    default:
      throw new Error("존재하지 않는 액션입니다.");
  }
}

const MemberProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    id: 0,
    nickname: ""
  });

  return (
    <MemberContext.Provider value={state}>
      <MemberDispatchContext.Provider value={dispatch}>
        {children}
      </MemberDispatchContext.Provider>
    </MemberContext.Provider>
  );
};

export default MemberProvider;