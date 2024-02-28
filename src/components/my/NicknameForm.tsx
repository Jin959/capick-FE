import React, {useCallback, useContext, useState} from 'react';
import {Button, Text} from "@chakra-ui/react";
import InputWithValidation from "@/components/common/input/InputWithValidation";
import memberError from "@/apis/error/memberError";
import FormContainer from "@/components/common/container/FormContainer";
import MemberService from "@/apis/service/MemberService";
import {MemberContext, MemberDispatchContext} from "@/contexts/member";

interface Props {
  memberService: MemberService;
}

const NicknameForm = ({memberService}: Props) => {

  const [nickname, setNickname] = useState("");
  const showNicknameValidationError: boolean = memberService.isNotValidNicknameAndNotEmpty(nickname);
  const disableSubmit: boolean = memberService.isNotValidNickname(nickname);
  const member = useContext(MemberContext);
  const dispatchMember = useContext(MemberDispatchContext);

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(() => event.target.value);
  }, []);

  const handleOnSubmit = async (
    event: (React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>)
  ) => {
    event.preventDefault();
    try {
      const memberResponse = await memberService.updateMemberNickname({
        id: member.id,
        nickname: nickname
      });
      dispatchMember({
        type: "SET_MEMBER",
        id: memberResponse.id,
        nickname: memberResponse.nickname
      });
      window.alert(`닉네임 변경에 성공했습니다!`);
      setNickname("");
    } catch (error) {
      window.alert(error);
    }
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
        value={nickname}
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