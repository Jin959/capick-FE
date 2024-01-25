import {ReactNode} from "react";
import {Flex} from "@chakra-ui/react";
import Header from "@/components/Layout/Header";


type Props = {
  children: ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <Flex
      direction="column"
    >
      <Header/>
      {children}
    </Flex>
  )
};

export default Layout;