import ChengHuaArea from "../../../public/DataV/成华区.json";
import WuHouArea from "../../../public/DataV/武侯区.json";
import JinNiuArea from "../../../public/DataV/金牛区.json";
import JingJiangArea from "../../../public/DataV/锦江区.json";
import QingYangArea from "../../../public/DataV/青羊区.json";

const turfBool = require("@turf/turf");
const turf = require("turf");

export const PointInFiveArea = data => {
  console.log("成华轮廓数据:", ChengHuaArea);

  let chenghuacoordinates = ChengHuaArea.features[0].geometry.coordinates[0];
  console.log(chenghuacoordinates[0]);
  let wuhoucoordinates = WuHouArea.features[0].geometry.coordinates[0];
  let qingyangcoordinates = QingYangArea.features[0].geometry.coordinates[0];
  let jingjiangcoordinates = JingJiangArea.features[0].geometry.coordinates[0];
  let jinniucoordinates = JinNiuArea.features[0].geometry.coordinates[0];
  //   console.log(data.length);
  //遍历数组判断哪些点在5个大区里面然后保存
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].list.length; j++) {
      let test = [];
      test.push(data[i].list[j][1].lng);
      test.push(data[i].list[j][1].lat);
      let tpoint = turf.point(test);
      let chenghuapolygon = turf.polygon(chenghuacoordinates);
      let wuhoupolygon = turf.polygon(wuhoucoordinates);
      let qingyangpolygon = turf.polygon(qingyangcoordinates);
      let jingjiangpolygon = turf.polygon(jingjiangcoordinates);
      let jinniupolygon = turf.polygon(jinniucoordinates);
      if (
        turfBool.booleanPointInPolygon(tpoint, chenghuapolygon) == true ||
        turfBool.booleanPointInPolygon(tpoint, wuhoupolygon) == true ||
        turfBool.booleanPointInPolygon(tpoint, qingyangpolygon) == true ||
        turfBool.booleanPointInPolygon(tpoint, jingjiangpolygon) == true ||
        turfBool.booleanPointInPolygon(tpoint, jinniupolygon) == true
      ) {
        data[i].list[j][1].attr = "在";
      } else {
        data[i].list[j][1].attr = "不在";
      }
    }
  }

  return data;
};
