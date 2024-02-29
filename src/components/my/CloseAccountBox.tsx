import React, {useState} from 'react';
import MemberService from "@/apis/service/MemberService";
import {Button, Checkbox, ListItem, UnorderedList} from "@chakra-ui/react";
import BoxContainer from "@/components/common/container/BoxContainer";

interface Props {
  memberService: MemberService;
}

const CloseAccountBox = ({memberService}: Props) => {

  const [agreement, setAgreement] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(event.target.checked);
  };

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  };

  return (
    <BoxContainer>
      <UnorderedList
        color="red"
      >
        <ListItem>회원 탈퇴 이후 계정을 복구할 수 없습니다.</ListItem>
        <ListItem>회원 탈퇴를 하게 되면 더 이상 리뷰, 댓글과 같이 작성한 글을 수정 및 삭제할 수 없습니다.</ListItem>
      </UnorderedList>
      <Checkbox
        onChange={handleOnChange}
      >
        상기 내용을 확인했고 동의하면 체크해주세요.
      </Checkbox>
      <Button
        colorScheme="red"
        type="button"
        onClick={handleOnClick}
      >
        회원탈퇴
      </Button>
    </BoxContainer>
  );
};

export default CloseAccountBox;