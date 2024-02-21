import styled from "@emotion/styled";
import {Flex} from "@chakra-ui/react";

const PageFlexContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & > * {
    margin: 10px;
    width: 80%;
  }
`;

export default PageFlexContainer;