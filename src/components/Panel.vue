<template>
  <div id="Left">
    <div id="Title"></div>
    <div class="slider-demo-block">
      <div class="top">
        <svg
          t="1650516415489"
          class="icon-top"
          viewBox="0 0 1117 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3580"
          width="200"
          height="200"
        >
          <path
            d="M792.157091 0c23.738182 0 43.008 19.083636 43.287273 42.821818l0.465454 50.269091h141.498182a139.962182 139.962182 0 0 1 139.357091 131.444364L1117.090909 232.727273v651.776a139.962182 139.962182 0 0 1-131.444364 139.217454L977.454545 1024h-837.818181a139.636364 139.636364 0 0 1-139.403637-131.444364L0 884.363636V232.727273a139.636364 139.636364 0 0 1 130.420364-139.310546L139.589818 93.090909H282.065455L282.810182 42.821818A43.473455 43.473455 0 0 1 326.283636 0c23.738182 0 43.008 19.083636 43.287273 42.821818L370.036364 93.090909h377.902545l0.744727-50.269091A43.473455 43.473455 0 0 1 792.203636 0zM280.622545 186.135273L139.589818 186.181818a46.545455 46.545455 0 0 0-28.299636 9.588364l-4.654546 4.049454a46.545455 46.545455 0 0 0-13.172363 26.810182L93.044364 232.727273v651.636363a46.545455 46.545455 0 0 0 41.099636 46.219637L139.636364 930.909091h837.678545c23.924364-0.093091 43.613091-18.059636 46.359273-41.146182l0.325818-5.399273V232.866909A46.824727 46.824727 0 0 0 977.268364 186.181818l-140.427637-0.046545 0.465455 46.359272a45.847273 45.847273 0 0 1-45.847273 46.312728 45.614545 45.614545 0 0 1-45.614545-45.614546v-0.698182L746.496 186.181818H370.967273l0.465454 46.359273a45.847273 45.847273 0 0 1-45.847272 46.312727 45.614545 45.614545 0 0 1-45.614546-45.614545v-0.698182L280.622545 186.181818zM605.044364 651.636364a46.545455 46.545455 0 0 1 5.445818 92.765091l-5.445818 0.325818h-372.363637a46.545455 46.545455 0 0 1-5.445818-92.765091L232.727273 651.636364h372.363636z m232.727272-232.727273a46.545455 46.545455 0 0 1 5.445819 92.765091l-5.445819 0.325818h-605.090909a46.545455 46.545455 0 0 1-5.445818-92.765091L232.727273 418.909091h605.090909z"
            fill="#2c2c2c"
            p-id="3581"
          ></path>
        </svg>
        <span class="demonstration">Select Date</span>
      </div>
      <el-slider
        v-model="dateValue"
        range
        show-stops
        :max="30"
        :min="23"
        :format-tooltip="val => `8月${val}日`"
        :marks="{
          23: '23',
          30: '30'
        }"
      />
    </div>
    <div class="slider-demo-block">
      <div class="top">
        <svg
          t="1650516454399"
          class="icon-top"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4514"
          width="200"
          height="200"
        >
          <path
            d="M533.333333 96c229.76 0 416 186.24 416 416S763.093333 928 533.333333 928 117.333333 741.76 117.333333 512 303.573333 96 533.333333 96z m0 64C338.922667 160 181.333333 317.589333 181.333333 512S338.922667 864 533.333333 864 885.333333 706.410667 885.333333 512 727.744 160 533.333333 160z m32 116.608v220.992l163.2 144.554667-42.410666 47.893333-184.789334-163.626667v-249.813333h64z"
            fill="#2c2c2c"
            p-id="4515"
          ></path>
        </svg>
        <span class="demonstration">Select Time</span>
      </div>
      <el-slider
        v-model="timeValue"
        range
        show-stops
        :max="24"
        :min="6"
        :marks="{
          6: '6',
          12: '12',
          18: '18',
          24: '24'
        }"
      />
    </div>
    <div class="slider-demo-block">
      <div class="top">
        <svg
          t="1650516490334"
          class="icon-top"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7410"
          width="200"
          height="200"
        >
          <path
            d="M386.844444 910.222222H113.777778V113.777778h796.444444v273.066666h-52.337778V166.115556H166.115556v691.768888H386.844444V910.222222z"
            fill="#2c2c2c"
            p-id="7411"
          ></path>
          <path
            d="M517.575111 910.222222L340.536889 340.536889 910.222222 517.575111l-169.642666 104.448 166.001777 166.001778-118.556444 118.556444-166.001778-166.001777z m94.663111-253.496889l175.786667 175.786667 44.487111-44.487111-175.786667-175.786667L785.066667 533.390222l-364.088889-113.777778L533.390222 785.066667z"
            fill="#2c2c2c"
            p-id="7412"
          ></path>
        </svg>
        <span class="demonstration">Select K value</span>
      </div>
      <el-select
        class="select"
        v-model="kValue"
        collapse-tags
        placeholder="Select"
      >
        <el-option
          v-for="item in kOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="slider-demo-block">
      <div class="top">
        <svg
          t="1650516526319"
          class="icon-top"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7810"
          width="200"
          height="200"
        >
          <path
            d="M160 640l-64-32V832H192v-64h640v64h96V608l-64 32-32 32H192l-32-32z"
            fill="#2c2c2c"
            opacity=".1"
            p-id="7811"
          ></path>
          <path
            d="M96 512v-32L64 512h32zM192 512h32L192 480V512z m-96 320H64l32 32V832zM192 832v32l32-32H192z m0-64v-32l-32 32H192z m640 0h32l-32-32v32z m0 64h-32l32 32V832z m96 0v32l32-32h-32z m0-320h32l-32-32V512zM832 512v-32l-32 32h32z m0 64v32l32-32H832zM192 576h-32l32 32V576z m-96-32H192v-64H96v64zM128 832V512H64v320h64z m64-32H96v64H192v-64z m-32-32v64h64v-64h-64z m32 32h640v-64H192v64z m608-32v64h64v-64h-64z m32 96h96v-64H832v64z m128-32V512h-64v320h64z m-32-352H832v64h96v-64z m-128 32v64h64V512h-64z m32 32H192v64h640v-64zM160 512v64h64V512h-64zM864 256h-64V192h64v64z m-128 0h-64V192h64v64z m-128 0h-64V192h64v64z m-128 0h-64V192h64v64z m-128 0h-64V192h64v64z m-128 0h-64V192h64v64z"
            fill="#2c2c2c"
            p-id="7812"
          ></path>
          <path
            d="M64 224L192 128v192L64 224zM960 224L832 128v192l128-96z"
            fill="#2c2c2c"
            p-id="7813"
          ></path>
        </svg>
        <span class="demonstration">Select the range of meters</span>
      </div>
      <el-slider
        v-model="mikeValue"
        range
        show-stops
        :max="2"
        :min="1.5"
        step="0.1"
        :format-tooltip="val => `${val}km`"
        :marks="{
          1.5: '1.5',
          1.6: '1.6',
          1.7: '1.7',
          1.8: '1.8',
          1.9: '1.9',
          2.0: '2.0'
        }"
      />
    </div>
    <div class="slider-demo-block">
      <div class="top">
        <svg
          t="1650516549045"
          class="icon-top"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8709"
          width="200"
          height="200"
        >
          <path
            d="M0 0v1024h1024V0z m955.733333 955.733333H68.266667V68.266667h887.466666z"
            fill="#2c2c2c"
            p-id="8710"
          ></path>
          <path
            d="M341.333333 887.466667h546.133334V136.533333H136.533333v750.933334h204.8z m477.866667-68.266667h-68.266667l68.266667-68.266667z m0-204.8l-204.8 204.8H477.866667l341.333333-341.333333zM204.8 204.8h204.8L204.8 409.6z m0 341.333333l341.333333-341.333333h136.533334l-477.866667 477.866667z m0 273.066667l614.4-614.4v136.533333l-477.866667 477.866667z"
            fill="#2c2c2c"
            p-id="8711"
          ></path>
        </svg>
        <span class="demonstration">Number of selected areas</span>
      </div>
      <el-slider
        v-model="areaIdValue"
        range
        show-stops
        :max="237"
        :min="0"
        :marks="{
          0: '0',
          119: '119',
          237: '237'
        }"
      />
    </div>
    <div class="bottom">
      <svg
        t="1650516579151"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2163"
        width="200"
        height="200"
      >
        <path
          d="M514.048 513.024m-481.28 0a481.28 481.28 0 1 0 962.56 0 481.28 481.28 0 1 0-962.56 0Z"
          fill="#2c2c2c"
          opacity=".06"
          p-id="2164"
        ></path>
        <path
          d="M483.328 376.832c6.144 0 12.288 3.072 15.36 9.216 2.048 4.096 3.072 10.24 4.096 15.36v97.28c0 4.096 0 8.192 1.024 12.288 1.024 0 4.096-19.456 4.096-29.696 0-13.312 8.192-21.504 20.48-21.504s19.456 8.192 19.456 21.504c0 9.216 0 18.432 1.024 28.672 0 0 4.096-7.168 4.096-11.264 1.024-12.288 8.192-20.48 20.48-20.48 11.264 0 19.456 8.192 19.456 20.48 0 7.168 1.024 21.504 3.072 24.576 1.024-5.12 1.024-25.6 11.264-26.624h2.048c9.216 0 17.408 6.144 19.456 15.36 0 2.048 1.024 4.096 0 7.168 0 28.672 1.024 58.368 0 87.04-1.024 13.312-6.144 26.624-10.24 39.936-5.12 18.432-11.264 35.84-16.384 54.272-2.048 7.168-5.12 9.216-11.264 9.216H481.28c-7.168 0-10.24-3.072-10.24-10.24-2.048-25.6-8.192-49.152-27.648-68.608-6.144-6.144-8.192-16.384-13.312-24.576-8.192-14.336-15.36-28.672-25.6-41.984-5.12-8.192-9.216-14.336-4.096-23.552 3.072-5.12 8.192-7.168 14.336-7.168 4.096 0 7.168 1.024 10.24 3.072 10.24 7.168 18.432 16.384 27.648 25.6 2.048 1.024 3.072 3.072 6.144 7.168 0-7.168 1.024-11.264 1.024-15.36V401.408c0-10.24 4.096-17.408 14.336-20.48 5.12-4.096 7.168-4.096 9.216-4.096m0-22.528c-5.12 0-9.216 1.024-14.336 2.048-18.432 6.144-29.696 21.504-29.696 41.984v116.736c-7.168-5.12-15.36-7.168-23.552-7.168-14.336 0-26.624 7.168-33.792 18.432-13.312 22.528 0 40.96 5.12 47.104 7.168 9.216 12.288 20.48 19.456 31.744 2.048 3.072 3.072 6.144 5.12 9.216 1.024 2.048 2.048 5.12 3.072 7.168 3.072 6.144 6.144 15.36 13.312 21.504 13.312 13.312 19.456 29.696 21.504 55.296 1.024 18.432 14.336 30.72 32.768 30.72h109.568c16.384 0 28.672-9.216 32.768-25.6l9.216-30.72c2.048-7.168 5.12-15.36 7.168-22.528l3.072-9.216c3.072-10.24 7.168-22.528 8.192-35.84 1.024-21.504 1.024-43.008 1.024-63.488v-24.576c0-4.096 0-7.168-1.024-11.264-4.096-18.432-21.504-31.744-40.96-31.744h-1.024c-7.168-11.264-19.456-17.408-33.792-18.432H573.44c-3.072 0-6.144 0-9.216 1.024-7.168-11.264-19.456-18.432-34.816-19.456h-4.096v-35.84c0-5.12-1.024-16.384-6.144-25.6-8.192-14.336-21.504-21.504-35.84-21.504z m0 0"
          fill="#2c2c2c"
          p-id="2165"
        ></path>
        <path
          d="M570.368 385.024h-22.528c0-36.864-29.696-66.56-66.56-66.56s-66.56 29.696-66.56 66.56h-22.528c0-49.152 39.936-88.064 88.064-88.064 51.2 0 90.112 39.936 90.112 88.064z m0 0"
          fill="#2c2c2c"
          p-id="2166"
        ></path>
      </svg>
      <el-button class="update">Update</el-button>
    </div>
  </div>
