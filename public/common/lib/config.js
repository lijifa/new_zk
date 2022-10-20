(function (window) {
  window.version = "1.04.015";
  // Api接口地址
  window.baseurl = location.origin + "/apis/";

  window.baseurlPD = location.origin + "/apis/";
  window.baseurl2 = location.origin + "/showroom/";
  // 根据不同环境切换跳转地址
  window.zkurl =
    location.origin.indexOf("zg.hdzhenergy.cn") > -1
      ? "http://zk.hdzhenergy.cn/login"
      : location.origin.indexOf("192.168.1.201") > -1
        ? "http://192.168.1.201:8086/login"
        : location.origin.indexOf("47.92.142.40") > -1
          ? "http://47.92.142.40:9086/login"
          : "http://127.0.0.1:8086/login";
})(window);

//接口地址
var hdInterface = {};

//-----------------公共接口-------------------
// 登录接口
hdInterface.login = baseurl + "login";
// 企业列表
hdInterface.companyList = baseurl + "user/mfrs/list";
// 更新mfrsId
hdInterface.updateMfrsId = baseurl + "updateMfrsId/";
// 退出登录
hdInterface.logOut = baseurl + "/logout";
// token检测
hdInterface.hasAccessToken = baseurl + "/hasAccessToken";

//查询左侧菜单
// hdInterface.selectZgMenuListAll = baseurl + "wisdom/menu/selectZgMenuListAll";
hdInterface.selectZgMenuListAll =
  baseurl + "wisdom/menu/selectZgMenuLeftListByMfrsId";
//查询指定企业下企业总览是否显示
hdInterface.selectZgMenuLeftNormalIndexByMfrsId =
  baseurl + "wisdom/menu/selectZgMenuLeftNormalIndexByMfrsId";
//查询顶部菜单
hdInterface.selectZgMenuNavListByMenuLeftId =
  baseurl + "wisdom/menu/selectZgMenuNavListByMenuLeftId";
//查询天气（只调用一次）
// hdInterface.selectWaterWeather=baseurl+"common/selectWaterWeather";
hdInterface.selectWaterWeather = baseurl + "wisdom/common/selectWaterWeather";
// 查询企业总览天气新接口(根据mfrsId)
hdInterface.selectWeather = baseurl + "/wisdom/common/selectWeather";
// 查询站点天气新接口(根据siteId)
hdInterface.selectWeatherBySiteId =
  baseurl + "/wisdom/common/selectWeatherBySiteId";
// 告警列表接口
hdInterface.selectAlarmNotice = baseurl + "module/notice/selectAlarmNotice";
// 告警站点下拉列表接口
hdInterface.selectUnit = baseurl + "module/notice/selectUnit";
// 告警类型下拉列表接口
hdInterface.selectSecondAlarmType =
  baseurl + "module/notice/selectSecondAlarmType";
// 告警列表总数
hdInterface.alarmNoticeListCount =
  baseurl + "module/notice/alarmNoticeListCount";
// 告警列表
hdInterface.alarmNoticeList = baseurl + "module/notice/alarmNoticeList";
//查询日期时间(2s调用一次)
hdInterface.currentTimes = baseurl + "wisdom/common/currentTimes";
//获取图片pid(根据菜单ID查询菜单参数)(只调用一次)
// hdInterface.selectZgPictureByMenuId = baseurl + "wisdom/common/selectZgPictureByMenuId";
hdInterface.selectZgMenuParamByMenuId =
  baseurl + "wisdom/menu/selectZgMenuParamByMenuId";
//获取图片(只调用一次)
hdInterface.selectPictureById = baseurl + "business/picture/selectPictureById";
//获取站点、项目名称(只调用一次)
hdInterface.selectSiteNameAndProjectNameBySiteId =
  baseurl + "wisdom/common/selectSiteNameAndProjectNameBySiteId";
//-----------------企业总览-------------------
// 没调用接口

//-----------------项目总览-------------------
//查询此页面基础数据(60s调用一次)
hdInterface.projectManager = baseurl + "wisdom/project/projectManager";
//查询此页面基础数据(60s调用一次)
hdInterface.projectManagerHost = baseurl + "wisdom/project/projectManager";

//-----------------站点概况-------------------
//设备数量：设备在线数量、设备离线数量、设备总数
// hdInterface.selectDeviceRunStatus = baseurl + "wisdom/zgsitesurvey/selectDeviceRunStatus";
//故障数量：
// hdInterface.selectDeviceFaultCount = baseurl + "wisdom/zgsitesurvey/selectDeviceFaultCount";
//设备分析，完好率、在线率、故障率(60s调用一次)
// hdInterface.selectDeviceAnalysis = baseurl + "wisdom/zgsitesurvey/selectDeviceAnalysis";
//当日能耗：
// hdInterface.selectEnergySum = baseurl + "wisdom/zgsitesurvey/selectEnergySum";
//预警统计：
// hdInterface.selectWarnCount = baseurl + "wisdom/zgsitesurvey/selectWarnCount";
//预警分析，30天预警天数(60s调用一次)
// hdInterface.selectWarnAnalysis = baseurl + "wisdom/zgsitesurvey/selectWarnAnalysis";
//故障数量，当日故障、当月故障、故障占比(60s调用一次)
// hdInterface.selectDeviceFaultCount = baseurl + "wisdom/zgsitesurvey/selectDeviceFaultCount";
//当日能耗，当日机组能耗(60s调用一次)
// hdInterface.selectEnergySum = baseurl + "wisdom/zgsitesurvey/selectEnergySum";
//预警信息，预警折线图数据（只调用一次）
// hdInterface.selectWarnTrend30Day = baseurl + "wisdom/zgsitesurvey/selectWarnTrend30Day";
//绑定监控（只调用一次）
hdInterface.selectCameraDetail = baseurl + "wisdom/camera/selectCameraDetail";
//耗电量排行(60s调用一次)
// hdInterface.selectElectricRank = baseurl + "wisdom/zgsitesurvey/selectElectricRank";
//当日预警次数排名
// hdInterface.warnTotalCurrentDay = baseurl + "wisdom/zgsitesurvey/warnTotalCurrentDay";
//获取设备列表
// hdInterface.selectDeviceDetail=baseurl+"wisdom/zgsystemmonitoring/selectDeviceDetail";
//获取实时数据
// hdInterface.select3DPlcInfoValue=baseurl+"wisdom/zgsystemmonitoring/select3DPlcInfoValue";
//-----------------运行实时监控-------------------
//供水温度，回水温度，供水压力，回水压力(60s调用一次)
// hdInterface.selectWaterSourceHeatPumpUnit=baseurl+"common/selectWaterSourceHeatPumpUnit";/////////万能接口
hdInterface.selectWaterSourceHeatPumpUnit =
  baseurl + "wisdom/zgrealmonitor/selectWaterSourceHeatPumpUnit";
