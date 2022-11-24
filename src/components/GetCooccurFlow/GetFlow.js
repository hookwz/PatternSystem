export const GetFlow=(data,currentTime,MidTime)=>
{
    //函数作用:用来获取流量信息
    let FlowData=[]
    let AreaIDList=[]
    //这里还是需要转换为时间戳，之前那部分写再主函数里面了,到时，我们需要把
    let TimeArray=[]
    // let MidTime=1406995200000;
    for(let i=0;i<48;i++)
    {
       let mid=[]
       mid.push(i)
       mid.push(MidTime)
       TimeArray.push(mid)
       MidTime+=1800000
    }
    console.log(TimeArray)



    //通过給定的时间戳来进行过滤
    // for(let i=0;i<data.length;i++)
    // {
    //     if(data[i].>=currentTime[0]&&data[i]. <=currentTime[1])
    //     {

    //     }
    // }


    for(let i=0;i<data.length;i++)
    {
        //这里获取到一共有多少个区域有停驻点，然后统计当前区域内获得的流量信息
        for(let j=0;j<data[i].list.length;j++)
        {
            if(AreaIDList.indexOf(data[i].list[j][1].Area)==-1)
            {
                 AreaIDList.push(data[i].list[j][1].Area)
            }
        }
    }
    //当前测试的总共有79个区域，有相关的流量信息
    console.log(AreaIDList)
    function RemoveVal(data,val)
    {
         let index=data.indexOf(val)
         if(index>-1)
         {
            data.splice(index,1)
         }
         return data
    }
    //然后来获取到半个小时的区域流向是怎么样的，对应区域有多少辆车，我们之前获取的共现现象的区域是
    AreaIDList=RemoveVal(AreaIDList,undefined)
    console.log(AreaIDList)
   

    
    
}