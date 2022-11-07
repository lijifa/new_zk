import {request} from '@umijs/max'

//请求日志列表
export async function getLogList(pageSize:number = 10,pageNum:number = 1,options?: { [key: string]: any }){
   return request<any>('/monitor/operlog/list',{
        method:'POST',
        data:{pageSize,pageNum},
        ...(options || {}),

    })
}

