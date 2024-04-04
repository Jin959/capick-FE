import Kakao from "@/types/kakao/Kakao";

export {};

declare global {
  interface Window {
    kakao: Kakao;
  }
}