import { axiosInstance } from "./DataHelp";

export const Get1011=()=>{
    return axiosInstance.get('/8.23-10-11Flow')
}

export const Get823AllFlow=()=>{
    return axiosInstance.get('/8.23Flow')
}