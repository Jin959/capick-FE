import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Box, Button, Text} from "@chakra-ui/react";
import InputWithValidation from "@/components/common/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import FormContainer from "@/components/common/container/FormContainer";
import {useRouter} from "next/router";
import {MemberDispatchContext} from "@/contexts/member";
import useMemberService from "@/hooks/service/useMemberService";

const SignupForm = () => {

  const router = useRouter();
  const nicknameInput = useRef<HTMLInputElement>(null);

  const [signupInfo, setSignupInfo] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatchMember = useContext(MemberDispatchContext);

  const memberService = useMemberService();
  const showNicknameValidationError: boolean = memberService.isNotValidNicknameAndNotEmpty(signupInfo.nickname);
  const showEmailValidationError: boolean = memberService.isNotValidEmailAndNotEmpty(signupInfo.email);
  const showPasswordValidationError: boolean = memberService.isNotValidPasswordAndNotEmpty(signupInfo.password);
  const showPasswordConfirmError: boolean = memberService.isNotPasswordConfirmAndNotEmpty(signupInfo.password, signupInfo.confirmPassword);
  const disableSubmit: boolean = memberService.isNotValidMember(signupInfo.email, signupInfo.password, signupInfo.nickname, signupInfo.confirmPassword);

  useEffect(() => {
    nicknameInput.current?.focus();
  }, []);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setSignupInfo(info => ({...info, [name]: value}));
  }, []);

  const handleOnSubmit = async (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
    try {
      const memberResponse = await memberService.createMember({
        email: signupInfo.email,
        password: signupInfo.password,
        nickname: signupInfo.nickname
      });
      dispatchMember({
        type: "SET_MEMBER",
        id: memberResponse.id,
        nickname: memberResponse.nickname
      });
      window.alert(`🎉${memberResponse.nickname}님 반가워요!\n가입에 성공했습니다!`);
      router.replace("/");
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <FormContainer
      onSubmit={handleOnSubmit}
    >
      <Text fontSize="sm">
        서비스에서 사용할 20자리 이하 닉네임을 입력해주세요.
      </Text>
      <InputWithValidation
        name="nickname"
        placeholder="닉네임"
        minLength={1}
        maxLength={20}
        inputRef={nicknameInput}
        onChange={handleOnChange}
        validation={showNicknameValidationError}
        validationErrorMessages={memberError.validation.nickname}
      />
      <Box p="2"></Box>
      <Text fontSize="sm">
        로그인에 사용할 이메일을 입력해주세요.
      </Text>
      <InputWithValidation
        name="email"
        placeholder="이메일"
        maxLength={320}
        onChange={handleOnChange}
        validation={showEmailValidationError}
        validationErrorMessages={memberError.validation.email}
      />
      <Box p="2"></Box>
      <Text fontSize="sm">
        로그인에 사용할 비밀번호를 입력해주세요.
      </Text>
      <InputWithValidation
        name="password"
        type="password"
        placeholder="비밀번호"
        minLength={8}
        maxLength={20}
        onChange={handleOnChange}
        validation={showPasswordValidationError}
        validationErrorMessages={memberError.validation.password}
      />
      <InputWithValidation
        name="confirmPassword"
        type="password"
        placeholder="비밀번호 확인"
        minLength={8}
        maxLength={20}
        onChange={handleOnChange}
        validation={showPasswordConfirmError}
        validationErrorMessages={memberError.validation.confirmPassword}
      />
      <Button
        colorScheme="brand"
        type="submit"
        isDisabled={disableSubmit && true}
      >
        시작하기
      </Button>
    </FormContainer>
  );
};

export default SignupForm;