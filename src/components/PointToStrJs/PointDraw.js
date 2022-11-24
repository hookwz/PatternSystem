export const PointDraw = (data, mapChart) => {
  //这里传入特定样式的点集合,然后绘制点图层,测试的上车点差不多467辆车，所以有467个图层
  // console.log(mapChart)
  // console.log(data)
  //   for (let i = 0; i < data.length; i++) {
  //   console.log(data[0])
  //   mapChart.on('load', function() {
  // 这里不用在调用监听是否已经渲染完成了，因为已经渲染完成了，但是为什么，已经加载就不会在发生
  // 500辆车得停驻点还是太多了
  // for (let i = 0; i < data.length; i++) {
  // console.log('debugger')
  // console.log(data[0])
  // mapChart.on("load", function() {
  mapChart.addSource("pointChart", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: data
    }
  });

  mapChart.addLayer({
    id: "pointChart",
    type: "symbol",
    source: "pointChart",
    layout: {
      "text-field": "{title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.6],
      "text-anchor": "top"
    }
    // paint: {
    //   "circle-radius": 4,
    //   "circle-color": "yellow",
    //   "circle-opacity": 0.7
    // }
  });
  // });
  // }
  //   })
  //   }

  // return mapChart;
};
