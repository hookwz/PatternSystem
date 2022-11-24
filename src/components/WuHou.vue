<template>
  <div id="mainChart">
    <div id="mapChart"></div>
    <div class="btn1Chart">
      <button id="btn1">切换为线路视图</button>
    </div>
    <div id="NetWorkChart"></div>
  </div>
</template>

<script>
import { MapBoxInit } from "./MapBoxInit";
import { voronoiChart } from "./voronoiChart";
import WHData from "../../public/wuhou.json";
import JzData from "../../public/CD4G.json";
import { DrawGeoJsonPolygon } from "./DrawGeoJsonPolygon";
import { saveJson } from "./saveJson";
import { PointInPolygon } from "./PointInPolygon";
// import WHJZ from "../../public/wuhouJz.json";
// import CHData from "../../public/chenghua.json";
// import CHJZ from "../../public/chenghuaJz.json";
// import QYData from "../../public/qingyang.json";
// import QYJZ from "../../public/QingYangJz.json";
// import JJData from "../../public/jingjiang.json";
// import JJJZ from "../../public/JingJiangJz.json";
// import JNData from "../../public/jinniu.json";
// import JNJZ from "../../public/JinNiuJz.json";
// import JN2Data from "../../public/jinniu2.json";
import PolygonColorData from "../../public/Vorinon/drawColorPolygon.json";
import ChenghuaVorinon from "../../public/Vorinon/ChengHuaVorinon.json";
import JingJiangVorinon from "../../public/Vorinon/JingJiangVorinon.json";
import JinNiuVorinon from "../../public/Vorinon/JinNiuVorinon.json";
import QingYangVorinon from "../../public/Vorinon/QingYangVorinon.json";
import WuhouVorinon from "../../public/Vorinon/WuhouVorinon.json";

//导入5大区完整数据
import WuHou from "../../public/Val/WuHou.json";
import QingYang from "../../public/Val/QingYang.json";
import JinNiu from "../../public/Val/JinNiu.json";
import JingJiang from "../../public/Val/JingJiang.json";
import ChengHua from "../../public/Val/ChengHua.json";

import { ZR } from "../components/MergeJs/ZR";

import { DrawMultPolygon } from "./MultPolyDraw";

//导入停驻点列表
import Day1List from "../../public/stopPointList/20140803_1-pointList.json";

import { PointInFiveArea } from "./PointToStrJs/PointInFiveArea";
import { FilterList } from "./PointToStrJs/FilterList";
import { SwitchToArea } from "./PointToStrJs/SwitchToArea";

import TestDay1Point from "../../public/DayList/Day1List.json";

//这是测试悬停效果的数据
import HoverData from "../../public/us.json";
import { Hover } from "./Hover";

//开始读取停驻点的相关数据
import List371 from "../../public/StrPoint/OkDay1List371.json";
import { PointDraw } from "./PointToStrJs/PointDraw";
import { PointInit } from "./PointToStrJs/PointInit";

//这里导入成都的街道数据
import ChengDuJieDao from "../../public/ChengDuJieDao/城市一级道路.json";
// import ChengDuJieDao2 from "../../public/ChengDuJieDao/城市二级道路.json";
import { LineDraw } from "./PointToStrJs/LineDraw";

import { get2JieDaoDataRequest } from "../api/Get2JieDao";

// import func from "vue-editor-bridge";

import MergeDay1 from "../../public/FPData/MergeDay1.json";
import { FiveAreaNum } from "./FiveAreaNum.js";
import { AreaMerge } from "./AreaMerge";

//这里是区域合并后的划分表
import CHMergeArea from "../../public/MergeArea/ChengHuaMergeArea.json";
import JJMergeArea from "../../public/MergeArea/JingJiangMergeArea.json";
import JNMergeArea from "../../public/MergeArea/JinNiuMergeArea.json";
import QYMergeArea from "../../public/MergeArea/QingYangMergeArea.json";
import WHMergeArea from "../../public/MergeArea/WuHouMergeArea.json";

import { ChangeFormat } from "./ChangeFormat";
import { DrawArc } from "./DrawArc";
// import * as echarts from 'echarts'
// import 'echarts-gl'
import mapboxgl from "mapbox-gl";
import CooccurData from "../../public/Co-occur/First5000CarCo-occur.json";
import { NerWorkInit } from "./NetWork.js";
import { GetFlow } from "./GetCooccurFlow/GetFlow";
import { GetAllWantList } from "../api/GetAllWantList";

//这里导入区域合并表
import { GetMergeAreaList } from "../api/GetMergeAreaList";
import { GetChengHua } from "../api/GetFiveArea.js";
import { GetWuHou } from "../api/GetFiveArea.js";
import { GetQingYang } from "../api/GetFiveArea.js";
import { GetJingJiang } from "../api/GetFiveArea.js";
import { GetJinNiu } from "../api/GetFiveArea.js";

import { NewMultPolygon } from "./NewMultPolygon.js";
import { Get1011 } from "../api/GetFlow";
import { Get823AllFlow } from "../api/GetFlow";

import NeedMerge from "../../static/XuyaoMergePolygon.json";

const turf = require("turf");

const turfBool = require("@turf/turf");

var mapChart;

var fs = require("file-saver");
// require('echarts-gl')
// var echarts = require('echarts');
// var EchartLayer=require('echartslayer')

