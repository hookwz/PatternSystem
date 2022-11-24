<template>
  <div id="CooccurChart"></div>
</template>

<script>
//这里是生成对应的
import { GetAllWantList } from "../api/GetAllWantList";
import { GetNewMergeAreaList } from "../api/GetNewMergeAreaList";
import { saveJson } from "./saveJson";
export default {
  name: "getCooccurPattern",
  data() {
    return {};
  },
  methods: {
    ToWantFormat(MergeDay1) {
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
      console.log("轨迹开头都是下车的，需要去除:", See);

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
          if (MergeFinal[i][1][j][1] >= 12 && MergeFinal[i][1][j][4] <= 13) {
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
    },
    GetCurrentArea(data, AllMergeList) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].list.length; j++) {
          //  console.log(j)
          for (let k = 0; k < AllMergeList.length; k++) {
            for (let q = 0; q < AllMergeList[k][1].length; q++) {
              // console.log(data[i].list[j][1])
              if (AllMergeList[k][1][q] == data[i].list[j][1].Area) {
                data[i].list[j][1].newArea = AllMergeList[k][0];
              }
            }
          }
        }
      }
      return data;
    }
  },
  mounted() {
    GetAllWantList().then(data => {
      console.log("这里显示挖掘共现现象所需数据:", data);
      let result = data;
      //这里获取新的238区域合并表
      GetNewMergeAreaList().then(data => {
        let NewAreaMergeList = data;
        console.log(NewAreaMergeList);
        //首先我们需要将区域信息转换为新的区域合并，我这里之前弄成了只选择500辆车的情况，现在重新选择为所有车辆,之前下面GetCurrentArea的第一个参数用的result[0],只获取了478
        let AllResult = [];
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[i].length; j++) {
            AllResult.push(result[i][j]);
          }
        }
        console.log("全部的:", AllResult);
        // let Test = this.GetCurrentArea(AllResult, NewAreaMergeList);
        // console.log(Test);

        //这里是保存的部分
        // let newTest = this.ToWantFormat(Test);
        // console.log(newTest);
        // saveJson(newTest, "6-7.json");
      });
    });

    //这里用于获取动态功能区的定义数据
  }
};
</script>

<style scoped></style>
