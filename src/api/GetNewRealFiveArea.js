import { axiosInstance } from "./DataHelp";

export const GetRealCH = () => {
  return axiosInstance.get("/RealCHArea");
};
export const GetRealJJ = () => {
  return axiosInstance.get("/RealJJArea");
};
export const GetRealJN = () => {
  return axiosInstance.get("/RealJNArea");
};
export const GetRealQY = () => {
  return axiosInstance.get("/RealQYArea");
};
export const GetRealWH = () => {
  return axiosInstance.get("/RealWHArea");
};
