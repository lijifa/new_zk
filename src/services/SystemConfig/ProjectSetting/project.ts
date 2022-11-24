import {request} from '@umijs/max'

//请求项目维护列表
export async function getProjectList(body: any, options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/selectProjectList',{
         method:'POST',
         data: body,
         ...(options || {prefix: '/zk'}),
 
     })
 }

 //新增项目
 export async function getAddProject(body: API.addchangeProject, options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/project/add',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),

    })

}

//查看详情项目
export async function getCheckProject(body:{id:number},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/project/detail',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })

}

//修改项目
export async function getAmendProject(body: API.addchangeProject, options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/project/edit',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })
}


//删除项目
export async function getdeleteProject(body:{id:number},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/project/delete',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })

}
//顶部拉框数据-所属项目
export async function getBelongProject({},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/project_type',{
        method:'POST',
        data:{},
        ...(options || {prefix: '/zk'}),
    })
}

// 查看绑定站点
export async function getBindSite(body:{id:number},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/check/bind_sites',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })

}

//项目绑定站点
export async function getBindprojectSite(body:{projectId:number,siteIds:string},options?: { [key: string]: any }){
    return request<any>('/system_configuration/project_setting/bind/site',{
        method:'POST',
        data:body,
        ...(options || {prefix: '/zk'}),
    })

}


