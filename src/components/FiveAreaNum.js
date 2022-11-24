//按照成华1-826 锦江827-1702 金牛1703-2667 青羊2668-3532 武侯3533-5688 这样的顺序  Other就是0
export const FiveAreaNum=(str)=>{
     if(str.substring(0,8)=='ChengHua')
     {
       let strNum=parseInt(str.substring(8,str.length))
       strNum+=1
       return strNum
     }
     else if(str.substring(0,9)=='JingJiang')
     {
        let strNum=parseInt(str.substring(9,str.length)) 
        strNum=strNum+827
        return strNum
     }
     else if(str.substring(0,6)=='JinNiu')
     {
        let strNum= parseInt(str.substring(6,str.length) )
        strNum=strNum+1703
        return strNum
     }
     else if(str.substring(0,8)=='QingYang')
     {
        let strNum= parseInt( str.substring(8,str.length) )
        strNum=strNum+2668
        return strNum
     }
     else if(str.substring(0,5)=='WuHou')
     {
        let strNum=parseInt(str.substring(5,str.length))
        strNum=strNum+3533   
        return strNum
     }
     else if(str=='Other')
     {
        return 0
     }
}