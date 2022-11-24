/* 这里是从后端获取数据的函数 */
import axios from "axios";

export const BASE_URL = "http://localhost:3001/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    alert(err, "网络错误");
  }
);
