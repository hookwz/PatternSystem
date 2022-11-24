import { axiosInstance } from "./DataHelp";

export const GetMergeAreaList=()=>{
    return axiosInstance.get('/MergeAreaList')
}