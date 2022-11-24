<template>
  <div id="DynamicChart"></div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "Dynamic",
  data() {
    return {
      data: [
        ["6-7", 3],
        ["7-8", 0],
        ["8-9", 0],
        ["9-10", 0],
        ["10-11", 0],
        ["11-12", 2],
        ["12-13", 2],
        ["13-14", 2],
        ["14-15", 0],
        ["15-16", 2],
        ["16-17", 3],
        ["17-18", 2],
        ["18-19", 3],
        ["19-20", 3],
        ["20-21", 2],
        ["21-22", 3],
        ["22-23", 2],
        ["23-24", 3]
      ],
      Area106CoCount: [
        [20, 720 - 6, "6_7", 10, 6],
        [30, 720 - 3, "7_8", 10, 3],
        [40, 720 - 24, "8_9", 10, 24],
        [50, 720 - 31, "9_10", 10, 31],
        [60, 720 - 30, "10_11", 10, 30],
        [70, 720 - 38, "11_12", 10, 38],
        [80, 720 - 38, "12_13", 10, 38],
        [90, 720 - 45, "13_14", 10, 45],
        [100, 720 - 44, "14_15", 10, 44],
        [110, 720 - 40, "15_16", 10, 40],
        [120, 720 - 38, "16_17", 10, 38],
        [130, 720 - 38, "17_18", 10, 38],
        [140, 720 - 46, "18_19", 10, 46],
        [150, 720 - 38, "19_20", 10, 38],
        [160, 720 - 44, "20_21", 10, 44],
        [170, 720 - 46, "21_22", 10, 46],
        [180, 720 - 47, "22_23", 10, 47],
        [190, 720 - 37, "23_24", 10, 37]
      ],
      TreeData: [
        [
          "10_11",
          [
            82,
            107,
            117,
            104,
            81,
            170,
            126,
            128,
            127,
            142,
            105,
            115,
            119,
            95,
            118,
            116,
            92,
            94,
            93,
            183,
            169,
            130,
            103,
            125,
            90,
            83,
            79,
            91,
            156,
            155
          ]
        ],
        [
          "11_12",
          [
            93,
            169,
            103,
            126,
            156,
            117,
            141,
            127,
            92,
            124,
            128,
            125,
            115,
            105,
            91,
            142,
            116,
            104,
            73,
            107,
            108,
            119,
            157,
            94,
            95,
            118,
            80,
            79,
            71,
            83,
            72,
            58,
            154,
            170,
            81,
            90,
            130,
            69
          ]
        ],
        [
          "12_13",
          [
            91,
            93,
            80,
            115,
            105,
            79,
            124,
            116,
            125,
            92,
            142,
            126,
            117,
            128,
            104,
            127,
            95,
            103,
            94,
            70,
            69,
            141,
            156,
            154,
            108,
            119,
            130,
            107,
            118,
            82,
            57,
            170,
            83,
            72,
            81,
            157,
            102,
            90
          ]
        ],
        [
          "13_14",
          [
            183,
            93,
            170,
            128,
            119,
            118,
            107,
            130,
            129,
            157,
            108,
            156,
            94,
            132,
            117,
            116,
            92,
            103,
            105,
            115,
            127,
            91,
            73,
            83,
            81,
            95,
            123,
            104,
            82,
            126,
            155,
            154,
            141,
            85,
            80,
            72,
            71,
            79,
            142,
            124,
            140,
            125,
            90,
            69,
            58
          ]
        ],
        [
          "14_15",
          [
            132,
            119,
            128,
            156,
            95,
            107,
            92,
            125,
            93,
            126,
            105,
            117,
            115,
            104,
            94,
            81,
            116,
            103,
            91,
            79,
            80,
            124,
            83,
            118,
            130,
            72,
            58,
            108,
            82,
            69,
            71,
            169,
            157,
            142,
            170,
            155,
            154,
            129,
            140,
            141,
            127,
            70,
            85,
            57
          ]
        ],
        [
          "15_16",
          [
            92,
            117,
            126,
            128,
            80,
            105,
            104,
            57,
            93,
            82,
            70,
            107,
            116,
            81,
            83,
            72,
            71,
            129,
            130,
            142,
            103,
            127,
            118,
            169,
            141,
            115,
            157,
            119,
            124,
            167,
            170,
            155,
            125,
            140,
            94,
            156,
            90,
            95,
            102,
            69
          ]
        ],
        [
          "16_17",
          [
            92,
            81,
            105,
            94,
            69,
            82,
            116,
            73,
            93,
            130,
            154,
            169,
            126,
            115,
            156,
            117,
            142,
            141,
            129,
            128,
            125,
            103,
            127,
            157,
            95,
            119,
            107,
            155,
            118,
            83,
            72,
            80,
            124,
            91,
            104,
            140,
            113,
            71
          ]
        ],
        [
          "17_18",
          [
            157,
            116,
            132,
            93,
            94,
            118,
            107,
            128,
            156,
            95,
            119,
            108,
            117,
            130,
            82,
            129,
            142,
            72,
            92,
            103,
            127,
            104,
            105,
            81,
            70,
            115,
            126,
            71,
            79,
            69,
            83,
            183,
            91,
            80,
            155,
            141,
            125,
            90
          ]
        ],
        [
          "18_19",
          [
            116,
            170,
            119,
            183,
            157,
            169,
            115,
            72,
            118,
            93,
            117,
            156,
            107,
            95,
            130,
            128,
            108,
            83,
            92,
            94,
            82,
            58,
            80,
            73,
            81,
            105,
            104,
            70,
            103,
            129,
            126,
            141,
            127,
            155,
            142,
            71,
            57,
            79,
            90,
            140,
            91,
            125,
            124,
            102,
            69,
            154
          ]
        ],
        [
          "19_20",
          [
            92,
            116,
            115,
            105,
            127,
            155,
            93,
            117,
            125,
            156,
            128,
            83,
            118,
            107,
            82,
            72,
            81,
            132,
            157,
            108,
            130,
            119,
            141,
            103,
            94,
            85,
            95,
            58,
            91,
            126,
            79,
            70,
            69,
            142,
            104,
            90,
            102,
            71
          ]
        ],
        [
          "20_21",
          [
            116,
            169,
            132,
            117,
            156,
            118,
            92,
            125,
            115,
            103,
            94,
            105,
            79,
            71,
            69,
            90,
            85,
            93,
            95,
            167,
            128,
            127,
            129,
            141,
            126,
            91,
            104,
            155,
            170,
            140,
            142,
            154,
            83,
            72,
            107,
            81,
            130,
            119,
            82,
            80,
            108,
            70,
            157,
            102
          ]
        ],
        [
          "21_22",
          [
            116,
            158,
            117,
            107,
            155,
            92,
            127,
            126,
            115,
            81,
            104,
            125,
            103,
            105,
            71,
            94,
            90,
            93,
            69,
            91,
            80,
            70,
            57,
            82,
            72,
            118,
            132,
            95,
            157,
            108,
            156,
            128,
            130,
            119,
            129,
            141,
            142,
            58,
            83,
            89,
            73,
            154,
            140,
            170,
            102,
            79
          ]
        ],
        [
          "22_23",
          [
            92,
            105,
            116,
            103,
            94,
            115,
            90,
            69,
            104,
            71,
            91,
            81,
            117,
            126,
            108,
            118,
            93,
            130,
            82,
            72,
            85,
            129,
            95,
            68,
            79,
            102,
            70,
            80,
            57,
            58,
            119,
            142,
            157,
            155,
            127,
            128,
            132,
            156,
            107,
            83,
            170,
            125,
            113,
            141,
            154,
            140,
            153
          ]
        ],
        [
          "23_24",
          [
            94,
            129,
            126,
            108,
            130,
            117,
            128,
            95,
            107,
            83,
            72,
            119,
            116,
            93,
            79,
            103,
            118,
            132,
            157,
            82,
            142,
            127,
            105,
            115,
            170,
            169,
            141,
            155,
            104,
            154,
            156,
            125,
            123,
            69,
            70,
            102,
            153
          ]
        ],
        ["6_7", [116, 156, 104, 115, 105, 140]],
        ["7_8", [127, 95, 156]],
        [
          "8_9",
          [
            92,
            117,
            115,
            104,
            130,
            126,
            156,
            95,
            128,
            119,
            107,
            103,
            102,
            140,
            81,
            91,
            90,
            80,
            116,
            79,
            127,
            141,
            118,
            93
          ]
        ],
        [
          "9_10",
          [
            126,
            129,
            128,
            156,
            127,
            73,
            95,
            72,
            117,
            93,
            83,
            92,
            107,
            94,
            154,
            115,
            141,
            140,
            125,
            119,
            81,
            79,
            169,
            142,
            105,
            116,
            130,
            118,
            80,
            104,
            103
          ]
        ]
      ],
      color: {
        办公区: "#A7B4D6",
        住宅区: "#F4A98A",
        学校区: "#9CCCBC",
        商业区: "#D8A6BF",
        风景区: "#C0E387"
      },
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
      ]
    };
  },
  methods: {
    init() {
      let width = document.getElementById("DynamicChart").clientWidth;
      let height = document.getElementById("DynamicChart").clientHeight;
      let cStep = 32;
      let cR = 10;
      let padding = { left: 75, right: 50, top: 30, bottom: 10 };
      let colors = ["#A7B4D6", "#C0E387", "#D8A6BF", "#F4A98A", "#9CCCBC"];
      let CircleSvg = d3
        .select("#DynamicChart")
        .append("svg")
        .attr("id", "DynamicSvg")
        .attr("width", width)
        .attr("height", height);
      //绘制圆
      let circleG = CircleSvg.append("g");
      circleG
        .selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => padding.left)
        .attr("cy", (d, i) => padding.top + i * cStep)
        .attr("r", cR)
        .attr("fill", (d, i) => colors[d[1]]);
      // 箭头定义
      let defs = CircleSvg.append("defs");

      let arrowMarker = defs
        .append("marker")
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth")
        .attr("markerWidth", "8")
        .attr("markerHeight", "8")
        .attr("viewBox", "0 0 12 12")
        .attr("refX", "6")
        .attr("refY", "6")
        .attr("orient", "auto");
      let arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
      arrowMarker
        .append("path")
        .attr("d", arrow_path)
        .attr("fill", "#000000");
      //绘制箭头
      var link = CircleSvg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.data)
        .enter()
        .append("line")
        .attr("x1", padding.left)
        .attr("y1", (d, i) => {
          if (i == 0) {
            return 0;
          } else {
            return padding.top + (i - 1) * cStep + cR;
          }
        })
        .attr("x2", padding.left)
        .attr("y2", (d, i) => {
          if (i == 0) {
            return 0;
          } else {
            return padding.top + i * cStep - cR;
          }
        })
        .attr("stroke", "black")
        .attr("stroke-width", "4");
      //应用箭头
      // .attr("marker-end","url(#arrow)");

      //添加文本信息
      let Text = [
        [50, 35, "6"],
        [50, 131, "9"],
        [43, 227, "12"],
        [43, 324, "15"],
        [43, 419, "18"],
        [43, 516, "21"],
        [43, 581, "23"]
      ];
      CircleSvg.append("g")
        .selectAll("text")
        .data(Text)
        .enter()
        .append("text")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .text(d => d[2])
        .style("font-size", "12px")
        .attr("fill", "black")
        .style("font-weight", "bold");
    },
    BarChartInit() {
      //在这里绘制当前区域的一天的共现次数统计
      let width = document.getElementById("DynamicChart").clientWidth;
      let height = document.getElementById("DynamicChart").clientHeight;
      let BarSvg = d3.select("#DynamicSvg");
      console.log(BarSvg);
      let Bg = BarSvg.append("g");
      Bg.selectAll("rect")
        .data(this.Area106CoCount)
        .enter()
        .append("rect")
        .attr("x", d => d[0])
        .attr("y", d => d[1])
        .attr("width", d => d[3])
        .attr("height", d => d[4])
        .attr("stroke", "grey")
        .attr("fill", "#9293AF");
    },
    TreeInit() {
      //在这里绘制树图
      let width = document.getElementById("DynamicChart").clientWidth;
      let height = document.getElementById("DynamicChart").clientHeight;
      let TreeSvg = d3.select("#DynamicSvg");
      //   console.log(TreeSvg);
      let Tg = TreeSvg.append("g")
        .attr("class", "TreeG")
        .attr("transform", `translate(${80},${96})`);

      let TestData = this.TreeData[3];
      let dataset = {
        // 父节点文字
        // 'name':jj[0],
        children: TestData[1].map(i => {
          return { name: i };
        })
      };

      var hierarchyData = d3.hierarchy(dataset).sum(function(d) {
        return d.value;
      });

      var tree = d3
        .tree()
        .size([width + 90, height - 660])
        .separation(function(a, b) {
          return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

      //初始化树状图，也就是传入数据,并得到绘制树基本数据
      var treeData = tree(hierarchyData);
      // console.log(treeData);
      //得到节点
      var nodes = treeData.descendants();
      var links = treeData.links();

      var Bézier_curve_generator = d3
        .linkHorizontal()
        .x(function(d) {
          return d.y;
        })
        .y(function(d) {
          return d.x;
        });

      //有了节点和边集的数据后，我们就可以开始绘制了，
      //绘制边
      Tg.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("d", function(d) {
          var start = { x: d.source.x, y: d.source.y };
          var end = { x: d.target.x, y: d.target.y };
          return Bézier_curve_generator({ source: start, target: end });
        })
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 1);

      //绘制节点和文字
      //老规矩，先创建用以绘制每个节点和对应文字的分组<g>
      //   console.log("nodes:", nodes);

      var gs = Tg.append("g")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          var cx = d.x;
          var cy = d.y;
          return "translate(" + cy + "," + cx + ")";
        });
      //绘制节点
      gs.append("circle")
        .attr("r", 3)
        .attr("fill", (d, i) => {
          if (i == 0) {
            return "#D8A6BF";
          } else {
            // console.log(d);
            return this.color[this.AllAreaFunction[d.data.name]];
          }
        })
        .attr("stroke", "#D8A6BF")
        .attr("stroke-width", 1);

      //文字
      gs.append("text")
        .attr("x", function(d) {
          return d.children ? -40 : 8;
        })
        .attr("y", -5)
        .attr("dy", 10)
        .text(function(d) {
          return d.data.name;
        })
        .attr("font-size", "8px");
    }
  },
  mounted() {
    //绘制标题矩形
    const test = document.getElementById("DynamicChart").clientWidth - 1;
    const HeadHeight = 20;
    const TitleSvg = d3
      .select("#DynamicChart")
      .append("svg")
      .attr("width", test)
      .attr("height", HeadHeight)
      .append("g")
      .attr("transform", `translate(${0}, ${0})`);

    const titleRectData = [{ x: 0, y: 0, width: test, height: 20 }];
    TitleSvg.append("g")
      .attr("class", "DynamicTitle")
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
    let textdata = ["Dynamic Function"];
    TitleSvg.append("g")
      .attr("class", "DynamicText")
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

    this.init();
    //然后从这里绘制柱状图
    this.BarChartInit();

    //这里绘制树图
    this.TreeInit();
  }
};
</script>

<style scoped>
#DynamicChart {
  width: 12%;
  height: 70%;
  float: left;
  border: 1px black solid;
}
</style>