export default {
  name: "WuHou",
  data() {
    return {};
  },
  mounted() {
    // mapChart = MapBoxInit("mapChart");
    // voronoiChart(,,mapChart);
    console.log(WHData);
    console.log(JzData);

    function GetCurrentArea(data) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].list.length; j++) {
          //  console.log(j)
          for (let k = 0; k < AllMergeList.length; k++) {
            for (let q = 0; q < AllMergeList[k].length; q++) {
              // console.log(data[i].list[j][1])
              if (AllMergeList[k][q] == data[i].list[j][1].Area) {
                data[i].list[j][1].newArea = k;
              }
            }
          }
        }
      }
      return data;
    }

    //从这里开始获取除开之前500辆车的48个时间段的所有的共现现象的提取
    GetAllWantList().then(data => {
      let AllwantList = data;
      console.log("用于获取所有的共现现象的数据:", AllwantList);

      //将分开的组合并到一起
      let AllwantData = [];
      for (let i = 0; i < AllwantList.length; i++) {
        for (let j = 0; j < AllwantList[i].length; j++) {
          AllwantData.push(AllwantList[i][j]);
        }
      }
      console.log(AllwantData);
      //AllwantList.length

      let newAllwantList = GetCurrentArea(AllwantData);
      // console.log(newAllwantList)
      let FinalNewWantList = ToWantFormat(newAllwantList);
      saveJson(FinalNewWantList, "CowantList10.00-10.30.json");
    });

    //下面开始导入,然后开始合并社区,先从成华区开始
    // console.log("成华数据:", ChengHua);
    // console.log("武侯数据:", WuHou);
    // console.log("青羊数据:", QingYang);
    // console.log("锦江数据:", JingJiang);
    // console.log("金牛数据:", JinNiu);
    this.$store.commit("SetWuHou", WuHou);
    this.$store.commit("SetChengHua", ChengHua);
    this.$store.commit("SetQingYang", QingYang);
    this.$store.commit("SetJingJiang", JingJiang);
    this.$store.commit("SetJinNiu", JinNiu);

    //获取到办公区的数据

    function DrawMap(data, str) {
      let BanGong = [];
      let ZhuZhai = [];
      let School = [];
      let Business = [];
      let Scenery = [];
      let Treatment = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].AreaAttribute == "办公区") {
          BanGong.push(data[i].Polygon);
        } else if (data[i].AreaAttribute == "住宅区") {
          ZhuZhai.push(data[i].Polygon);
        } else if (data[i].AreaAttribute == "学校区") {
          School.push(data[i].Polygon);
        } else if (data[i].AreaAttribute == "商业区") {
          Business.push(data[i].Polygon);
        } else if (data[i].AreaAttribute == "风景区") {
          Scenery.push(data[i].Polygon);
        } else if (data[i].AreaAttribute == "医疗区") {
          Treatment.push(data[i].Polygon);
        }
      }
      console.log("办公区数据:", BanGong);
      //   let mergeBanGong = ZR(BanGong);
      //   let mergeZhuZhai = ZR(ZhuZhai);
      //   let mergeSchool = ZR(School);
      //   let mergeBusiness = ZR(Business);
      //   let mergeScenery = ZR(Scenery);
      //   let mergeTreatment = ZR(Treatment);
      //   console.log("合并后:", mergeBanGong);

      //   for (let i = 0; i < BanGong.length; i++) {
      //     //   let str = "ChengHuaBanGong";
      //     DrawGeoJsonPolygon([BanGong[i]], mapChart, str + "1-" + i, "#A7B4D6");
      //   }

      DrawMultPolygon(BanGong, mapChart, str + "1-办公", "#A7B4D6");
      DrawMultPolygon(ZhuZhai, mapChart, str + "2-住宅", "#F4A98A");
      DrawMultPolygon(School, mapChart, str + "3-学校", "#9CCCBC");
      DrawMultPolygon(Business, mapChart, str + "4-商业", "#D8A6BF");
      DrawMultPolygon(Scenery, mapChart, str + "5-风景", "#C0E387");
      DrawMultPolygon(Treatment, mapChart, str + "6-医疗", "#DC143C");
    }

    // mapChart.on("load", function() {
    //   let layers = mapChart.getStyle().layers;
    //   console.log("查看:", layers);
    // });
    // for(let i=0;i<;i++)
    // {

    // }

    // DrawMap(ChengHua, "ChengHua");
    // DrawMap(WuHou, "WuHou");
    // DrawMap(QingYang, "QingYang");
    // DrawMap(JingJiang, "JingJiang");
    // DrawMap(JinNiu, "JinNiu");

    console.log("500辆车的停驻点列表", Day1List);

    //如果不在5大区的点就将其过滤掉
    // for (let i = 0; i < Day1List.length; i++) {
    //   for (let j = 0; j < Day1List[i].list.length; j++) {
    //     Day1List[i].list[j][1].lat = parseFloat(Day1List[i].list[j][1].lat);
    //     Day1List[i].list[j][1].lng = parseFloat(Day1List[i].list[j][1].lng);
    //   }
    // }
    // let newDay1List = PointInFiveArea(Day1List);
    // console.log("经过判断后的列表:", newDay1List);
    // let resultList = FilterList(newDay1List);
    // console.log("最后结果:", resultList);
    // saveJson(Day1List);
    // SwitchToArea(resultList);

    console.log("将会绘制的点：", TestDay1Point);

    console.log("悬停数据:", HoverData);
    // Hover(mapChart, HoverData);

    //绘制用于测试的停驻点

    console.log("测试的停驻点:", List371);
    let List371Point = PointInit(List371);
    console.log("转换格式后:", List371Point);
    // PointDraw(List371Point, mapChart);

    // PointDraw(
    //   [
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [104.017185, 30.638191]
    //       },
    //       properties: {
    //         // title: "Mapbox SF",
    //         icon: "circle"
    //       }
    //     },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [104.017339, 30.637906]
    //       },
    //       properties: {
    //         // title: "Mapbox SF",
    //         icon: "circle"
    //       }
    //     }
    //   ],
    //   mapChart
    // );

    console.log("成都街道数据：", ChengDuJieDao);
    // LineDraw(mapChart,ChengDuJieDao,'1')

    // get2JieDaoDataRequest().then(data=>{
    //   console.log(data)
    //   let JieDao2Data=data
    //   // console.log(mapChart)
    //   // LineDraw(mapChart,JieDao2Data,'2')
    //   // LineDraw(mapChart,ChengDuJieDao,'1')
    // })

    //下面来将其转换为字符串
    console.log("FP数据为:", MergeDay1);

    //这里来查看哪些最开始是从下车点开始的
    function ToWantFormat(MergeDay1) {
      let See = [];
      // console.log(JSON.stringify(MergeDay1[4].list)=='[]')
      for (let i = 0; i < MergeDay1.length; i++) {
        if (JSON.stringify(MergeDay1[i].list) == "[]") {
          continue;
        } else if (MergeDay1[i].list[0][0] == "下车点") {
          See.push(MergeDay1[i]);
        }
      }
      //然后需要将这部分的数据替换到后面的数组里面去
      //下面需要将下车点去除
      // for(let i=0;i<See.length;i++)
      // {
      //      See[i].list.splice(0,1)
      // }
      console.log(See);

      //然后将他们也转换
      let ReplaceArray = [];
      for (let i = 0; i < See.length; i++) {
        let midId = [];
        let mid = [];
        let All = [];
        midId.push(See[i].id);
        for (let j = 0; j < See[i].list.length; j++) {
          mid.push(See[i].list[j][1].newArea);
        }
        All.push(midId);
        All.push(mid);
        ReplaceArray.push(All);
      }
      console.log(ReplaceArray);
      for (let i = 0; i < ReplaceArray.length; i++) {
        ReplaceArray[i][1].shift();
      }
      let StrList = [];
      for (let i = 0; i < MergeDay1.length; i++) {
        let mid = [];
        let midId = [];
        midId.push(MergeDay1[i].id);
        for (let j = 0; j < MergeDay1[i].list.length; j++) {
          mid.push(MergeDay1[i].list[j][1].newArea);
        }
        let All = [];
        All.push(midId);
        All.push(mid);
        StrList.push(All);
      }

      //然后将ReplaceArray替换到StrList当中
      for (let i = 0; i < ReplaceArray.length; i++) {
        for (let j = 0; j < StrList.length; j++) {
          if (StrList[j][0][0] == ReplaceArray[i][0][0]) {
            // console.log(1)
            StrList[j][1] = ReplaceArray[i][1];
          }
        }
      }

      console.log(StrList);

      //下面按照时间进行划分
      //1407018005000,每半个小时的时间戳差值是1800000，则我们只需要获取到当天的00：00：00然后按照24个时间段的时间差值往上面加即可得到每个时间段的时间戳的值
      let timeStr1 = "2014/8/3 00:00:00"; //1406995200000
      let timeStr2 = "2014/8/3 24:00:00";
      let testTime1 = new Date(timeStr1).getTime();
      let testTime2 = new Date(timeStr2).getTime();
      // console.log(testTime2)

      //先获取8.3的时间戳分布
      let TimeArray = [];
      let MidTime = 1406995200000;
      for (let i = 0; i < 48; i++) {
        let mid = [];
        mid.push(i);
        mid.push(MidTime);
        TimeArray.push(mid);
        MidTime += 1800000;
      }

      // console.log(TimeArray)

      //检查是否为正确的
      function getLocalTime(nS) {
        return new Date(parseInt(nS))
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
      }

      //验证是正确的
      // for(let i=0;i<TimeArray.length;i++)
      // {
      //     let mido=getLocalTime(TimeArray[i][1])
      //     console.log(mido)
      // }

      //下面给数据加上时间标记
      for (let i = 0; i < MergeDay1.length; i++) {
        for (let j = 0; j < MergeDay1[i].list.length; j++) {
          MergeDay1[i].list[j][1].timeStamp = new Date(
            MergeDay1[i].list[j][1].time
          ).getTime();
        }
      }
      //然后判断在哪个时间段
      for (let i = 0; i < MergeDay1.length; i++) {
        for (let j = 0; j < MergeDay1[i].list.length; j++) {
          for (let k = 0; k < TimeArray.length; k++) {
            if (
              MergeDay1[i].list[j][1].timeStamp >= TimeArray[k][1] &&
              MergeDay1[i].list[j][1].timeStamp < TimeArray[k][1] + 1800000
            ) {
              MergeDay1[i].list[j][1].timeSign = TimeArray[k][0];
            }
          }
        }
      }
      console.log(MergeDay1);

      //然后再转换为对应的格式
      let FinalFP = [];
      for (let i = 0; i < MergeDay1.length; i++) {
        let midId = [];
        let midArray = [];
        let All = [];
        midId.push(MergeDay1[i].id);
        for (let j = 0; j < MergeDay1[i].list.length; j++) {
          let midData = [];
          midData.push(MergeDay1[i].list[j][1].newArea);
          midData.push(MergeDay1[i].list[j][1].timeSign);
          midData.push(MergeDay1[i].list[j][0]);
          midArray.push(midData);
        }
        All.push(midId);
        All.push(midArray);
        FinalFP.push(All);
      }
      console.log(FinalFP);
      //然后把第一个不是上车点的进行一下过滤
      for (let i = 0; i < FinalFP.length; i++) {
        // console.log(FinalFP[i][1][0][2])
        if (JSON.stringify(FinalFP[i][1]) == "[]") {
          continue;
        } else if (FinalFP[i][1][0][2] == "下车点") {
          // console.log(1)
          FinalFP[i][1].shift();
        }
      }
      // console.log(FinalFP)
      // saveJson(FinalFP)
      //将一段旅程进行合并
      let MergeFinal = [];
      for (let i = 0; i < FinalFP.length; i++) {
        let newmidId = [];
        let All = [];
        let ok = [];
        newmidId.push(FinalFP[i][0][0]);
        // console.log(i)
        if (JSON.stringify(FinalFP[i][1]) == "[]") {
          continue;
        } else {
          for (let j = 0; j < FinalFP[i][1].length - 1; j += 2) {
            let newMid = [];
            //  console.log(j)
            for (let k = 0; k < FinalFP[i][1][j].length; k++) {
              newMid.push(FinalFP[i][1][j][k]);
            }
            for (let k = 0; k < FinalFP[i][1][j + 1].length; k++) {
              newMid.push(FinalFP[i][1][j + 1][k]);
            }
            ok.push(newMid);
          }
        }
        All.push(newmidId);
        All.push(ok);
        MergeFinal.push(All);
      }
      console.log(MergeFinal);
      // saveJson(MergeFinal)

      //过滤出来10点到11点的数据,1个小时的共生模式有点多，还是按半个小时来进行过滤，6点到6点半
      let FilterArray = [];
      for (let i = 0; i < MergeFinal.length; i++) {
        let FilterId = [];
        let FilterData = [];
        let All = [];
        FilterId.push(MergeFinal[i][0][0]);
        for (let j = 0; j < MergeFinal[i][1].length; j++) {
          if (MergeFinal[i][1][j][1] >= 20 && MergeFinal[i][1][j][4] <= 20) {
            FilterData.push(MergeFinal[i][1][j]);
          }
        }
        All.push(FilterId);
        All.push(FilterData);
        FilterArray.push(All);
      }

      console.log(FilterArray);

      //现在开始统计，10点到11点一共有多少个区域  10点到10半
      let NowAreaList = [];
      for (let i = 0; i < FilterArray.length; i++) {
        for (let j = 0; j < FilterArray[i][1].length; j++) {
          if (NowAreaList.indexOf(FilterArray[i][1][j][0]) == -1) {
            NowAreaList.push(FilterArray[i][1][j][0]);
          } else if (NowAreaList.indexOf(FilterArray[i][1][j][3]) == -1) {
            NowAreaList.push(FilterArray[i][1][j][3]);
          }
        }
      }
      console.log(NowAreaList);

      //然后对5个区域的区域数目进行总排序,按照成华1-826 锦江827-1702 金牛1703-2667 青羊2668-3532 武侯3533-5688 这样的顺序
      //现在的顺序是 成华 锦江 金牛 青羊 武侯
      //下面将每一个都当成终点，看哪些区域是起点然后流向它的

      let NewFinal = [];
      for (let i = 0; i < NowAreaList.length; i++) {
        let midF = [];
        midF.push(NowAreaList[i]);
        let midK = [];
        for (let j = 0; j < FilterArray.length; j++) {
          for (let k = 0; k < FilterArray[j][1].length; k++) {
            if (FilterArray[j][1][k][3] == NowAreaList[i]) {
              midK.push(FilterArray[j][1][k][0]);
            }
          }
        }
        midF.push(midK);
        NewFinal.push(midF);
      }
      console.log(NewFinal);
      // //去除没有的
      let FilterNewFinal = [];
      for (let i = 0; i < NewFinal.length; i++) {
        if (JSON.stringify(NewFinal[i][1]) != "[]") {
          FilterNewFinal.push(NewFinal[i]);
        }
      }
      // //只有484个了
      console.log(FilterNewFinal);
      let newFliter = [];
      for (let i = 0; i < FilterNewFinal.length; i++) {
        if (FilterNewFinal[i][0] != undefined) {
          newFliter.push(FilterNewFinal[i]);
        }
      }
      console.log(newFliter);
      for (let i = 0; i < newFliter.length; i++) {
        for (let j = 0; j < newFliter[i][1].length; j++) {
          if (newFliter[i][1][j] == undefined) {
            newFliter[i][1][j] = "Other";
          }
        }
      }

      //9999区域代表Other区域。
      for (let i = 0; i < newFliter.length; i++) {
        for (let j = 0; j < newFliter[i][1].length; j++) {
          if (newFliter[i][1][j] == "Other") {
            newFliter[i][1][j] = 9999;
          }
        }
      }
      // for(let i=0;i<newFliter.length;i++)
      // {
      //       newFliter[i][0]=FiveAreaNum(newFliter[i][0])
      //       for(let j=0;j<newFliter[i][1].length;j++)
      //       {
      //         newFliter[i][1][j]=FiveAreaNum(newFliter[i][1][j])
      //       }
      // }
      return newFliter;
    }

    //在这里获取相应的区域合并表
    // console.log('成华合并:',CHMergeArea)
    // console.log('锦江合并:',JJMergeArea)
    // console.log('金牛合并:',JNMergeArea)
    // console.log('青羊合并:',QYMergeArea)
    // console.log('武侯合并:',WHMergeArea)
    let AreaMergeList = [];

    function MergeAddStr(data, str) {
      let switchArray = [];
      let mid;
      for (let i = 0; i < data.length; i++) {
        mid = [];
        for (let j = 0; j < data[i].length; j++) {
          //  data[i][j]=str+data[i][j]
          mid.push(str + data[i][j]);
        }
        switchArray.push(mid);
      }
      // console.log(switchArray)
      return switchArray;
    }
    let newCHMergeArea = MergeAddStr(CHMergeArea, "ChengHua");
    let newJJMergeArea = MergeAddStr(JJMergeArea, "JingJiang");
    let newJNMergeArea = MergeAddStr(JNMergeArea, "JinNiu");
    let newQYMergeArea = MergeAddStr(QYMergeArea, "QingYang");
    let newWHMergeArea = MergeAddStr(WHMergeArea, "WuHou");

    function MergeAllAreaList(data1, data2, data3, data4, data5) {
      let AllData = [];
      for (let i = 0; i < data1.length; i++) {
        AllData.push(data1[i]);
      }
      for (let i = 0; i < data2.length; i++) {
        AllData.push(data2[i]);
      }
      for (let i = 0; i < data3.length; i++) {
        AllData.push(data3[i]);
      }
      for (let i = 0; i < data4.length; i++) {
        AllData.push(data4[i]);
      }
      for (let i = 0; i < data5.length; i++) {
        AllData.push(data5[i]);
      }
      return AllData;
    }

    let AllMergeList = MergeAllAreaList(
      newCHMergeArea,
      newJJMergeArea,
      newJNMergeArea,
      newQYMergeArea,
      newWHMergeArea
    );
    console.log("最后的区域列表:", AllMergeList);
    // saveJson(AllMergeList,'AreaMergeList.json')

    //将需要转换的4500辆车展示出来,然后将它们所属的区域转换为新的区域列表

    // console.log(wantList4)
    // ToWantFormat(wantList2)

    // console.log('New：',wantList1)

    //这里是每次获取的半小时的，我们测试的时候已经获取了10点到10点半的数据了
    // let newWantList10=GetCurrentArea(wantList10)
    // console.log(newWantList1)
    // let FinalNewWantList10=ToWantFormat(newWantList10)
    // console.log(FinalNewWantList1)
    // saveJson(FinalNewWantList10,'FinalNewWantList10.json')

    // DrawArc(mapChart)
    // console.log(this)

    // NerWorkInit(CooccurData, this);
    //这里是获取流量的部分
    // GetFlow(MergeDay1,[20,21],1406995200000)//代表8.3号的获取流量

    //这里绘制新的维诺图
    // this.DrawMergeMap(mapChart);
  },
  methods: {
    DrawMergeMap(map) {
      function DrawMap(data, str, map) {
        // console.log(mapChart)
        let BanGong = [];
        let ZhuZhai = [];
        let School = [];
        let Business = [];
        let Scenery = [];
        let Treatment = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].AreaAttribute == "办公区") {
            BanGong.push(data[i].OwnedPolygon);
          } else if (data[i].AreaAttribute == "住宅区") {
            ZhuZhai.push(data[i].OwnedPolygon);
          } else if (data[i].AreaAttribute == "学校区") {
            School.push(data[i].OwnedPolygon);
          } else if (data[i].AreaAttribute == "商业区") {
            Business.push(data[i].OwnedPolygon);
          } else if (data[i].AreaAttribute == "风景区") {
            Scenery.push(data[i].OwnedPolygon);
          } else if (data[i].AreaAttribute == "医疗区") {
            Treatment.push(data[i].OwnedPolygon);
          }
        }
        console.log("检验:", BanGong);
        NewMultPolygon(BanGong, map, str + "1-办公", "#A7B4D6");
        NewMultPolygon(ZhuZhai, map, str + "2-住宅", "#F4A98A");
        NewMultPolygon(School, map, str + "3-学校", "#9CCCBC");
        NewMultPolygon(Business, map, str + "4-商业", "#D8A6BF");
        NewMultPolygon(Scenery, map, str + "5-风景", "#C0E387");
        NewMultPolygon(Treatment, map, str + "6-医疗", "#D8A6BF");
        // console.log('!!!')
      }

      function Select(data, start, end) {
        let Get = [];
        for (let i = start; i < end; i++) {
          Get.push(data[i]);
        }
        return Get;
      }
      function TurfMerge(data) {
        if (data.length == 1) {
          //还是需要将数组变为首尾都相同的形式
          data[0].push(data[0][0]);
          return data[0];
        } else if (data.length == 2) {
          let wantData = [];
          for (let i = 0; i < data.length; i++) {
            let newPolygon = data[i];
            newPolygon.push(data[i][0]);
            let test = turf.polygon([newPolygon]);
            wantData.push(test);
          }
          let p0 = wantData[0];
          let p1 = wantData[1];
          let union = turf.union(p0, p1);
          return union.geometry.coordinates[0];
        } else {
          let wantData = [];
          for (let i = 0; i < data.length; i++) {
            let newPolygon = data[i];
            newPolygon.push(data[i][0]);
            let test = turf.polygon([newPolygon]);
            wantData.push(test);
          }
          let p0 = wantData[0];
          let p1 = wantData[1];
          let union = turf.union(p0, p1);
          for (let i = 2; i < wantData.length; i++) {
            union = turf.union(union, wantData[i]);
          }
          return union.geometry.coordinates[0];
        }
      }
      function GetNewArray(data, MergeList, str) {
        if (str == "ChengHua") {
          for (let i = 0; i < MergeList.length; i++) {
            for (let j = 0; j < MergeList[i].length; j++) {
              MergeList[i][j] = MergeList[i][j].split("a");
            }
          }
          // console.log(MergeList)
          //然后拿出数字出来
          let IdList = [];
          for (let i = 0; i < MergeList.length; i++) {
            let mid = [];
            for (let j = 0; j < MergeList[i].length; j++) {
              mid.push(parseInt(MergeList[i][j][1]));
            }
            IdList.push(mid);
          }
          // console.log(IdList)
          //然后创建新的多边形列表区域
          let NewMergePolyhonList = [];
          for (let i = 0; i < IdList.length; i++) {
            //这里面是要合并的区域
            let newMidObject = {
              placeId: null,
              MergeList: null,
              AreaAttribute: null,
              Polygon: null
            };
            let CurrentArray = [];
            let F;
            for (let j = 0; j < data.length; j++) {
              if (IdList[i].indexOf(parseInt(data[j].placeId)) != -1) {
                CurrentArray.push(data[j]);
                F = data[j].AreaAttribute;
              }
            }
            newMidObject.placeId = i;
            newMidObject.MergeList = IdList[i];
            newMidObject.AreaAttribute = F;
            newMidObject.Polygon = CurrentArray;
            NewMergePolyhonList.push(newMidObject);
          }
          // console.log(NewMergePolyhonList)
          //然后合并
          for (let i = 0; i < NewMergePolyhonList.length; i++) {
            let PolygonData = [];
            for (let j = 0; j < NewMergePolyhonList[i].Polygon.length; j++) {
              PolygonData.push(NewMergePolyhonList[i].Polygon[j].Polygon);
            }
            //  console.log(PolygonData)
            NewMergePolyhonList[i].OwnedPolygon = TurfMerge(PolygonData);
            //  break
          }
          return NewMergePolyhonList;
        } else if (str == "WuHou") {
          for (let i = 0; i < MergeList.length; i++) {
            for (let j = 0; j < MergeList[i].length; j++) {
              MergeList[i][j] = MergeList[i][j].split("u");
            }
          }
          // console.log(MergeList)
          //然后拿出数字出来
          let IdList = [];
          for (let i = 0; i < MergeList.length; i++) {
            let mid = [];
            for (let j = 0; j < MergeList[i].length; j++) {
              mid.push(parseInt(MergeList[i][j][2]));
            }
            IdList.push(mid);
          }
          // console.log(IdList)
          //然后创建新的多边形列表区域
          let NewMergePolyhonList = [];
          for (let i = 0; i < IdList.length; i++) {
            //这里面是要合并的区域
            let newMidObject = {
              placeId: null,
              MergeList: null,
              AreaAttribute: null,
              Polygon: null
            };
            let CurrentArray = [];
            let F;
            for (let j = 0; j < data.length; j++) {
              if (IdList[i].indexOf(parseInt(data[j].placeId)) != -1) {
                CurrentArray.push(data[j]);
                F = data[j].AreaAttribute;
              }
            }
            newMidObject.placeId = i;
            newMidObject.MergeList = IdList[i];
            newMidObject.AreaAttribute = F;
            newMidObject.Polygon = CurrentArray;
            NewMergePolyhonList.push(newMidObject);
          }
          // console.log(NewMergePolyhonList)
          //然后合并
          for (let i = 0; i < NewMergePolyhonList.length; i++) {
            let PolygonData = [];
            for (let j = 0; j < NewMergePolyhonList[i].Polygon.length; j++) {
              PolygonData.push(NewMergePolyhonList[i].Polygon[j].Polygon);
            }
            //  console.log(PolygonData)
            NewMergePolyhonList[i].OwnedPolygon = TurfMerge(PolygonData);
            //  break
          }
          return NewMergePolyhonList;
        } else if (str == "QingYang") {
          for (let i = 0; i < MergeList.length; i++) {
            for (let j = 0; j < MergeList[i].length; j++) {
              MergeList[i][j] = MergeList[i][j].split("g");
            }
          }
          // console.log(MergeList)
          //然后拿出数字出来
          let IdList = [];
          for (let i = 0; i < MergeList.length; i++) {
            let mid = [];
            for (let j = 0; j < MergeList[i].length; j++) {
              mid.push(parseInt(MergeList[i][j][2]));
            }
            IdList.push(mid);
          }
          // console.log(IdList)
          //然后创建新的多边形列表区域
          let NewMergePolyhonList = [];
          for (let i = 0; i < IdList.length; i++) {
            //这里面是要合并的区域
            let newMidObject = {
              placeId: null,
              MergeList: null,
              AreaAttribute: null,
              Polygon: null
            };
            let CurrentArray = [];
            let F;
            for (let j = 0; j < data.length; j++) {
              if (IdList[i].indexOf(parseInt(data[j].placeId)) != -1) {
                CurrentArray.push(data[j]);
                F = data[j].AreaAttribute;
              }
            }
            newMidObject.placeId = i;
            newMidObject.MergeList = IdList[i];
            newMidObject.AreaAttribute = F;
            newMidObject.Polygon = CurrentArray;
            NewMergePolyhonList.push(newMidObject);
          }
          // console.log(NewMergePolyhonList)
          //然后合并
          for (let i = 0; i < NewMergePolyhonList.length; i++) {
            let PolygonData = [];
            for (let j = 0; j < NewMergePolyhonList[i].Polygon.length; j++) {
              PolygonData.push(NewMergePolyhonList[i].Polygon[j].Polygon);
            }
            //  console.log(PolygonData)
            NewMergePolyhonList[i].OwnedPolygon = TurfMerge(PolygonData);
            //  break
          }
          return NewMergePolyhonList;
        } else if (str == "JingJiang") {
          for (let i = 0; i < MergeList.length; i++) {
            for (let j = 0; j < MergeList[i].length; j++) {
              MergeList[i][j] = MergeList[i][j].split("g");
            }
          }
          // console.log(MergeList)
          //然后拿出数字出来
          let IdList = [];
          for (let i = 0; i < MergeList.length; i++) {
            let mid = [];
            for (let j = 0; j < MergeList[i].length; j++) {
              mid.push(parseInt(MergeList[i][j][2]));
            }
            IdList.push(mid);
          }
          // console.log(IdList)
          //然后创建新的多边形列表区域
          let NewMergePolyhonList = [];
          for (let i = 0; i < IdList.length; i++) {
            //这里面是要合并的区域
            let newMidObject = {
              placeId: null,
              MergeList: null,
              AreaAttribute: null,
              Polygon: null
            };
            let CurrentArray = [];
            let F;
            for (let j = 0; j < data.length; j++) {
              if (IdList[i].indexOf(parseInt(data[j].placeId)) != -1) {
                CurrentArray.push(data[j]);
                F = data[j].AreaAttribute;
              }
            }
            newMidObject.placeId = i;
            newMidObject.MergeList = IdList[i];
            newMidObject.AreaAttribute = F;
            newMidObject.Polygon = CurrentArray;
            NewMergePolyhonList.push(newMidObject);
          }
          // console.log(NewMergePolyhonList)
          //然后合并
          for (let i = 0; i < NewMergePolyhonList.length; i++) {
            let PolygonData = [];
            for (let j = 0; j < NewMergePolyhonList[i].Polygon.length; j++) {
              PolygonData.push(NewMergePolyhonList[i].Polygon[j].Polygon);
            }
            //  console.log(PolygonData)
            NewMergePolyhonList[i].OwnedPolygon = TurfMerge(PolygonData);
            //  break
          }
          return NewMergePolyhonList;
        } else if (str == "JinNiu") {
          for (let i = 0; i < MergeList.length; i++) {
            for (let j = 0; j < MergeList[i].length; j++) {
              MergeList[i][j] = MergeList[i][j].split("u");
            }
          }
          // console.log(MergeList)
          //然后拿出数字出来
          let IdList = [];
          for (let i = 0; i < MergeList.length; i++) {
            let mid = [];
            for (let j = 0; j < MergeList[i].length; j++) {
              mid.push(parseInt(MergeList[i][j][1]));
            }
            IdList.push(mid);
          }
          // console.log(IdList)
          //然后创建新的多边形列表区域
          let NewMergePolyhonList = [];
          for (let i = 0; i < IdList.length; i++) {
            //这里面是要合并的区域
            let newMidObject = {
              placeId: null,
              MergeList: null,
              AreaAttribute: null,
              Polygon: null
            };
            let CurrentArray = [];
            let F;
            for (let j = 0; j < data.length; j++) {
              if (IdList[i].indexOf(parseInt(data[j].placeId)) != -1) {
                CurrentArray.push(data[j]);
                F = data[j].AreaAttribute;
              }
            }
            newMidObject.placeId = i;
            newMidObject.MergeList = IdList[i];
            newMidObject.AreaAttribute = F;
            newMidObject.Polygon = CurrentArray;
            NewMergePolyhonList.push(newMidObject);
          }
          // console.log(NewMergePolyhonList)
          //然后合并
          for (let i = 0; i < NewMergePolyhonList.length; i++) {
            let PolygonData = [];
            for (let j = 0; j < NewMergePolyhonList[i].Polygon.length; j++) {
              PolygonData.push(NewMergePolyhonList[i].Polygon[j].Polygon);
            }
            //  console.log(PolygonData)
            NewMergePolyhonList[i].OwnedPolygon = TurfMerge(PolygonData);
            //  break
          }
          return NewMergePolyhonList;
        }
      }
      function AppendToList(source, target) {
        for (let i = 0; i < source.length; i++) {
          target.push(source[i]);
        }
        return target;
      }

      function placeIdAdd(data, num) {
        for (let i = 0; i < data.length; i++) {
          data[i].placeId = data[i].placeId + num;
        }
        return data;
      }
      //如果有一条交边，则说明两个区域是相邻，我们则
      function GetAdjacent(data) {
        for (let i = 0; i < data.length; i++) {
          data[i].Adjacent = [];
          for (let j = 0; j < data.length; j++) {
            if (i == j) {
              continue;
            } else {
              if (
                turfBool.booleanIntersects(
                  turf.polygon([data[i].OwnedPolygon]),
                  turf.polygon([data[j].OwnedPolygon])
                ) == true
              ) {
                data[i].Adjacent.push(data[j].placeId);
              }
            }
          }
        }
        return data;
      }

      function GetEdge(data) {
        let Edge = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].InformationList.length; j++) {
            if (data[i].InformationList[j].id != "Other") {
              let mid = [];
              mid.push(data[i].id);
              mid.push(parseInt(data[i].InformationList[j].id));
              mid.push(parseInt(data[i].InformationList[j].num));
              Edge.push(mid);
            }
          }
        }
        console.log(Edge);
        return Edge;
      }

      function GetTargetArea(AreaFlowList, data) {
        for (let i = 0; i < AreaFlowList.length; i++) {
          let mid = [];
          for (let j = 0; j < data.length; j++) {
            if (AreaFlowList[i][0] == data[j].id) {
              for (let k = 0; k < data[j].InformationList.length; k++) {
                if (data[j].InformationList[k].id == "Other") {
                  continue;
                } else {
                  mid.push(parseInt(data[j].InformationList[k].id));
                }
              }
            }
          }
          AreaFlowList[i].push(mid);
        }
        //然后去重
        for (let i = 0; i < AreaFlowList.length; i++) {
          AreaFlowList[i][1] = new Set(AreaFlowList[i][1]);
        }
        for (let i = 0; i < AreaFlowList.length; i++) {
          let mid = [];
          for (let k of AreaFlowList[i][1]) {
            mid.push(k);
          }
          AreaFlowList[i].push(mid);
        }
        function GetCurrentFlow(source, target, data) {
          let mid = [];
          let count = 0;
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].InformationList.length; j++) {
              if (
                data[i].id == source &&
                parseInt(data[i].InformationList[j].id) == target
              ) {
                count = count + data[i].InformationList[j].num;
              }
            }
          }
          mid.push(target);
          mid.push(count);
          return mid;
        }
        //然后就是统计流量
        for (let i = 0; i < AreaFlowList.length; i++) {
          let NumArray = [];
          for (let j = 0; j < AreaFlowList[i][2].length; j++) {
            let mid = GetCurrentFlow(
              AreaFlowList[i][0],
              AreaFlowList[i][2][j],
              data
            );
            NumArray.push(mid);
          }
          AreaFlowList[i].push(NumArray);
        }
        console.log(AreaFlowList);
        let FinalEdge = [];
        for (let i = 0; i < AreaFlowList.length; i++) {
          let mid = [];
          mid.push(AreaFlowList[i][0]);
          mid.push(AreaFlowList[i][3]);
          FinalEdge.push(mid);
        }
        console.log(FinalEdge);
        //  saveJson(FinalEdge,'FinalEdge.json')
      }

      function TiQu(data, IdList) {
        let MultPolygon = [];
        for (let i = 0; i < IdList.length; i++) {
          MultPolygon.push(data[IdList[i]].OwnedPolygon);
        }
        return MultPolygon;
      }
      //这里绘制新的合并为2400个区域的维诺图
      //这里获取到区域合并表
      GetMergeAreaList().then(data => {
        console.log("区域合并表为:", data);
        let MergeList = data;
        //在这里分别获取到五大区的数据，这里从后端获取，上面的那部分后面也要更改为从后端获取
        GetChengHua().then(data => {
          let ChengHua = data;
          GetWuHou().then(data => {
            let WuHou = data;
            GetQingYang().then(data => {
              let QingYang = data;
              GetJingJiang().then(data => {
                let JingJiang = data;
                GetJinNiu().then(data => {
                  let JinNiu = data;
                  //  console.log(ChengHua)
                  //然后对ChengHua进行区域合并
                  let CHMergeList;
                  CHMergeList = Select(MergeList, 0, 352);
                  let WHMergeList;
                  WHMergeList = Select(MergeList, 1543, 2402);
                  let QYMergeList;
                  QYMergeList = Select(MergeList, 1150, 1543);
                  let JJMergeList;
                  JJMergeList = Select(MergeList, 352, 739);
                  let JNMergeList;
                  JNMergeList = Select(MergeList, 739, 1150);
                  //  console.log(WHMergeList)
                  //然后
                  let NewCH = GetNewArray(ChengHua, CHMergeList, "ChengHua");
                  let NewWH = GetNewArray(WuHou, WHMergeList, "WuHou");
                  let NewQY = GetNewArray(QingYang, QYMergeList, "QingYang");
                  let NewJJ = GetNewArray(JingJiang, JJMergeList, "JingJiang");
                  let NewJN = GetNewArray(JinNiu, JNMergeList, "JinNiu");
                  console.log(NewCH);
                  console.log(NewWH);
                  console.log(NewQY);
                  console.log(NewJJ);
                  console.log(NewJN);
                  NewJJ = placeIdAdd(NewJJ, 352);
                  NewJN = placeIdAdd(NewJN, 352 + 387);
                  NewQY = placeIdAdd(NewQY, 352 + 387 + 411);
                  NewWH = placeIdAdd(NewWH, 352 + 387 + 411 + 393);

                  //然后开始绘制新的区域
                  DrawMap(NewCH, "New-ChengHua", map);
                  DrawMap(NewWH, "New-WuHou", map);
                  DrawMap(NewQY, "New-QingYang", map);
                  DrawMap(NewJJ, "New-JingJiang", map);
                  DrawMap(NewJN, "New-JinNiu", map);

                  //在这里获取到地理的链接关系,首先还是将其合并为一个大区域
                  let NewAll = [];
                  NewAll = AppendToList(NewCH, NewAll);
                  NewAll = AppendToList(NewJJ, NewAll);
                  NewAll = AppendToList(NewJN, NewAll);
                  NewAll = AppendToList(NewQY, NewAll);
                  NewAll = AppendToList(NewWH, NewAll);
                  console.log(NewAll);

                  // //然后开始获取和它有交边的区域
                  // NewAll=GetAdjacent(NewAll)
                  // //然后简化为边数组形式
                  // let Edge=[]
                  // for(let i=0;i<NewAll.length;i++)
                  // {
                  //     let mid=[]
                  //     mid.push(NewAll[i].placeId)
                  //     mid.push(NewAll[i].Adjacent)
                  //     Edge.push(mid)
                  // }
                  // saveJson(Edge,'Edge.json')

                  //在这里获取到流量信息
                  Get1011().then(data => {
                    let FlowData1011 = data;
                    console.log("在这里获取到10-11点的流量信息:", FlowData1011);
                    let FlowEdge = GetEdge(FlowData1011);
                    // saveJson(FlowEdge,'FlowEdge.json')
                  });

                  //这里获取到全天的流量信息
                  Get823AllFlow().then(data => {
                    let AllFlow = data;
                    console.log("8.23全天的流量信息:", AllFlow);
                    let AreaFlowList = [];
                    for (let i = 0; i < NewAll.length; i++) {
                      let mid = [];
                      mid.push(i);
                      AreaFlowList.push(mid);
                    }
                    console.log(AreaFlowList);
                    // GetTargetArea(AreaFlowList,AllFlow)
                  });

                  //导入可能需要合并的区域信息
                  console.log("可能合并的信息：", NeedMerge);
                  // for (let i = 0; i < NeedMerge.length; i++) {
                  //   let test = TiQu(NewAll, NeedMerge[i][1]);
                  //   NewMultPolygon(test, map, "test" + i, "black");
                  // }
                  // console.log("test:", test);
                });
              });
            });
          });
        });
      });
    }
  }
};
</script>

<style scoped>
#mainChart {
  /* position: relative; */
  /* width: 100%; */
  height: 100%;
}
#mapChart {
  /* position: relative; */
  /* width: 100%; */
  height: 100%;
  /* top: 5%; */
  /* left: 15%; */
  /* border: 1px solid red; */
}

.btn1Chart {
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  padding: 10px;
}
#btn1 {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
#NetWorkChart {
  position: absolute;
  top: 43%;
  left: 0;
  width: 500px;
  height: 500px;
  border: 1px solid white;
}
</style>
