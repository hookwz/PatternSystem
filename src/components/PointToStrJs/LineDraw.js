export const LineDraw = (mapChart, data,str) => {
  //一共好像有371个街道的信息
  let result = data.features;
  //这里把数据转换为对应的格式
  let mArray = [];
  for (let i = 0; i < result.length; i++) {
    // console.log(i);
    if (result[i].geometry == null) {
      continue;
    }
    let mobject = { type: "LineString", coordinates: null };
    mobject.coordinates = result[i].geometry.coordinates;
    mArray.push(mobject);
  }

  let newArray=[]
  for(let i=0;i<mArray.length;i++)
  {
      let newObject={type:'Feature',properties: {},geometry:null}
      newObject.geometry=mArray[i]
      newArray.push(newObject)
  }

  console.log("转后的数据格式:", newArray);

//   let testData=[]
//   for(let i=0;i<10;i++)
//   {
//       testData.push(newArray[i])
//   }
  
//   console.log(testData)

  mapChart.on('load',function(){
    mapChart.addSource('multiple-lines-source'+str,{
               'type':'geojson',
               'data':{
                  'type':'FeatureCollection',
                  'features':newArray
            }}
            ),

            mapChart.addLayer({
            'id':'mult-line'+str,
            'type':'line',
            'source':'multiple-lines-source'+str,
            'paint':{
               'line-width':4,
               'line-color':'white',
               'line-opacity':0.7
            },
            "layout":{
               "visibility":'visible'
            }
         },'waterway-label')

         })
};
