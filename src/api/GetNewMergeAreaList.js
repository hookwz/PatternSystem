import { axiosInstance } from "./DataHelp";
export const GetNewMergeAreaList = () => {
  return axiosInstance.get("/NewMergeAreaList");
};
