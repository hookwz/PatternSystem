import * as greinerHormann from "greiner-hormann";
const d3 = require("d3");
const turf = require("turf");
// import { saveJson } from '../stopPoint/saveJson'
import { saveJson } from "./saveJson";

export const voronoiChart = (jzdata, cdmap, mapChart, str) => {
  console.log("开始绘制维诺图");
  // console.log(jzdata, cdmap);
  const point = [];
  let mapfeaters = [];
  for (let p of jzdata) {
    point.push([p.Longitude, p.Latitude]);
  }

  const voronoi = d3.voronoi();
  let posvor = voronoi(point).polygons();
  // console.log(posvor);
  var scmapdata = cdmap.geometry.coordinates[0];

  for (let i = 0; i < posvor.length; i++) {
    if (posvor[i] != null) {
      let x = [];
      let y = [];
      for (var j = 0; j < posvor[i].length; j++) {
        if (posvor[i][j] != null) {
          x.push(posvor[i][j]);
          y.push(posvor[i][j]);
        }
      }

      y.push(y[0]);

      if (y.length <= 3) {
        console.log("问题:", y);
        y.push(y[2]);
      }
      let poly1, poly2;

      poly1 = turf.polygon([y]);

      poly2 = turf.polygon(cdmap.geometry.coordinates);

      if (i === 12982) {
        continue;
      }

      let intersection = turf.intersect(poly1, poly2);

      if (intersection) {
        var area_intersection = turf.area(intersection);
        posvor[i].area = area_intersection / 1000;
      } else {
        posvor[i].area = turf.area(poly1 / 1000);
      }

      //   console.log(scmapdata, x)
      var gs = greinerHormann.intersection(scmapdata, x);
      //   console.log(gs)
      if (gs != null) {
        var feature = {
          type: "Feature",
          properties: {
            name: posvor[i].data.name,
            cp: [posvor[i].data[0], posvor[i].data[1]],
            area: posvor[i].area
          },
          geometry: {
            type: "Polygon",
            coordinates: gs
          }
        };
        mapfeaters.push(feature);
      }
    }
  }
  var area_arry = [];
  mapfeaters.forEach(d => {
    area_arry.push(d.properties.area);
  });

  var Ascale = d3
    .scaleLinear()
    .domain([d3.min(area_arry), d3.max(area_arry)])
    .range([0, 1]);

  mapfeaters.forEach(d => {
    d.properties["asc"] = Ascale(d.properties.area);
  });

  mapChart.on("load", () => {
    // console.log("真实的维诺图数据");
    // console.log(mapfeaters);
    //在这里将这份数据按照json格式存储下来
    // saveJson(mapfeaters);

    let layers = mapChart.getStyle().layers;
    let firstSymbolId;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolId = layers[i].id;
        break;
      }
    }

    mapChart.addSource("voronoi" + str, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: mapfeaters
      }
    });

    mapChart.addLayer({
      id: "voronoi-outline" + str,
      type: "line",
      source: "voronoi" + str,
      layout: {
        visibility: "visible"
      }, //指渲染位置和可见性
      paint: {
        "line-width": 1,
        "line-color": "white",
        "line-opacity": 1
      },
      maxzoom: 15.5
    });

    mapChart.addLayer({
      id: "voronoi-overlay" + str,
      type: "fill",
      source: "voronoi" + str,
      layout: {
        visibility: "visible"
      }, //指渲染位置和可见性
      paint: {
        "fill-color": "steelblue",
        // "fill-color": "#FF9933",
        "fill-opacity": ["get", "asc"]
      },
      maxzoom: 5.5
    });
  });

  return mapChart;
};
