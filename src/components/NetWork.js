import { saveJson  } from "./saveJson"
import AreaMergeList from '../../public/FPData/AreaMergeList.json'
// import das from '../../static/include-mapboxgl'
//用vuex导入5大区数据


//然后在导入区域功能表

export const NerWorkInit=(data,that)=>{
    let newthat=that
    console.log('共生数据为:',data)
    let WuHou=newthat.$store.getters.GetWuHou;
    let ChengHua=newthat.$store.getters.GetChengHua;
    let QingYang=newthat.$store.getters.GetQingYang;
    let JingJiang=newthat.$store.getters.GetJingJiang;
    let JinNiu=newthat.$store.getters.GetJinNiu;
    // console.log('五大区:',WuHou,ChengHua,QingYang,JingJiang,JinNiu)
    //生成相对应的力导向图
    let PointList=[]
    let EdgeList=[]
    //这里获取到点集合
    for(let i=0;i<data.length;i++)
    {
       for(let j=0;j<data[i][1].length;j++)
       {
            if(PointList.indexOf(data[i][1][j])==-1)
            {
               PointList.push(data[i][1][j])
            }
       }
       for(let k=0;k<data[i][3].length;k++)
       {
        if(PointList.indexOf(data[i][3][k])==-1)
        {
            PointList.push(data[i][3][k])
        }
       }
    }
    //这里获取到边集合，边先通过转换为字符的形式，现在将相同的过滤后，再转换为[,]这样的形式
    for(let i=0;i<data.length;i++)
    {
       for(let j=0;j<data[i][1].length;j++)
       {
           for(let k=0;k<data[i][3].length;k++)
           {
            let mid=[]
            mid.push(data[i][1][j])
            mid.push(data[i][3][k])
            if(arrayHasEl(EdgeList,mid)==false)
            {
                 EdgeList.push(mid)
            }   
           }
       }
    }
    //然后根据相应的属性对点的颜色进行编码,测试数据共计250个点
    console.log('点集合为:',PointList)
    console.log('边集合为:',EdgeList)

    //然后计算边权重
    for(let i=0;i<EdgeList.length;i++)
    {
        EdgeList[i][2]=0;
        for(let j=0;j<data.length;j++)
        {
            for(let k=0;k<data[j][1].length;k++)
            {
               for(let q=0;q<data[j][3].length;q++)
               {
                    if(data[j][1][k]==EdgeList[i][0]&&data[j][3][q]==EdgeList[i][1])
                    {
                    //    console.log('ok')
                       EdgeList[i][2]++;
                    }
               }
            }
        }
    }


    //然后进行数据格式转换
    function ArrToJson(data)
    {
        let newData=[]
        for(let i=0;i<data.length;i++)
        {
           let newObject={source:null,target:null,weight:null}
           newObject.source=data[i][0]
           newObject.target=data[i][1]
           newObject.weight=data[i][2]
           newData.push(newObject)
        }
        
        return newData;
    }
    let myJson=ArrToJson(EdgeList)
    console.log(myJson)
    // saveJson(myJson,'GephiTest.json')

    //然后我们给点添加上所属的区域以及对应的功能
    // console.log('区域列表！！',AreaMergeList)
    //成华区 0  0-351  锦江区 1  352-738 金牛区 2 739-1149 青羊区 3 1150-1542 武侯区 4 1543-2402   
    function AddAreaAndSem(PointList)
    {
    let NewPointList=[]
    for(let i=0;i<PointList.length;i++)
    {
        let NewMid=[]
         if(PointList[i]>=0&&PointList[i]<=351)
         {
             NewMid.push(PointList[i])
             NewMid.push(0)
             NewMid.push('ChengHua')
         }
         else if(PointList[i]>=352&&PointList[i]<=738)
         {
            NewMid.push(PointList[i])
            NewMid.push(1)
            NewMid.push('JingJiang')
         }
         else if(PointList[i]>=739&&PointList[i]<=1149)
         {
            NewMid.push(PointList[i])
            NewMid.push(2)
            NewMid.push('JinNiu')     
         }
         else if(PointList[i]>=1150&&PointList[i]<=1542)
         {
            NewMid.push(PointList[i])
            NewMid.push(3)
            NewMid.push('QingYang')
         }
         else if(PointList[i]>=1543&&PointList[i]<=2402)
         {
            NewMid.push(PointList[i])
            NewMid.push(4)
            NewMid.push('WuHou')
         }
         NewPointList.push(NewMid)
    }
     return NewPointList
    }

    let NewPointList=AddAreaAndSem(PointList)
    console.log(NewPointList)
    //然后给每个区域添加所对应的功能属性
    for(let i=0;i<NewPointList.length;i++)
    {
             let Archor
             switch(NewPointList[i][2])
             {
                 case 'ChengHua':
                    Archor=AreaMergeList[NewPointList[i][0]][0].substring(8)
                     for(let j=0;j<ChengHua.length;j++)
                     {
                        if(ChengHua[j].placeId==Archor)
                        {
                            NewPointList[i][3]=ChengHua[j].AreaAttribute
                        }
                     }
                     continue
                 case 'JingJiang':
                    Archor=AreaMergeList[NewPointList[i][0]][0].substring(9)
                    for(let j=0;j<JingJiang.length;j++)
                    {
                       if(JingJiang[j].placeId==Archor)
                       {
                           NewPointList[i][3]=JingJiang[j].AreaAttribute
                       }
                    }
                    continue
                 case 'JinNiu':
                    Archor=AreaMergeList[NewPointList[i][0]][0].substring(6)
                    for(let j=0;j<JinNiu.length;j++)
                    {
                       if(JinNiu[j].placeId==Archor)
                       {
                           NewPointList[i][3]=JinNiu[j].AreaAttribute
                       }
                    }
                    continue
                 case 'QingYang':
                    Archor=AreaMergeList[NewPointList[i][0]][0].substring(8)
                    for(let j=0;j<QingYang.length;j++)
                    {
                       if(QingYang[j].placeId==Archor)
                       {
                           NewPointList[i][3]=QingYang[j].AreaAttribute
                       }
                    }
                    continue
                 case 'WuHou':
                    Archor=AreaMergeList[NewPointList[i][0]][0].substring(5)
                    for(let j=0;j<WuHou.length;j++)
                    {
                       if(WuHou[j].placeId==Archor)
                       {
                           NewPointList[i][3]=WuHou[j].AreaAttribute
                       }
                    }
                    continue
             }
         
    }
    //这里也是给6个功能区分序号，办公区：0，住宅区：1，学校区：2，商业区：3，风景区：4，医疗区：5
    for(let i=0;i<NewPointList.length;i++)
    {
        // console.log(NewPointList[i][3])
        switch(NewPointList[i][3])
        {
            case '办公区':
                NewPointList[i].push(0)
                continue
            case '住宅区':
                NewPointList[i].push(1)
                continue
            case '学校区':
                NewPointList[i].push(2)
                continue
            case '商业区':
                NewPointList[i].push(3)
                continue
            case '风景区':
                NewPointList[i].push(4)
                continue
            case '医疗区':
                NewPointList[i].push(5)
                continue
        }
    }
    //然后再次更新边集信息
    for(let i=0;i<myJson.length;i++)
    {
       for(let j=0;j<NewPointList.length;j++)
       {
          if(myJson[i].source==NewPointList[j][0])
          {
            myJson[i].sourceArea=NewPointList[j][1];
            myJson[i].sourceCategory=NewPointList[j][4];
          }
          else if(myJson[i].target==NewPointList[j][0])
          {
            myJson[i].targetArea=NewPointList[j][1];
            myJson[i].targetCategory=NewPointList[j][4];
          }
       }
    }
    // saveJson(myJson,'FinalMyJson.json')
    let FinalPoint=[]
    for(let i=0;i<NewPointList.length;i++)
    {
         let finalObject={areaId:null,Area:null,AreaStr:null,Function:null,FunctionArea:null}
         finalObject.areaId=NewPointList[i][0]
         finalObject.Area=NewPointList[i][1]
         finalObject.AreaStr=NewPointList[i][2]
         finalObject.Function=NewPointList[i][3]
         finalObject.FunctionArea=NewPointList[i][4]
         FinalPoint.push(finalObject)
    }
    console.log(FinalPoint)
    // saveJson(FinalPoint,'FinalPoint.json')


    //然后进行力导向图的绘制



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




}