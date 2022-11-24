<template>
  <div id="ChordChart"></div>
</template>

<script>
//这里是绘制五个大区的功能区联系流动程度
import * as d3 from "d3";
import { createSvg, createRadialTicks } from "./utils";
export default {
  name: "Chord",
  data() {
    return {
      //是按最大值来表现的
      WuHou: [
        [72, 103, 17, 198, 0],
        [98, 724, 75, 876, 1],
        [14, 92, 29, 203, 0],
        [202, 946, 159, 2105, 6],
        [0, 0, 0, 0, 0]
      ],
      QingYang: [
        [2, 8, 0, 6, 0],
        [21, 350, 23, 451, 3],
        [3, 60, 11, 108, 0],
        [50, 695, 98, 1569, 6],
        [0, 1, 0, 1, 2]
      ],
      ChengHua: [
        [4, 6, 0, 3, 0],
        [27, 1319, 34, 792, 10],
        [0, 9, 2, 3, 0],
        [14, 174, 7, 287, 2],
        [0, 12, 2, 20, 1]
      ],
      JingJiang: [
        [9, 30, 3, 37, 3],
        [58, 801, 57, 674, 8],
        [0, 17, 5, 14, 0],
        [39, 789, 87, 1665, 16],
        [0, 0, 0, 1, 1]
      ],
      JinNiu: [
        [10, 65, 3, 64, 0],
        [49, 822, 51, 853, 7],
        [0, 1, 0, 0, 0],
        [58, 581, 25, 696, 4],
        [0, 0, 0, 0, 0]
      ]
    };
  },
  methods: {
    Init(data1, data2, data3, data4, data5) {
      const width = 260;
      const height = 400;
      const colors = ["#A7B4D6", "#F4A98A", "#9CCCBC", "#D8A6BF", "#C0E387"];
      const nodesNum = 12;

      var outerR = Math.min(width, height) / 2 - 40;
      var innerR = outerR - 10;
      const padAngle = (2 * Math.PI) / 200;

      //   const matrix = new Array(nodesNum)
      //     .fill(0)
      //     .map(() =>
      //       new Array(nodesNum).fill(0).map(() => (Math.random() * 100) >>> 0)
      //     );

      const chords1 = d3.chord().padAngle(padAngle)(data1);
      const chords2 = d3.chord().padAngle(padAngle)(data2);
      const chords3 = d3.chord().padAngle(padAngle)(data3);
      const chords4 = d3.chord().padAngle(padAngle)(data4);
      const chords5 = d3.chord().padAngle(padAngle)(data5);
      //   console.log("chords", chords);

      const test = document.getElementById("ChordChart").clientWidth - 14;
      console.log(test);

      const HeadWidth = 1470;
      const HeadHeight = 20;

      const TitleSvg = d3
        .select("#ChordChart")
        .append("svg")
        .attr("width", test)
        .attr("height", HeadHeight)
        .append("g")
        .attr("transform", `translate(${0}, ${0})`);

      //这里绘制标题矩形
      const titleRectData = [{ x: 0, y: 0, width: test, height: 20 }];
      TitleSvg.append("g")
        .attr("class", "ChordsTitle")
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
      let textdata = ["Five Area Trend View"];
      TitleSvg.append("g")
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

      //然后在在上面画5个区域的5个小矩形，用小矩形的深浅来代表当前功能区域发生共现现象的次数

      const svg = createSvg(width, height, 20, 40);
      drawGroups(outerR, svg, chords3); // 绘制节点
      drawChords(innerR, chords3, svg); // 绘制弦图
      drawTicks(outerR, svg);
      //   drawLabels(outerR, svg);

      const svg2 = createSvg(width, height, 20, 40);
      drawGroups(outerR, svg2, chords4); // 绘制节点
      drawChords(innerR, chords4, svg2); // 绘制弦图
      drawTicks(outerR, svg2);
      //   drawLabels(outerR, svg2);

      const svg3 = createSvg(width, height, 20, 40);
      drawGroups(outerR, svg3, chords5); // 绘制节点
      drawChords(innerR, chords5, svg3); // 绘制弦图
      drawTicks(outerR, svg3);
      //   drawLabels(outerR, svg3);

      const svg4 = createSvg(width, height, 20, 40);
      drawGroups(outerR, svg4, chords2); // 绘制节点
      drawChords(innerR, chords2, svg4); // 绘制弦图
      drawTicks(outerR, svg4);
      //   drawLabels(outerR, svg4);

      const svg5 = createSvg(width, height, 20, 40);
      drawGroups(outerR, svg5, chords1); // 绘制节点
      drawChords(innerR, chords1, svg5); // 绘制弦图
      drawTicks(outerR, svg5);

      function drawGroups(outerR, svg, chords) {
        const groups = chords.groups; // 节点数组
        const maxVal = d3.max(groups, d => d.value);

        const arc = d3
          .arc()
          .innerRadius(innerR)
          .outerRadius(outerR);

        svg
          .append("g")
          .attr("class", "groups")
          .selectAll("g")
          .data(groups)
          .enter()
          .append("g")
          .attr("class", "group")
          .append("path")
          .attr("d", d => {
            return arc(d);
          })
          .attr("fill", (_, i) => colors[i]);
      }

      function drawChords(innerR, chords, svg) {
        const ribbon = d3.ribbon().radius(innerR - 20);

        svg
          .append("g")
          .attr("class", "chord")
          .selectAll("path")
          .data(chords)
          .enter()
          .append("path")
          .attr("d", ribbon)
          .attr("fill", ({ source: { index } }) => colors[index])
          .attr("stroke", ({ source: { index } }) =>
            d3.rgb(colors[index]).darker()
          )
          .on("mouseover", function({ source: { index } }, i) {
            d3.select(this).attr("fill", d3.rgb(colors[index]).darker());
          })
          .on("mouseout", function({ source: { index } }) {
            d3.select(this).attr("fill", colors[index]);
          });
      }

      function drawTicks(outerR, svg) {
        d3.selectAll(".group")
          .append("g")
          .attr("class", "ticks")
          .selectAll("line")
          .data(d => {
            const { value, startAngle, endAngle } = d;
            const k = (endAngle - startAngle) / value;

            return d3.range(0, value, 300).map(value => ({
              text: value,
              angle: d.startAngle + value * k
            }));
          })
          .enter()
          .append("g")
          .call(createRadialTicks, outerR);
      }
      function setAttr(ele, attrs) {
        for (const [key, val] of Object.entries(attrs)) {
          ele.attr(key, val);
        }
      }

      function drawLabels(outerR, svg) {
        let name = ["办公区", "住宅区", "学校区", "商业区", "风景区"];
        svg
          .append("g")
          .selectAll("text")
          .data(chords.groups)
          .enter()
          .append("g")
          .call(setAttr, {
            fill: (_, i) => colors[i],
            transform: d => {
              const deg = rotateAngle(d);
              return `
                            rotate(${deg - 90})
                            translate(${outerR + 30}, 0)
                        `;
            }
          })
          .append("text")
          .attr("dominant-baseline", "middle")
          .text((_, i) => `${name[i]}`)
          .call(setAttr, {
            transform: function(d) {
              const deg = rotateAngle(d);

              return deg > 180
                ? `
                                rotate(180)
                                translate(${-this.getBBox().width}, 0)
                            `
                : "";
            }
          });
      }
      function tsRadian2angle(radian) {
        return (radian * 180) / Math.PI;
      }
      // 文本旋转角度
      function rotateAngle(d) {
        return tsRadian2angle((d.startAngle + d.endAngle) / 2);
      }

      //然后给五大区添加相应的标题,将标题加在下面
      //,['锦江区'],['金牛区'],['青羊区'],['武侯区']
      let ChangHuaText = [["ChengHua", -40, 125]];
      let JingJiangText = [["JinJiang", -30, 125]];
      let JinNiuText = [["JinNiu", -20, 125]];
      let QingYangText = [["QingYang", -30, 125]];
      let WuHouText = [["WuHou", -25, 125]];
      function DrawAreaText(Text, svg) {
        svg
          .append("g")
          .attr("class", "FiveAreaText")
          .selectAll()
          .data(Text)
          .enter()
          .append("text")
          .attr("x", d => d[1])
          .attr("y", d => d[2])
          .text((d, i) => {
            return d[0];
          })
          .style("font-size", "15px")
          .attr("fill", "black")
          .style("font-weight", "bold");
      }
      DrawAreaText(ChangHuaText, svg);
      DrawAreaText(JingJiangText, svg2);
      DrawAreaText(JinNiuText, svg3);
      DrawAreaText(QingYangText, svg4);
      DrawAreaText(WuHouText, svg5);

      //然后给每个区域上面绘制一个矩形块，看当前区域所属功能发生的共现现象的次数
      let NowRect = [
        [-75, -150, "#A7B4D6"],
        [-45, -150, "#F4A98A"],
        [-15, -150, "#9CCCBC"],
        [15, -150, "#D8A6BF"],
        [45, -150, "#C0E387"]
      ];
      svg
        .append("g")
        .selectAll("rect")
        .data(NowRect)
        .enter()
        .append("rect")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .attr("width", 30)
        .attr("height", 30)
        .attr("stroke", "grey")
        .attr("fill", d => d[2]);

      svg2
        .append("g")
        .selectAll("rect")
        .data(NowRect)
        .enter()
        .append("rect")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .attr("width", 30)
        .attr("height", 30)
        .attr("stroke", "grey")
        .attr("fill", d => d[2]);

      svg3
        .append("g")
        .selectAll("rect")
        .data(NowRect)
        .enter()
        .append("rect")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .attr("width", 30)
        .attr("height", 30)
        .attr("stroke", "grey")
        .attr("fill", d => d[2]);

      svg4
        .append("g")
        .selectAll("rect")
        .data(NowRect)
        .enter()
        .append("rect")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .attr("width", 30)
        .attr("height", 30)
        .attr("stroke", "grey")
        .attr("fill", d => d[2]);

      svg5
        .append("g")
        .selectAll("rect")
        .data(NowRect)
        .enter()
        .append("rect")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .attr("width", 30)
        .attr("height", 30)
        .attr("stroke", "grey")
        .attr("fill", d => d[2]);

      //然后在矩形上面绘制圆，颜色为#EE799F #FF4040 都是用30来乘以标准化
      let chcirlceData = [
        [0, 297, -60, -135],
        [204, 297, -30, -135],
        [0, 297, 0, -135],
        [11, 297, 30, -135],
        [0, 297, 60, -135]
      ];
      let jjcirlceData = [
        [0, 297, -60, -135],
        [132, 297, -30, -135],
        [0, 297, 0, -135],
        [260, 297, 30, -135],
        [0, 297, 60, -135]
      ];
      let jncirlceData = [
        [0, 297, -60, -135],
        [131, 297, -30, -135],
        [0, 297, 0, -135],
        [117, 297, 30, -135],
        [0, 297, 60, -135]
      ];
      let qycirlceData = [
        [0, 297, -60, -135],
        [64, 297, -30, -135],
        [28, 297, 0, -135],
        [252, 297, 30, -135],
        [0, 297, 60, -135]
      ];
      let whcirlceData = [
        [27, 297, -60, -135],
        [101, 297, -30, -135],
        [40, 297, 0, -135],
        [297, 297, 30, -135],
        [0, 297, 60, -135]
      ];
      svg
        .append("g")
        .selectAll("circle")
        .data(chcirlceData)
        .enter()
        .append("circle")
        .attr("cx", d => d[2])
        .attr("cy", d => d[3])
        .attr("r", d => 15 * (d[0] / d[1]))
        .attr("fill", "#EE799F");

      svg2
        .append("g")
        .selectAll("circle")
        .data(jjcirlceData)
        .enter()
        .append("circle")
        .attr("cx", d => d[2])
        .attr("cy", d => d[3])
        .attr("r", d => 15 * (d[0] / d[1]))
        .attr("fill", "#EE799F");

      svg3
        .append("g")
        .selectAll("circle")
        .data(jncirlceData)
        .enter()
        .append("circle")
        .attr("cx", d => d[2])
        .attr("cy", d => d[3])
        .attr("r", d => 15 * (d[0] / d[1]))
        .attr("fill", "#EE799F");

      svg4
        .append("g")
        .selectAll("circle")
        .data(qycirlceData)
        .enter()
        .append("circle")
        .attr("cx", d => d[2])
        .attr("cy", d => d[3])
        .attr("r", d => 15 * (d[0] / d[1]))
        .attr("fill", "#EE799F");

      svg5
        .append("g")
        .selectAll("circle")
        .data(whcirlceData)
        .enter()
        .append("circle")
        .attr("cx", d => d[2])
        .attr("cy", d => d[3])
        .attr("r", d => 15 * (d[0] / d[1]))
        .attr("fill", "#EE799F");

      //在右边添加对应的图标标识文字，绘制5个矩形表带5个功能语义 绘制Identification
      const IdentIfySvg = d3
        .select("#ChordChart")
        .append("svg")
        .attr("class", "IdentIfy")
        .attr("width", 145)
        .attr("height", 300)
        .attr("transform", `translate(${0},${-80})`)
        .append("g")
        .attr("transform", `translate(${0}, ${0})`);

      //这里绘制标题矩形
      const IdentIfyRectData = [
        { x: 0, y: 0, width: 20, height: 20, color: "#A7B4D6" },
        { x: 0, y: 25, width: 20, height: 20, color: "#F4A98A" },
        { x: 0, y: 50, width: 20, height: 20, color: "#9CCCBC" },
        { x: 0, y: 75, width: 20, height: 20, color: "#D8A6BF" },
        { x: 0, y: 100, width: 20, height: 20, color: "#C0E387" }
      ];
      IdentIfySvg.append("g")
        .attr("class", "ChordsTitle")
        .selectAll("rect")
        .data(IdentIfyRectData)
        .enter()
        .append("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", d => d.color);

      const IdentIfyText = [
        [25, 15, "Office Area"],
        [25, 40, "Residential"],
        [25, 65, "Education"],
        [25, 90, "Business"],
        [25, 115, "Scenic Spot"]
      ];
      IdentIfySvg.append("g")
        .attr("class", "ChordsTitle")
        .selectAll("text")
        .data(IdentIfyText)
        .enter()
        .append("text")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .text((d, i) => {
          return d[2];
        })
        .style("font-size", "15px")
        .attr("fill", "black")
        .style("font-weight", "bold");

      //然后在绘制4个圈
      let CircleExample = [
        [20, 160, 0.2],
        [20, 185, 0.4],
        [20, 215, 0.6],
        [20, 250, 0.8]
      ];
      IdentIfySvg.append("g")
        .attr("class", "")
        .selectAll("circle")
        .data(CircleExample)
        .enter()
        .append("circle")
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", d => 15 * d[2])
        .attr("fill", "#EE799F");
      //标记文字
      let C = [
        [40, 165, 5],
        [40, 190, 45],
        [40, 220, 85],
        [40, 255, 120]
      ];
      IdentIfySvg.append("g")
        .attr("class", "CircleTitle")
        .selectAll("text")
        .data(C)
        .enter()
        .append("text")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .text((d, i) => {
          return d[2];
        })
        .style("font-size", "15px")
        .attr("fill", "black")
        .style("font-weight", "bold");
    }
  },
  mounted() {
    this.Init(
      this.WuHou,
      this.QingYang,
      this.ChengHua,
      this.JingJiang,
      this.JinNiu
    );
  }
};
</script>

<style scoped>
#ChordChart {
  float: left;
  height: 29.5%;
  width: 77.116%;
  border: 1px solid grey;
}
</style>
