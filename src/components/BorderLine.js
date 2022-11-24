export const DrawBorderLine = (data, mapChart, str, color) => {

    //这里用于绘制每个多边形的边界线,使其能够看清
        mapChart.addSource("Mergevoronoi" + str, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: mapfeaters
          }
        });

        mapChart.addLayer({
          id: "voronoi-outline" + str,
          type: "line",
          source: "Mergevoronoi" + str,
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
};
