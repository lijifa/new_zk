import {request} from '@umijs/max'

//请求站点维护列表
export async function getSiteList(body: any, options?: { [key: string]: any }){
   return request<any>('/system_configuration/project_setting/findAllSites',{
        method:'POST',
        data: body,
        ...(options || {prefix: '/zk'}),

    })
}

//新增站点
export async function getAddSite(body: API.addchangeSite, options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/site/add',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),

    })

}

//查看详情站点
export async function getChangeSite(body:{id:number},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/site/detail',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })

}
//修改站点
export async function getAmendSite(body: API.addchangeSite, options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/site/edit',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })
}