//运行实时统计（只调用一次）
// hdInterface.runningRealTimeMonitoring=baseurl+"common/runningRealTimeMonitoring";/////////万能接口
hdInterface.runningRealTimeMonitoring =
  baseurl + "wisdom/zgrealmonitor/runningRealTimeMonitoring";
//重点设备展示(60s调用一次)
// hdInterface.keyEquipmentDisplay=baseurl+"common/keyEquipmentDisplay";/////////万能接口
hdInterface.keyEquipmentDisplay =
  baseurl + "wisdom/zgrealmonitor/keyEquipmentDisplay";
//监控数据（只调用一次）
hdInterface.selectCameraDetailImport =
  baseurl + "wisdom/camera/selectCameraDetailImport";
//地热井基本数据，供暖进水温度、供暖进水压力、供暖出水温度、供暖出水压力、开采井温度、回灌井温度
hdInterface.selectWaterSourceproductionWell =
  baseurl + "wisdom/zgsystemmonitoring/selectWaterSourceproductionWell";

//-----------------单冷系统、水源系统、锅炉系统-------------------
//非列表单个数据(60s调用一次)
hdInterface.JKselectWaterSourceHeatPumpUnit =
  baseurl + "wisdom/zgsystemmonitoring/selectWaterSourceHeatPumpUnit"; //////////////////////////////////////////////////重复
//冷冻供回水温度曲线(60s调用一次)
hdInterface.chilledWaterSupplyAndReturn =
  baseurl + "wisdom/zgsystemmonitoring/chilledWaterSupplyAndReturn";
//今日能耗(60s调用一次)
hdInterface.selectEnergy = baseurl + "business/diagram/selectEnergy";
//当前板换状态(60s调用一次)
hdInterface.selectPlateHeatExchangers =
  baseurl + "wisdom/zgsystemmonitoring/selectPlateHeatExchangers";
//当前设备状态(60s调用一次)
hdInterface.selectDeviceStatusByDiagram =
  baseurl + "wisdom/zgsystemmonitoring/selectDeviceStatusByDiagram";
//当前设备状态(60s调用一次)
hdInterface.selectDeviceStatusByDeviceIds =
  baseurl + "wisdom/zgsystemmonitoring/selectDeviceStatusByDeviceIds";

hdInterface.selectGeothermalWell =
  baseurl + "/wisdom/zgsystemmonitoring/selectGeothermalWell";

//-----------------节能概况-------------------
//实时能效分析（只调用一次）
// hdInterface.selectSystemSyn=baseurl+"common/selectSystemSyn";/////////万能接口
hdInterface.selectSystemSyn = baseurl + "wisdom/zgenergysurvey/selectSystemSyn";
//当日能耗监控、室内外温度
hdInterface.selectElectricAndWaterDay =
  baseurl + "wisdom/zgenergysurvey/selectElectricAndWaterDay";
// 当日设备耗电排行（只调用一次）
// hdInterface.selectElectricRank=baseurl+"common/selectElectricRank";/////////万能接口
hdInterface.ENselectElectricRank =
  baseurl + "wisdom/zgenergysurvey/selectElectricRank"; ///////////////////////////////////////////////////////重复
//当日总能耗（只调用一次）
// hdInterface.selectElectricAndWaterDayConsumption=baseurl+"common/selectElectricAndWaterDayConsumption";/////////万能接口
hdInterface.selectElectricAndWaterDayConsumption =
  baseurl + "wisdom/zgenergysurvey/selectElectricAndWaterDayConsumption";
//查看当前机房状态
hdInterface.ENselectWaterSourceHeatPumpUnit =
  baseurl + "wisdom/zgenergysurvey/selectWaterSourceHeatPumpUnit";
//昨日总能耗（只调用一次）
// hdInterface.yesterdayTotalEnergy=baseurl+"common/yesterdayTotalEnergy";/////////万能接口
hdInterface.yesterdayTotalEnergy =
  baseurl + "wisdom/zgenergysurvey/yesterdayTotalEnergy";
//图表,系统实时COP （只调用一次）
// hdInterface.selectSystemCop=baseurl+"common/selectSystemCop";/////////万能接口
hdInterface.selectSystemCop = baseurl + "wisdom/zgenergysurvey/selectSystemCop";
//当日能耗监控,当日能耗统计,室外温度，室外湿度（60s调用一次）
hdInterface.map = baseurl + "common/map"; /////////万能接口（看不到数据，没法更改）
//当前机房状态（目前没使用）
hdInterface.map =
  baseurl + "wisdom/zgenergysurvey/selectWaterSourceHeatPumpUnit";

//-----------------节能统计-------------------
//能耗总计、能耗均值（只调用一次）
// hdInterface.selectMonthAvgAndStatistics=baseurl+"common/selectMonthAvgAndStatistics";/////////万能接口
hdInterface.selectMonthAvgAndStatistics =
  baseurl + "wisdom/zgenergystatistics/selectMonthAvgAndStatistics";
