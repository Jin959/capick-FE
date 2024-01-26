import React, {useEffect, useRef} from 'react';
import {NextPage} from "next";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import PageFlexContainer from "@/components/container/PageFlexContainer";
import ArrowBack from "@/../public/icons/google-material-arrow_back.svg"
import Image from "next/image";
import {useRouter} from "next/router";
import styled from "@emotion/styled";

const Login: NextPage = () => {

  const router = useRouter();
  const emailInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInput.current?.focus();
  }, []);

  return (
    <>
      <Button
        m="2" w="fit-content"
        onClick={() => router.back()}
      >
        <Image src={ArrowBack} alt="GoBack"/>
      </Button>
      <PageFlexContainer>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">동내 까페 생활의 시작, 까픽</Heading>
        <Text textAlign="center">커피, 공간 리뷰, 까페의 모든 것</Text>
        <Box p="8"></Box>
        <SubmitForm>
          <Input
            placeholder="이메일"
            maxLength={320}
            ref={emailInput}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            minLength={8}
            maxLength={20}
          />
          <Box p="2"></Box>
          <Button colorScheme="brand">로그인</Button>
        </SubmitForm>
        <Button>회원가입</Button>
      </PageFlexContainer>
    </>
  );
};

export default Login;

const SubmitForm = styled.form`
  & > * {
    margin-top: 10px;
    width: 100%;
  }
`;