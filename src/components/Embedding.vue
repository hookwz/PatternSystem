<template>
  <div id="EmbeddingChart" style="overflow:scroll"></div>
</template>

<script>
import * as d3 from "d3";
// import FinalFiveAreaList from '../../static/FinalFiveAreaList.json'
// import Source from '../../static/CoEdge13-14.csv'
export default {
  name: "Embedding",
  data() {
    return {
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
    NetWorkInit(EdgeFile, AreaFile) {
      d3.csv(EdgeFile).then(edges => {
        d3.json(AreaFile).then(res => {
          let width = document.getElementById("EmbeddingChart").clientWidth;
          let height = document.getElementById("EmbeddingChart").clientHeight;

          let svg = d3
            .select("#EmbeddingChart")
            .append("svg")
            .attr("id", "AreaNetWork")
            .attr("width", width)
            .attr("height", height + 1500);
          let t = {};
          for (let i in res) {
            res[i].forEach(d => {
              t[d] = i;
            });
          }
          let inner = {};
          let s = new Set();
          console.log(edges);
          edges.forEach(d => {
            let weight = 1;
            // if(weight < 2){
            //     return
            // }
            let source = t[d.source],
              target = t[d.target];
            s.add(d.source);
            s.add(d.target);
            if (source && target) {
              if (source === target) {
                //内部边
                if (!inner[source]) {
                  inner[source] = {};
                }
                let key =
                  d.source < d.target
                    ? `${d.source}-${d.target}`
                    : `${d.target}-${d.source}`;
                if (!inner[source][key]) {
                  inner[source][key] = weight;
                } else {
                  inner[source][key] += weight;
                }
              }
            }
          });
          aaa(inner, this.AllAreaFunction, this.color);
          console.log(s, inner);
        });
      });

      function fun(links) {
        let graph = toGraph(links);
        initializeNodes(graph.nodes);
        layout(graph, 690);
        console.log(graph.nodes);
        let district_pos = {};
        for (let i = 0; i < graph.nodes.length; i++) {
          let dist = graph.nodes[i];
          district_pos[dist.id] = [400 + dist.x, 400 + dist.y];
        }
        let svg = d3
          .select("#EmbeddingChart")
          .append("svg")
          .attr("width", 1000)
          .attr("height", 800);
        let scale = d3
          .scaleLinear()
          .domain(d3.extent(graph.edges.map(d => d.weight)))
          .range([1, 10]);
        svg
          .append("g")
          .attr("transform", "translate(400,400)")
          .selectAll("line")
          .data(graph.edges)
          .enter()
          .append("line")
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y)
          .attr("stroke-width", d => scale(d.weight))
          .attr("stroke", "#aaa");
        svg
          .append("g")
          .attr("transform", "translate(400,400)")
          .selectAll("circle")
          .data(graph.nodes)
          .enter()
          .append("circle")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
          .attr("r", 100)
          .attr("stroke", "black")
          .attr("fill", "white");
        return district_pos;
        // svg.append("g")
        //     .attr("transform","translate(400,400)")
        //     .selectAll("text")
        //     .data(graph.nodes)
        //     .enter()
        //     .append("text")
        //     .attr("x",d=>d.x + 10)
        //     .attr("y",d=>d.y)
        //     .text(d=>d.id);
      }
      function toGraph(links) {
        let edges = [];
        let t = {};
        for (let i in links) {
          let [source, target] = i.split("-");
          if (!t[source]) {
            t[source] = {};
            t[source].id = source;
          }
          if (!t[target]) {
            t[target] = {};
            t[target].id = target;
          }
          let t_node = t[target],
            s_node = t[source];
          edges.push({ source: s_node, target: t_node, weight: links[i] });
        }
        let nodes = [];
        for (let i in t) {
          nodes.push(t[i]);
        }
        let graph = {};
        graph.nodes = nodes;
        graph.edges = edges;
        return graph;
      }
      function initializeNodes(nodes) {
        let initialRadius = 50,
          initialAngle = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0, n = nodes.length; i < n; ++i) {
          let node = nodes[i];
          let radius = initialRadius * Math.sqrt(0.5 + i),
            angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
          if (isNaN(node.vx) || isNaN(node.vy)) {
            node.vx = node.vy = 0;
          }
        }
      }
      // 布局
      function layout(graph, tk) {
        let { nodes, edges } = graph;
        let re_factor = 1;
        let att_factor = 1;
        let gra_factor = 0.1;
        //迭代次数
        for (let index = 0; index < 300; index++) {
          // 计算 斥力 引力 重力
          for (let i = 0; i < nodes.length; i++) {
            let nod1 = nodes[i];
            //斥力
            for (let j = i + 1; j < nodes.length; j++) {
              let nod2 = nodes[j];
              let dx = nod1.x - nod2.x;
              let dy = nod1.y - nod2.y;
              let dis = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
              // @factor
              let repulsive_f = (re_factor * tk * tk) / dis;
              let rfx = repulsive_f * (dx / dis);
              let rfy = repulsive_f * (dy / dis);
              nod1.vx += rfx;
              nod1.vy += rfy;
              nod2.vx -= rfx;
              nod2.vy -= rfy;
            }
            //重力 原点是 0 0
            let dis = Math.max(
              Math.sqrt(nod1.x * nod1.x + nod1.y * nod1.y),
              0.01
            );
            // @factor
            let gravity_f = gra_factor * dis;
            let gfx = gravity_f * (nod1.x / dis);
            let gfy = gravity_f * (nod1.y / dis);
            nod1.vx -= gfx;
            nod1.vy -= gfy;
          }
          //计算引力
          for (let i = 0; i < edges.length; i++) {
            let nod1 = edges[i].source,
              nod2 = edges[i].target;
            let dx = nod1.x - nod2.x;
            let dy = nod1.y - nod2.y;
            let dis = Math.max(Math.sqrt(dx * dx + dy * dy), 0.1);
            // @factor
            let attract_f = (att_factor * dis * dis) / tk;
            let afx = attract_f * (dx / dis);
            let afy = attract_f * (dy / dis);
            nod1.vx -= afx;
            nod1.vy -= afy;
            nod2.vx += afx;
            nod2.vy += afy;
          }
          //更新坐标
          for (let i = 0; i < nodes.length; i++) {
            let nod1 = nodes[i];
            let dx = nod1.vx;
            let dy = nod1.vy;
            let displacement = Math.sqrt(dx * dx + dy * dy);
            let limit = (1.0 / 80.0) * Math.min(6000, displacement);
            nod1.x += limit * (dx / displacement);
            nod1.y += limit * (dy / displacement);
            nod1.vx = 0;
            nod1.vy = 0;
          }
        }
      }
      // 内部布局,给节点布置对应的颜色
      function aaa(inner, AllAreaFunction, color, district_pos, inter) {
        let tooltip = d3
          .select("#EmbeddingChart")
          .select("#AreaNetWork")
          .append("div")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("color", "#3497db")
          .style("visibility", "hidden") // 是否可见（一开始设置为隐藏）
          .style("font-size", "22px")
          .style("font-weight", "bold")
          .text("");

        // console.log("21", tooltip);

        console.log("颜色列表为:", color);
        let index = 0;
        let all_nodes = {};
        for (let i in inner) {
          let [x, y] = [150, 100 + index * 220];
          let graph = toGraph(inner[i]);
          console.log(graph);
          initializeNodes(graph.nodes);
          innerLayout(graph, 100);
          graph.nodes.forEach(d => {
            all_nodes[d.id] = [d.x + x, d.y + y];
          });
          let scale = d3
            .scaleLinear()
            .domain(d3.extent(graph.edges.map(d => d.weight)))
            .range([0.1, 2]);
          let svg = d3.select("#EmbeddingChart").select("#AreaNetWork");
          // var that = this;

          let g = svg
            .append("g")
            // .attr('class')
            .attr("transform", `translate(${x + 15},${y + 50})`);
          g.selectAll("line")
            .data(graph.edges)
            .enter()
            .append("line")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
            .attr("stroke-width", d => scale(d.weight))
            .attr("stroke", "#666");
          g.selectAll("circle")
            .data(graph.nodes)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 6)
            .attr("fill", (d, i) => {
              // console.log(d.id);
              return color[AllAreaFunction[parseInt(d.id)]];
            })
            .on("click", function(d, i) {
              d3.select(this)
                .append("title")
                .text((d, i) => {
                  console.log(d);
                  return d.id;
                });
            });
          index++;

          // break
        }
        let g = d3.select("#EmbeddingChart").select("#AreaNetWork");

        console.log("!!", g);

        //添加对应的文字
        let TextList = [
          [330, 160, "Wuhou"],
          [330, 390, "ChenHua"],
          [330, 610, "JinJiang"],
          [330, 815, "QingYang"],
          [330, 1050, "JinNiu"]
        ];
        g.selectAll("text")
          .data(TextList)
          .enter()
          .append("text")
          .attr("x", d => d[0])
          .attr("y", d => d[1])
          .text(d => {
            return d[2];
          })
          .attr("font-size", "15px");
        // .attr("font-weight", "bold");
        // for(let i in inter){
        //     let source = all_nodes[inter[i].source];
        //     let target = all_nodes[inter[i].target];
        //     console.log(source,target)
        //     g.append("line")
        //         .attr("x1", source[0])
        //         .attr("y1", source[1])
        //         .attr("x2", target[0])
        //         .attr("y2", target[1])
        //         .attr("stroke", "#aaa");
        // }
      }
      function innerLayout(graph, tk) {
        let { nodes, edges } = graph;
        let re_factor = 2;
        let att_factor = 1;
        let gra_factor = 0.1;
        let scale = d3
          .scaleLinear()
          .domain(d3.extent(edges.map(d => d.weight)))
          .range([0, 1]);
        //迭代次数
        for (let index = 0; index < 300; index++) {
          // 计算 斥力 引力 重力
          for (let i = 0; i < nodes.length; i++) {
            let nod1 = nodes[i];
            //斥力
            for (let j = i + 1; j < nodes.length; j++) {
              let nod2 = nodes[j];
              let dx = nod1.x - nod2.x;
              let dy = nod1.y - nod2.y;
              let dis = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
              // @factor
              let repulsive_f = (re_factor * tk * tk) / dis;
              let rfx = repulsive_f * (dx / dis);
              let rfy = repulsive_f * (dy / dis);
              nod1.vx += rfx;
              nod1.vy += rfy;
              nod2.vx -= rfx;
              nod2.vy -= rfy;
            }
            //重力 原点是 0 0
            let dis = Math.max(
              Math.sqrt(nod1.x * nod1.x + nod1.y * nod1.y),
              0.01
            );
            // @factor
            let gravity_f = gra_factor * dis * tk;
            let gfx = gravity_f * (nod1.x / dis);
            let gfy = gravity_f * (nod1.y / dis);
            nod1.vx -= gfx;
            nod1.vy -= gfy;
          }
          //计算引力
          for (let i = 0; i < edges.length; i++) {
            let nod1 = edges[i].source,
              nod2 = edges[i].target,
              weight = edges[i].weight;
            let dx = nod1.x - nod2.x;
            let dy = nod1.y - nod2.y;
            let dis = Math.max(Math.sqrt(dx * dx + dy * dy), 0.1);
            // @factor
            let attract_f = ((att_factor * dis * dis) / tk) * scale(weight);
            let afx = attract_f * (dx / dis);
            let afy = attract_f * (dy / dis);
            nod1.vx -= afx;
            nod1.vy -= afy;
            nod2.vx += afx;
            nod2.vy += afy;
          }
          //更新坐标
          for (let i = 0; i < nodes.length; i++) {
            let nod1 = nodes[i];
            let dx = nod1.vx;
            let dy = nod1.vy;
            let displacement = Math.sqrt(dx * dx + dy * dy);
            let limit = (1.0 / 100.0) * Math.min(6000, displacement);
            nod1.x += limit * (dx / displacement);
            nod1.y += limit * (dy / displacement);
            nod1.vx = 0;
            nod1.vy = 0;
          }
        }
      }
    }
  },
  mounted() {
    //绘制标题矩形
    const test = document.getElementById("EmbeddingChart").clientWidth;
    const HeadHeight = 20;
    const TitleSvg = d3
      .select("#EmbeddingChart")
      .append("svg")
      .attr("width", test)
      .attr("height", HeadHeight)
      .append("g")
      .attr("transform", `translate(${0}, ${0})`);

    const titleRectData = [{ x: 1, y: 0, width: test, height: 20 }];
    TitleSvg.append("g")
      .attr("class", "EmbeddingTitle")
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
    let textdata = ["Co-occurrence Pattern NetWork"];
    TitleSvg.append("g")
      .attr("class", "EmbeddingText")
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

    //在这里添加网络拓扑图
    this.NetWorkInit(
      "../../static/CoEdge13-14.csv",
      "../../static/FinalFiveAreaList.json"
    );
  }
};
</script>

<style scoped>
#EmbeddingChart {
  width: 22%;
  height: 70%;
  border: black 1px solid;
  float: left;
}
#EmbeddingChart::-webkit-scrollbar {
  width: 0 !important;
}
</style>
