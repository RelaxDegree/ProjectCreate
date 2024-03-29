import http from '../utils/request'
import request from '@/utils/request';

// 用户登录
export function login(data) {
    return request({
        url: 'api/v1/users/login',
        method: 'post',
        data
    })
}

// 获取个人信息
export function getInfo(token) {
    return request({
        url: 'api/v1/users/info',
        method: 'get',
        params: { token }
    })
}

// 用户登出
export function logout() {
    return request({
        url: '',
        method: 'post'
    })
}

// 用户注册
export function register(data) {
    return request({
        url: 'api/v1/users/register',
        method: 'post',
        data
    })
}