//能耗总计表格，30天日耗电趋势，30天气温趋势（只调用一次）
// hdInterface.selectMonthInfo=baseurl+"common/selectMonthInfo";/////////万能接口
hdInterface.selectMonthInfo =
  baseurl + "wisdom/zgenergystatistics/selectMonthInfo";
//系统COP统计近30天（只调用一次）
// hdInterface.selectSystemMonthCop=baseurl+"common/selectSystemMonthCop";/////////万能接口
hdInterface.selectSystemMonthCop =
  baseurl + "wisdom/zgenergystatistics/selectSystemMonthCop";
//系统COP分布近30天（只调用一次）
// hdInterface.selectCopDistribution=baseurl+"common/selectCopDistribution";/////////万能接口
hdInterface.selectCopDistribution =
  baseurl + "wisdom/zgenergystatistics/selectCopDistribution";
//设备耗电排行30天
// hdInterface.selectMonthElectricDeviceTop=baseurl+"common/selectMonthElectricDeviceTop";/////////万能接口
hdInterface.selectMonthElectricDeviceTop =
  baseurl + "wisdom/zgenergystatistics/selectMonthElectricDeviceTop";
//日耗电排行近30天
// hdInterface.selectMonthElectricDayTop=baseurl+"common/selectMonthElectricDayTop";/////////万能接口
hdInterface.selectMonthElectricDayTop =
  baseurl + "wisdom/zgenergystatistics/selectMonthElectricDayTop";

//-----------------安全概况-------------------
//实时预警规则,实时设备故障,综合安全评分（60s调用一次）
hdInterface.selectSafetyScore = baseurl + "wisdom/zgsecurity/selectSafetyScore";
//冷冻供回水温压差
hdInterface.ColdSupplyAndReturnWaterIsPoor =
  baseurl + "wisdom/zgsecurity/ColdSupplyAndReturnWaterIsPoor";
//实时预警列表（60s调用一次）
hdInterface.selectRealWarnRuleList =
  baseurl + "wisdom/zgsecurity/selectRealWarnRuleList";
//实时故障列表（60s调用一次）
hdInterface.selectRealDeviceFaultList =
  baseurl + "wisdom/zgsecurity/selectRealDeviceFaultList";
//预警次数排名近30天（只调用一次）----------
hdInterface.warnTotal30DayFirstTop5 =
  baseurl + "wisdom/zgsecurity/warnTotal30DayFirstTop5";
//设备状态近30天（只调用一次）
hdInterface.DaysEquipmentStatus30 =
  baseurl + "wisdom/zgsecurity/equipmentStatus30Days";
//运行时长排名近30天（只调用一次）
hdInterface.selectDeviceRunTotal30DayTop5 =
  baseurl + "wisdom/zgsecurity/selectDeviceRunTotal30DayTop5";
//实时预警状态图表（60s调用一次）
hdInterface.realTimeWarningStatus =
  baseurl + "wisdom/zgsecurity/realTimeWarningStatus";

//-----------------安全统计-------------------
//预警统计前5名（只调用一次）
hdInterface.safeWarnTotal30DayFirstTop5 =
  baseurl + "wisdom/zgsafetystatistics/warnTotal30DayFirstTop5";
//预警统计后5名（只调用一次）
hdInterface.safeWarnTotal30DayLastTop5 =
  baseurl + "wisdom/zgsafetystatistics/warnTotal30DayLastTop5";
//设备运行详情近30天（只调用一次）
hdInterface.safe30DayRunList =
  baseurl + "wisdom/zgsafetystatistics/30DayRunList";
//设备运行统计近30天（只调用一次）
hdInterface.safeRunStatisticsForNearly30Days =
  baseurl + "wisdom/zgsafetystatistics/runStatisticsForNearly30Days";
//预警统计近30天（只调用一次）
hdInterface.safeselectWarnTrend30Day =
  baseurl + "wisdom/zgsafetystatistics/selectWarnTrend30Day";
//预警排名近30天（只调用一次）
hdInterface.warnTotal30DayFirstTop5Rate =
  baseurl + "wisdom/zgsafetystatistics/warnTotal30DayFirstTop5Rate";
//预警分析近30天（只调用一次）
hdInterface.safeWarnTotal30Day =
  baseurl + "wisdom/zgsafetystatistics/warnTotal30Day";
//昨日设备状态（只调用一次）
hdInterface.yesterdayEquipmentStatusStatistics =
  baseurl + "wisdom/zgsafetystatistics/yesterdayEquipmentStatusStatistics";
//运行统计近30天（只调用一次）
hdInterface.saferunningStatusStatistics30Day =
  baseurl + "wisdom/zgsafetystatistics/runningStatusStatistics30Day";
//-----------------武清县医院-------------------
//外科楼暖通机房（当日能耗）
hdInterface.selectElectricAndWater =
  baseurl + "wisdom/zgenergysurvey/selectElectricAndWaterDay";
//外科楼暖通机房（当日实时数据统计）
hdInterface.wqchilledWaterSupplyAndReturn =
  baseurl + "wisdom/zghospital/chilledWaterSupplyAndReturn";
//补水箱水位实时监测
hdInterface.selectWaterBoxRealValue =
  baseurl + "wisdom/zghospital/selectWaterBoxRealValue";
//冷冻水实时数据监控
hdInterface.selectWaterAndReturnRealValue =
  baseurl + "wisdom/zghospital/selectWaterAndReturnRealValue";
//设备实时状态监测
hdInterface.deviceRealTimeStatus =
  baseurl + "wisdom/zghospital/deviceRealTimeStatus";

//当日报警记录
hdInterface.deviceFaultRealTimeStatus =
  baseurl + "wisdom/zghospital/deviceFaultRealTimeStatus";
//设备实时概况
hdInterface.deviceAllRealTimeStatus =
  baseurl + "wisdom/zghospital/deviceAllRealTimeStatus";
