export const FilterList = data => {
  //那么现在开始将attr是在的存储到一个新的数组
  let resultList = [];
  //    console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    let mid = { id: null, list: [] };
    mid.id = data[i].id;
    for (let j = 0; j < data[i].list.length; j++) {
      let mid1 = [];
      let mid2 = {
        id: null,
        lng: null,
        lat: null,
        stop: null,
        time: null,
        attr: null
      };
      if (data[i].list[j][1].attr == "在") {
        mid2.id = data[i].list[j][1].id;
        mid2.lng = data[i].list[j][1].lng;
        mid2.lat = data[i].list[j][1].lat;
        mid2.stop = data[i].list[j][1].stop;
        mid2.time = data[i].list[j][1].time;
        mid2.attr = data[i].list[j][1].attr;
        let ok = data[i].list[j][0];
        mid1.push(ok);
        mid1.push(mid2);
        mid.list.push(mid1);
      }
    }
    resultList.push(mid);
  }
  return resultList;
};
