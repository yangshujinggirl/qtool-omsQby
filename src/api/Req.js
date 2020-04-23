import { message } from 'antd';
import { Qmessage } from 'common';
import axios from 'axios';

const defaultHeader = {
  // 'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
};
function request({ baseURL = '', timeout = 600000, headers = defaultHeader,isInterceptors = true}) {
  const axiosinstance  = axios.create({
    baseURL,
    timeout,
    headers,
    withCredentials: true,
  });
  if(isInterceptors){
      axiosinstance.interceptors.request.use((config) => {
          return config;
      },error => {
          Promise.reject({
              message:error.message || '请求参数异常'
          })
      })
      // 请求响应拦截器
      axiosinstance.interceptors.response.use((response) => {
          const { httpCode, msg:resultMessage, result,fileDomain} = response.data;
          // 用户登录超时统一处理
          if(httpCode=='E_300'){
              window.location.href= '/';
              sessionStorage.clear();
              return;
          }
          if(httpCode!=200){//业务错误弹框
              Qmessage.error(resultMessage);
              return Promise.reject(result);
          }
          return {result,httpCode,fileDomain};
      }, error => {
          // window.location.href= '/';
          // sessionStorage.clear();
          Qmessage.error('服务异常');
          setTimeout(()=> {
              // window.location.href= '/';
          },4000)
          return Promise.reject({message:'服务异常'});
      });
  }
  return axiosinstance;
}
// const ajax = new request({baseURL:'/qtoolsOms'});
// export default ajax;

const omsAjax = new request({baseURL:'/qtoolsOms'});
const erpAjax = new request({baseURL:'/qtoolsErp'});
const appAjax = new request({baseURL:'/qtoolsApp'});
const dataAjax = new request({baseURL:'/qtools-report'});
const omsEmptyInterceptorsAjax = new request({baseURL:'/qtoolsOms',isInterceptors:false});
const erpEmptyInterceptorsAjax = new request({baseURL:'/qtoolsErp',isInterceptors:false});
const appEmptyInterceptorsAjax = new request({baseURL:'/qtoolsApp',isInterceptors:false});
const dataEmptyInterceptorsAjax = new request({baseURL:'/qtools-report',isInterceptors:false});
export {
  omsAjax,erpAjax,appAjax,dataAjax,omsEmptyInterceptorsAjax,erpEmptyInterceptorsAjax,appEmptyInterceptorsAjax,dataEmptyInterceptorsAjax
}
