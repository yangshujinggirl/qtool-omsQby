import { message } from 'antd';
import { Qmessage } from 'common';
import qs from 'qs'
import axios from 'axios';

const defaultHeader = {
  // 'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/x-www-form-urlencoded'
};
function request({ baseURL = '', timeout = 600000, headers = defaultHeader}) {
  const axiosinstance  = axios.create({
    baseURL,
    timeout,
    headers,
    withCredentials: true,
  })
  axiosinstance.interceptors.request.use((config) => {
    const { method, params = {} } = config;
    let { data = {}, url } = config;
    config.data = qs.stringify(data);
    return config;
  },error => {
    Promise.reject({
      message:error.message || '请求参数异常'
    })
  })
  // 请求响应拦截器
  axiosinstance.interceptors.response.use((response) => {
      const { code, message:resultMessage} = response.data;
      // 用户登录超时统一处理
      if(code=='E_300'){
         window.location.href= '/';
         sessionStorage.clear();
         return;
      }
      if(code!='0'){//业务错误弹框
          Qmessage.error(resultMessage);
          return Promise.reject(response.data);
      }
      return response.data;
    }, error => {
      window.location.href= '/';
      sessionStorage.clear();
      Qmessage.error(error);
    });
  return axiosinstance;
}
const ajax = new request({baseURL:'/erpWebRest'});
export default ajax;
