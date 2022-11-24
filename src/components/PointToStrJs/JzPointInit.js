export const JzPointInit = data => {
  //   console.log("开始:", data);
  let Final = [];
  for (let i = 0; i < data.length; i++) {
    let object = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: null
      },
      properties: {
        title: "" + data[i],
        icon: "circle"
      }
    };
    let mid = [];
    mid.push(data[i][0]);
    mid.push(data[i][1]);
    object.geometry.coordinates = mid;
    Final.push(object);
  }
  return Final;
};
