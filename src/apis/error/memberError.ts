const memberError = {
  validation: {
    nickname: [
      "특수문자는 마침표(.), 밑줄(_) 만 사용할 수 있습니다."
    ],
    email: [
      "example@gmail.com 처럼 이메일 형식에 맞아야 해요."
    ],
    password: [
      "영문/숫자/특수문자를 모두 사용해야 합니다.",
      "띄어쓰기 없이 영문/숫자/특수문자 8~20 자리로 작성해주세요.",
      "특수문자는 !, @, #, $, %, ^, &, *, (, ), ? 를 사용할 수 있습니다."
    ],
    confirmPassword: [
      "비밀번호가 일치하지 않습니다."
    ]
  },
  password: {
    duplicate: "기존 비밀번호와 새 비밀번호는 같을 수 없습니다. 새로운 비밀번호를 입력해주세요"
  },
  deleteAccount: {
    notAgreed: "탈퇴 주의 사항을 확인하고 동의해주세요."
  }
};

export default memberError;