//外科楼净化系统（近30天报警恢复时间排行）
hdInterface.getRecoveryTimeRankingByDeviceIds =
  baseurl + "wisdom/zghospital/getRecoveryTimeRankingByDeviceIds";
//外科楼净化系统（近30天设备报警分布）
hdInterface.getAlarmDetail = baseurl + "/wisdom/zghospital/getAlarmDetail";
// 净化系统/新风系统
hdInterface.selectDeviceDataByDeviceIds =
  baseurl + "/wisdom/zghospital/selectDeviceDataByDeviceIds";

//-------------------------------------------二期新版接口20201219-------------------------------------------------------------------------------

//-----------------单冷系统、水源系统、锅炉系统 新版copy 2020/12/18-------------------
// 供水温度趋势
hdInterface.chilledWaterSupplyAndReturnCopy =
  baseurl + "wisdom/zgsystemmonitoring/selectInsideTemperatureCurve";
// 系统差值监测
hdInterface.systemDifferenceDetectionCopy =
  baseurl + "/wisdom/zgsystemmonitoring/systemDifferenceDetection";
// 系统实时COP
hdInterface.realSystemCopCopy =
  baseurl + "/wisdom/zgsystemmonitoring/realSystemCop";
// 获取组态图
hdInterface.selectDiagramByIdCopy =
  baseurl + "/wisdom/zgsystemmonitoring/selectDiagramById";
//-----------------节能概况 新版copy 2020/12/18-------------------
// 今日能耗
hdInterface.selectElectricAndWaterTodayCopy =
  baseurl + "/wisdom/zgsystemmonitoring/currentDayEnergy";
//-----------------安全概况 新版copy 2020/12/18-------------------
// 左上角安全信息
hdInterface.safeOverViewCopy = baseurl + "/module/security/safeOverView";
// 供回水温差压差
hdInterface.waterSupplyAndReturnCopy =
  baseurl + "/module/security/systemDifferenceDetection";
// 预警规则 安全评分 设备故障
hdInterface.safeScoreCopy = baseurl + "/module/security/safeScore";
// 当月预警次数排名
hdInterface.warnCountRankCopy = baseurl + "/module/security/warnCountRank";
// 当月故障高发设备TOP5
hdInterface.deviceFaultRankCopy = baseurl + "/module/security/deviceFaultRank";
// 设备距维护剩余天数排行
hdInterface.deviceMaintenanceDayCopy =
  baseurl + "/module/security/deviceMaintenanceDay";
// 系统预警详情
hdInterface.realSystemWarnDetailCopy =
  baseurl + "/module/security/realSystemWarnDetail";
// 设备故障详情
hdInterface.realDeviceFaultDetailCopy =
  baseurl + "/module/security/realDeviceFaultDetail";

//-------------------------------站点驾驶舱 新版 2020/12/19--------------------
//查询安全评分
hdInterface.safeScore = baseurl + "/module/security/safeScore";
//系统预警平均修复时间
hdInterface.systemWarnAvgRecoveryTime =
  baseurl + "/module/security/systemWarnAvgRecoveryTime";
//设备故障平均修复时间
hdInterface.deviceFaultAvgRecoveryTime =
  baseurl + "/module/security/deviceFaultAvgRecoveryTime";
//信号数量统计
hdInterface.plcTemplateStatics =
  baseurl + "/module/security/plcTemplateStatics";
//能耗费用统计
hdInterface.selectEnergyCostStatics =
  baseurl + "/module/energy/selectEnergyCostStatics";
//当日总能耗 当日冷热总能耗
hdInterface.energyStatics = baseurl + "/module/energy/energyStatics";
//当日供回水温度
hdInterface.selectInsideTemperatureCurve =
  baseurl + "/module/energy/selectInsideTemperatureCurve";
//系统COP统计
// hdInterface.realSystemCop=baseurl +"/module/energy/realSystemCop";
hdInterface.selectSiteCopStatics =
  baseurl + "module/energy/selectSiteCopStatics";
//监控覆盖
hdInterface.cameraOverride = baseurl + "/module/camera/cameraOverride";
//室外温湿度
hdInterface.selectTemperatureAndHumidity =
  baseurl + "module/energy/selectTemperatureAndHumidity";
//查询摄像头数据
hdInterface.selectCameraDetailNew =
  baseurl + "module/camera/selectCameraDetail";
// 查询摄像头状态
hdInterface.selectCameraStatus = baseurl + "module/camera/selectCameraStatus";
//系统预警和设备故障详情
hdInterface.selectDeviceFaultAndWarnDetail =
  baseurl + "module/security/selectDeviceFaultAndWarnDetail";
//实时数据
hdInterface.selectPlcTemplateStatusByPlcTypeIds =
  baseurl + "module/security/selectPlcTemplateStatusByPlcTypeIds";

//------------------------------------------节能驾驶舱 新版 2020/12/19------------------------------------------------------------------

//当年节能量
hdInterface.energySavingCurrentYear =
  baseurl + "/module/energy/energySavingCurrentYear";
//某年实际能耗费用详情
hdInterface.currentYearEnergyCostDetails =
  baseurl + "/module/energy/currentYearEnergyCostDetails";
//去年每平米能耗费用
hdInterface.lastYearEverySquareMetreEnergyCost =
  baseurl + "/module/energy/lastYearEverySquareMetreEnergyCost";
//当月节能变化
hdInterface.currentMonthEnergySavingChange =
  baseurl + "/module/energy/currentMonthEnergySavingChange";
//当日能耗变化
hdInterface.currentDayEnergyChange =
  baseurl + "/module/energy/currentDayEnergyChange";
//实时能效分析
hdInterface.realTimeEnergyEfficiencyAnalysis =
  baseurl + "/module/energy/realTimeEnergyEfficiencyAnalysis";

//-------------------------------------------项目页-------------------------------------------------------------------------------------------
//实时安全监控
hdInterface.selectSafetyMonitoring =
  baseurl + "module/project/selectSafetyMonitoring";
