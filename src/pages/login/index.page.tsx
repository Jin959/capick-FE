import React from 'react';
import {NextPage} from "next";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import Link from "next/link";
import BackButton from "@/components/common/button/BackButton";
import LoginForm from "@/components/login/LoginForm";

const Login: NextPage = () => {

  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">
          동내 까페 생활의 시작, 까픽
        </Heading>
        <Text textAlign="center">
          커피, 공간 리뷰, 까페의 모든 것
        </Text>
        <Box p="8"></Box>
        <LoginForm/>
        <Link href="/signup">
          <Button w="100%">회원가입</Button>
        </Link>
      </PageFlexContainer>
    </>
  );
};

export default Login;