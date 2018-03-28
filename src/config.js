import axios from "axios";
import { Toast } from "antd-mobile";

//拦截上行请求
axios.interceptors.request.use(
  function(config) {
    Toast.loading("加载中", 0);
    return config;
  },
  error => {
    return Promise.reject("axios上行错误", error);
  }
);
//拦截下行请求
axios.interceptors.response.use(
  function(config) {
    Toast.hide();
    return config;
  },
  error => {
    return Promise.reject("axios下行错误", error);
  }
);
