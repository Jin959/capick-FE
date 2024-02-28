import React, {useCallback, useEffect, useRef, useState} from 'react';
import InputWithValidation from "@/components/common/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import {Box, Button, Input} from "@chakra-ui/react";
import FormContainer from "@/components/common/container/FormContainer";
import useMemberService from "@/hooks/service/useMemberService";

const LoginForm = () => {

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
  );
};

export default LoginForm;