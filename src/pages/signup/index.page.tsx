import React, {useEffect, useRef, useState} from 'react';
import {NextPage} from "next";
import {Button, Text, Heading, Input, Box} from "@chakra-ui/react";
import ArrowBack from "@/../public/icons/google-material-arrow_back.svg"
import {useRouter} from "next/router";
import PageFlexContainer from "@/components/container/PageFlexContainer";
import Image from "next/image";
import FormContainer from "@/components/container/FormContainer";
import MemberService from "@/apis/service/MemberService";

const Signup: NextPage = () => {

  const router = useRouter();
  const nicknameInput = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const memberService = useRef(MemberService.create()).current;

  const showNicknameValidationError: boolean = memberService.isNotValidNicknameAndNotEmpty(nickname);
  const showEmailValidationError: boolean = memberService.isNotValidEmailAndNotEmpty(email);
  const showPasswordValidationError: boolean = memberService.isNotValidPasswordAndNotEmpty(password);
  const showPasswordConfirmError: boolean = memberService.isNotPasswordConfirmAndNotEmpty(password, confirmPassword);
  const disableSubmit: boolean = memberService.isNotValidMember(email, password, nickname, confirmPassword)

  useEffect(() => {
    nicknameInput.current?.focus();
  }, []);

  const handleOnSubmit = (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
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
          <Input
            placeholder="닉네임"
            minLength={1}
            maxLength={20}
            ref={nicknameInput}
            onChange={(event) => setNickname(event.target.value)}
          />
          <Text fontSize="sm">
            서비스에서 사용할 20자리 이하 닉네임을 입력해주세요.
          </Text>
          {showNicknameValidationError &&
            <Text fontSize="sm" color="red.500">
              특수문자는 마침표(.), 밑줄(_) 만 사용할 수 있습니다.
            </Text>
          }
          <Box p="2"></Box>
          <Input
            placeholder="이메일"
            maxLength={320}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Text fontSize="sm">
            로그인에 사용할 이메일을 입력해주세요.
          </Text>
          {showEmailValidationError &&
            <Text fontSize="sm" color="red.500">
              example@gmail.com 처럼 이메일 형식에 맞아야 해요.
            </Text>
          }
          <Box p="2"></Box>
          <Input
            placeholder="비밀번호"
            type="password"
            minLength={8}
            maxLength={20}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            placeholder="비밀번호 확인"
            type="password"
            minLength={8}
            maxLength={20}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <Text fontSize="sm">
            띄어쓰기 없이 영문/숫자/특수문자 8~20 자리로 작성해주세요.
          </Text>
          {showPasswordValidationError &&
            <>
              <Text fontSize="sm" color="red.500">
                영문/숫자/특수문자를 모두 사용해야 합니다.
              </Text>
              <Text fontSize="sm" color="red.500">
                특수문자는 !, @, #, $, %, ^, &, *, (, ), ? 를 사용할 수 있습니다.
              </Text>
            </>
          }
          {showPasswordConfirmError &&
            <Text fontSize="sm" color="red.500">
              비밀번호가 일치하지 않습니다.
            </Text>
          }
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