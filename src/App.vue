<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <HelloWorld/> -->
    <Panel></Panel>
    <!-- <WuHou></WuHou> -->
    <Stop></Stop>
    <!-- <JinNiu></JinNiu> -->

    <!-- <TimeChart></TimeChart> -->
    <ArrangeMent></ArrangeMent>

    <!-- <ReAreaPoi></ReAreaPoi> -->
    <NewDrawFive></NewDrawFive>
    <GetCooccurPattern></GetCooccurPattern>
    <Dynamic></Dynamic>
    <Embedding></Embedding>
    <Chord></Chord>
    <NetWork></NetWork>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import WuHou from "./components/WuHou.vue";
import Stop from "./components/StopPoint.vue";
import JinNiu from "./components/JinNiu.vue";
import TimeChart from "./components/TimeChart.vue";
import ArrangeMent from "./components/ArrangeMent.vue";
import ReAreaPoi from "./components/ReAreaPoi.vue";
import NewDrawFive from "./components/newDrawFive.vue";
import GetCooccurPattern from "./components/getCooccurPattern";
import Panel from "./components/Panel.vue";

//这里是对应的组件图
import Embedding from "./components/Embedding.vue";
import Dynamic from "./components/Dynamic.vue";
import Chord from "./components/ChordChart.vue";
import NetWork from "./components/NetWork.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    WuHou,
    Stop,
    TimeChart,
    ArrangeMent,
    ReAreaPoi,
    NewDrawFive,
    GetCooccurPattern,
    Panel,
    Embedding,
    Dynamic,
    Chord,
    NetWork
    // JinNiu
  }
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.mapboxgl-ctrl-attrib-inner {
  display: none;
}
.mapboxgl-ctrl-attrib-button {
  display: none;
}
</style>
