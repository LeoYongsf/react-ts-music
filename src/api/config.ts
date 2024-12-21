import axios from "axios";

const BASEURL = "/api";
const TIMEOUT: number = 10000;

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: TIMEOUT,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    throw new Error("响应拦截器：" + err);
  }
);

export default axiosInstance;
