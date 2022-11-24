<template>
  <div id="POIChart"></div>
</template>

<script>
//这里帮助区域重新判断所属功能语义
const turf = require("turf");

const turfBool = require("@turf/turf");
import { GetCHPOI } from "../api/GetFiveAreaPOI";
import { GetJJPOI } from "../api/GetFiveAreaPOI";
import { GetJNPOI } from "../api/GetFiveAreaPOI";
import { GetQYPOI } from "../api/GetFiveAreaPOI";
import { GetWHPOI } from "../api/GetFiveAreaPOI";

import { GetChengHua } from "../api/GetFiveArea";
import { GetJingJiang } from "../api/GetFiveArea";
import { GetJinNiu } from "../api/GetFiveArea";
import { GetQingYang } from "../api/GetFiveArea";
import { GetWuHou } from "../api/GetFiveArea";
import { saveJson } from "./saveJson";

export default {
  name: "ReAreaPoi",
  data() {
    return {};
  },
  methods: {
    PoiInPolygon(AreaData, PoiData) {
      for (let i = 0; i < AreaData.length; i++) {
        // console.log(i);
        let NewOwnedPoi = [];
        AreaData[i].Polygon.push(AreaData[i].Polygon[0]);
        // console.log(AreaData[i]);
        let AreaPolygon = turf.polygon([AreaData[i].Polygon]);
        for (let j = 0; j < PoiData.length; j++) {
          let currentPoint = turf.point([
            parseFloat(PoiData[j].WGS84_经度),
            parseFloat(PoiData[j].WGS84_纬度)
          ]);
          if (
            turfBool.booleanPointInPolygon(currentPoint, AreaPolygon) == true
          ) {
            NewOwnedPoi.push(PoiData[j].大类);
          }
        }
        AreaData[i].NewOwnedPoi = NewOwnedPoi;
      }
      //   console.log(AreaData);
      return AreaData;
    }
  },
  mounted() {
    // console.log("213232132123");
    //在这里重新导入五大区的5000个区域的划分
    GetCHPOI().then(data => {
      let CHPOI = data;
      GetChengHua().then(data => {
        let CH = data;
        GetJJPOI().then(data => {
          let JJPOI = data;
          GetJingJiang().then(data => {
            let JJ = data;
            GetJNPOI().then(data => {
              let JNPOI = data;
              GetJinNiu().then(data => {
                let JN = data;
                GetQYPOI().then(data => {
                  let QYPOI = data;
                  GetQingYang().then(data => {
                    let QY = data;
                    GetWHPOI().then(data => {
                      let WHPOI = data;
                      GetWuHou().then(data => {
                        let WH = data;
                        //这里打印五大区的轮廓
                        // console.log("轮廓数据:", CH);
                        // console.log("POI信息:", CHPOI);
                        // let newCH = this.PoiInPolygon(CH, CHPOI);
                        // let newJJ = this.PoiInPolygon(JJ, JJPOI);
                        // let newJN = this.PoiInPolygon(JN, JNPOI);
                        // let newQY = this.PoiInPolygon(QY, QYPOI);
                        // let newWH = this.PoiInPolygon(WH, WHPOI);
                        // saveJson(newCH, "newCH.json");
                        // saveJson(newJJ, "newJJ.json");
                        // saveJson(newJN, "newJN.json");
                        // saveJson(newQY, "newQY.json");
                        // saveJson(newWH, "newWH.json");
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
};
</script>

<style scoped></style>
