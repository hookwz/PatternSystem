<template>
  <div id="ArrangeChart"></div>
</template>

<script>
//本图用于指示方向
import * as d3 from "d3";

import {GetChengHua} from '../api/GetFiveArea.js'
import {GetWuHou} from '../api/GetFiveArea.js'
import {GetQingYang} from '../api/GetFiveArea.js'
import {GetJingJiang} from '../api/GetFiveArea.js'
import {GetJinNiu} from '../api/GetFiveArea.js'

import {AreaMerge} from './AreaMerge.js'
import {saveJson} from './saveJson.js'

export default {
  name: "ArrangeMent",
  data() {
      return{

      }
  },
  methods: {
       OneMethod()
       {
            GetChengHua().then((data)=>{
        console.log('成华的POI数据:',data)
        let ChengHua=data
        GetWuHou().then(data=>{
            let WuHou=data;
            GetQingYang().then(data=>{
                let QingYang=data;
                GetJingJiang().then(data=>{
                    let JingJiang=data
                    GetJinNiu().then(data=>{
                        let JinNiu=data;
                        let NewFiveAreaList=[]
                        for(let i=0;i<ChengHua.length;i++)
                        {
                          NewFiveAreaList.push(ChengHua[i])
                        }
                        for(let i=0;i<WuHou.length;i++)
                        {
                           WuHou[i].placeId=parseFloat(WuHou[i].placeId)+ChengHua.length.toString()
                        }
                        for(let i=0;i<WuHou.length;i++)
                        {
                          NewFiveAreaList.push(WuHou[i])
                        }
                        for(let i=0;i<QingYang.length;i++)
                        {
                           QingYang[i].placeId=parseFloat(QingYang[i].placeId)+ChengHua.length+WuHou.length.toString()
                        }
                        for(let i=0;i<QingYang.length;i++)
                        {
                          NewFiveAreaList.push(QingYang[i])
                        }
                        for(let i=0;i<JingJiang.length;i++)
                        {
                           JingJiang[i].placeId=parseFloat(JingJiang[i].placeId)+ChengHua.length+WuHou.length+QingYang.length.toString()
                        }
                        for(let i=0;i<JingJiang.length;i++)
                        {
                          NewFiveAreaList.push(JingJiang[i])
                        }
                        for(let i=0;i<JinNiu.length;i++)
                        {
                           JinNiu[i].placeId=(parseFloat(JinNiu[i].placeId)+ChengHua.length+WuHou.length+QingYang.length+JingJiang.length).toString()
                        }
                        for(let i=0;i<JinNiu.length;i++)
                        {
                          NewFiveAreaList.push(JinNiu[i])
                        }
                        console.log(NewFiveAreaList)
                        // AreaMerge(NewFiveAreaList)
                        //在这里获取到5688个基站点的坐标集合并保存
                        // let JZlist=[]
                        // for(let i=0;i<NewFiveAreaList.length;i++)
                        // {
                        //   JZlist.push(NewFiveAreaList[i].center)
                        // }
                        // console.log(JZlist)
                        // saveJson(JZlist,'基站坐标信息.json')
                    })
                })
            })
        })
    })
    },
    TwoMethod(){
        //通过DBSCAN聚类或者层次聚类来获取

    }
  },
  mounted() {
    //这里分别用两种方式来合并区域，一种是用之前的那种将五大区整体合并，第二种是采用聚类算法，将基站点简化。
    //在这个地方获取5个大区的数据,我们再这里对五大区的id重新编号
    // this.OneMethod();
   
  }
};
</script>

<style scoped></style>