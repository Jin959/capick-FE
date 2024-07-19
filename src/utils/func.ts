import {DataWithId, StringMap} from "@/types/common";

export function createDataWithId<T>(data: Array<T>): Array<DataWithId<T>>;
export function createDataWithId<T>(data: StringMap<T>, dataFrom?: "key" | "value"): Array<DataWithId<T | string>>;
export function createDataWithId (data: any, dataFrom?: any): any {

  if (!data) {
    console.log("리스트 렌더링 데이터를 생성하는 데 실패했습니다.");
    return [];
  }

  let id = 1;
  if (Array.isArray(data)) {
    return data.map(
      (data) => ({
        id: id++,
        data: data
      })
    );
  } else {
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
}