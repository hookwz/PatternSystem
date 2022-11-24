import ChengHua from "../../../public/Val/ChengHua.json";
import WuHou from "../../../public/Val/WuHou.json";
import QingYang from "../../../public/Val/QingYang.json";
import JingJiang from "../../../public/Val/JingJiang.json";
import JinNiu from "../../../public/Val/JinNiu.json";

const turfBool = require("@turf/turf");
const turf = require("turf");

export const SwitchToArea = data => {
  console.log(ChengHua);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].list.length; j++) {
      let tt = [];
      tt.push(data[i].list[j][1].lng);
      tt.push(data[i].list[j][1].lat);
      let ttpoint = turf.point(tt);
      //   for (let k = 0; k < ChengHua.length; k++) {
      //     let newPolygon = ChengHua[k].Polygon;
      //     newPolygon.push(ChengHua[k].Polygon[0]);
      //     let chpolygon = turf.polygon([newPolygon]);
      //     if (turfBool.booleanPointInPolygon(ttpoint, chpolygon) == true) {
      //       data[i].list[j][1].Area = "ChengHua" + ChengHua[k].placeId;
      //     }
      //   }
      //   for (let k = 0; k < WuHou.length; k++) {
      //     let newPolygon = WuHou[k].Polygon;
      //     newPolygon.push(WuHou[k].Polygon[0]);
      //     let whpolygon = turf.polygon([newPolygon]);
      //     if (turfBool.booleanPointInPolygon(ttpoint, whpolygon) == true) {
      //       data[i].list[j][1].Area = "WuHou" + WuHou[k].placeId;
      //     }
      //   }
      //   for (let k = 0; k < QingYang.length; k++) {
      //     let newPolygon = QingYang[k].Polygon;
      //     newPolygon.push(QingYang[k].Polygon[0]);
      //     let qypolygon = turf.polygon([newPolygon]);
      //     if (turfBool.booleanPointInPolygon(ttpoint, qypolygon) == true) {
      //       data[i].list[j][1].Area = "QingYang" + QingYang[k].placeId;
      //     }
      //   }
      //   for (let k = 0; k < JingJiang.length; k++) {
      //     let newPolygon = JingJiang[k].Polygon;
      //     newPolygon.push(JingJiang[k].Polygon[0]);
      //     let jjpolygon = turf.polygon([newPolygon]);
      //     if (turfBool.booleanPointInPolygon(ttpoint, jjpolygon) == true) {
      //       data[i].list[j][1].Area = "JingJiang" + JingJiang[k].placeId;
      //     }
      //   }
      //   for (let k = 0; k < JinNiu.length; k++) {
      //     let newPolygon = JinNiu[k].Polygon;
      //     newPolygon.push(JinNiu[k].Polygon[0]);
      //     let jnpolygon = turf.polygon([newPolygon]);
      //     if (turfBool.booleanPointInPolygon(ttpoint, jnpolygon) == true) {
      //       data[i].list[j][1].Area = "JinNiu" + JinNiu[k].placeId;
      //     }
      //   }
    }
  }
  console.log("结果:", data);
};
