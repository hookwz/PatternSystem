<template>
  <div id="TimeChart"></div>
</template>

<script>
import { GetFinal500POI } from "../api/GetFinalPOI.js";
import { saveJson } from "./saveJson.js";
import { GetFinalTo13500 } from "../api/GetFinalPOI.js";
import { GetDayInformation } from "../api/GetDayInformation.js";

//这里导入区域转换表
// import {AreaMergeList} from '../../public/FPData/AreaMergeList.json'
import { GetMergeAreaList } from "../api/GetMergeAreaList";
import { GetNewMergeAreaList } from "../api/GetNewMergeAreaList";

const turfBool = require("@turf/turf");

export default {
  name: "TimeChart",
  data() {
    return {};
  },
  methods: {
    DayToHour(data) {
      var DayTime = [];
      for (let i = 0; i < 24; i++) {
        let midObject = { TimeId: null, OwnArray: [] };
        midObject.TimeId = i;
        DayTime.push(midObject);
      }
      console.log(DayTime);
      let TimeArray = [];
      let MidTime = 1406995200000;

      //检查是否为正确的
      function getLocalTime(nS) {
        return new Date(parseInt(nS))
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
      }
      //这里划分就按照24个小时来划分了，因为是统计区域流量，若是共现现象，则还是按照48个时间段来进行划分，还有一点原因是因为按照48个文件来分感觉太多了
      for (let i = 0; i < 24; i++) {
        let mid = [];
        mid.push(i);
        mid.push(MidTime);
        TimeArray.push(mid);
        MidTime += 1800000 * 2;
      }
      console.log(TimeArray);
      let RealTime = [];
      for (let i = 0; i < TimeArray.length; i++) {
        let mid = getLocalTime(TimeArray[i][1]);
        RealTime.push(mid);
      }
      //验证正确
      //  console.log(RealTime)
      //在这里转换时间为时间戳
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          data[i][j]["timeStamp"] = new Date(data[i][j].time).getTime();
        }
      }

      //然后判断在哪个时间段
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          for (let k = 0; k < TimeArray.length; k++) {
            if (
              data[i][j].timeStamp >= TimeArray[k][1] &&
              data[i][j].timeStamp < TimeArray[k][1] + 1800000 * 2
            ) {
              data[i][j].timeSlot = TimeArray[k][0];
            }
          }
        }
      }
      //然后按照每个timeslot来进行划分
      for (let i = 0; i < data.length; i++) {
        let NowCar0 = [];
        let NowCar1 = [];
        let NowCar2 = [];
        let NowCar3 = [];
        let NowCar4 = [];
        let NowCar5 = [];
        let NowCar6 = [];
        let NowCar7 = [];
        let NowCar8 = [];
        let NowCar9 = [];
        let NowCar10 = [];
        let NowCar11 = [];
        let NowCar12 = [];
        let NowCar13 = [];
        let NowCar14 = [];
        let NowCar15 = [];
        let NowCar16 = [];
        let NowCar17 = [];
        let NowCar18 = [];
        let NowCar19 = [];
        let NowCar20 = [];
        let NowCar21 = [];
        let NowCar22 = [];
        let NowCar23 = [];
        for (let j = 0; j < data[i].length; j++) {
          switch (data[i][j].timeSlot) {
            case 0:
              NowCar0.push(data[i][j]);
              continue;
            case 1:
              NowCar1.push(data[i][j]);
              continue;
            case 2:
              NowCar2.push(data[i][j]);
              continue;
            case 3:
              NowCar3.push(data[i][j]);
              continue;
            case 4:
              NowCar4.push(data[i][j]);
              continue;
            case 5:
              NowCar5.push(data[i][j]);
              continue;
            case 6:
              NowCar6.push(data[i][j]);
              continue;
            case 7:
              NowCar7.push(data[i][j]);
              continue;
            case 8:
              NowCar8.push(data[i][j]);
              continue;
            case 9:
              NowCar9.push(data[i][j]);
              continue;
            case 10:
              NowCar10.push(data[i][j]);
              continue;
            case 11:
              NowCar11.push(data[i][j]);
              continue;
            case 12:
              NowCar12.push(data[i][j]);
              continue;
            case 13:
              NowCar13.push(data[i][j]);
              continue;
            case 14:
              NowCar14.push(data[i][j]);
              continue;
            case 15:
              NowCar15.push(data[i][j]);
              continue;
            case 16:
              NowCar16.push(data[i][j]);
              continue;
            case 17:
              NowCar17.push(data[i][j]);
              continue;
            case 18:
              NowCar18.push(data[i][j]);
              continue;
            case 19:
              NowCar19.push(data[i][j]);
              continue;
            case 20:
              NowCar20.push(data[i][j]);
              continue;
            case 21:
              NowCar21.push(data[i][j]);
              continue;
            case 22:
              NowCar22.push(data[i][j]);
              continue;
            case 23:
              NowCar23.push(data[i][j]);
              continue;
          }
        }
        DayTime[0].OwnArray.push(NowCar0);
        DayTime[1].OwnArray.push(NowCar1);
        DayTime[2].OwnArray.push(NowCar2);
        DayTime[3].OwnArray.push(NowCar3);
        DayTime[4].OwnArray.push(NowCar4);
        DayTime[5].OwnArray.push(NowCar5);
        DayTime[6].OwnArray.push(NowCar6);
        DayTime[7].OwnArray.push(NowCar7);
        DayTime[8].OwnArray.push(NowCar8);
        DayTime[9].OwnArray.push(NowCar9);
        DayTime[10].OwnArray.push(NowCar10);
        DayTime[11].OwnArray.push(NowCar11);
        DayTime[12].OwnArray.push(NowCar12);
        DayTime[13].OwnArray.push(NowCar13);
        DayTime[14].OwnArray.push(NowCar14);
        DayTime[15].OwnArray.push(NowCar15);
        DayTime[16].OwnArray.push(NowCar16);
        DayTime[17].OwnArray.push(NowCar17);
        DayTime[18].OwnArray.push(NowCar18);
        DayTime[19].OwnArray.push(NowCar19);
        DayTime[20].OwnArray.push(NowCar20);
        DayTime[21].OwnArray.push(NowCar21);
        DayTime[22].OwnArray.push(NowCar22);
        DayTime[23].OwnArray.push(NowCar23);
      }
      //DayTime一共有24个数组，每个数组中存放对应时间段的车辆数据
      // console.log(DayTime)
      return DayTime;
    },
    DefineFunction(data) {
      //获取到每个POI点和停驻点的距离,distance采用半径r40m来进行
      for (let i = 0; i < data.length; i++) {
        if (JSON.stringify(data[i]) == "[]") {
          continue;
        }
        for (let j = 0; j < data[i].length; j++) {
          //  console.log(j)
          let from = turfBool.point([data[i][j].lng, data[i][j].lat]);
          if (JSON.stringify(data[i][j].Owned40mPOI) == "[]") {
            continue;
          }
          for (let k = 0; k < data[i][j].Owned40mPOI.length; k++) {
            //  console.log(k)
            let To = turfBool.point([
              parseFloat(data[i][j].Owned40mPOI[k]["WGS84_经度"]),
              parseFloat(data[i][j].Owned40mPOI[k]["WGS84_纬度"])
            ]);
            let options = { units: "miles" };

            let currentDistance = turfBool.distance(from, To, options);
            data[i][j].Owned40mPOI[k]["distance"] = currentDistance * 1609.344; //这才是m，上面得到的单位是英里
          }
        }
      }

      console.log(data);

      // function GetFinalPOIFunctoin(data)
      // {
      //     for(let i=0;i<data.length;i++)
      //     {
      //         for(let j=0;j<data[i].length;j++)
      //         {
      //           for()
      //           {

      //           }
      //         }
      //     }
      // }
      return data;
    },
    //然后通过高斯函数来判定那个类别的点更可能为停驻点的语义,这里的x是两点之间的距离,然后*为r/3
    g(data) {
      for (let i = 0; i < data.length; i++) {
        if (JSON.stringify(data[i]) == "[]") {
          continue;
        }
        for (let j = 0; j < data[i].length; j++) {
          if (JSON.stringify(data[i][j].Owned40mPOI) == "[]") {
            continue;
          }
          for (let k = 0; k < data[i][j].Owned40mPOI.length; k++) {
            let x = data[i][j].Owned40mPOI[k]["distance"];
            data[i][j].Owned40mPOI[k]["gaussian"] =
              (1 / ((40 / 3) * Math.sqrt(2 * Math.PI))) *
              Math.exp(-0.5 * Math.pow(x / (40 / 3), 2));
          }
        }
      }
      console.log(data);
      return data;
    },
    DefinePOI(data) {
      for (let i = 0; i < data.length; i++) {
        if (JSON.stringify(data[i]) == "[]") {
          continue;
        }
        for (let j = 0; j < data[i].length; j++) {
          if (JSON.stringify(data[i][j].Owned40mPOI) == "[]") {
            continue;
          }
          let OwnedPOICategory = [];
          for (let k = 0; k < data[i][j].Owned40mPOI.length; k++) {
            OwnedPOICategory.push(data[i][j].Owned40mPOI[k].大类);
          }
          OwnedPOICategory = new Set(OwnedPOICategory);
          let grade = [];
          for (let ele of OwnedPOICategory) {
            let mid = [];
            mid.push(ele);
            let currNum = 0;
            let currCount = 0;
            for (let q = 0; q < data[i][j].Owned40mPOI.length; q++) {
              if (data[i][j].Owned40mPOI[q].大类 == ele) {
                currNum += data[i][j].Owned40mPOI[q].gaussian;
                currCount++;
              }
            }
            let finGrade = currNum / currCount;
            mid.push(finGrade);
            grade.push(mid);
          }
          data[i][j].grade = grade;
        }
      }
      //然后拿到最大得分的作为停驻点的语义
      for (let i = 0; i < data.length; i++) {
        if (JSON.stringify(data[i]) == "[]") {
          continue;
        }
        for (let j = 0; j < data[i].length; j++) {
          if (JSON.stringify(data[i][j].Owned40mPOI) == "[]") {
            continue;
          }
          let FinalFunction;
          let mmin = 0;
          for (let r = 0; r < data[i][j].grade.length; r++) {
            if (data[i][j].grade[r][1] > mmin) {
              FinalFunction = data[i][j].grade[r][0];
              mmin = data[i][j].grade[r][1];
            }
          }
          data[i][j].FinalFunction = FinalFunction;
        }
      }
      console.log(data);
      return data;
    },
    FilterUnlessInfor(data) {
      let FilterData = [];
      for (let i = 0; i < data.length; i++) {
        let u1 = [];
        for (let j = 0; j < data[i].length; j++) {
          let u11 = {
            id: null,
            lng: null,
            lat: null,
            stop: null,
            time: null,
            Area: null,
            FinalFunction: null
          };
          u11.id = data[i][j].id;
          u11.lng = data[i][j].lng;
          u11.lat = data[i][j].lat;
          u11.stop = data[i][j].stop;
          u11.time = data[i][j].time;
          // u11.timeSlot=data[i][j].timeSlot
          // u11.timeStamp=data[i][j].timeStamp
          u11.Area = data[i][j].Area;
          u11.FinalFunction = data[i][j].FinalFunction;
          u1.push(u11);
        }
        FilterData.push(u1);
      }
      return FilterData;
    },
    ChangeTime(data, CurrentTimeStart) {
      //用于筛选特定时间的数据出来进行可视化
      let GetArray;
      for (let i = 0; i < data.length; i++) {
        //去一个指定的数组的元素出来，看它的timeSlot是多
        let target = data[i][26][0][0];
        if (target == undefined) {
          continue;
        } else {
          if (target.timeSlot == CurrentTimeStart) {
            GetArray = data[i];
            return GetArray;
          }
        }
      }
    },
    GetAreaIDList(data) {
      //先获取到当前时间段有多少个区域有发生了移动情况
      let AreaIdList = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (JSON.stringify(data[i][j]) == "[]") {
            continue;
          } else {
            for (let k = 0; k < data[i][j].length; k++) {
              AreaIdList.push(data[i][j][k].Area);
            }
          }
        }
      }
      AreaIdList = new Set(AreaIdList);
      return AreaIdList;
    },
    TransformAreaId(Source, MergeAreaList) {
      let TransformAreaId = [];
      for (let item of Source) {
        for (let i = 0; i < MergeAreaList.length; i++) {
          if (MergeAreaList[i].indexOf(item) != -1) {
            TransformAreaId.push(i);
          }
        }
      }
      // console.log(TransformAreaId)
      let TransformAreaIdSet = new Set(TransformAreaId);
      // console.log(TransformAreaIdSet)
      return TransformAreaIdSet;
    },
    GetAreaFlow(
      trajectData,
      AreaList,
      MergeAreaList,
      Day,
      Time //这里Day是一天的总信息
    ) {
      //  console.log(trajectData)
      console.log(AreaList);
      let CurrentTime = trajectData[26][0][0].timeSlot;
      //首先还是需要将trajectoryData里面的区域获取到在转换后的哪个区域内，然后就是
      for (let i = 0; i < trajectData.length; i++) {
        for (let j = 0; j < trajectData[i].length; j++) {
          if (JSON.stringify(trajectData[i][j]) == "[]") {
            continue;
          } else {
            for (let k = 0; k < trajectData[i][j].length; k++) {
              for (let q = 0; q < MergeAreaList.length; q++) {
                if (MergeAreaList[q].indexOf(trajectData[i][j][k].Area) != -1) {
                  trajectData[i][j][k].transfromArea = q;
                }
              }
            }
          }
        }
      }
      console.log(trajectData);
      let TrajectStr = [];
      //然后将其转换为出入字符的形式

      for (let i = 0; i < trajectData.length; i++) {
        for (let j = 0; j < trajectData[i].length; j++) {
          if (JSON.stringify(trajectData[i][j]) == "[]") {
            continue;
          } else {
            let tid = [];
            let tstr = [];
            let m = [];
            for (let k = 0; k < trajectData[i][j].length; k++) {
              if (trajectData[i][j][k].stop == "1") {
                tstr.push(trajectData[i][j][k].transfromArea + " 入");
              } else if (trajectData[i][j][k].stop == "0") {
                tstr.push(trajectData[i][j][k].transfromArea + " 出");
              }
            }
            tid.push(trajectData[i][j][0].id);
            m.push(tid);
            m.push(tstr);
            TrajectStr.push(m);
          }
        }
      }
      console.log(TrajectStr);
      let AreaFlow = [];
      for (let item of AreaList) {
        let AreaFlowObject = { id: null, Enter: 0, Leave: 0 };
        AreaFlowObject.id = item;
        AreaFlow.push(AreaFlowObject);
      }
      for (let i = 0; i < AreaFlow.length; i++) {
        for (let j = 0; j < TrajectStr.length; j++) {
          for (let k = 0; k < TrajectStr[j][1].length; k++) {
            let want = TrajectStr[j][1][k].split(" ");
            if (parseFloat(want[0]) == AreaFlow[i].id) {
              if (want[1] == "入") {
                AreaFlow[i].Enter++;
              } else if (want[1] == "出") {
                AreaFlow[i].Leave++;
              }
            }
          }
        }
      }

      //这里获取每个区域的到达集合
      for (let i = 0; i < AreaFlow.length; i++) {
        AreaFlow[i].EnterStr = [];
        for (let j = 0; j < trajectData.length; j++) {
          for (let k = 0; k < trajectData[j].length; k++) {
            for (let q = 0; q < trajectData[j][k].length; q++) {
              if (
                trajectData[j][k][q].transfromArea == AreaFlow[i].id &&
                trajectData[j][k][q].stop == "1"
              ) {
                AreaFlow[i].EnterStr.push(trajectData[j][k][q].FinalFunction);
              }
            }
          }
        }
      }
      // //这里获取到每个区域的离开集合，具体流向到那个区域，然后流向其他每个区域的流量是多少,这里的问题在于没有考虑，到其他区域的车流量了，就是那些不在5大区内部的信息
      for (let i = 0; i < AreaFlow.length; i++) {
        AreaFlow[i].LeaveToAreaInformation = [];
        AreaFlow[i].InListTail = 0;
        AreaFlow[i].ListTailInformation = [];
        //直接去找出后面的入即可
        for (let j = 0; j < TrajectStr.length; j++) {
          for (let k = 0; k < TrajectStr[j][1].length; k++) {
            //先找到出，然后后面的那个就是流向的入，如果后面是出的话，代表流向到的区域不属于目前划分的这5个大区里面
            let New = TrajectStr[j][1][k].split(" ");
            if (parseFloat(New[0]) == AreaFlow[i].id) {
              if (New[1] == "出") {
                if (k + 1 <= TrajectStr[j][1].length - 1) {
                  let New2 = TrajectStr[j][1][k + 1].split(" ");
                  if (New2[1] == "入") {
                    AreaFlow[i].LeaveToAreaInformation.push(New2[0]);
                  } else {
                    AreaFlow[i].LeaveToAreaInformation.push("Other");
                  }
                }
                //表示当前的出是在最后，那我们则需要遍历大信息，去找
                else if (k + 1 == TrajectStr[j][1].length) {
                  AreaFlow[i].InListTail++;
                  //然后找11点的开头即可
                  AreaFlow[i].ListTailInformation.push([
                    TrajectStr[j][0],
                    TrajectStr[j][1][k]
                  ]);
                }
              }
            }
          }
        }
      }
      console.log(AreaFlow);

      function SearchTailArea(data, CurrentTime, Day) {
        let Loc;
        // console.log(data,CurrentTime,Day)
        for (let e = 0; e < Day.length; e++) {
          if (JSON.stringify(Day[e][26][0]) == "[]") {
            continue;
          } else {
            if (Day[e][26][0][0].timeSlot != CurrentTime + 1) {
              continue;
            } else if (Day[e][26][0][0].timeSlot == CurrentTime + 1) {
              //  console.log(Day[e])
              let CurrentArray = Day[e];
              //  console.log(CurrentArray)
              for (let b = 0; b < CurrentArray.length; b++) {
                for (let z = 0; z < CurrentArray[b].length; z++) {
                  if (JSON.stringify(CurrentArray[b][z]) == "[]") {
                    continue;
                  } else {
                    for (let a = 0; a < CurrentArray[b][z].length; a++) {
                      if (CurrentArray[b][z][a].id != data[0][0]) {
                        break;
                      } else {
                        Loc = CurrentArray[b][z][a].Area;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return Loc;
      }
      // let LocArray=[]
      // for(let i=0;i<AreaFlow.length;i++)
      // {
      //    let Tar=AreaFlow[i].ListTailInformation
      //    let mid=[]
      //    for(let j=0;j<Tar.length;j++)
      //    {
      //       let Loc=SearchTailArea(Tar[j],Time,Day)
      //       mid.push(Loc)
      //       // break
      //    }
      //    LocArray.push(mid)
      // }
      // console.log(LocArray)

      //这个函数统计具体每个区域有多少辆车的流量
      function GetAreaFlow(data) {
        for (let i = 0; i < data.length; i++) {
          let InformationList = [];
          let LeaveAreaIdList = new Set(data[i].LeaveToAreaInformation);
          let mid;
          for (let item of LeaveAreaIdList) {
            mid = { id: null, num: 0 };
            mid.id = item;
            for (let k = 0; k < data[i].LeaveToAreaInformation.length; k++) {
              if (data[i].LeaveToAreaInformation[k] == item) {
                mid.num++;
              }
            }
            InformationList.push(mid);
          }
          data[i].InformationList = InformationList;
        }
        return data;
      }
      let InformationList = GetAreaFlow(AreaFlow);
      console.log(InformationList);
      saveJson(AreaFlow, "8.23-10-10.30Flow.json");
      return AreaFlow;
    },
    JudgeOwnedArea(list) {
      let OwnArea = [];
      function Divded(data) {
        if (data.split("u").length == 3) {
          return "WuHou";
        } else if (data.split("u").length == 2) {
          data = data.split("u");
          if (data[0] == "ChengH") {
            return "ChengHua";
          } else if (data[0] == "JinNi") {
            return "JinNiu";
          }
        } else if (data.split("g").length == 3) {
          data = data.split("g");
          if (data[0] == "Jin") {
            return "JingJiang";
          } else if (data[0] == "Qin") {
            return "QingYang";
          }
        }
      }
      for (let i = 0; i < list.length; i++) {
        let mid = Divded(list[i]);
        OwnArea.push(mid);
      }
      return OwnArea;
    },
    GetWantArea(data, str) {
      let PointList = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i][2] == str) {
          PointList.push(data[i][0]);
        }
      }
      return PointList;
    }
  },
  mounted() {
    //  GetFinalTo13500().then((data)=>{
    //    console.log('五大区内的500辆车的带POI的停驻点:',data)
    //     let newdata=this.DefineFunction(data[3])
    //     let twodata=this.g(newdata)
    //     let threedata=this.DefinePOI(twodata)
    //    //下面我们需要按照24个小时的时间段来对数据进行划分
    //     let finalResult=this.FilterUnlessInfor(data[3])
    //     console.log(finalResult)
    //     let result=this.DayToHour(finalResult)
    //     console.log(result)
    //     // for(let i=14;i<result.length;i++)
    //     // {
    //     //   saveJson(result[i].OwnArray,'13000Car'+result[i].TimeId+'.json')
    //     // }
    //  })
    GetDayInformation().then(data => {
      // console.log('8.23一天的停驻点数据：',data)
      //在此获取区域流量，先获取到7点到8点间的区域流量吧
      let Day23 = data;
      console.log("全天的一个信息段", Day23);
      let GetArray = this.ChangeTime(Day23, 23);
      console.log("对应时间段的信息:", GetArray);
      //然后统计各个区域的流量信息
      let AreaIdList = this.GetAreaIDList(GetArray);
      console.log(AreaIdList);
      //然后在这里导入我们转换后的区域信息，将现有的区域信息转换为合并后的区域信息

      GetNewMergeAreaList().then(data => {
        // console.log(data)
        let MergeAreaList = data;
        console.log("区域合并列表为:", MergeAreaList);
        for (let i = 0; i < MergeAreaList.length; i++) {
          let Area = this.JudgeOwnedArea(MergeAreaList[i][1]);
          let NewArea = new Set(Area);
          let FilterArea = [];
          for (let item of NewArea) {
            FilterArea.push(item);
          }
          MergeAreaList[i].push(FilterArea);
        }

        //然后划分
        let SingleArea = [];
        let MultArea = [];
        for (let i = 0; i < MergeAreaList.length; i++) {
          if (MergeAreaList[i][2].length == 1) {
            SingleArea.push(MergeAreaList[i]);
          } else {
            MultArea.push(MergeAreaList[i]);
          }
        }
        console.log(SingleArea, MultArea);
        let WuHouAreaPointList = this.GetWantArea(SingleArea, "WuHou");
        let QingYangAreaPointList = this.GetWantArea(SingleArea, "QingYang");
        let JinNiuAreaPointList = this.GetWantArea(SingleArea, "JinNiu");
        let JingJiangAreaPointList = this.GetWantArea(SingleArea, "JingJiang");
        let ChengHuaAreaPointList = this.GetWantArea(SingleArea, "ChengHua");
        let SingleList = [
          {
            WuHou: null,
            QingYang: null,
            JinNiu: null,
            JingJiang: null,
            ChengHua: null,
            MultArea: null
          }
        ];
        // console.log(WuHouAreaPointList);
        SingleList[0].WuHou = WuHouAreaPointList;
        SingleList[0].QingYang = QingYangAreaPointList;
        SingleList[0].JinNiu = JinNiuAreaPointList;
        SingleList[0].JingJiang = JingJiangAreaPointList;
        SingleList[0].ChengHua = ChengHuaAreaPointList;
        for (let i = 0; i < MultArea.length; i++) {
          let NumList = [];
          for (let j = 0; j < MultArea[i][2].length; j++) {
            let Count = 0;
            for (let k = 0; k < MultArea[i][1].length; k++) {
              if (MultArea[i][1][k].search(MultArea[i][2][j]) != -1) {
                Count++;
              }
            }
            NumList.push(Count);
          }
          MultArea[i].push(NumList);
        }

        let MultAreaList = [];
        for (let i = 0; i < MultArea.length; i++) {
          let mid = [];
          mid.push(MultArea[i][0]);
          mid.push(MultArea[i][2]);
          mid.push(MultArea[i][3]);
          MultAreaList.push(mid);
        }
        SingleList[0].MultArea = MultAreaList;
        console.log(SingleList);
        // saveJson(SingleList, "FiveAreaList.json");

        //这里结束区域所属大区的划分

        let wantAreaList = [];
        for (let i = 0; i < MergeAreaList.length; i++) {
          wantAreaList.push(MergeAreaList[i][1]);
        }
        let CurrentFlowAreaList = this.TransformAreaId(
          AreaIdList,
          wantAreaList
        );
        console.log(CurrentFlowAreaList);
        let Time = 10;
        // console.log(CurrentFlowAreaList)
        //然后统计每个区域的流入和流出
        // this.GetAreaFlow(
        //   GetArray,
        //   CurrentFlowAreaList,
        //   wantAreaList,
        //   Day23,
        //   Time
        // );
        //然后我们还需要得到具体的流入到了那个区域
      });
    });
  }
};
</script>

<style scoped></style>
