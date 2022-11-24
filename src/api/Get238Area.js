import { axiosInstance } from "./DataHelp";

export const Get238Area = () => {
  return axiosInstance.get("/238Area");
};

export const GetPre238 = () => {
  return axiosInstance.get("/Pre238");
};