//加载项目信息
hdInterface.selectProjectMessage =
  baseurl + "module/project/selectProjectMessage";
//能耗统计
hdInterface.selectEnergyStaticsByProjectId =
  baseurl + "module/project/selectEnergyStaticsByProjectId";

//-----------------单冷系统、水源系统、锅炉系统 新版modul版 2020/12/26-------------------
// 供水温度趋势
hdInterface.chilledWaterSupplyAndReturnModule =
  baseurl + "/module/energy/selectInsideTemperatureCurve";
// 供水温度趋势(县医院)
hdInterface.selectInsideTemperatureCurveHot =
  baseurl + "/module/energy/selectInsideTemperatureCurveHot";
// 系统实时COP
hdInterface.realSystemCopModule =
  baseurl + "/module/energy/selectSystemCopStatics";
// 今日能耗
hdInterface.selectElectricAndWaterTodayModule =
  baseurl + "/module/energy/energyStatics";
// 系统差值监测
hdInterface.systemDifferenceDetectionModule =
  baseurl + "/module/security/systemDifferenceDetection";
// 系统差值监测(县医院)
hdInterface.systemDifferenceDetectionHot =
  baseurl + "/module/security/systemDifferenceDetectionHot";
hdInterface.systemDifferenceDetectionCold =
  baseurl + "/module/security/systemDifferenceDetectionCold";
// 获取组态图
hdInterface.selectDiagramByIdModule =
  baseurl + "/module/security/selectDiagramById";
hdInterface.selectDiagramByIdModulePD =
  baseurlPD + "/module/security/selectDiagramById";
// 当前设备状态
hdInterface.selectDeviceStatusByDeviceIdsModule =
  baseurl + "/module/security/selectDeviceStatusByDeviceIds";

//--------------------------节能统计Moudle 2020/12/26------------------
//能耗总计
hdInterface.AllenergyStaticsModule = baseurl + "/module/energy/energyStatics";
// 能耗总计表格
hdInterface.AllenergyListModule = baseurl + "/module/energy/energyList";
// 能耗均值
hdInterface.energyAvgStaticsModule =
  baseurl + "/module/energy/energyAvgStatics";
//设备耗电排行
hdInterface.deviceElectricRankModule =
  baseurl + "/module/energy/deviceElectricRank";
// 耗电量变化趋势
hdInterface.electricChangeTrendModule =
  baseurl + "/module/energy/electricChangeTrend";
// 机房COP统计
hdInterface.selectSiteCopStaticsModule =
  baseurl + "/module/energy/selectSiteCopStatics";
// 温度变化趋势
hdInterface.temperatureTrendModule =
  baseurl + "/module/energy/temperatureTrend";
// 能耗统计
hdInterface.energyAllSumTrendModule =
  baseurl + "/module/energy/energyAllSumTrend";
// 节能率和节费率趋势
hdInterface.energySavingSectionFeeTrendModule =
  baseurl + "/module/energy/energySavingSectionFeeTrend";

//------------------------------------------安全统计------------------------------------------------------------------------------------------
//预警统计
hdInterface.selectWarnStaticsTrend =
  baseurl + "module/security/selectWarnStaticsTrend";
//信号故障统计TOP5
hdInterface.selectPlcTemplateFaultStatics =
  baseurl + "module/security/selectPlcTemplateFaultStatics";
//平均修复时间分析
hdInterface.selectRecoveryAnalysis =
  baseurl + "module/security/selectRecoveryAnalysis";
//设备故障排行
hdInterface.selectDeviceFaultRank =
  baseurl + "module/security/selectDeviceFaultRank";
//预警统计前5后5
hdInterface.selectSystemWarnStatics =
  baseurl + "module/security/selectSystemWarnStatics";
//系统预警历史记录
hdInterface.selectSystemWarnHistoryDetail =
  baseurl + "module/security/selectSystemWarnHistoryDetail";
//设备故障历史记录
hdInterface.selectDeviceFaultHistoryDetail =
  baseurl + "module/security/selectDeviceFaultHistoryDetail";
//设备运行详情
hdInterface.selectDeviceRunDetail =
  baseurl + "module/security/selectDeviceRunDetail";
//需要保养设备数量
hdInterface.selectDeviceMaintenanceStatics =
  baseurl + "module/security/selectDeviceMaintenanceStatics";
//查询室内温度实时值
hdInterface.selectIndoorTemperature =
  baseurl + "/module/security/selectIndoorTemperature";
//设备冷热总能耗
hdInterface.selectHotColdTotalEnergyConsumptionByDeviceIds =
  baseurl + "/module/security/selectEndPlcValueByDeviceIds";
//查询集分水器温度实时值 根据id
hdInterface.selectTemperatureDeviceWaterSegregate =
  baseurl + "/module/security/selectEndPlcValueByDeviceIds";

//------------------------------------------安全驾驶舱 2021/01/06------------------------------------------------------------------------------------------
// 当前报警详情
hdInterface.realAlarmDetailModule =
  baseurl + "/module/security/realAlarmDetail";

// ------------------------------------------安全统计module 2021/01/20------------------------------------------------------------------------------------------
// 报警类型统计
hdInterface.selectAlarmRuleStaticsModule =
  baseurl + "/module/security/selectAlarmRuleStatics";
// 设备、信号、离线报警统计
hdInterface.selectAlarmCountStaticsModule =
  baseurl + "/module/security/selectAlarmCountStatics";
// 超过设备使用寿命详情
hdInterface.selectOverLoadDeviceDetailModule =
  baseurl + "/module/security/selectOverLoadDeviceDetail";

// ------------------------------------------公共模块module 2021/01/20------------------------------------------------------------------------------------------
// 项目和机房
hdInterface.selectSiteNameAndProjectNameBySiteIdModule =
  baseurl + "/module/common/selectSiteNameAndProjectNameBySiteId";
// 组态图设备状态(站点概况/组态图页)
hdInterface.selectDeviceStatusByDeviceIdsModuleCopy =
  baseurl + "/module/security/selectDeviceStatusByDeviceIds";
