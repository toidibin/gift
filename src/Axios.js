import axios from 'axios';
import Qs from 'qs'
// let userAgentInfo = navigator.userAgent
// let isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
let http = axios.create({
    baseURL: '/api/official',
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/x-www-form-urlencoded'
    }
});

export default {
    get(url) {
        return new Promise((resolve, reject) => {
            http
                .get(url)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        resolve(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            http
                .post(url, Qs.stringify(params))
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        resolve(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    }
};