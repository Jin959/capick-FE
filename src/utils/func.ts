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

export const isImageFileExtension = (image: File): boolean => {
  const imageExtensions = [
    "image/jpg", "image/jpeg", "image/bmp", "image/gif", "image/png", "image/mpeg"
  ];
  return imageExtensions.indexOf(image.type) !== -1;
}

export const parseDateAndTime = (dateTime: string): string => {
  const indexOfSeparator = dateTime.indexOf('T');
  const date = dateTime.substring(0, indexOfSeparator);
  const time = dateTime.substring(indexOfSeparator + 1, dateTime.indexOf('.'));
  return date + " " + time;
}