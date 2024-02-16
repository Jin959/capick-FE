import React, {useContext, useEffect, useRef} from "react";
import {Avatar, Box, Button, Flex, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/capick-logo-en.svg";
import {MemberContext, MemberDispatchContext} from "@/contexts/member";
import MemberService from "@/apis/service/MemberService";

const Header = () => {

  const router = useRouter();
  const member = useContext(MemberContext);
  const dispatchMember = useContext(MemberDispatchContext);
  const memberService = useRef(MemberService.create()).current;

  useEffect(() => {
    if (member.id === 0) return;
    (async () => {
      try {
        const memberResponse = await memberService.getMember(member.id);
        dispatchMember({
          type: "SET_PROFILE",
          profile: memberResponse.profile
        });
      } catch (error) {
        window.alert(error);
      }
    })();
  }, [member.id]);

  return (
    <Flex
      padding="2"
      borderBottom="1px"
      borderEndRadius="base"
      borderColor="border.layout"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/">
        <Image
          src={Logo}
          alt="CaPick"
        />
      </Link>
      {member.id === 0 ? (
        <Button
          variant="solid"
          onClick={() => router.push("/login")}
        >
          로그인
        </Button>
      ) : (
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Text as='b'>
            {member.nickname}
          </Text>
          <Box p="2"/>
          <Avatar src={member.profile?.imageUrl}/>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;