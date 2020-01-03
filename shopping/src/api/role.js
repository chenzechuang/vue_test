import request from '@/utils/request'

export function getRoutes () {
    return request({
        url: '/routes',
        method: 'get'
    })
}

export function getRoles () {
    return request({
        url: '/roles',
        method: 'get'
    })
}

export function addRoles (data) {
    return request({
        url: '/roles',
        method: 'post',
        data
    })
}

export function deleteRoles (id) {
    return request({
        url: `/roles/${id}`,
        method: 'delete'
    })
}

export function updateRoles (id, data) {
    return request({
        url: `/roles/${id}`,
        method: 'put',
        data
    })
}