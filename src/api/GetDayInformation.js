
import { axiosInstance } from "./DataHelp";
export const GetDayInformation=()=>{
    return axiosInstance.get('/8.23')
}