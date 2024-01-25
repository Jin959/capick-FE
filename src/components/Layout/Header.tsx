import React from "react";
import {Button, Flex} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/capick-logo-en.svg";

const Header = () => {

  const router = useRouter();

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
      <Button
        variant="solid"
        onClick={() => router.push("/login")}
      >
        로그인
      </Button>
    </Flex>
  );
};

export default Header;