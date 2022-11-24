import { axiosInstance } from "./DataHelp";
export const getTrajectDataRequest = () => {
  return axiosInstance.get("/data");
};
