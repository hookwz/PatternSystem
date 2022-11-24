import { axiosInstance } from "./DataHelp";


export const GetCHPOI=()=>{
    return axiosInstance.get('/RealCHPOI')
}
export const GetJJPOI=()=>{
    return axiosInstance.get('/RealJJPOI')
}
export const GetJNPOI=()=>{
    return axiosInstance.get('/RealJNPOI')
}
export const GetQYPOI=()=>{
    return axiosInstance.get('/RealQYPOI')
}
export const GetWHPOI=()=>{
    return axiosInstance.get('/RealWHPOI')
}
