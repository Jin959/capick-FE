import React, {useContext} from "react";
import {Avatar, Box, Button, Flex, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/capick-logo-en.svg";
import {MemberContext} from "@/contexts/member";

const Header = () => {

  const router = useRouter();
  const member = useContext(MemberContext);

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
          <Text>{member.nickname}</Text>
          <Box p="2"/>
          <Avatar/>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;