// 组态图信号状态
hdInterface.selectPlcTemplateStatusByPlcTypeIdsModule =
  baseurl + "/module/security/selectPlcTemplateStatusByPlcTypeIds";

//------------------------------------国际企业 2021/01/25----------------------------------
// 末端设备列表
hdInterface.selectEndDeviceRealList =
  baseurl + "/module/end/selectEndDeviceRealList";
// 天气查询
hdInterface.selectTemperatureAndHumidityCopy =
  baseurl + "/module/energy/selectTemperatureAndHumidity";
// 开关接口
hdInterface.endSwitch = baseurl + "/module/end/endSwitch";

// ----------------------------------------2021/01/29------------------------------
//报警平均修复时间分析
hdInterface.selectDeviceRecoveryAnalysis =
  baseurl + "/module/security/selectDeviceRecoveryAnalysis";
// 机房安全评分
hdInterface.selectSafeScoreNew =
  baseurl + "/module/security/selectSafeScoreNew";
// 当前设备报警详情
hdInterface.selectDeviceFaultDetail =
  baseurl + "/module/security/selectDeviceFaultDetail";
// 系统预警详情
hdInterface.realSystemWarnDetail =
  baseurl + "/module/security/realSystemWarnDetail";
// 设备统计状态
hdInterface.selectDeviceCountStatics =
  baseurl + "/module/security/selectDeviceCountStatics";

// ---------------------------华德广场 2021/03/10 -------------------------------------
/* ----------------------------  站点概况  -----------------------------*/
// 环境安防监测
hdInterface.environmentalSecurity =
  baseurlPD + "/electricSecurity/environmentalSecurity";
// 设备监测
hdInterface.equipmentMonitoring =
  baseurlPD + "/electricSecurity/equipmentMonitoring";
// 电能利用效率
hdInterface.energyEfficiency = baseurlPD + "/analysis/energyEfficiency";
// 当日负荷曲线
hdInterface.dailyLoad = baseurlPD + "/analysis/dailyLoad";
// 配电室铭牌
hdInterface.electricRoom = baseurlPD + "/basicInfo/electricRoom";
// 当日总能耗
hdInterface.ImvEnergyConsumptionData =
  baseurlPD + "/analysis/ImvEnergyConsumptionData";
// 当日耗电前5名
hdInterface.analysisTopFive = baseurlPD + "/analysis/top5";
// 当前报警汇总
hdInterface.alarmRecord = baseurlPD + "/electricSecurity/alarmRecord";
// U3D接口
hdInterface.getDeviceInfoCopy = baseurlPD + "/electric/u3d/getDeviceInfo";
hdInterface.getEnvironmentalMonitoring =
  baseurlPD + "/electric/u3d/getEnvironmentalMonitoring";
hdInterface.sensorU3d = baseurl + "/electric/u3d/sensorU3d";
hdInterface.sensorU3dPD = baseurlPD + "/electric/u3d/sensorU3d";
hdInterface.selectSafetyMonitoringPD =
  baseurlPD + "module/project/selectSafetyMonitoring";
// 耗电量趋势（近7天）
hdInterface.selectNearSevenElectric =
  baseurl + "/analysis/selectNearSevenElectric";

// 设备监测新
hdInterface.environmentalSecurityNew =
  baseurlPD + "/electricSecurity/environmentalSecurityNew";
// 断路器控制
hdInterface.circuitBreakerStatus =
  baseurlPD + "/basicInfo/circuitBreakerStatus";
// 验证密码
hdInterface.passwordAuthentication =
  baseurlPD + "/basicInfo/passwordAuthentication";
// 分合闸控制
hdInterface.openAndClosingGate = baseurlPD + "/basicInfo/openAndClosingGate";
hdInterface.single = baseurlPD + "/hdCommand/single";
// 启停状态
hdInterface.getplcTempId = baseurlPD + "/basicInfo/getplcTempId";
// 启停控制
hdInterface.startEndControl = baseurlPD + "/basicInfo/control";
hdInterface.okssGhg = baseurlPD + "/hdCommand/okssGhg";
// 计量屏数据
hdInterface.getCabinetInfo = baseurl + "/electric/u3d/getCabinetInfo";
/*--------------------------------- 配电室组态图 ---------------------------*/
// 低压主进线三相电压趋势图
hdInterface.imvThreeVoltage = baseurlPD + "/analysis/imvThreeVoltage";
// 电路状态
hdInterface.circuitStatus = baseurlPD + "/analysis/circuitStatus";
// 配电室总电力监测
hdInterface.totalPowerDetection = baseurlPD + "/analysis/totalPowerDetection";
/*----------------------------------- 安全统计 ----------------------------*/
// 报警原因前5名 报警原因后5名
hdInterface.selectAlarmTop = baseurlPD + "/electricSecurity/selectAlarmTop";
// 设备报警统计
hdInterface.selectPlcTop = baseurlPD + "/electricSecurity/selectPlcTop";
// 环境最大温度趋势
hdInterface.maxAmbientTemperature =
  baseurlPD + "/analysis/maxAmbientTemperature";
// 环境最大湿度趋势
hdInterface.maxAmbientHumidity = baseurlPD + "/analysis/maxAmbientHumidity";
// 环境最大湿度趋势
hdInterface.maxDeviceTemperature = baseurlPD + "/analysis/maxDeviceTemperature";
// 报警统计列表
hdInterface.selectAlarmList = baseurlPD + "/electricSecurity/selectAlarmList";
/*-------------------------------------- 安全概况 ----------------------*/
// 平台安全运行时间
hdInterface.securityInfo = baseurlPD + "/electricSecurity/securityInfo";
// 近30天平均修复时间
hdInterface.alarmTimeToRepair =
  baseurlPD + "/electricSecurity/alarmTimeToRepair";
