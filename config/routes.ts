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
    name: '权限演示',
    path: '/access',
    component: './Access',
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
