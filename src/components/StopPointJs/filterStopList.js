export const filterStopList = data => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].list.length; j++) {
      if (data[i].list[j][0] == "上车点") {
        data[i].list[j].splice(2, 1);
      } else if (data[i].list[j][0] == "下车点") {
        data[i].list[j].splice(1, 1);
      }
    }
  }
  return data;
};
