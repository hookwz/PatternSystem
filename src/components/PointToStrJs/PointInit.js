export const PointInit = data => {
  console.log("开始:", data);
  let Final = [];
  for (let i = 0; i < data.list.length; i++) {
    let object = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: null
      },
      properties: {
        // title: "Mapbox SF",
        icon: "circle"
      }
    };
    let mid = [];
    mid.push(data.list[i][1].lng);
    mid.push(data.list[i][1].lat);
    object.geometry.coordinates = mid;
    Final.push(object);
  }
  return Final;
};
