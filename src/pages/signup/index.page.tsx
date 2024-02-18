import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {NextPage} from "next";
import {Button, Text, Heading, Box} from "@chakra-ui/react";
import ArrowBack from "@/../public/icons/google-material-arrow_back.svg"
import {useRouter} from "next/router";
import PageFlexContainer from "@/components/container/PageFlexContainer";
import Image from "next/image";
import FormContainer from "@/components/container/FormContainer";
import MemberService from "@/apis/service/MemberService";
import {MemberDispatchContext} from "@/contexts/member";
import InputWithValidation from "@/components/input/InputWithValidation";
import memberError from "@/apis/error/memberError";

const Signup: NextPage = () => {

  const router = useRouter();
  const nicknameInput = useRef<HTMLInputElement>(null);

  const [member, setMember] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatchMember = useContext(MemberDispatchContext);

  const memberService = useRef(MemberService.create()).current;

  const showNicknameValidationError: boolean = memberService.isNotValidNicknameAndNotEmpty(member.nickname);
  const showEmailValidationError: boolean = memberService.isNotValidEmailAndNotEmpty(member.email);
  const showPasswordValidationError: boolean = memberService.isNotValidPasswordAndNotEmpty(member.password);
  const showPasswordConfirmError: boolean = memberService.isNotPasswordConfirmAndNotEmpty(member.password, member.confirmPassword);
  const disableSubmit: boolean = memberService.isNotValidMember(member.email, member.password, member.nickname, member.confirmPassword);

  useEffect(() => {
    nicknameInput.current?.focus();
  }, []);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setMember(member => ({...member, [name]: value}));
  }, []);

  const handleOnSubmit = async (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
    try {
      const memberResponse = await memberService.createMember({
        email: member.email,
        password: member.password,
        nickname: member.nickname
      });
      dispatchMember({
        type: "SET_MEMBER",
        id: memberResponse.id,
        nickname: memberResponse.nickname
      });
      window.alert(`🎉${member.nickname}님 반가워요!\n가입에 성공했습니다!`);
      router.replace("/");
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <>
      <Button
        m="2" w="fit-content"
        onClick={() => router.back()}
      >
        <Image src={ArrowBack} alt="GoBack"/>
      </Button>
      <PageFlexContainer>
        <FormContainer
          onSubmit={handleOnSubmit}
        >
          <Heading size="md" textAlign="center">회원가입</Heading>
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
      </PageFlexContainer>
    </>
  );
};

export default Signup;