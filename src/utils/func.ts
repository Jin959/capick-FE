interface DataWithId {
  id: number;
  data: string;
}

export const createDataWithId = (data: Array<string>): Array<DataWithId> => {
  let id = 1;

  if (!data) {
    return [{
      id: id,
      data: "Not Available"
    }];
  }
  return data.map(
    (data) => ({
      id: id++,
      data: data
    })
  );
}