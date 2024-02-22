import {ReactNode} from "react";
import {Box, Flex} from "@chakra-ui/react";
import Header from "@/components/Layout/Header";
import NavigationBar from "@/components/Layout/NavigationBar";


type Props = {
  children: ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <Flex
      direction="column"
    >
      <Header/>
      <Box paddingTop="20"></Box>
      {children}
      <Box paddingTop="20"></Box>
      <NavigationBar/>
    </Flex>
  )
};

export default Layout;