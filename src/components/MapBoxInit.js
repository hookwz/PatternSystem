import mapboxgl from "mapbox-gl";

export const MapBoxInit = containerId => {
  //这里进行mapbox地图的初始化
  let map;
  let zoom = 12;
  let center = [104.126132, 30.650632];
  //   console.log(1)
  let access =
    "pk.eyJ1IjoiaG9va3d6IiwiYSI6ImNra3lyYmRwMTBjN3Iyb3FvenQ4eXAzNXMifQ.GslySFimbdvFYpNAQ2UmqQ";
  let ContainerId = containerId;

  mapboxgl.accessToken = access;
  //   console.log(containerId)

  map = new mapboxgl.Map({
    container: ContainerId,
    style: "mapbox://styles/weixinzhao/ckb6f7ox902kc1iml8zf1h4no",
    center: center,
    zoom: zoom,
    interactive: true,
    bearing: 0,
    pitch: 30,
    antialias: true
  });

  return map;
};
