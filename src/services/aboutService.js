import axios from './axios';
import api from './api';

/**
 * 获取关于内容
 * @param {Object} params
 */
export function getAboutData(params) {
    return axios.get(api.home, {
        params
    }).then(res => {
        console.log(res);
        // 返回给 reducer 的数据
        return {
            about: res.data,
        };
    }).catch(error => {
        console.log(error);
    });
}

export function get() {

}
