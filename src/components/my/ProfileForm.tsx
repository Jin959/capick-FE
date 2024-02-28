import React, {useContext} from 'react';
import {Avatar, AvatarBadge, Box, Button, Flex, Textarea} from "@chakra-ui/react";
import Image from "next/image";
import UploadIcon from "@/../public/icons/google-material-upload_file_FILL0_wght400_GRAD0_opsz24.svg";
import FormContainer from "@/components/common/container/FormContainer";
import {MemberContext} from "@/contexts/member";
import MemberService from "@/apis/service/MemberService";

interface Props {
  memberService: MemberService;
}

const ProfileForm = ({memberService}: Props) => {

  const member = useContext(MemberContext);

  const handleOnSubmit = (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
  }


  return (
    <FormContainer
      onSubmit={handleOnSubmit}
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
  );
};

export default ProfileForm;