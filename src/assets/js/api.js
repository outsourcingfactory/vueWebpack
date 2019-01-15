import axios from 'axios';
import qs from 'qs';
let baseURL
if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://playtest.uxin.com/';
    baseURL = 'https://live.hongdoulive.com';
    // baseURL = 'http://www.testymz.com:7071';
} else if (process.env.NODE_ENV == 'debug') {
    baseURL = 'http://playtest.uxin.com/';
} else if (process.env.NODE_ENV == 'production') {
    baseURL = 'https://live.hongdoulive.com';
    // baseURL = 'http://playtest.uxin.com/';
    // baseURL = 'https://testwechat.hongdoulive.com';
}

/**
  * 封装的全局ajax请求
  */
class Axios {
    constructor() {
        this.init();
    };
    /**
        * 初始化
        */
    init() {
        axios.defaults.baseURL = baseURL;
        // axios.defaults.headers = {
        //     "Content-Type": "text/html"
        // }
    };

    /**
        * GET 请求 {es6解构赋值}
        * @param type String 包含url信息
        * @param data 需要发送的参数
        * @returns {Promise}
        * @constructor
        */
    HttpGet(url, data) {
        this.promise = new Promise((resolve, reject) => {
            axios.get(url, {params: data})
                .then((data) => {
                    if (typeof data == 'string') {
                        resolve(JSON.parse(data));
                    }else{
                        resolve(data);
                    }
                })
                .catch((data) => {
                    reject(data);
                })
        })
        return this.promise;
    };

    /**
        * POST 请求
        * @param type String 包含url信息
        * @param data Object 需要发送的参数
        * @param urlData Object 需要拼接到地址栏的参数
        * @returns {Promise}
        * @constructor
        */
    HttpPost(url, Data, urlData) {
        this.promise = new Promise((resolve, reject) => {
            // for (const item in urlData) {
            //     url += '/' + urlData[item];
            // }
            axios.post(url,qs.stringify(Data))
            // axios.post(url,Data)
                .then((data) => {
                    if (typeof data == 'string') {
                        resolve(JSON.parse(data));
                    }else{
                        resolve(data);
                    }
                })
                .catch((data) => {
                    reject(data);
                })
        })
        return this.promise;
    };
};
export default new Axios();