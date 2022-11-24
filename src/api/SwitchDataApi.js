import { axiosInstance } from "./DataHelp";
export const getSwitchDataRequest = () => {
  return axiosInstance.get("/newdata");
};
