import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import Link from "next/link";
import HomeIcon from "@/../public/icons/google-material-home_FILL0_wght400_GRAD0_opsz24.svg";
import LocationIcon from "@/../public/icons/google-material-location_on_FILL0_wght400_GRAD0_opsz24.svg";
import MyCapickIcon from "@/../public/icons/google-material-person_FILL1_wght400_GRAD0_opsz24.svg";
import Image from "next/image";

const NavigationBar = () => {

  const NavigationContents = [
    {
      id: 1,
      link: "/",
      name: "내 근처",
      icon: LocationIcon,
      alt: "Nearby"
    },
    {
      id: 2,
      link: "/",
      name: "홈",
      icon: HomeIcon,
      alt: "Home"
    },
    {
      id: 3,
      link: "/",
      name: "마이 까픽",
      icon: MyCapickIcon,
      alt: "MyCapick"
    }
  ];

  return (
    <Flex
      as="nav"
      padding="2"
      borderTop="1px"
      borderEndRadius="base"
      borderColor="border.layout"
      justifyContent="space-around"
      alignItems="center"
      pos="fixed"
      bottom="0"
      w="full"
      maxWidth="layout.maxWidth"
      bg="white"
      zIndex="sticky"
    >
      {NavigationContents.map((content) =>
        <Link
          key={content.id}
          href={content.link}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={content.icon}
              alt={content.alt}
            />
            <Text
              as="span"
              fontSize="xs"
            >
              {content.name}
            </Text>
          </Flex>
        </Link>)
      }
    </Flex>
  );
};

export default NavigationBar;