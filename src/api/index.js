import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})

myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myPut.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myDelete.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(obj) {
        return myPost({
            url: urls.login,
            data: {
                ...obj
            }
        })
    },
    category(obj) {
        return myGet({
            url: `${urls.category}`,
            params: {
                ...obj
            }
        })
    },
    addCategory(obj) {
        return myPost({
            url: `${urls.category}`,
            data: {
                ...obj
            }
        })
    },
    upDateCategory(obj, id) {
        return myPut({
            url: `${urls.category}/${id}`,
            data: {
                ...obj
            }
        })
    },
    delCategory(id) {
        return myDelete({
            url: `${urls.category}/${id}`,
        })
    },
    country(obj) {
        return myGet({
            url: `${urls.country}`,
            params: {
                ...obj
            }
        })
    },
    addCountry(obj) {
        return myPost({
            url: `${urls.country}`,
            data: {
                ...obj
            }
        })
    },
    upDateCountry(obj, id) {
        return myPut({
            url: `${urls.country}/${id}`,
            data: {
                ...obj
            }
        })
    },
    delCountry(id) {
        return myDelete({
            url: `${urls.country}/${id}`,
        })
    },
    ccrelation(obj) {
        return myGet({
            url: `${urls.ccrelation}`,
            params: {
                ...obj
            }
        })
    },
    addCcrelation(obj) {
        return myPost({
            url: `${urls.ccrelation}`,
            data: {
                ...obj
            }
        })
    },
    upDateCcrelation(obj, id) {
        return myPut({
            url: `${urls.ccrelation}/${id}`,
            data: {
                ...obj
            }
        })
    },
    delCcrelation(id) {
        return myDelete({
            url: `${urls.ccrelation}/${id}`,
        })
    },
    search_key(obj) {
        return myGet({
            url: `${urls.search_key}`,
            params: {
                ...obj
            }
        })
    },
    addSearch_key(obj) {
        return myPost({
            url: `${urls.search_key}`,
            data: {
                ...obj
            }
        })
    },
    article(obj) {
        return myGet({
            url: `${urls.article}`,
            params: {
                ...obj
            }
        })
    },
    updateArticle(obj,id) {
        return myPut({
            url: `${urls.article}/${id}`,
            data: {
                ...obj
            }
        })
    },
    country_server(obj) {
        return myGet({
            url: `${urls.country_server}`,
            params: {
                ...obj
            }
        })
    },
    user_level(obj) {
        return myGet({
            url: `${urls.user_level}`,
            params: {
                ...obj
            }
        })
    },
    Adduser_level(obj) {
        return myPost({
            url: `${urls.user_level}`,
            data: {
                ...obj
            }
        })
    },
    upDateuser_level(obj, id) {
        return myPut({
            url: `${urls.user_level}/${id}`,
            data: {
                ...obj
            }
        })
    },
    deluser_level(id) {
        return myDelete({
            url: `${urls.user_level}/${id}`,
        })
    },
    upDateCountry_server(obj, id) {
        return myPut({
            url: `${urls.country_server}/${id}`,
            data: {
                ...obj
            }
        })
    },
    tool(obj) {
        return myGet({
            url: `${urls.tool}`,
            params: {
                ...obj
            }
        })
    },
    addTool(obj) {
        return myPost({
            url: `${urls.tool}`,
            data: {
                ...obj
            }
        })
    },
    upDateTool(obj, id) {
        return myPut({
            url: `${urls.tool}/${id}`,
            data: {
                ...obj
            }
        })
    },
    delTool(id) {
        return myDelete({
            url: `${urls.tool}/${id}`,
        })
    },
    upDateSearch_key(obj, id) {
        return myPut({
            url: `${urls.search_key}/${id}`,
            data: {
                ...obj
            }
        })
    },
    delSearch_key(id) {
        return myDelete({
            url: `${urls.search_key}/${id}`,
        })
    },
    input_user_order(obj) {
        return myPost({
            url: `${urls.input_user_order}`,
            data: {
                ...obj
            }
        })
    },
    user_order_list(obj) {
        return myGet({
            url: `${urls.user_order_list}`,
            params: {
                ...obj
            }
        })
    },
    user_list(obj) {
        return myGet({
            url: `${urls.user_list}`,
            params: {
                ...obj
            }
        })
    },
    update_user_info(obj) {
        return myPost({
            url: urls.update_user_info,
            data: {
                ...obj
            }
        })
    },
    wallet_log(obj) {
        return myGet({
            url: `${urls.wallet_log}`,
            params: {
                ...obj
            }
        })
    },

    order_list(obj) {
        return myGet({
            url: `${urls.order_list}`,
            params: {
                ...obj
            }
        })
    },
    webconfig_detail() {
        return myGet({
            url: `${urls.webconfig_detail}`,
        })
    },
    webconfig_update(obj) {
        return myPost({
            url: urls.webconfig_update,
            data: {
                ...obj
            }
        })
    },
    user_check_realname(obj) {
        return myGet({
            url: `${urls.user_check_realname}`,
            params: {
                ...obj
            }
        })
    },
    order_send(obj) {
        return myPost({
            url: urls.order_send,
            data: {
                ...obj
            }
        })
    },
    withdraw_list(obj) {
        return myGet({
            url: `${urls.withdraw_list}`,
            params: {
                ...obj
            }
        })
    },
    express_list() {
        return myGet({
            url: `${urls.express_list}`,
        })
    },
    withdraw_check(obj) {
        return myPost({
            url: urls.withdraw_check,
            data: {
                ...obj
            }
        })
    },
    async tool_upload(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/tool_upload`, image, configs)
        return res.data
    },
    async productUpload(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_product_pic`, image, configs)
        return res.data.data.path
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
}