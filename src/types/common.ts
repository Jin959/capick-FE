export interface StringMap<T> {
  [key: string]: T;
}

// TODO: utils.func 에서 가져온 리스트 렌더링을 위한 타입, 더 좋은 네이밍이나 WET 하게 사용하는 곳 마다 다시 적을지 생각하기
export interface DataWithId<T> {
  id: number;
  data: T;
}