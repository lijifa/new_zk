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


//删除节点
export async function getdeleteSite(body:{id:number},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/site/delete',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })

}
//请求电压等级
export async function getVoltagechange({},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/voltage_level',{
        method:'POST',
        data:{},
        ...(options || {prefix: '/zk'}),

    })
}

//顶部拉框数据-所属项目
export async function getBelongProject({},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/project/list',{
        method:'POST',
        data:{},
        ...(options || {prefix: '/zk'}),
    })
}

//顶部拉框数据-所属系统
export async function getBelongSystem({},options?: { [key: string]: any }){
    return request<any>('/system_configuration/system/list',{
        method:'POST',
        data:{},
        ...(options || {prefix: '/zk'}),
    })
}


//查询所有省
export function getProvince(){
    return request<API.Response<API.Province[]>>('/system_configuration/area/province/list',{
        method: 'POST',
        prefix: '/zk'
    })
}

//查询所有市
export function getCity(pid: number){
    return request<API.Response<API.City[]>>('/system_configuration/area/city/list',{
        method: 'POST',
        prefix: '/zk',
        data: { pid }
    })
}

//查询所有县
export function getCounty(pid: number){
    return request<API.Response<API.County[]>>('/system_configuration/area/county/list',{
        method: 'POST',
        prefix: '/zk',
        data: { pid }
    })
}
