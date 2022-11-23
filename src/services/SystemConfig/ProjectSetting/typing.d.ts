declare namespace API {
    type addchangeSite = {
        id?:number;//id
        name:string;//站点名称
        systemId:number;//所属系统
        address:string;//站点详细地址
        provinceId:number;//省份
        countyId:number;//县区
        cityId:number;//城市
        coolingArea?:number;//供冷面积
        heatingArea?:number;//供热面积
        coolingBeginTime?:string;//供冷开始时间
        coolingEndTime?:string;//供冷结束时间
        heatingBeginTime?:string;//供热开始时间
        heatingEndTime?:string;//供热结束时间
        leader:string;//负责人
        phoneNumber:string;//联系电话
        isHealthy:number;//设备是否健全(0/1)
        remarks?:string;//备注
        voltageLevel?:string;//配电室电压等级
        transformerCapacity?:string;//变压器容量
    }
}