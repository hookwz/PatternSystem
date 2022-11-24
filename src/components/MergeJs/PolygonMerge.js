// import * as greinerHormann from 'greiner-hormann'
// import voronoiBound from '../../../public/json/voronoiBoundData.json'
// import { ObjectFilter } from './ObjectFilter'
import { DrawGeoJsonPolygon } from "../DrawGeoJsonPolygon";
// import * as martinez from 'martinez-polygon-clipping'
// import { PointDraw } from './PointDraw'
import { clockWise } from "./clockWise";
// import { supplement } from './supplement'
import { myAreaMerge } from "./myAreaMerge";
import { getInter } from "./getInter";
// import { FinalReverse } from './FinalReverse'

export const PolygonMerge = (Target1, Target2) => {
  //下面来对这个api进行相应的验证
  // console.log('合并算法部分')
  // console.log(voronoiBound)
  // //   greinerHormann.union()
  // //下面我们提取出和id为0的有相同交边的区域，从图上看一共有8个
  // let id0 = voronoiBound[0].geometry.coordinates
  // console.log(id0[0])
  // let testUnion = []
  // for (let i = 0; i < id0[0].length; i++) {
  //   for (let j = 0; j < voronoiBound.length; j++) {
  //     let mid = voronoiBound[j].geometry.coordinates
  //     for (let z = 0; z < mid[0].length; z++) {
  //       if (id0[0][i][0] == mid[0][z][0] && id0[0][i][1] == mid[0][z][1]) {
  //         testUnion.push(voronoiBound[j])
  //       }
  //     }
  //   }
  // }
  // //为什么有24，因为算了自身和重复的，去重即可
  // let newtestUnion
  // newtestUnion = ObjectFilter(testUnion, 'cp')
  // //有9个的原因是包含了自身
  // console.log(newtestUnion)
  // //转换为对应的形式
  // let DrawArray = []
  // for (let i = 0; i < newtestUnion.length; i++) {
  //   let result = newtestUnion[i].geometry.coordinates
  //   let midArray = []
  //   midArray.push(result[0])
  //   DrawArray.push(midArray)
  // }
  // console.log(DrawArray)
  // //其实这里转换为了一个对象，所以才出现的bug
  // let newtest
  // //那么下面我们来绘制一下检查是否是对的
  // for (let i = 1; i < DrawArray.length; i++) {
  //   newtest = []
  //   newtest = [DrawArray[i][0]]
  //   DrawGeoJsonPolygon(newtest, mapChart, '3' + '-' + i, 'red')
  // }

  //然后将这些8个范围的数据传入到union方法中，看返回的值是多少

  // let MergeArray = []
  // MergeArray.push(DrawArray[0][0])
  // console.log(MergeArray)

  // let test1 = [
  //   [103.93453414874692, 30.775763768597503],
  //   [103.93435459373862, 30.774507406261375],
  //   [103.9354705, 30.7733915],
  //   [103.9368435, 30.7733915],
  //   [103.93880766941747, 30.775355669417475],
  //   [103.93879858258897, 30.77559127365707],
  //   [103.93861098164794, 30.7761385],
  //   [103.934784, 30.7761385]
  // ]
  // //确实是和顺序有关
  // let test2 = [
  //   [103.93041402068577, 30.770957326438076],
  //   [103.931351, 30.770645],
  //   [103.9340979996361, 30.770645],
  //   [103.9354705, 30.772018499999998],
  //   [103.9354705, 30.7733915],
  //   [103.93435459373862, 30.774507406261375],
  //   [103.9330685631261, 30.77373593769358],
  //   [103.930664, 30.771332249908987]
  // ]

  // let test3 = [
  //   [103.93066339989802, 30.776138800160215],
  //   [103.93203749999999, 30.77659638883495],
  //   [103.93453414874692, 30.775763768597503],
  //   [103.93435459373862, 30.774507406261375],
  //   [103.9330685631261, 30.77373593769358],
  //   [103.930664, 30.776137000727804]
  // ]
  // let testdraw3 = [
  //   [103.93203749999999, 30.77659638883495],
  //   [103.93203749999999, 30.7781985],
  //   [103.93238125018208, 30.77854225018208],
  //   [103.93340990011647, 30.778885299941756],
  //   [103.93386894430962, 30.778655777845184],
  //   [103.934784, 30.776825],
  //   [103.934784, 30.7761385],
  //   [103.93453414874692, 30.775763768597503]
  // ]
  // let testdraw4 = [
  //   [103.934784, 30.7761385],
  //   [103.934784, 30.776825],
  //   [103.93780509999999, 30.7798461],
  //   [103.93862991977285, 30.779296220151423],
  //   [103.93933260831515, 30.778241931442658],
  //   [103.93861098164794, 30.7761385]
  // ]

  // let testdraw5 = [
  //   [103.93861098164794, 30.7761385],
  //   [103.93933260831515, 30.778241931442658],
  //   [103.93962574911451, 30.77823374911452],
  //   [103.94036077733983, 30.7780622996071],
  //   [103.94079196169355, 30.7776925],
  //   [103.9417950543132, 30.77660618135513],
  //   [103.94090175818529, 30.77552576490898],
  //   [103.93879858258897, 30.77559127365707]
  // ]

  // let testdraw6 = [
  //   [103.93880766941747, 30.775355669417475],
  //   [103.93879858258897, 30.77559127365707],
  //   [103.94090175818529, 30.77552576490898],
  //   [103.94151336939683, 30.774885897441756],
  //   [103.9413724329719, 30.77360088886153],
  //   [103.94110789922519, 30.77204228462409],
  //   [103.94036700693908, 30.772705]
  // ]

  //   DrawGeoJsonPolygon([test1], mapChart, '321', 'blue')
  //   DrawGeoJsonPolygon([DrawArray[1][0]], mapChart, '2221', 'black')
  //   DrawGeoJsonPolygon([test3], mapChart, '4545', 'yellow')
  //   DrawGeoJsonPolygon([DrawArray[3][0]], mapChart, '56', 'green')
  // console.log('第一个数据集', DrawArray[0][0])
  // console.log('第二个数据集', DrawArray[1][0])

  // let result, newresult, threeresult
  // result = martinez.union([test1], [test2])
  // console.log(result)
  // newresult = martinez.union([testdraw3], [testdraw4])
  // console.log(newresult)
  // threeresult = martinez.union([testdraw5], [testdraw6])
  // console.log(threeresult)
  //   DrawGeoJsonPolygon([newresult[0][0]], mapChart, '3232332', 'pink')

  //   DrawGeoJsonPolygon([threeresult[0][0]], mapChart, '3232332132', 'Violet')

  //补充缺失值部分
  // let suppleresult = supplement(result, test1, test2)
  //   DrawGeoJsonPolygon([suppleresult], mapChart, '32322', 'black')
  // console.log(suppleresult)

  // let suppleresult2 = supplement(threeresult, testdraw5, testdraw6)
  //   DrawGeoJsonPolygon([suppleresult2], mapChart, '3232332132', 'Violet')

  //顺时针部分
  //   let testshunxu = clockWise(DrawArray[0][0])
  //   console.log(testshunxu)
  //   let testshunxu2 = clockWise(DrawArray[2][0])
  //   console.log(testshunxu2)
  //   let testhhresult = martinez.union([testshunxu], [testshunxu2])
  //   console.log(testhhresult)
  //   let testsuppler = supplement(testhhresult, testshunxu, testshunxu2)
  //   console.log(testsuppler)
  //   DrawGeoJsonPolygon([testhhresult], mapChart, '32322', 'black')

  //   const gj1={}
  //   const gj2={}
  // let clockInter = getInter(DrawArray[0][0], DrawArray[6][0])
  // console.log('合并2个的交集点:', clockInter)
  // let wantanswer = myAreaMerge(
  //   clockWise(DrawArray[0][0], clockInter),
  //   clockWise(DrawArray[6][0], clockInter)
  // )
  // console.log(wantanswer)

  // DrawGeoJsonPolygon([wantanswer], mapChart, '3221112', 'Cyan')

  //下面来测试三块
  // let threeClockInter = getInter(DrawArray[8][0], wantanswer)

  // let threeanswer = myAreaMerge(
  //   clockWise(wantanswer, threeClockInter),
  //   clockWise(DrawArray[8][0], threeClockInter)
  // )

  // console.log(threeanswer)

  // DrawGeoJsonPolygon([threeanswer], mapChart, '3221112', 'Cyan')

  //测试下四块
  // let fourClockInter = getInter(DrawArray[4][0], threeanswer)
  // console.log(fourClockInter)

  // //一个规则合并的在第一个，待合并的在第二个
  // let fouranswer = myAreaMerge(
  //   clockWise(threeanswer, fourClockInter),
  //   clockWise(DrawArray[4][0], fourClockInter)
  // )
  // console.log(fouranswer)
  // DrawGeoJsonPolygon([fouranswer], mapChart, '3221112', 'black')

  //测试5块
  // let fiveClockInter = getInter(DrawArray[5][0], fouranswer)
  // let fiveanswer = myAreaMerge(
  //   clockWise(fouranswer, fiveClockInter),
  //   clockWise(DrawArray[5][0], fiveClockInter)
  // )

  // DrawGeoJsonPolygon([fiveanswer], mapChart, '3221112', 'black')

  //测试6块
  // let sixClockInter = getInter(DrawArray[7][0], fiveanswer)
  // let sixanswer = myAreaMerge(
  //   clockWise(fiveanswer, sixClockInter),
  //   clockWise(DrawArray[7][0], sixClockInter)
  // )
  // DrawGeoJsonPolygon([sixanswer], mapChart, '3221112', 'black')

  //把这些点打出来
  //   DrawGeoJsonPolygon([result[0][0]], mapChart, '32322', 'pink')

  //   console.log(MergeArray)
  //   greinerHormann.union()

  //   mapChart.on('load',()=>{

  //   mapChart.addSource('pointChart', {
  //     type: 'geojson',
  //     data: {
  //       type: 'FeatureCollection',
  //       features:
  //     }
  //   })

  //   mapChart.addLayer({
  //     id: 'pointChart',
  //     type: 'circle',
  //     source: 'pointChart',
  //     paint: {
  //       'circle-radius': 7,
  //       'circle-color': 'red',
  //       'circle-opacity': 0.7
  //     }
  //   })
  //   })

  //这里修改为正式的函数
  //首先传入要合并的Target1和Target2，先取得交集
  let clockInter = getInter(Target1, Target2);
  //然后得到合并区域,这里需要记住，前面的融合的，后面的是被融合的，所以前面的要更大一些
  let mergeArea = myAreaMerge(
    clockWise(Target1, clockInter),
    clockWise(Target2, clockInter)
  );
  return mergeArea;
};
