import MemberService from "@/apis/service/MemberService";
import {useRef} from "react";

type UseMemberService = () => MemberService;

const useMemberService: UseMemberService = () => {
  const memberServiceRef = useRef<MemberService | null>(null);
  const memberService: MemberService = (() => {
    if (memberServiceRef.current === null) {
      memberServiceRef.current = MemberService.create();
    }
    return memberServiceRef.current;
  })();

  return memberService;
}

export default useMemberService;