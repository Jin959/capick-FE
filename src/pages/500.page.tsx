import React from 'react';
import BackButton from "@/components/common/button/BackButton";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import {Box, Heading, Text} from "@chakra-ui/react";
import commonError from "@/apis/error/commonError";

const InternalServerErrorPage = () => {
  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Box p="10"></Box>
        <Heading size="md" textAlign="center">
           500 Internal Server Error
        </Heading>
        <Text fontSize="xl">
          {commonError.connection}
        </Text>
        <Text fontSize="xl">
          그래도 해결되지 않는다면, {commonError.internalServer}
        </Text>
      </PageFlexContainer>
    </>
  );
};

export default InternalServerErrorPage;