</template>

<script>
import { ObtainCorpus } from "./Glove/ObtainCorpus";
import * as d3 from "d3";
export default {
  name: "Panel",
  data() {
    return {
      dateValue: [23, 30],
      timeValue: [6, 24],
      mikeValue: [1.5, 2],
      areaIdValue: [0, 237],
      kValue: "",
      kOptions: [
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        },
        {
          value: "6",
          label: "6"
        }
      ]
    };
  },
  methods: {},
  mounted() {
    //这里是用来转换得到相应的语料库
    ObtainCorpus();

    const test = document.getElementById("Title").clientWidth;
    const titleRectData = [{ x: 0, y: 0, width: test, height: 17 }];
    let svg = d3
      .select("#Title")
      .append("svg")
      .attr("width", test)
      .attr("height", 17);
    svg
      .append("g")
      .selectAll("rect")
      .data(titleRectData)
      .enter()
      .append("rect")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", d => d.width - 2)
      .attr("height", d => d.height)
      .attr("fill", "grey");

    //添加标题
    let textdata = ["Panel Control"];
    svg
      .append("g")
      .attr("class", "ChordsText")
      .selectAll("text")
      .data(textdata)
      .enter()
      .append("text")
      .attr("x", 25)
      .attr("y", 15)
      .text((d, i) => {
        return d;
      })
      .style("font-size", "12px")
      .attr("fill", "white");
  }
};
</script>

<style scoped>
/* #PanelChart {
  height: 70%;
  width: 15%;
  float: left;
  border: 1px solid grey;
} */
#title {
  /* font-family: "微软雅黑";
  font-size: 16px Medium; */
  /* text-align: center; */
}
.slider-demo-block {
  /* display: flex; */
  align-items: center;
  flex-direction: column;
  margin: 20px;
}
#Left {
  height: 70%;
  width: 15%;
  float: left;
  border: 1px solid grey;
  /* margin: 50px; */
  display: flex;
  flex-direction: column;
}
.select {
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-top: 20px;
}
.slider-demo-block .top {
  font-size: 14px;
  font-weight: bold;
  margin-right: auto;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.el-slider__marks-text {
}
.bottom {
  margin-right: 65px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.icon-top {
  width: 35px;
  height: 15px;
}
.icon {
  width: 40px;
  height: 32px;
}
</style>
