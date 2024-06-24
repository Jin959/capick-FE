interface DataWithId {
  id: number;
  data: string;
}

export const createDataWithId = (data: Array<string>): Array<DataWithId> => {
  let id = 1;
  return data.map(
    (data) => ({
      id: id++,
      data: data
    })
  );
}