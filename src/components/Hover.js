export const Hover = (mapChart, data) => {
  let realData = data[0];
  let hoveredStateId = null;
  mapChart.on("load", function() {
    mapChart.addSource("states", {
      type: "geojson",
      data: realData
    });

    mapChart.addLayer({
      id: "state-fills",
      type: "fill",
      source: "states",
      layout: {},
      paint: {
        "fill-color": "#627BC1",
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.5
        ]
      }
    });

    mapChart.addLayer({
      id: "state-borders",
      type: "line",
      source: "states",
      layout: {},
      paint: {
        "line-color": "#627BC1",
        "line-width": 2
      }
    });
    //setFeatureState 是用来设置要素状态，状态对象会和现有的状态合并
    mapChart.on("mousemove", "state-fills", function(e) {
      console.log(e);
      if (e.features.length > 0) {
        if (hoveredStateId) {
          mapChart.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        mapChart.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: true }
        );
      }
    });

    mapChart.on("mouseleave", "state-fills", function() {
      if (hoveredStateId) {
        mapChart.setFeatureState(
          { source: "states", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
    });
  });
};
