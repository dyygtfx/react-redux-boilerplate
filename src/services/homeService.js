import axios from './axios';
import api from './api';

/**
 * 获取首页内容
 * @param {Object} params
 */
export function getHomeData(params) {
    return axios.get(api.home, {
        params
    }).then(res => {
        console.log(res);
        // 返回给 reducer 的数据
        return {
            home: res.data,
        };
    }).catch(error => {
        console.log(error);
    });
}

export function get() {

}
