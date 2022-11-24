export const NewMultPolygon = (data, mapChart, str, color) => {
  let featuresData = [];
  for (let i = 0; i < data.length; i++) {
    let mid = {
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [] }
    };
    mid.geometry.coordinates.push(data[i]);
    featuresData.push(mid);
  }

  let layers = mapChart.getStyle().layers;
  var firstSymbolId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol") {
      firstSymbolId = layers[i].id;
      break;
    }
  }

  mapChart.addSource("PolygonChart" + str, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: featuresData
    }
  });

  mapChart.addLayer(
    {
      id: "maine" + str,
      type: "fill",
      source: "PolygonChart" + str,
      paint: {
        "fill-color": color,
        "fill-opacity": 0.8
      }
    },
    firstSymbolId
  );

  mapChart.addLayer({
    id: "Boundary" + str,
    type: "line",
    source: "PolygonChart" + str,
    layout: {
      visibility: "visible"
    }, //指渲染位置和可见性
    paint: {
      "line-width": 1.5,
      "line-color": "black",
      "line-opacity": 0.8
    }
  });
};
