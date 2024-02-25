import React from 'react';
import {NextPage} from "next";
import {Heading} from "@chakra-ui/react";
import PageFlexContainer from "@/components/common/container/PageFlexContainer";
import BackButton from "@/components/common/button/BackButton";
import SignupForm from "@/components/signup/SignupForm";

const Signup: NextPage = () => {

  return (
    <>
      <BackButton/>
      <PageFlexContainer>
        <Heading size="md" textAlign="center">
          회원가입
        </Heading>
        <SignupForm/>
      </PageFlexContainer>
    </>
  );
};

export default Signup;