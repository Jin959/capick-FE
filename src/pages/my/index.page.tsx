import React, {useCallback, useContext, useState} from 'react';
import {NextPage} from "next";
import Image from "next/image";
import ArrowBack from "@/../public/icons/google-material-arrow_back.svg";
import UploadIcon from "@/../public/icons/google-material-upload_file_FILL0_wght400_GRAD0_opsz24.svg";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Text,
  Textarea,
  UnorderedList
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import PageFlexContainer from "@/components/container/PageFlexContainer";
import FormContainer from "@/components/container/FormContainer";
import InputWithValidation from "@/components/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import useMemberService from "@/hooks/service/useMemberService";
import {MemberContext} from "@/contexts/member";

const My: NextPage = () => {
  const router = useRouter();
  const member = useContext(MemberContext);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleOnChangeNickname = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(nickname => event.target.value);
  }, []);
  const handleOnChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPassword(info => ({...info, [name]: value}));
  }, []);

  const memberService = useMemberService();

  const showNicknameValidationError: boolean = memberService.isNotValidNicknameAndNotEmpty(nickname);
  const showPasswordValidationError: boolean = memberService.isNotValidPasswordAndNotEmpty(password.password);
  const showNewPasswordValidationError: boolean = memberService.isNotValidPasswordAndNotEmpty(password.newPassword);
  const showPasswordConfirmError: boolean = memberService.isNotPasswordConfirmAndNotEmpty(password.newPassword, password.confirmPassword);


  const onHandleSubmitProfile = (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
  }
  const onHandleSubmitNickname = (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
  }
  const onHandleSubmitPassword = (
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
        <Heading size="md" textAlign="center">
          프로필
        </Heading>
        <FormContainer
          onSubmit={onHandleSubmitProfile}
        >
          <Flex
            justifyContent="space-around"
            alignItems="center"
          >
            <Avatar
              src={member.profile?.imageUrl}
              size="lg"
              cursor="pointer"
            >
              <AvatarBadge
                boxSize="1.5em"
                bg="white"
                borderColor="transparent"
                cursor="pointer"
              >
                <Image src={UploadIcon} alt="Upload"/>
              </AvatarBadge>
            </Avatar>
            <Box p="2"/>
            <Textarea
              name="introduction"
              placeholder="자기소개"
              resize="none"
              maxLength={100}
            />
          </Flex>
          <Button
            colorScheme="brand"
            type="submit"
          >
            프로필 변경
          </Button>
        </FormContainer>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">
          나의 활동
        </Heading>
        <Button
          colorScheme="brand"
        >
          내가 작성한 글
        </Button>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">
          회원 정보 변경
        </Heading>
        <FormContainer
          onSubmit={onHandleSubmitNickname}
        >
          <Text fontSize="sm">
            변경할 닉네임
          </Text>
          <InputWithValidation
            name="nickname"
            placeholder="20 자리 이하"
            minLength={1}
            maxLength={20}
            onChange={handleOnChangeNickname}
            validation={showNicknameValidationError}
            validationErrorMessages={memberError.validation.nickname}
          />
          <Button
            colorScheme="brand"
            type="submit"
            isDisabled={showNicknameValidationError && true}
          >
            닉네임 변경
          </Button>
        </FormContainer>
        <FormContainer
          onSubmit={onHandleSubmitPassword}
        >
          <Text fontSize="sm">
            현재 비밀번호
          </Text>
          <InputWithValidation
            name="password"
            type="password"
            placeholder="영문/숫자/특수문자 포함 8~20 자리"
            minLength={8}
            maxLength={20}
            onChange={handleOnChangePassword}
            validation={showPasswordValidationError}
            validationErrorMessages={memberError.validation.password}
          />
          <Text fontSize="sm">
            새 비밀번호
          </Text>
          <InputWithValidation
            name="newPassword"
            type="password"
            placeholder="영문/숫자/특수문자 포함 8~20 자리"
            minLength={8}
            maxLength={20}
            onChange={handleOnChangePassword}
            validation={showNewPasswordValidationError}
            validationErrorMessages={memberError.validation.password}
          />
          <InputWithValidation
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            minLength={8}
            maxLength={20}
            onChange={handleOnChangePassword}
            validation={showPasswordConfirmError}
            validationErrorMessages={memberError.validation.confirmPassword}
          />
          <Button
            colorScheme="brand"
            type="submit"
            isDisabled={(
              showPasswordValidationError
              || showNewPasswordValidationError
              || showPasswordConfirmError
            ) && true}
          >
            비밀번호 변경
          </Button>
        </FormContainer>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">로그아웃</Heading>
        <Button>
          로그아웃
        </Button>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">회원탈퇴</Heading>
        <UnorderedList
          color="red"
        >
          <ListItem>회원 탈퇴 이후 계정을 복구할 수 없습니다.</ListItem>
          <ListItem>회원 탈퇴를 하게 되면 더이상 리뷰, 댓글과 같이 작성한 글을 수정 및 삭제 할 수 없습니다.</ListItem>
        </UnorderedList>
        <Button
          colorScheme="red"
        >
          회원탈퇴
        </Button>
      </PageFlexContainer>
    </>
  );
};

export default My;