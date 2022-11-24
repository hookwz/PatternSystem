
// import * as echarts from 'echarts'
// import 'echarts-gl'

// import {MapboxLayer} from '@deck.gl/mapbox'
// import {ArcLayer} from '@deck.gl/layers' 
import data from '../../static/bart.json'

export const DrawArc=(mapChart)=>{
    let result=[
        { name: 'Colma', passengers: 4214, coordinates: [[120.466233, 27.684638], [120.466233, 37.684638]] },
        { name: 'Colma', passengers: 4215, coordinates: [[115.466233, 30.684638], [120.466233, 30.684638]] },
    ]
    

    const layer = new MapboxLayer({
        id: 'arc-layer',
        type: ArcLayer,
        data,
        getWidth: 5,
        pickable: true,
        getSourceColor: (d) => [Math.sqrt(d.inbound), 140, 0],
        getSourcePosition: (d) => d.from.coordinates,
        getTargetColor: (d) => [Math.sqrt(d.outbound), 140, 0],
        getTargetPosition: (d) => d.to.coordinates,
      })
    
      mapChart.addLayer(layer)
}