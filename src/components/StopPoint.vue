<template>
  <div id="stopPoint"></div>
</template>

<script>
import { getTrajectDataRequest } from "../api/TrajectDataApi";
import { getSwitchDataRequest } from "../api/SwitchDataApi";
import { dataClassification } from "./StopPointJs/dataClassification";
import { getStopPoint } from "./StopPointJs/getStopPoint";
import { newClassification } from "./StopPointJs/newClassification";
import { downClassification } from "./StopPointJs/downClassification";
import { getStopList } from "./StopPointJs/getStopList";
import { filterStopList } from "./StopPointJs/filterStopList";
import { saveJson } from "./saveJson";
import { PointInFiveArea } from "./PointToStrJs/PointInFiveArea";

export default {
  name: "StopPoint",
  data() {
    return {};
  },
  methods: {
    //获取相应的停驻点集合，并将其提交到vuex中
    GetStop() {
      getSwitchDataRequest().then(data => {
        let regularData = data;
        console.log(regularData);
        //这里获取到规律数据之后，我们开始进行停驻点的提取
        let { upresult, downresult } = getStopPoint(regularData);
        //然后这里还要对于停驻点进行划分，一辆车的分到相同的一辆车里面去
        //这里获取到了上车点的集合和下车点的集合
        let newupreslult, newdownresult;
        newupreslult = newClassification(upresult);
        newdownresult = downClassification(downresult);

        //然后绘制到mapbox上面看下效果，是否有偏差，有偏差的话进行纠偏，那么需要先把这两个集合上传到vuex里面
        console.log("上车点:", newupreslult);
        console.log("下车点:", newdownresult);

        this.$store.commit("Setupresult", newupreslult);
        this.$store.commit("Setdownresult", newdownresult);

        //我们还需要的是一个完整的上下车链，这样才好直接将其转换为字符串
        let pointList = getStopList(regularData);
        console.log("完整链：", pointList);
        let filterList = filterStopList(pointList);
        console.log("新的完整链:", filterList);
        saveJson(filterList);
      });
    }
  },
  mounted() {
    // this.GetStop();
    // PointInFiveArea(12);
  }
};
</script>

<style scoped></style>
