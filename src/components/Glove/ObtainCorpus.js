// //这里用来获取轨迹语料库，将每条轨迹一天的转换为字符串，13000辆车

import { GetAllWantList } from "../../api/GetAllWantList";
import { GetNewMergeAreaList } from "../../api/GetNewMergeAreaList";
import { saveJson } from "../saveJson";
export const ObtainCorpus = () => {
  //然后读取数据
  GetAllWantList().then(data => {
    console.log("转换为语料库的数据为", data);
    let RawData = data;
    GetNewMergeAreaList().then(data => {
      let NewMergeAreaList = data;
      console.log("区域合并表:", NewMergeAreaList);
    });
  });
};
