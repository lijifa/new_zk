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
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
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
    path: '/companyReg',
    component: './RunningFacts/CompanyReg',
  },
  //忘记密码
  {
    name: '忘记密码',
    path: '/forgetPwd',
    component: './RunningFacts/ForgetPwd',
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
   component: './StatisticalAnalysis/PowerConsumption/eleDeviceEnergyAndCostList',
  },
    //电能质量分析
  {
   name: '电能质量分析',
   path: '/powerquality',
   component: './StatisticalAnalysis/PowerConsumption/PowerQuality',
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
    path: '/videoSurveillance',
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
    path: '/System_operation',
    component: './StatisticalAnalysis/EnergyConsumption/System_operation',
  },
  // 能源站耗能统计
  {
    name: '能源站耗能统计',
    path: '/Energy_consumption',
    component: './StatisticalAnalysis/EnergyConsumption/Energy_consumption',
  },
  // 用户舒适度分析
  {
    name: '用户舒适度分析',
    path: '/User_comfort',
    component: './StatisticalAnalysis/EnergyConsumption/User_comfort',
  },
  // 设备耗电分析
  {
    name: '设备耗电分析',
    path: '/Power_equipment',
    component: './StatisticalAnalysis/EnergyConsumption/Power_equipment',
  },
  // 能效分析
  {
    name: '能效分析',
    path: '/Efficiency_analysis',
    component: './StatisticalAnalysis/EnergyConsumption/Efficiency_analysis',
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
