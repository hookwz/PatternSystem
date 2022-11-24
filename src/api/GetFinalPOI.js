import { axiosInstance } from "./DataHelp";

export const GetFinal500POI=()=>{
    return axiosInstance.get("/500StopPOI");
}
export const GetFinalTo13500=()=>{
     return axiosInstance.get('/11500-13500StopPOI')
}
