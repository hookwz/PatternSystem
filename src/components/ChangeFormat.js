import {saveJson} from './saveJson'

export const ChangeFormat=(data)=>{
    // console.log("输入的数据为:",data)
    let wantArray=[]
    let mid
    let wantObject
    for(let i=0;i<data.length;i++)
    {
        if(JSON.stringify(data[i])=='[]')
        {
           continue
        }
        else{
        wantObject={id:null,list:[]}
        wantObject.id=data[i][0][0]
        for(let j=0;j<data[i].length;j++)
        {
           mid=[]
           let midObject={id:null,lat:null,lng:null,stop:null,time:null}
           if(data[i][j][3]=='0'&&data[i][j][8]=='1')
           {
                mid.push("上车点")
           }
           else if(data[i][j][3]=='1'&&data[i][j][8]=='0')
           {
                mid.push("下车点")
           }                  

              midObject.id=data[i][j][0];
              midObject.lat=parseFloat(data[i][j][1]);
              midObject.lng=parseFloat(data[i][j][2]);
              midObject.stop=data[i][j][3];
              midObject.time=data[i][j][4];
            mid.push(midObject)
            wantObject.list.push(mid) 
        }
       }
       wantArray.push(wantObject)
    }
    // console.log('最后的结果为:',wantArray)
    // saveJson(wantArray)
    return wantArray
}