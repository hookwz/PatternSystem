//这里的data需要的格式为[[[],[],[]],[[],[]]]这样的
import { SimpleInter } from "./simpleJudgeInter";
import { PolygonMerge } from "./PolygonMerge";
import { DrawGeoJsonPolygon } from "../DrawGeoJsonPolygon";

export const ZR = data => {
  //   let map = {}
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = i + 1; j < data.length; j++) {
  //       if (SimpleInter(data[i], data[j])) {
  //         // i j两块区域相邻
  //         if (map[i]) {
  //           map[j] = map[i]
  //         } else {
  //           map[j] = i
  //         }
  //       }
  //     }
  //   }

  //给他添加一个检索标识

  let swithData;
  let switchArray = [];
  for (let i = 0; i < data.length; i++) {
    swithData = { data: null, isPush: 0 };
    swithData.data = data[i];
    switchArray.push(swithData);
  }
  console.log(switchArray);
  let test = [];
  for (let j = 0; j < 5; j++) {
    test.push(switchArray[j]);
  }
  //   console.log('测试集合:', test)

  function Merge(switchArray) {
    let count = 0;
    let map = [];
    let mid;
    for (let i = 0; i < switchArray.length; i++) {
      // console.log('当前的i:', i)
      if (!switchArray[i].isPush) {
        mid = [];
        mid.push(switchArray[i].data);
        switchArray[i].isPush = 1; //标识已经被标记了
        for (let j = i + 1; j < switchArray.length; j++) {
          // console.log('当前的j', j)
          if (!switchArray[j].isPush) {
            for (let k = 0; k < mid.length; k++) {
              // console.log('k值', k)
              if (SimpleInter(switchArray[j].data, mid[k])) {
                mid.push(switchArray[j].data);
                switchArray[j].isPush = 1;
                count++;
                break;
              }
            }
          }
        }
        map.push(mid);
      } else {
        continue;
      }
    }
    // console.log('最后的分组结果为:', map)
    return [map, count];
  }

  function ListMerge(data) {
    if (data.length > 1) {
      let count = 0; //融合次数 3个元素融合2次
      let MergeData = [];
      let first = data[0];
      let second = data[1];
      //   console.log(first)
      //   console.log(second)
      if (first.length >= second.length) {
        let val = PolygonMerge(first, second);
        MergeData.push(val);
      } else {
        let val = PolygonMerge(second, first);
        MergeData.push(val);
      }
      let k = 2;
      //   console.log('当前的长度', data.length)
      while (count != data.length - 2) {
        let DaiMerge = data[k];
        if (MergeData[0].length >= DaiMerge.length) {
          let newval = PolygonMerge(MergeData[0], DaiMerge);
          MergeData.push(newval);
          MergeData.splice(0, 1);
        } else {
          let newval = PolygonMerge(DaiMerge, MergeData[0]);
          MergeData.push(newval);
          MergeData.splice(0, 1);
        }
        k++;
        count++;
      }
      return MergeData;
    } else {
      return data;
    }
  }

  //再这里进行绘制合并后得数组进行检验,检验后是正确的
  //这里再进行相应得合并
  function wantGeshi(ObjectData) {
    let GeshiData;
    let GeshiArray = [];
    for (let i = 0; i < ObjectData.length; i++) {
      GeshiData = { data: null, isPush: 0 };
      GeshiData.data = ObjectData[i][0];
      GeshiArray.push(GeshiData);
    }
    return GeshiArray;
  }

  let count = 10000;
  let result;
  let FinalMerge;
  while (1) {
    [result, count] = Merge(switchArray);
    console.log(count);
    FinalMerge = [];
    for (let i = 0; i < result.length; i++) {
      let ok = ListMerge(result[i]);
      FinalMerge.push(ok);
    }
    console.log("合并后的数组：", FinalMerge);
    if (count == 0) {
      console.log("最后的结果:", count, FinalMerge);
      break;
    } else {
      switchArray = wantGeshi(FinalMerge);
      console.log("新的数组：", switchArray);
    }
  }

  // let [result, count] = Merge(switchArray)
  // console.log(count)

  // let FinalMerge = []
  // for (let i = 0; i < result.length; i++) {
  //   let ok = ListMerge(result[i])
  //   FinalMerge.push(ok)
  // }
  // console.log('合并后的数组:', FinalMerge)

  // let newFinalMerge = wantGeshi(FinalMerge)
  // console.log(newFinalMerge)
  // let twoFinalMerge, twocount
  // ;[twoFinalMerge, twocount] = Merge(newFinalMerge)
  // console.log('------', twoFinalMerge)

  // let threeFinal = []
  // for (let i = 0; i < twoFinalMerge.length; i++) {
  //   let ok = ListMerge(twoFinalMerge[i])
  //   threeFinal.push(ok)
  // }
  // console.log('合并后的数组2:', threeFinal)

  // let newthree = wantGeshi(threeFinal)
  // let four, fourCount
  // ;[four, fourCount] = Merge(newthree)
  // console.log(four, '-------', fourCount)

  //验证成功，判断条件为Count合并的次数为0的时候就不在进行循环
  return FinalMerge;
};
