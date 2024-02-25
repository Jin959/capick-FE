import React from 'react';
import Image from "next/image";
import ArrowBackIcon from "@/../public/icons/google-material-arrow_back.svg";
import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";

const BackButton = () => {

  const router = useRouter();

  return (
    <>
      <Button
        m="2" w="fit-content"
        onClick={() => router.back()}
      >
        <Image src={ArrowBackIcon} alt="GoBack"/>
      </Button>
    </>
  );
};

export default BackButton;