/*----------------------------------------- 重点设备监测 -------------------------*/
// 回路开关状态监测
hdInterface.circuitSwitchStatus =
  baseurlPD + "/electricSecurity/circuitSwitchStatus";
// 重点设备状态监测
hdInterface.selectImvKeyEquipment =
  baseurlPD + "/electricSecurity/selectImvKeyEquipment";
// 变压器监控基础数据
hdInterface.imvTransformerParameter =
  baseurlPD + "/analysis/imvTransformerParameter";
// 变压器监控图表
hdInterface.selectTransformerChart =
  baseurlPD + "/analysis/selectTransformerChart";
/* ----------------------------------------电力数据监测---------------------------- */
// 回路电力检测设备id获取
hdInterface.getDeviceInfo = baseurlPD + "/analysis/getDeviceInfo";
// 回路电力检测
hdInterface.loopPowerDetection = baseurlPD + "/analysis/loopPowerDetection";
/* ---------------------------------------能耗分析------------------------------- */
// 分系统耗电概览
hdInterface.selectPowerConsumption =
  baseurlPD + "/analysis/selectPowerConsumption";
// 变压器无功功率 功率因数曲线
hdInterface.transformerUnPower = baseurlPD + "/analysis/transformerUnPower";
// 电能集抄
hdInterface.energyCentralizedReading =
  baseurlPD + "/analysis/energyCentralizedReading";
// 当月用电时段统计 当月分时段电费统计
hdInterface.selectImvElectricityStatistics =
  baseurlPD + "/analysis/selectImvElectricityStatistics";
// 当月最大负荷趋势图
hdInterface.selectCurrentMonthMaxLoad =
  baseurlPD + "/analysis/selectCurrentMonthMaxLoad";
// 最大需量
hdInterface.selectMaximum = baseurlPD + "/analysis/selectMaximum";
/* ---------------------------------------华德广场项目总览--------------------------------------- */
//项目安全
hdInterface.projectSecurity = baseurlPD + "/basicInfo/projectSecurity";
/* ---------------------------------------华德监控-------------------------------------------- */
// 海康监控
hdInterface.getHttpUrls = baseurl + "/module/camera/getHttpUrls";
/* ---------------------------------------- 华德展厅 ------------------------------------- */
//近7天历史预警记录
hdInterface.selectWarnHistory = baseurl2 + "exhibitionHall/selectWarnHistory";
//实时室内温度变化 实时室内湿度变化 实时室内PM2.5变化
hdInterface.selectRealEnvironment =
  baseurl2 + "exhibitionHall/selectRealEnvironment";
// 近7天室外温度变化
hdInterface.weatherHistory = baseurl2 + "ih/weatherHistory";
//近7天室内温度变化
hdInterface.selectInTemperatureHistory =
  baseurl2 + "exhibitionHall/selectInTemperatureHistory";
// 近7天室内温度变化
hdInterface.selectOutTemperatureHistory =
  baseurl2 + "exhibitionHall/selectOutTemperatureHistory";
//近7天室内人体舒适度分布
hdInterface.selectComfortHistory =
  baseurl2 + "exhibitionHall/selectComfortHistory";
//时间天气
hdInterface.selectRealWeather = baseurl2 + "exhibitionHall/selectRealWeather";
//控制提交【全部】
hdInterface.control = baseurl2 + "ih/control";
//控制提交【灯】
hdInterface.controlLight = baseurl2 + "ih/controlLight";
//控制提交【风机管】
hdInterface.controlFanCoilUnit = baseurl2 + "ih/controlFanCoilUnit";
//控制提交【模式设置】
hdInterface.switchingMode = baseurl2 + "ih/switchingMode";

/* -------------------------------- 光合谷末端 ---------------------------- */
hdInterface.selectEndInsideAndOutsideTemperatureCurve =
  baseurl + "/module/security/selectEndInsideAndOutsideTemperatureCurve";

hdInterface.selectEndHotelPlcValueByDeviceIds =
  baseurl + "/module/security/selectEndHotelPlcValueByDeviceIds";

hdInterface.selectEndSalesCenterPlcValueByDeviceIds =
  baseurl + "/module/security/selectEndSalesCenterPlcValueByDeviceIds";

hdInterface.selectEndPlcValueByDeviceIds =
  baseurl + "/module/security/selectEndPlcValueByDeviceIds";

hdInterface.selectEndPlotPlcValueByDeviceIds =
  baseurl + "module/security/selectEndPlotPlcValueByDeviceIds";

hdInterface.selectEndTheMonitorPlcValueByDeviceIds =
  baseurl + "module/security/selectEndTheMonitorPlcValueByDeviceIds";

hdInterface.selectEndTheMonitorNearly30DaysHeatValues =
  baseurl + "module/security/selectEndTheMonitorNearly30DaysHeatValues";
/* ------------------------------ 设备清单 -------------------------- */

hdInterface.deviceEquipmentList = baseurl + "/business/device/list";
hdInterface.sensorDeviceList = baseurl + "/business/device/sensorDeviceList";

/* ------------------------------- A7楼 ------------------------------ */
hdInterface.queryDevicePlcTemplateInfo =
  baseurl + "/module/security/queryDevicePlcTemplateInfo";
hdInterface.controlPointMultiple =
  baseurl + "/module/security/controlPointMultiple";
hdInterface.multiple = baseurl + "/hdCommand/multiple";
hdInterface.automaticCruiserRecord =
  baseurl + "/business/automaticCruiserRecord/add";
/* ------------------------------- 静海区政府 --------------------------- */
hdInterface.selectAlarmCount = baseurl + "/electricSecurity/selectAlarmCount";
hdInterface.selectSiteElectricSituationList =
  baseurl + "/electric/u3d/selectSiteElectricSituationList";

/* -------------------------------- 华德广场和中心装配项目总览 ---------------------------- */
//  项目能耗
hdInterface.selectEnergyStaticsDetailByProjectId =
  baseurl + "/module/project/selectEnergyStaticsDetailByProjectId";
