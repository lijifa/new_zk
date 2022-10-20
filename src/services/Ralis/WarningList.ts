import { request } from "@umijs/max"

//告警列表
export async function getalarmNoticeList(body:API.alarmNoticeList, options?: { [key: string]: any }) {
    return request<any>('/module/notice/alarmNoticeList',{
        method:'POST',
        data: {...body,pageSize:30},
        ...(options || {}),
    })
  
    
}
//获取告警列表总数
export async function getalarmNoticeListCount(timeCode?:number,alarmType?:number,options?: { [key: string]: any }){
    return request<any>("/module/notice/alarmNoticeListCount",{
        method:'GET',
        params:{
            timeCode:timeCode,
            alarmType:alarmType,
            ...(options || {}),
        }
    })
    
}


//获取站点信息
export async function getselectSafetyMonitoring(projectId:number,options?: { [key: string]: any }){
    return request<any>('/module/project/selectSafetyMonitoring',{
        method:'POST',
        data:projectId,
        ...(options || {}),

    })

}

//请求站信息
export async function getselectUnit(){
    return request<any>('/module/notice/selectUnit',{
        method:'POST'
    })
}
//请求报警信息
export async function getselectSecondAlarmType(){
    return request<any>('/module/notice/selectSecondAlarmType',{
        method:'POST'
    })
}