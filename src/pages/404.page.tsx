import React from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import commonError from "@/apis/error/commonError";
import {Box, Heading, Text} from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Box p="10"></Box>
        <Heading size="md" textAlign="center">
          404 Not Found
        </Heading>
        <Text fontSize="xl">
          {commonError.notFoundPage}
        </Text>
      </PageFlexContainer>
    </>
  );
};

export default NotFoundPage;