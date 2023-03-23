const selectInit = (data: Array<any>) => {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    newData.push(
      data[i].map((val: any) => ({
        ...val,
        checked: false,
      })),
    );
  }
  return newData;
};

export default selectInit;
