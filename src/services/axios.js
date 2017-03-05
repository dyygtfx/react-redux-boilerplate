import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : '/';

// 公用头
axios.defaults.baseURL = baseUrl;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 拦截器
axios.interceptors.request.use(function (config) {
    // 打印请求
    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    if (process.env.NODE_ENV !== 'development') {
        if (response.data && response.data.errcode === 401) {
            const from = encodeURIComponent(window.location.href);
            window.location.href = `http://account.wxb.com/?from=${from}`;
            return null;
        }
    }
    return response.data;
}, function (error) {
    if (/code 401/.test(new Error(error))) {
        // 拦截401跳转到登录
        const from = encodeURIComponent(window.location.href);
        window.location.href = `http://account.wxb.com/?from=${from}`;
        return null;
    }
    return Promise.reject(error);
});

export default axios;
