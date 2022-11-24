import { axiosInstance } from "./DataHelp";
export const GetChengHua=()=>{
   return axiosInstance.get('/ChengHuaPOI')
}

export const GetWuHou=()=>{
    return axiosInstance.get('/WuHouPOI')
}

export const GetQingYang=()=>{
    return axiosInstance.get('/QingYangPOI')
}

export const GetJingJiang=()=>{
    return axiosInstance.get('/JingJiangPOI')
}

export const GetJinNiu=()=>{
    return axiosInstance.get('/JinNiuPOI')
}