// 设备概况
hdInterface.selectProjectDeviceCountStatics =
  baseurl + "/module/security/selectProjectDeviceCountStatics";
// 预警报警规则
hdInterface.selectAlarmRuleCountByProjectId =
  baseurl + "/module/security/selectAlarmRuleCountByProjectId";
// 预警报警
hdInterface.alarmProjectNoticeList =
  baseurl + "/module/notice/alarmProjectNoticeList";

/* -------------------------------- 城建学院项目总览 ---------------------------- */
//  项目能耗
hdInterface.selectEnergyByTimeZone =
  baseurl + "/cj/project/selectEnergyByTimeZone";
//  传感器数据
hdInterface.sensorDeviceList = baseurl + "/business/device/sensorDeviceList";
//	实时状态监测
hdInterface.selectSafetyMonitoringCJ =
  baseurl + "/cj/project/selectSafetyMonitoring";
// U3D
hdInterface.selectDeviceStatusByProjectId =
  baseurl + "/cj/project/selectDeviceStatusByProjectId";
//	项目数据信息
hdInterface.selectProjectMessageCJ =
  baseurl + "/module/project/selectProjectMessage";

/* -------------------------------- 城建学院主楼 ---------------------------- */
// 主楼当日能耗 / 流量
hdInterface.cjEnergyStatics = baseurl + "module/cj/cjEnergyStatics";
// 主楼暖气状况监测
hdInterface.cjHeatingStatus = baseurl + "module/cj/cjHeatingStatus";
// 主楼实时室内温度监测
hdInterface.cjIndoorTemperature = baseurl + "module/cj/cjIndoorTemperature";
// 当日城建主楼室内外温度趋势
hdInterface.cjInAndOutTemperatureCurve =
  baseurl + "module/cj/cjInAndOutTemperatureCurve";
// 当日主楼耗电设备
hdInterface.cjtDeviceEleEnergyRank =
  baseurl + "module/cj/cjtDeviceEleEnergyRank";
// 当月城建主楼电、水能耗
hdInterface.cjEnergyCurrentMonthCurve =
  baseurl + "module/cj/cjEnergyCurrentMonthCurve";
/* -------------------------------- 城建学院能源概况 ---------------------------- */
//当月设备耗电排行
hdInterface.deviceElectricRank =
  baseurl + "module/cj/CampusEnergy/deviceElectricRank";
// 2022年部分教学楼水电统计
hdInterface.buildingEnergyCost =
  baseurl + "module/cj/CampusEnergy/buildingEnergyCost";
//当月能耗统计(趋势图)：
hdInterface.currentMonthEnergyChange =
  baseurl + "module/cj/CampusEnergy/currentMonthEnergyChange";
//室外温湿度
hdInterface.selectTemperatureAndHumidityBySiteId =
  baseurl + "module/cj/CampusEnergy/selectTemperatureAndHumidityBySiteId";
//当年总能耗
hdInterface.currentYearEnergyCost =
  baseurl + "module/cj/CampusEnergy/currentYearEnergyCost";
//当日能耗统计
hdInterface.currentDayEnergyStatics =
  baseurl + "module/cj/CampusEnergy/currentDayEnergyStatics";
/* -------------------------------- 城建学院太阳能发电 ---------------------------- */
// 太阳能热水器基础数据
hdInterface.basicDataOfSolarWater = baseurl + "module/cj/basicDataOfSolarWater";
// 太阳能热水器节能降碳
hdInterface.energySavingCarbonReduction =
  baseurl + "module/cj/energySavingCarbonReduction";
// 太阳能热水器当日储水温度
hdInterface.crsxTemperatureCurrentDayCurve =
  baseurl + "module/cj/crsxTemperatureCurrentDayCurve";
// 太阳能热水器当日进出水温度
hdInterface.jcsTemperatureCurrentDayCurve =
  baseurl + "module/cj/jcsTemperatureCurrentDayCurve";
/* -------------------------------- 城建学院学院报警 ---------------------------- */
//平台运行时间，当月阻止事故次数，累计发出报警次数
hdInterface.statisticsWranning =
  baseurl + "module/cj/CampusAlarm/alarm/statistics";
//实时主教学楼暖气检测
hdInterface.heatingDetection =
  baseurl + "module/cj/CampusAlarm/alarm/heatingDetection";
//当日校园用水量检测
hdInterface.currentDayWaterCost =
  baseurl + "module/cj/CampusAlarm/currentDayWaterCost";
//报警排行
hdInterface.alarmRank = baseurl + "module/cj/CampusAlarm/alarmRank";
//实时回水温度检测
hdInterface.selectHeatingResult =
  baseurl + "module/cj/CampusAlarm/selectHeatingResult";
// 离线报警次数, 井盖报警次数
hdInterface.alarmTimes = baseurl + "module/cj/CampusAlarm/alarmTimes";
// 报警时间和原因
hdInterface.realAlarmDetailWarnning =
  baseurl + "module/security/realAlarmDetail";
/* -------------------------------- 城建学院风力发电---------------------------- */
// 环境监测
hdInterface.selectWeatherBySiteId =
  baseurl + "wisdom/common/selectWeatherBySiteId";
//总耗能
hdInterface.currentYearEnergyCost =
  baseurl + "module/cj/CampusEnergy/currentYearEnergyCost";
/* -------------------------------- 城建学院光伏发电---------------------------- */
// 当日蓄电池电压
hdInterface.selectBatteryVoltageByCurrentDay =
  baseurl + "module/cj/photovoltaic/selectBatteryVoltageByCurrentDay";
// 当日逆变器输入输出电压
hdInterface.selectInputOutVoltageByCurrentDay =
  baseurl + "module/cj/photovoltaic/selectInputOutVoltageByCurrentDay";
// 当日逆变器输入输出电流
hdInterface.selectInputOutCurrentByCurrentDay =
  baseurl + "module/cj/photovoltaic/selectInputOutCurrentByCurrentDay";
