import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NextPage} from "next";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import PageFlexContainer from "@/components/container/PageFlexContainer";
import ArrowBack from "@/../public/icons/google-material-arrow_back.svg"
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link";
import FormContainer from "@/components/container/FormContainer";
import InputWithValidation from "@/components/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import useMemberService from "@/hooks/service/useMemberService";

const Login: NextPage = () => {

  const router = useRouter();
  const emailInput = useRef<HTMLInputElement>(null);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const memberService = useMemberService();
  const showEmailValidationError: boolean = memberService.isNotValidEmailAndNotEmpty(loginInfo.email);

  useEffect(() => {
    emailInput.current?.focus();
  }, []);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setLoginInfo(info => ({...info, [name]: value}));
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
        <FormContainer>
          <InputWithValidation
            name="email"
            placeholder="이메일"
            maxLength={320}
            inputRef={emailInput}
            onChange={handleOnChange}
            validation={showEmailValidationError}
            validationErrorMessages={memberError.validation.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            minLength={8}
            maxLength={20}
            onChange={handleOnChange}
          />
          <Box p="2"></Box>
          <Button colorScheme="brand">로그인</Button>
        </FormContainer>
        <Link href="/signup">
          <Button w="100%">회원가입</Button>
        </Link>
      </PageFlexContainer>
    </>
  );
};

export default Login;