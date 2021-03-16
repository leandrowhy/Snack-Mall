import axios from "axios";
import router from "../router";
import { getCookie } from "../utils/cookie";
import { Message } from 'element-ui';

// 环境的切换  开发环境、测试环境和生产环境
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "/api";
} else if (process.env.NODE_ENV === "debug") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "";
}
// 设置默认的请求超时时间。例如超过了10s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data";

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = getCookie("token") || "";
    token && (config.headers.token = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
// http response 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response) {
      switch (response.data.status) {
        // 返回401，清除token信息并跳转到登录页面
        case 401:
          Message({
            message: response.data.msg,
            type: "error",
          });
          router.replace({
            path: "/login",
            //登录成功后跳入浏览的当前页面
            query: { redirect: router.currentRoute.fullPath },
          });
      }
    }
    return response;
  },
  (error) => {
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
