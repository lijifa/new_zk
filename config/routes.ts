const routes = [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: 'JQuery',
    path: '/jquery/:id',
    component: './JQuery',
  },
  {
    name: 'JQuery2',
    path: '/jquery/:id/:childId',
    component: './JQuery/topMenuPage',
  },
  {
    name: ' 菜单一',
    path: '/menuPage/menu1',
    component: './MenuPage/Menu1',
  },
  {
    name: ' 菜单二',
    path: '/menuPage/menu2',
    component: './MenuPage/Menu2',
  },
  {
    name: ' 菜单三',
    path: '/menuPage/menu3',
    component: './MenuPage/Menu3',
  },
  {
    name: '原智观',
    path: '/jquery',
    component: './JQuery',
  },

  /*
   *  运行实况
   */
  /* 能源站监测================ */
  // 暖通组态看板
  {
    name: '暖通组态看板',
    path: '/hvacDiagramPanel',
    component: './RunningFacts/EnergyStationMonitoring/HvacDiagramPanel',
  },
  // 暖通数据看板
  {
    name: '暖通数据看板',
    path: '/hvacDataPanel',
    component: './RunningFacts/EnergyStationMonitoring/HvacDataPanel',
  },
  //企业注册
  {
    name: '企业注册',
    path: '/companyreg',
    component: './CompanyReg',
    layout: false,
  },
  //忘记密码
  {
    name: '忘记密码',
    path: '/forgetpwd',
    component: './ForgetPwd',
    layout: false,
  },
  //智控用户协议
  {
    name: '智控用户协议',
    path: '/statement',
    component: './Statement',
    layout: false,
  },
  //变压器状态监测
  {
    name: '变压器状态监测',
    path: '/transformerPanel',
    component: './RunningFacts/ElectricStationMonitoring/TransformerPanel',
  },
  //暖通运维看板
  {
    name: '暖通运维看板',
    path: '/hvacMaintenancePanel',
    component: './RunningFacts/MaintenancePanel/HvacMaintenancePanel',
  },
  //电力运维看板
  {
    name: '电力运维看板',
    path: '/electricMaintenancePanel',
    component: './RunningFacts/MaintenancePanel/ElectricMaintenancePanel',
  },
  //经济运行分析
  {
    name: '经济运行分析',
    path: '/distributing',
    component: './StatisticalAnalysis/PowerConsumption/Distributing',
  },
  //变配站耗电分析
  {
    name: '变配站耗电分析',
    path: '/consumption',
    component: './StatisticalAnalysis/PowerConsumption/consumption',
  },
  //耗电同比分析
  {
    name: '耗电同比分析',
    path: '/Powerconsumption',
    component: './StatisticalAnalysis/PowerConsumption/Powerconsumption',
  },
  //耗电环比分析
  {
    name: '耗电环比分析',
    path: '/relativeratio',
    component: './StatisticalAnalysis/PowerConsumption/Relativeratio',
  },
  //平均功率因数
  {
    name: '平均功率因数',
    path: '/averagepower',
    component: './StatisticalAnalysis/PowerConsumption/AveragePower',
  },
  //分项耗电分析
  {
    name: '分项耗电分析',
    path: '/eledeviceenergyandcostlist',
    component:
      './StatisticalAnalysis/PowerConsumption/eleDeviceEnergyAndCostList',
  },
  //电能质量分析
  {
    name: '电能质量分析',
    path: '/powerquality',
    component: './StatisticalAnalysis/PowerConsumption/PowerQuality',
  },
  //项目维护
  {
    name: '项目维护',
    path: '/project',
    component: './SystemConfig/ProjectSettings/Project',
  },
  //站点维护
  {
    name: '站点维护',
    path: '/site',
    component: './SystemConfig/ProjectSettings/Site',
  },
  //电费单价维护
  {
    name: '电费单价维护',
    path: '/powerRate',
    component: './SystemConfig/CostsSettings/PowerRate',
  },
  //水费费单价维护
  {
    name: '水费单价维护',
    path: '/waterRate',
    component: './SystemConfig/CostsSettings/WaterRate',
  },
  //地热单价维护
  {
    name: '地热单价维护',
    path: '/heatRate',
    component: './SystemConfig/CostsSettings/HeatRate',
  },
  //燃气单价维护
  {
    name: '燃气单价维护',
    path: '/gasRate',
    component: './SystemConfig/CostsSettings/GasRate',
  },
  //告警规则配置
  {
    name: '告警规则配置',
    path: '/alarmRulesSet',
    component: './SystemConfig/MonitoringSetiing/AlarmRulesSet',
  },
  //消息通知
  {
    name: '消息通知',
    path: '/notification',
    component: './SystemConfig/NotificationManager/Notification',
  },
  //操作日志
  {
    name: '操作日志',
    path: '/logs',
    component: './SystemConfig/LogManagement/Logs',
  },

  /* 断路器监测================ */
  // 断路器看板
  // {
  //   name: '断路器看板',
  //   path: '/switchDiagramPanel',
  //   component: './RunningFacts/ElectricStationMonitoring/SwitchDiagramPanel',
  // },

  /* 变配站监测================ */
  // 电力组态看板
  {
    name: '电力组态看板',
    path: '/electricDiagramPanel',
    component: './RunningFacts/ElectricStationMonitoring/ElectricDiagramPanel',
  },
  // 电力数据看板
  {
    name: '电力数据看板',
    path: '/electricDataPanel',
    component: './RunningFacts/ElectricStationMonitoring/ElectricDataPanel',
  },
  // 变压器状态监测
  {
    name: '变压器状态监测',
    path: '/transformerPanel',
    component: './RunningFacts/ElectricStationMonitoring/TransformerPanel',
  },

  /* 实景监控================【LiveMonitoring】 */
  // 影像监控
  {
    name: '影像监控',
    path: '/videoSformerPanel',
    component: './RunningFacts/LiveMonitoring/VideoSurveillance',
  },

  /* 运维看板================ 【MaintenancePanel】*/
  // 暖通运维看板【HvacMaintenancePanel】
  {
    name: '暖通运维看板',
    path: '/hvacMaintenancePanel',
    component: './RunningFacts/MaintenancePanel/HvacMaintenancePanel',
  },
  // 电力运维看板
  {
    name: '电力运维看板',
    path: '/electricMaintenancePanel',
    component: './RunningFacts/MaintenancePanel/ElectricMaintenancePanel',
  },

  /*
   *  统计分析
   */
  /* 暖通能耗================ */
  // 系统运行分析
  {
    name: '系统运行分析',
    path: '/systemOperation',
    component: './StatisticalAnalysis/EnergyConsumption/SystemOperation',
  },
  // 能源站耗能统计
  {
    name: '能源站耗能统计',
    path: '/energyConsumption',
    component: './StatisticalAnalysis/EnergyConsumption/EnergyConsumption',
  },
  // 用户舒适度分析
  {
    name: '用户舒适度分析',
    path: '/userComfort',
    component: './StatisticalAnalysis/EnergyConsumption/UserComfort',
  },
  // 设备耗电分析
  {
    name: '设备耗电分析',
    path: '/powerequipment',
    component: './StatisticalAnalysis/EnergyConsumption/PowerEquipment',
  },
  // 能效分析
  {
    name: '能效分析',
    path: '/efficiencyAnalysis',
    component: './StatisticalAnalysis/EnergyConsumption/EfficiencyAnalysis',
  },

  /*
   *  系统配置
   */
  /* 用户设置================ */
  // 公司信息
  {
    name: '公司信息',
    path: '/companyInfo',
    component: './SystemConfig/UserSetting/CompanyInfo',
  },
  // 用户审核
  {
    name: '用户审核',
    path: '/userCheck',
    component: './SystemConfig/UserSetting/userCheck',
  },
  // 用户审核
  {
    name: '用户管理',
    path: '/userManage',
    component: './SystemConfig/UserSetting/userManage',
  },
  // 部分维护
  {
    name: '部分维护',
    path: '/department',
    component: './SystemConfig/UserSetting/Department',
  },
  // 岗位维护
  {
    name: '岗位维护',
    path: '/jobs',
    component: './SystemConfig/UserSetting/Jobs',
  },
  // 角色管理
  {
    name: '角色管理',
    path: '/role',
    component: './SystemConfig/UserSetting/Role',
  },

  /* 组态配置================ */
  // 暖通组态配置
  {
    name: '暖通组态配置',
    path: '/hvacDiagramSet',
    component: './SystemConfig/DiagramSet/HvacDiagramSet',
  },
  // 配电组态配置
  {
    name: '暖通组态配置',
    path: '/electricDiagramSet',
    component: './SystemConfig/DiagramSet/ElectricDiagramSet',
  },
  // 暖通组态配置
  {
    name: '暖通组态配置',
    path: '/hvacPanelSet',
    component: './SystemConfig/DiagramSet/HvacPanelSet',
  },
  // 配电组态配置
  {
    name: '配电组态配置',
    path: '/electricPanelSet',
    component: './SystemConfig/DiagramSet/ElectricPanelSet',
  },

  /* 调试配置================ */
  // 网关配置
  {
    name: '网关配置',
    path: '/gatewaySet',
    component: './SystemConfig/DebugSet/GatewaySet',
  },
  // 信号配置
  {
    name: '信号配置',
    path: '/signalSet',
    component: './SystemConfig/DebugSet/SignalSet',
  },
  // 设备绑定信号
  {
    name: '设备绑定信号',
    path: '/signalBinding',
    component: './SystemConfig/DebugSet/SignalBinding',
  },
  // 设备绑定传感器
  {
    name: '设备绑定传感器',
    path: '/sensorBinding',
    component: './SystemConfig/DebugSet/SensorBinding',
  },
  // 抄表参数配置
  {
    name: '抄表参数配置',
    path: '/meterParamSet',
    component: './SystemConfig/DebugSet/MeterParamSet',
  },

  /*
   *  异常模块路由
   */
  {
    name: '404',
    path: '*',
    component: './404',
  },
  {
    name: '404',
    path: '/jquery/',
    component: './404',
  },
];
export default routes;
