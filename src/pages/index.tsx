import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box bg="brand.main">
      <Flex color='white' alignItems="center" justifyContent="space-between">Home</Flex>
    </Box>
  );
};

export default Home;
