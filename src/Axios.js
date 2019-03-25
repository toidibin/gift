import axios from 'axios';
// let userAgentInfo = navigator.userAgent
// let isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

var getCookie = function(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + '=');
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
};
const token = getCookie('csrftoken');
const params = {
    baseURL: '/api/official',
    timeout: 20000,
    headers: {
        // Accept: 'application/json',
        // 'Content-type': 'application/x-www-form-urlencoded'
    },
};
if (token) {
    // params.headers.Authorization = 'JWT '+token ,
    params.headers['X-CSRFTOKEN'] = token;
}
let http = axios.create(params);

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
                .post(url, params)
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