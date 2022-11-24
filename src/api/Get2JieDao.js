import { axiosInstance } from "./DataHelp";
export const get2JieDaoDataRequest = () => {
  return axiosInstance.get("/2jiedao");
};