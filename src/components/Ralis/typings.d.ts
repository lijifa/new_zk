declare namespace API {
    type RalisList = {
        show:boolean,
        showOunt:boolean,
        warning:boolean,
        bar:boolean,
        btnshow:boolean,
        warngsize:number,
        IconTop:number,
        text:string,
        texto:string,
        isActive:number,
        isActive1:number,
        allnum:number
        

    }
    interface Police {
        newSiteid : number | null,//站点
        newAlarmType:number | null//保紧类型
      }
    interface osmallvalue {
        startX ?: number,
        startY ?: number,
        current ?: any
      }

}