declare namespace API {
  type alarmNoticeList = {
    pageSize:number,
    pageNum:number ,
    projectId?:number | null,
    siteId?:number | null,
    timeCode?:any,
    alarmType?:number | null,
  };
}
