import React from 'react';
import {NextPage} from "next";
import {Box, Button, Heading, ListItem, UnorderedList} from "@chakra-ui/react";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import BackButton from "@/components/common/button/BackButton";
import ProfileForm from "@/components/my/ProfileForm";
import NicknameForm from "@/components/my/NicknameForm";
import PasswordForm from "@/components/my/PasswordForm";
import useMemberService from "@/hooks/service/useMemberService";

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