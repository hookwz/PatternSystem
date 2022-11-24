export const DrawGeoJsonPolygon = (data, mapChart, str, color) => {
  //这里的data要三重数组包围
  //绘制多边形api
  mapChart.on('load', () => {
    mapChart.addSource('PolygonChart' + str, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: data
        }
      }
    })

    mapChart.addLayer({
      id: 'maine' + str,
      type: 'fill',
      source: 'PolygonChart' + str,
      paint: {
        'fill-color': color,
        'fill-opacity': 0.8
      }
    })
  })
}
