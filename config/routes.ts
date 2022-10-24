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
  {
    name: '暖通数据看板',
    path: '/hvacDataPanel',
    component: '@/pages/HvacDataPanel',
  },
  {
    name: '电力数据看板',
    path: '/powerDataPanel',
    component: '@/pages/PowerDataPanel',
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
