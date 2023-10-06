const dataSlice = (data: Array<any>, perNum: number = 10) => {
  const chunkList: any[] = [];
  let count = 0;
  while (count < data.length) {
    chunkList.push(data.slice(count, count + perNum));
    count += perNum;
  }

  return chunkList;
};

export default dataSlice;
