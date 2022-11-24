import { axiosInstance } from "./DataHelp";

export const GetCH = () => {
  return axiosInstance.get("/CHJZ");
};
