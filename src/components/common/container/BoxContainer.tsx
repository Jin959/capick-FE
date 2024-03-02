import styled from "@emotion/styled";
import {Box} from "@chakra-ui/react";

const BoxContainer = styled(Box)`
  & > * {
    margin-top: 10px;
    width: 100%;
  }
`;

export default BoxContainer;