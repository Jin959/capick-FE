import React, {ReactElement} from "react";

interface Props {
  contexts: Array<React.FC<LocalProviderProps>>;
  children: ReactElement;
}

interface LocalProviderProps {
  children: ReactElement;
}

const GlobalProvider = ({contexts, children}: Props): ReactElement => contexts.reduce(
  (acc, Context) => {
    return <Context>{acc}</Context>;
  }, children);

export default GlobalProvider;