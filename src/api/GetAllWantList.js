import { axiosInstance } from "./DataHelp";

export const GetAllWantList=()=>{
    return  axiosInstance.get('/8.23AllWantList')
}