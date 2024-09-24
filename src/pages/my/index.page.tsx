import React from 'react';
import {NextPage} from "next";
import {Box, Button, Heading} from "@chakra-ui/react";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import BackButton from "@/components/common/button/BackButton";
import ProfileForm from "@/components/member/ProfileForm";
import NicknameForm from "@/components/member/NicknameForm";
import PasswordForm from "@/components/member/PasswordForm";
import useMemberService from "@/hooks/service/useMemberService";
import CloseAccountBox from "@/components/member/CloseAccountBox";

const My: NextPage = () => {

  const memberService = useMemberService();

  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Heading size="md" textAlign="center">
          프로필
        </Heading>
        <ProfileForm
          memberService={memberService}
        />
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
        <NicknameForm
          memberService={memberService}
        />
        <PasswordForm
          memberService={memberService}
        />
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">
          로그아웃
        </Heading>
        <Button>
          로그아웃
        </Button>
        <Box p="2"></Box>
        <Heading size="md" textAlign="center">
          회원탈퇴
        </Heading>
        <CloseAccountBox
          memberService={memberService}
        />
      </PageFlexContainer>
    </>
  );
};

export default My;