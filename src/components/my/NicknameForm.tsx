import React, {useCallback, useState} from 'react';
import {Button, Text} from "@chakra-ui/react";
import InputWithValidation from "@/components/common/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import FormContainer from "@/components/common/container/FormContainer";
import MemberService from "@/apis/service/MemberService";

interface Props {
  memberService: MemberService;
}

const NicknameForm = ({memberService}: Props) => {

  const [nickname, setNickname] = useState("");
  const showNicknameValidationError: boolean = memberService.isNotValidNicknameAndNotEmpty(nickname);
  const disableSubmit: boolean = memberService.isNotValidNickname(nickname);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(nickname => event.target.value);
  }, []);

  const handleOnSubmit = (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
  }


  return (
    <FormContainer
      onSubmit={handleOnSubmit}
    >
      <Text fontSize="sm">
        변경할 닉네임
      </Text>
      <InputWithValidation
        name="nickname"
        placeholder="20 자리 이하"
        minLength={1}
        maxLength={20}
        onChange={handleOnChange}
        validation={showNicknameValidationError}
        validationErrorMessages={memberError.validation.nickname}
      />
      <Button
        colorScheme="brand"
        type="submit"
        isDisabled={disableSubmit && true}
      >
        닉네임 변경
      </Button>
    </FormContainer>
  );
};

export default NicknameForm;