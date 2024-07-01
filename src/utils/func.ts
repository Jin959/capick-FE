import {StringMap} from "@/types/common";

interface DataWithId<T> {
  id: number;
  data: T;
}

export const createArrayDataWithId = <T>(data: Array<T>): Array<DataWithId<T>> => {

  if (!data) {
    console.log("렌더링 리스트 데이터를 생성하는 데 실패했습니다.");
    return [];
  }

  let id = 1;
  return data.map(
    (data) => ({
      id: id++,
      data: data
    })
  );
}

export const createStringMapDataWithId = <T>(data: StringMap<T>, dataFrom?: "key" | "value"): Array<DataWithId<T | string>> => {

  if (!data) {
    console.log("렌더링 리스트 데이터를 생성하는 데 실패했습니다.");
    return [];
  }

  let id = 1;
  if (dataFrom === "key") {
    return Object.keys(data).map(
      data => ({
        id: id++,
        data: data
      })
    );
  } else {
    return Object.values(data).map(
      data => ({
        id: id++,
        data: data
      })
    );
  }
}