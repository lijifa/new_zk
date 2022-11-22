import {request} from '@umijs/max'

//请求站点维护列表
export async function getSiteList(body: any, options?: { [key: string]: any }){
   return request<any>('/system_configuration/project_setting/findAllSites',{
        method:'POST',
        data: body,
        ...(options || {prefix: '/zk'}),

    })
}

