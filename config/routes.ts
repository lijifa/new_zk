const routes = [
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    name:'企业注册',
    path:'/companyReg',
    component:'./CompanyReg'
  },
  {
    name:'忘记密码',
    path:'/forgetPwd',
    component:'./ForgetPwd'
  },
  {
    name:'变压器状态监测',
    path:'/transformerPanel',
    component:'./TransformerPanel'
  },
  {
    name:'暖通运维看板',
    path:'/hvacMaintenancePanel',
    component:'./HvacMaintenancePanel'
  },
  {
    name:'电力运维看板',
    path:'/electricMaintenancePane',
    component:'./ElectricMaintenancePane'
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
