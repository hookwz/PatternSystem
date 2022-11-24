import {saveJson} from './saveJson'

export const AreaMerge=(data)=>{
    //首先还是得到6个区域的数组
    //在这里先看下没有属性的区域有好多,进行相应的区域合并
    //根据功能区来合并区域，相同功能区且相邻的才合并为一个区域
    let NoPOI=[]
    let SchoolPOI=[]
    let TreatPOI=[]
    let WorkPOI=[]
    let BusinessPOI=[]
    let HousePOI=[]
    let ScenePOI=[]

    for(let i=0;i<data.length;i++)
    {
          if(JSON.stringify(data[i].OwnedPoi)=='[]')
          {
            NoPOI.push(data[i])
          }
          else if(data[i].AreaAttribute=='学校区'&&JSON.stringify(data[i].OwnedPoi)!='[]')
          {
            SchoolPOI.push(data[i])
          }
          else if(data[i].AreaAttribute=='医疗区')
          { 
            TreatPOI.push(data[i])
          }
          else if(data[i].AreaAttribute=='办公区')
          {
            WorkPOI.push(data[i])
          }
          else if(data[i].AreaAttribute=='商业区')
          {
            BusinessPOI.push(data[i])
          }
          else if(data[i].AreaAttribute=='住宅区')
          {
            HousePOI.push(data[i])
          }
          else if(data[i].AreaAttribute=='风景区')
          {
            ScenePOI.push(data[i])
          }
    }
    // console.log(NoPOI)
    // console.log(SchoolPOI,TreatPOI)
    // console.log(WorkPOI,BusinessPOI)
    // console.log(HousePOI,ScenePOI)

    function SwitchFormat(data)
   {  
       let NewData=[]
       for(let i=0;i<data.length;i++)
       {
           let mid=[]
           mid.push(data[i].placeId)
           mid.push(data[i].Polygon)
           NewData.push(mid)
           mid.push(false)
       }
       console.log(NewData)
       return NewData;
   } 
   let NewData=SwitchFormat(NoPOI)
   let NewData2=SwitchFormat(SchoolPOI)
   let NewData3=SwitchFormat(TreatPOI)
   let NewData4=SwitchFormat(WorkPOI)
   let NewData5=SwitchFormat(BusinessPOI)
   let NewData6=SwitchFormat(HousePOI)
   let NewData7=SwitchFormat(ScenePOI)

   function arrayHasEl(array, ele) {
    for (let el of array) {
      if (el.length == ele.length) {
        for (let index in el) {
          if (el[index] !== ele[index]) {
            break;
          }
          if (index == el.length - 1) {
            return true;
          }
        }
      }
    }
    return false;
  }


   function IsMerge(arr1,arr2)
   {
        let count=0;
        for(let i=0;i<arr1.length;i++)
        {
          for(let j=0;j<arr2.length;j++)
          {
              if(arr1[i][0]==arr2[j][0]&&arr1[i][1]==arr2[j][1])
              {
                  count++;
              }
          }
        }
        if(count>=2)
        {
            return true
        }
        else{
          return false
        }
   }

   function MergeData(data)
   {
       let MergeAll=[]
       let MergePart
       for(let i=0;i<data.length;i++)
       {
            MergePart={idList:[],PolygonList:[],isMerge:false}
            //进入MergePart则变为有,如果是true则表示已经合并，则不再考虑，跳转到下一个
            if(data[i][2]==false)
            {
            data[i][2]=true
            }
            else{
                continue;
            }
            MergePart.idList.push(data[i][0])
            for(let k=0;k<data[i][1].length;k++)
            {
                MergePart.PolygonList.push(data[i][1][k])
            }
            //然后开始遍历data中的其他数组
            for(let j=i+1;j<data.length;j++)
            {

                if(IsMerge(MergePart.PolygonList,data[j][1])==true)
                {
                   MergePart.idList.push(data[j][0])
                   for(let q=0;q<data[j][1].length;q++)
                   {
                      if(arrayHasEl(MergePart.PolygonList,data[j][1][q])!=true)
                      {
                        MergePart.PolygonList.push(data[j][1][q])
                      }
                   }
                   data[j][2]=true
                }
            }
            MergeAll.push(MergePart)
       }
       console.log(MergeAll)
   }
    //思路就是每一次遍历后都从头开始遍历
    // MergeData(NewData)
    // MergeData(NewData2)
    // MergeData(NewData3)
    // MergeData(NewData4)
    // MergeData(NewData5)
    // MergeData(NewData6)
    // MergeData(NewData7)

    

    //然后后面就是再度合并，写一个递归
    // function Merge2(data)
    // {
    //     let pre,cur;
    //     let MergeAll=[]
    //     let MergePart
    //      while(1)
    //      {
    //         let MergePart={idList:[],PolygonList:[],isMerge:false}
    //         for(let i=0;i<data.length;i++)
    //         {
    //             if(data[i].isMerge==false)
    //             {
    //                 data[i].isMerge=true
    //             }
    //             else{
    //                 continue
    //             }
    //             for(let y=0;y<data[i].idList.length;y++)
    //             {
    //                 MergePart.idList.push(data[i].idList[y])
    //             }
    //             for(let k=0;k<data[i].PolygonList.length;k++)
    //             {
    //                 MergePart.PolygonList.push(data[i].PolygonList[k])
    //             }
    //            for(let j=i+1;j<data.length;j++)
    //            {
    //                if(IsMerge(MergePart.PolygonList,data[j].PolygonList)==true)
    //                {
    //                 MergePart.idList.push(data[j].)
    //                }
    //            }
    //         }
    //      }
    // }



    function ZRMerge(data)
    {
       let AllGraph={}
       for(let i=0;i<data.length;i++)
       {
           AllGraph[data[i][0]]=[]
           for(let j=0;j<data.length;j++)
           {
              if(j==i)
              {
                  continue;
              }
              else{
              if(IsMerge(data[i][1],data[j][1])==true)
              {
                  AllGraph[data[i][0]].push(data[j][0])
              }
             }
           }
       }
    //    console.log(AllGraph)
       return AllGraph
    }
    let AllGraph=ZRMerge(NewData)
    let AllGraph2=ZRMerge(NewData2)
    let AllGraph3=ZRMerge(NewData3)
    let AllGraph4=ZRMerge(NewData4)
    let AllGraph5=ZRMerge(NewData5)
    let AllGraph6=ZRMerge(NewData6)
    let AllGraph7=ZRMerge(NewData7)

    //然后通过深搜来进行遍历
    function GetMerge(data,target)
    {
        var graphM=new Map();
        for(var [key,value] of Object.entries(data)){
	       graphM.set(key,value);
        }
        // console.log(graphM)
        var dfs=DFS(graphM,target)
        // console.log('dfs结果:',dfs)
        return dfs
    }
    
    function DFS(root,s){
        //用来记录访问过的节点
        var remark=new Set();
        //用来存储剩余访问的节点
        var arr=[];
        //用来记录深度遍历节点
        var dfs=[];
        arr.push(s);
        //标记访问过的节点
        remark.add(s);
        var vet;
        while(arr.length>0){
            //从栈顶弹出当前需要访问的节点
            vet=arr.pop();
    
            dfs.push(vet);
            for(var item of root.get(vet)){
                //如果当前的邻接表中节点没有访问过 放入栈中，并添加访问记号
                if(!remark.has(item)){
                    arr.push(item);
                    remark.add(item);
                }
            }
        }
        return dfs;
    }
    //然后我们获取相应的IDList，遍历输入

    function FinalMerge(NewData,AllGraph)
    {
        let IDList=[]
        for(let i=0;i<NewData.length;i++)
        {
             IDList.push(NewData[i][0])
        }
        // GetMerge(AllGraph,'6')
        // GetMerge(AllGraph,'472')
        // console.log(IDList)
        let MergeArray1=[]
        for(let i=0;i<IDList.length;i++)
        {
           let dfs= GetMerge(AllGraph,IDList[i])
           let com=true
           for(let j=0;j<MergeArray1.length;j++)
           {
            if(arrayHasEl(MergeArray1[j],dfs[0])==true)
            {
               com=false
            }
           }
           if(com==true)
           {
            MergeArray1.push(dfs)
           }  
        }
        console.log('最终合并结果:',MergeArray1)
        let len=0;
        for(let i=0;i<MergeArray1.length;i++)
        {
              len+=MergeArray1[i].length
        }
        // console.log(len)
        return MergeArray1
    }
    let Final= FinalMerge(NewData,AllGraph)
    let Final2= FinalMerge(NewData2,AllGraph2)
    let Final3= FinalMerge(NewData3,AllGraph3)
    let Final4= FinalMerge(NewData4,AllGraph4)
    let Final5= FinalMerge(NewData5,AllGraph5)
    let Final6= FinalMerge(NewData6,AllGraph6)
    let Final7= FinalMerge(NewData7,AllGraph7)
     

    //然后合并为一个
    let FinalAll=[]
    function Hebin(dataAll,data)
    {
       for(let i=0;i<data.length;i++)
       {
            dataAll.push(data[i])
       }
       return dataAll
    }
    FinalAll=Hebin(FinalAll,Final)
    FinalAll=Hebin(FinalAll,Final2)
    FinalAll=Hebin(FinalAll,Final3)
    FinalAll=Hebin(FinalAll,Final4)
    FinalAll=Hebin(FinalAll,Final5)
    FinalAll=Hebin(FinalAll,Final6)
    FinalAll=Hebin(FinalAll,Final7)
    console.log(FinalAll)


    // saveJson(FinalAll)
    

    return FinalAll
}

