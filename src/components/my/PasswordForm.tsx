import React, {useCallback, useState} from 'react';
import {Button, Input, Text} from "@chakra-ui/react";
import InputWithValidation from "@/components/common/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import FormContainer from "@/components/common/container/FormContainer";
import MemberService from "@/apis/service/MemberService";

interface Props {
  memberService: MemberService;
}

const PasswordForm = ({memberService}: Props) => {

  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const showNewPasswordValidationError: boolean = memberService.isNotValidPasswordAndNotEmpty(password.newPassword);
  const showPasswordConfirmError: boolean = memberService.isNotPasswordConfirmAndNotEmpty(password.newPassword, password.confirmPassword);
  const disableSubmit: boolean = memberService.isNotValidPasswordChange(password.password, password.newPassword, password.confirmPassword);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPassword(info => ({...info, [name]: value}));
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
        현재 비밀번호
      </Text>
      <Input
        name="password"
        type="password"
        placeholder="사용 중인 비밀번호"
        minLength={8}
        maxLength={20}
        onChange={handleOnChange}
      />
      <Text fontSize="sm">
        새 비밀번호
      </Text>
      <InputWithValidation
        name="newPassword"
        type="password"
        placeholder="영문/숫자/특수문자 포함 8~20 자리"
        minLength={8}
        maxLength={20}
        onChange={handleOnChange}
        validation={showNewPasswordValidationError}
        validationErrorMessages={memberError.validation.password}
      />
      <InputWithValidation
        name="confirmPassword"
        type="password"
        placeholder="비밀번호 확인"
        minLength={8}
        maxLength={20}
        onChange={handleOnChange}
        validation={showPasswordConfirmError}
        validationErrorMessages={memberError.validation.confirmPassword}
      />
      <Button
        colorScheme="brand"
        type="submit"
        isDisabled={disableSubmit && true}
      >
        비밀번호 변경
      </Button>
    </FormContainer>
  );
};

export default PasswordForm;