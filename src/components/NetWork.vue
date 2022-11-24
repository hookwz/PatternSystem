<template>
  <div id="NetWorkChart"></div>
</template>

<script>
import * as d3 from "d3";
//导入两个数据 TSNE 和 PCA的效果
import TSNEData from "../../static/TsneCoordinate.json";
import PCAData from "../../static/PCAcoordinate.json";
export default {
  name: "NetWork",
  data() {
    return {
      NameList: [
        93,
        172,
        117,
        128,
        157,
        183,
        114,
        116,
        78,
        156,
        158,
        119,
        59,
        95,
        170,
        106,
        118,
        107,
        141,
        126,
        127,
        130,
        129,
        108,
        94,
        132,
        168,
        154,
        142,
        125,
        153,
        140,
        92,
        103,
        105,
        115,
        80,
        69,
        70,
        104,
        91,
        73,
        83,
        81,
        72,
        113,
        139,
        124,
        102,
        79,
        112,
        89,
        165,
        181,
        167,
        169,
        166,
        189,
        122,
        123,
        82,
        71,
        58,
        155,
        85,
        57,
        90
      ],
      AllAreaFunction: [
        "商业区",
        "办公区",
        "住宅区",
        "商业区",
        "办公区",
        "住宅区",
        "商业区",
        "商业区",
        "办公区",
        "学校区",
        "商业区",
        "风景区",
        "住宅区",
        "商业区",
        "商业区",
        "学校区",
        "办公区",
        "风景区",
        "风景区",
        "办公区",
        "商业区",
        "住宅区",
        "商业区",
        "住宅区",
        "商业区",
        "办公区",
        "办公区",
        "办公区",
        "风景区",
        "风景区",
        "住宅区",
        "学校区",
        "住宅区",
        "商业区",
        "商业区",
        "商业区",
        "办公区",
        "商业区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "办公区",
        "商业区",
        "住宅区",
        "商业区",
        "住宅区",
        "学校区",
        "住宅区",
        "商业区",
        "住宅区",
        "办公区",
        "住宅区",
        "办公区",
        "商业区",
        "商业区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "办公区",
        "住宅区",
        "商业区",
        "办公区",
        "住宅区",
        "学校区",
        "商业区",
        "住宅区",
        "住宅区",
        "商业区",
        "住宅区",
        "办公区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "商业区",
        "商业区",
        "商业区",
        "住宅区",
        "商业区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "商业区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "商业区",
        "住宅区",
        "住宅区",
        "学校区",
        "商业区",
        "商业区",
        "商业区",
        "住宅区",
        "商业区",
        "住宅区",
        "商业区",
        "住宅区",
        "住宅区",
        "商业区",
        "风景区",
        "商业区",
        "商业区",
        "住宅区",
        "商业区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "风景区",
        "办公区",
        "无类别",
        "办公区",
        "住宅区",
        "办公区",
        "商业区",
        "住宅区",
        "商业区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "商业区",
        "办公区",
        "办公区",
        "住宅区",
        "办公区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "办公区",
        "办公区",
        "办公区",
        "办公区",
        "住宅区",
        "办公区",
        "办公区",
        "住宅区",
        "商业区",
        "商业区",
        "住宅区",
        "商业区",
        "办公区",
        "商业区",
        "商业区",
        "住宅区",
        "住宅区",
        "住宅区",
        "住宅区",
        "学校区",
        "住宅区",
        "风景区",
        "住宅区",
        "办公区",
        "住宅区",
        "办公区",
        "商业区",
        "商业区",
        "办公区",
        "住宅区",
        "办公区",
        "商业区",
        "住宅区",
        "住宅区",
        "办公区",
        "住宅区",
        "住宅区",
        "住宅区",
        "办公区",
        "学校区",
        "风景区",
        "住宅区",
        "商业区",
        "办公区",
        "办公区",
        "住宅区",
        "住宅区",
        "办公区",
        "风景区",
        "住宅区",
        "风景区",
        "商业区",
        "办公区",
        "办公区",
        "办公区",
        "学校区",
        "住宅区",
        "住宅区",
        "商业区",
        "办公区",
        "商业区",
        "办公区",
        "办公区",
        "办公区",
        "商业区"
      ],
      color: {
        办公区: "#A7B4D6",
        住宅区: "#F4A98A",
        学校区: "#9CCCBC",
        商业区: "#D8A6BF",
        风景区: "#C0E387"
      }
    };
  },
  methods: {
    EmbeddingInit(color, AllAreaFunction) {
      //添加画布然后绘制二维坐标点
      let width = document.getElementById("NetWorkChart").clientWidth;
      let height = document.getElementById("NetWorkChart").clientHeight;
      let margin = { top: 50, left: 50, right: 50, left: 50 };
      let svg = d3
        .select("#NetWorkChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      let g = svg
        .append("g")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", `translate(${60},${0})`);

      console.log("TSNE:", TSNEData);
      console.log("PCA:", PCAData);

      //必须使用比例尺度
      let XList = [];
      let yList = [];
      for (let i = 0; i < TSNEData.length; i++) {
        XList.push(TSNEData[i][0]);
        yList.push(TSNEData[i][1]);
      }
      let xMin = d3.min(XList);
      let xMax = d3.max(XList);
      let yMin = d3.min(yList);
      let yMax = d3.max(yList);
      console.log(xMin);
      let xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([0, width - margin.right * 2]);
      let yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height - 105, 0]);
      let xAxis = d3.axisBottom(xScale);
      let yAxis = d3.axisLeft(yScale);

      g.append("g")
        .attr("class", "xAxis")
        .call(xAxis)
        .attr("transform", `translate(${0},${250})`)
        .style("visibility", "hidden");

      g.append("g")
        .attr("class", "yAxis")
        .call(yAxis)
        .attr("transform", `translate(${0},${40})`)
        .style("visibility", "hidden");

      //然后绘制直接绘制圆,等会这里用颜色编码来表明属于什么样的功能区
      g.append("g")
        .selectAll("circle")
        .data(TSNEData)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => {
          return xScale(d[0]);
        })
        .attr("cy", (d, i) => {
          return yScale(d[1]);
        })
        .attr("r", 4)
        .attr("fill", (d, i) => {
          return color[AllAreaFunction[parseInt(d[2])]];
        })
        .attr("transform", `translate(${0},${40})`)
        .on("mousemove", function(d, i) {
          d3.select(this)
            .append("title")
            .text((d, i) => {
              console.log(d[2]);
              return d[2];
            });
        });

      //给点加上颜色

      //添加文字
      g.append("g")
        .selectAll("text")
        .data(TSNEData)
        .enter()
        .append("text")
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        // .text(d => {
        //   if (d[2] == "106" || d[2] == "124" || d[2] == "113") {
        //     return d[2];
        //   } else {
        //     return "";
        //   }
        // })
        .style("font-size", "10px")
        .attr("transform", `translate(${0},${40})`);

      // var brushed = d3
      //   .brushY()
      //   .extent([
      //     [0, 0],
      //     [width, height]
      //   ])
      //   .on("brush", brushed);
      // g.append("g")
      //   .attr("class", "brush")
      //   .call(d3.brush().on("brush", brushed));
    }
  },
  mounted() {
    //绘制标题矩形
    const test = document.getElementById("NetWorkChart").clientWidth;
    const HeadHeight = 20;
    const TitleSvg = d3
      .select("#NetWorkChart")
      .append("svg")
      .attr("width", test)
      .attr("height", HeadHeight)
      .append("g")
      .attr("transform", `translate(${1}, ${0})`);

    const titleRectData = [{ x: 0, y: 0, width: test, height: 20 }];
    TitleSvg.append("g")
      .attr("class", "NetWorkTitle")
      .selectAll("rect")
      .data(titleRectData)
      .enter()
      .append("rect")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .attr("fill", "grey");

    //然后添加标题文字
    let textdata = ["Urban Area  Embedding"];
    TitleSvg.append("g")
      .attr("class", "NetworkText")
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

    this.EmbeddingInit(this.color, this.AllAreaFunction);
  }
};
</script>

<style scoped>
#NetWorkChart {
  float: left;
  width: 22%;
  height: 29.5%;
  border: 1px solid grey;
}
</style>
