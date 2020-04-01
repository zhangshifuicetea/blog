import axios, {AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../app/config';
import {message} from 'antd';
import {getToken} from './index';

const service = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true, // send cookies when cross-domain requests
    // timeout: 10000,
});

service.interceptors.request.use(
    (config:AxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers.common['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        message.error('bad request');
        Promise.reject(error);
    }
);

// 拦截响应

let timer: any;
service.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response.data
    },
    err => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (err.response) {
                const { status, data } = err.response;
                switch (status) {
                    case 401:
                        message.error((data && data.message) || '登录信息过期或未授权，请重新登录！');
                        break;

                    default:
                        message.error(data.message || `连接错误 ${status}！`);
                        break;
                }
            } else {
                message.error(err.message)
            }
        }, 200); // 200 毫秒内重复报错则只提示一次！

        return Promise.reject(err)
    }
);



export default service;
