// 菜单和导航标签交互操作
import { useState, useCallback } from 'react';
import { getStorageItems, setStorageItems } from '@/utils/storageTool';
import { menuflat, getFirstMenuItem, zkMenuFormat } from '@/utils/format';
import { getMenuData } from '@/services/zg-base/login';

// 单个菜单项的数据类型
interface menuItemType {
  iframeUrl?: string | undefined;
  menuId: string;
  menuPid: string;
  menuName: string;
  menuRelation: string[];
  url?: string;
  routePath?: string;
  menuType?: string
}

// 单个标签项的数据类型
interface tagDataType {
  key: string;
  label: string;
  path: string;
}

export default () => {
  const [menuLv1Id, setMenuLv1Id] = useState(0);
  const [menuApiData, setMenuApiData] = useState<any>([]);
  const [menuItem, setMenuItem] = useState<menuItemType>({
    menuId: '',
    menuPid: '',
    menuName: '',
    menuRelation: [],
    url: '',
    routePath: '',
    menuType: '',
  });

  const [tags, setTags] = useState<tagDataType[]>([]);

  // 添加标签
  const addTag = (tagData: tagDataType) => {
    console.log('-----------addTag-------------');
    console.log(tagData);
    tags.push(tagData);
    setTags(tags);
  };

  // 删除标签
  const removeTag = (id: string) => {
    console.log('-----------removeTag-------------');
    console.log(id);
    tags.splice(
      tags.findIndex((item) => item.key === id),
      1,
    );
    setTags(tags);
  };

  // 获取初始的第一个菜单数据
  const getFirstItem = useCallback((mData: any) => {
    if (!mData || typeof mData !== 'object') {
      return;
    }

    let res = getFirstMenuItem(mData);
    setMenuItem(res);
  }, []);



  
  // 获取当前用户所有菜单
  const updateMenuApiData = async (mfrsId: number, pathname = '') => {
    let res = await getMenuData(mfrsId);
    // 缓存请求过来的菜单原始数据

    //智控菜单数据
    let zk_menu_data = [
      {
          "ancestors": ",4001",
          "children": [
              {
                  "ancestors": ",4001,5692",
                  "children": [
                      {
                          "ancestors": ",4001,5692,5376",
                          "children": [],
                          "createTime": 1595201032000,
                          "icon": "",
                          "menuId": 5377,
                          "menuName": "暖通组态看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5376,
                          "perms": "business:heatboardDiagraw:view",
                          "url": "/hvacDiagramPanel"
                      },
                      {
                          "ancestors": ",4001,5692,5376",
                          "children": [],
                          "createTime": 1651134592000,
                          "icon": "",
                          "menuId": 5696,
                          "menuName": "暖通数据看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5376,
                          "perms": "business:heatboarddata:view",
                          "url": "/hvacDataPanel"
                      }
                  ],
                  "createTime": 1595200316000,
                  "icon": "fa fa-bar-chart",
                  "menuId": 5376,
                  "menuName": "能源站监测",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "1",
                  "params": {},
                  "parentId": 5692,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5692",
                  "children": [
                      {
                          "ancestors": ",4001,5692,5693",
                          "children": [],
                          "createTime": 1625736356000,
                          "icon": "",
                          "menuId": 5461,
                          "menuName": "电力组态看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5693,
                          "perms": "business:electricBoardDiagraw:view",
                          "url": "/electricDiagramPanel"
                      },
                      {
                          "ancestors": ",4001,5692,5693",
                          "children": [],
                          "createTime": 1651134646000,
                          "icon": "",
                          "menuId": 5697,
                          "menuName": "电力数据看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5693,
                          "perms": "business:electricBoardData:view",
                          "url": "/electricDataPanel"
                      },
                      {
                          "ancestors": ",4001,5692,5693",
                          "children": [],
                          "createTime": 1651134675000,
                          "icon": "",
                          "menuId": 5698,
                          "menuName": "电力能耗看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5693,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5692,5693",
                          "children": [],
                          "createTime": 1651134710000,
                          "icon": "",
                          "menuId": 5699,
                          "menuName": "变压器状态检测",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5693,
                          "perms": "business:transformerMonitor:view",
                          "url": "/business/transformerMonitor"
                      }
                  ],
                  "createTime": 1651134139000,
                  "icon": "fa fa-line-chart",
                  "menuId": 5693,
                  "menuName": "变配站监测",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "2",
                  "params": {},
                  "parentId": 5692,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5692",
                  "children": [
                      {
                          "ancestors": ",4001,5692,5694",
                          "children": [],
                          "createTime": 1590517728000,
                          "icon": "",
                          "menuId": 5465,
                          "menuName": "影像监控",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5694,
                          "perms": "business:camera:view",
                          "url": "/business/camera"
                      }
                  ],
                  "createTime": 1651134390000,
                  "icon": "fa fa-film",
                  "menuId": 5694,
                  "menuName": "实景监控",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "3",
                  "params": {},
                  "parentId": 5692,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5692",
                  "children": [
                      {
                          "ancestors": ",4001,5692,5695",
                          "children": [],
                          "createTime": 1651134788000,
                          "icon": "",
                          "menuId": 5701,
                          "menuName": "暖通运维看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5695,
                          "perms": "business:heatOperatBoard:view",
                          "url": "/business/heatOperatBoard"
                      },
                      {
                          "ancestors": ",4001,5692,5695",
                          "children": [],
                          "createTime": 1651134808000,
                          "icon": "",
                          "menuId": 5702,
                          "menuName": "电力运维看板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5695,
                          "perms": "business:electricOperatBoard:view",
                          "url": "/business/electricOperatBoard"
                      }
                  ],
                  "createTime": 1651134414000,
                  "icon": "fa fa-tv",
                  "menuId": 5695,
                  "menuName": "运维看板",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "4",
                  "params": {},
                  "parentId": 5692,
                  "perms": "",
                  "url": "#"
              }
          ],
          "createTime": 1651133677000,
          "icon": "fa fa-bank",
          "menuId": 5692,
          "menuName": "运行实况",
          "menuRank": 1,
          "menuType": "M",
          "orderNum": "1",
          "params": {},
          "parentId": 4001,
          "perms": "",
          "url": "#"
      },
      {
          "ancestors": ",4001",
          "children": [
              {
                  "ancestors": ",4001,5440",
                  "children": [
                      {
                          "ancestors": ",4001,5440,5703",
                          "children": [],
                          "createTime": 1641521167000,
                          "icon": "",
                          "menuId": 5643,
                          "menuName": "系统运行分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5703,
                          "perms": "business:systemAnalysis:view",
                          "url": "/business/hvacEnergy/systemAnalysis"
                      },
                      {
                          "ancestors": ",4001,5440,5703",
                          "children": [],
                          "createTime": 1618905301000,
                          "icon": "",
                          "menuId": 5441,
                          "menuName": "能源站耗能统计",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5703,
                          "perms": "business:hvacEnergyStatistics:view",
                          "url": "/business/hvacEnergy/hvacEnergyStatistics"
                      },
                      {
                          "ancestors": ",4001,5440,5703",
                          "children": [],
                          "createTime": 1641520802000,
                          "icon": "",
                          "menuId": 5640,
                          "menuName": "用户舒适度分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5703,
                          "perms": "business:uceStatistics:view",
                          "url": "/business/havcstatistics/userComfort"
                      },
                      {
                          "ancestors": ",4001,5440,5703",
                          "children": [],
                          "createTime": 1618905370000,
                          "icon": "",
                          "menuId": 5443,
                          "menuName": "设备耗电分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5703,
                          "perms": "business:dpcStatistics:view",
                          "url": "/business/havcstatistics/dpc"
                      },
                      {
                          "ancestors": ",4001,5440,5703",
                          "children": [],
                          "createTime": 1641449857000,
                          "icon": "",
                          "menuId": 5637,
                          "menuName": "能效分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5703,
                          "perms": "business:secStatistics:view",
                          "url": "/business/havcstatistics/siteEnergy"
                      },
                      {
                          "ancestors": ",4001,5440,5703",
                          "children": [],
                          "createTime": 1651135378000,
                          "icon": "",
                          "menuId": 5709,
                          "menuName": "水力平衡分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "7",
                          "params": {},
                          "parentId": 5703,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1651134940000,
                  "icon": "fa fa-fire",
                  "menuId": 5703,
                  "menuName": "暖通能耗",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "1",
                  "params": {},
                  "parentId": 5440,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5440",
                  "children": [
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1651140292000,
                          "icon": "",
                          "menuId": 5730,
                          "menuName": "经济运行分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:economicsRun:view",
                          "url": "/business/electricEnergy/economicsRun"
                      },
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1641543153000,
                          "icon": "",
                          "menuId": 5646,
                          "menuName": "变配站耗电分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:siteElectricConsumptionAndRate:view",
                          "url": "business/electric/eleEnergyAndCostList"
                      },
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1641621786000,
                          "icon": "",
                          "menuId": 5648,
                          "menuName": "分项耗电分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:deviceElectricConsumptionAndRate:view",
                          "url": "/business/electric/eleDeviceEnergyAndCostList"
                      },
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1654163840000,
                          "icon": "",
                          "menuId": 5758,
                          "menuName": "耗电环比分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:useElectricChain:view",
                          "url": "/business/electricEnergy/useElectricChain"
                      },
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1654163802000,
                          "icon": "",
                          "menuId": 5757,
                          "menuName": "耗电同比分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:useElectricAnalysis:view",
                          "url": "/business/electricEnergy/useElectricAnalysis"
                      },
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1654163892000,
                          "icon": "",
                          "menuId": 5759,
                          "menuName": "平均功率因数",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "6",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:averagePower:view",
                          "url": "/business/electricEnergy/averagePower"
                      },
                      {
                          "ancestors": ",4001,5440,5704",
                          "children": [],
                          "createTime": 1651140375000,
                          "icon": "",
                          "menuId": 5731,
                          "menuName": "电能质量分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "7",
                          "params": {},
                          "parentId": 5704,
                          "perms": "business:powerQuality:view",
                          "url": "/business/electricEnergy/powerQuality"
                      }
                  ],
                  "createTime": 1651134963000,
                  "icon": "fa fa-bolt",
                  "menuId": 5704,
                  "menuName": "电力能耗",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "2",
                  "params": {},
                  "parentId": 5440,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5440",
                  "children": [
                      {
                          "ancestors": ",4001,5440,5705",
                          "children": [],
                          "createTime": 1651805849000,
                          "icon": "",
                          "menuId": 5743,
                          "menuName": "设备安全分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5705,
                          "perms": "business:deviceSecurity:view",
                          "url": "/business/electricSecurity/deviceSecurity"
                      },
                      {
                          "ancestors": ",4001,5440,5705",
                          "children": [],
                          "createTime": 1650336128000,
                          "icon": "",
                          "menuId": 5677,
                          "menuName": "环境安全分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5705,
                          "perms": "business:environmentSecurity:view",
                          "url": "/business/electricSecurity/environmentSecurity"
                      },
                      {
                          "ancestors": ",4001,5440,5705",
                          "children": [],
                          "createTime": 1651140174000,
                          "icon": "",
                          "menuId": 5728,
                          "menuName": "SOE事件记录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5705,
                          "perms": "business:soeThings:view",
                          "url": "/business/electricSecurity/soeThings"
                      }
                  ],
                  "createTime": 1651135001000,
                  "icon": "fa fa-cube",
                  "menuId": 5705,
                  "menuName": "电力安全",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "3",
                  "params": {},
                  "parentId": 5440,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5440",
                  "children": [
                      {
                          "ancestors": ",4001,5440,5724",
                          "children": [],
                          "createTime": 1651140118000,
                          "icon": "",
                          "menuId": 5726,
                          "menuName": "环境安全分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5724,
                          "perms": "business:hvacEnvironmentSecurity:view",
                          "url": "/business/hvacEnergy/hvacEnvironmentSecurity"
                      },
                      {
                          "ancestors": ",4001,5440,5724",
                          "children": [],
                          "createTime": 1651140138000,
                          "icon": "",
                          "menuId": 5727,
                          "menuName": "设备安全分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5724,
                          "perms": "business:hvacSecurity:view",
                          "url": "/business/hvacEnergy/hvacSecurity"
                      }
                  ],
                  "createTime": 1651140066000,
                  "icon": "fa fa-shield",
                  "menuId": 5724,
                  "menuName": "暖通安全",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "4",
                  "params": {},
                  "parentId": 5440,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5440",
                  "children": [
                      {
                          "ancestors": ",4001,5440,5707",
                          "children": [],
                          "createTime": 1611286708000,
                          "icon": "",
                          "menuId": 5431,
                          "menuName": "修复效率分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5707,
                          "perms": "business:repairAnalysis:view",
                          "url": "/business/hvacEnergy/repairAnalysis"
                      },
                      {
                          "ancestors": ",4001,5440,5707",
                          "children": [],
                          "createTime": 1651140094000,
                          "icon": "",
                          "menuId": 5725,
                          "menuName": "运维人员分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5707,
                          "perms": "business:hvacPeopleAnalysis:view",
                          "url": "/business/hvacEnergy/hvacPeopleAnalysis"
                      },
                      {
                          "ancestors": ",4001,5440,5707",
                          "children": [],
                          "createTime": 1657533247000,
                          "icon": "",
                          "menuId": 7580,
                          "menuName": "系统安全分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5707,
                          "perms": "business:hvacSecurity:view",
                          "url": "/business/hvacEnergy/hvacSecurity"
                      },
                      {
                          "ancestors": ",4001,5440,5707",
                          "children": [],
                          "createTime": 1618906596000,
                          "icon": "",
                          "menuId": 5446,
                          "menuName": "运维任务分析",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "6",
                          "params": {},
                          "parentId": 5707,
                          "perms": "business:operationsAnalysis:view",
                          "url": "/business/hvacEnergy/operationsAnalysis"
                      }
                  ],
                  "createTime": 1651135051000,
                  "icon": "fa fa-gavel",
                  "menuId": 5707,
                  "menuName": "安全运维",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "5",
                  "params": {},
                  "parentId": 5440,
                  "perms": "",
                  "url": "#"
              }
          ],
          "createTime": 1618905265000,
          "icon": "fa fa-bar-chart",
          "menuId": 5440,
          "menuName": "统计分析",
          "menuRank": 1,
          "menuType": "M",
          "orderNum": "2",
          "params": {},
          "parentId": 4001,
          "perms": "",
          "url": "#"
      },
      {
          "ancestors": ",4001",
          "children": [
              {
                  "ancestors": ",4001,5633",
                  "children": [
                      {
                          "ancestors": ",4001,5633,5679",
                          "children": [],
                          "createTime": 1650336206000,
                          "icon": "",
                          "menuId": 5681,
                          "menuName": "诊断记录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5679,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1650336182000,
                  "icon": "fa fa-code-fork",
                  "menuId": 5679,
                  "menuName": "诊断报告",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "1",
                  "params": {},
                  "parentId": 5633,
                  "perms": "",
                  "url": "under_development"
              }
          ],
          "createTime": 1641437806000,
          "icon": "fa fa-object-ungroup",
          "menuId": 5633,
          "menuName": "诊断分析",
          "menuRank": 1,
          "menuType": "M",
          "orderNum": "3",
          "params": {},
          "parentId": 4001,
          "perms": "",
          "url": "#"
      },
      {
          "ancestors": ",4001",
          "children": [
              {
                  "ancestors": ",4001,5525",
                  "children": [
                      {
                          "ancestors": ",4001,5525,5721",
                          "children": [],
                          "createTime": 1611298498000,
                          "icon": "",
                          "menuId": 5432,
                          "menuName": "能源指标录入",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5721,
                          "perms": "business:quota:view",
                          "url": "/business/quota"
                      },
                      {
                          "ancestors": ",4001,5525,5721",
                          "children": [],
                          "createTime": 1651802858000,
                          "icon": "",
                          "menuId": 5735,
                          "menuName": "耗能计划预测",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5721,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5525,5721",
                          "children": [],
                          "createTime": 1651802885000,
                          "icon": "",
                          "menuId": 5736,
                          "menuName": "预测模型",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5721,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1651139647000,
                  "icon": "fa fa-adjust",
                  "menuId": 5721,
                  "menuName": "能源计划",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "1",
                  "params": {},
                  "parentId": 5525,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5525",
                  "children": [
                      {
                          "ancestors": ",4001,5525,5734",
                          "children": [],
                          "createTime": 1651802916000,
                          "icon": "",
                          "menuId": 5737,
                          "menuName": "费用指标录入",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5734,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5525,5734",
                          "children": [],
                          "createTime": 1651802936000,
                          "icon": "",
                          "menuId": 5738,
                          "menuName": "能源费用预测",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5734,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5525,5734",
                          "children": [],
                          "createTime": 1651802969000,
                          "icon": "",
                          "menuId": 5739,
                          "menuName": "预测模型",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5734,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1651802748000,
                  "icon": "fa fa-database",
                  "menuId": 5734,
                  "menuName": "费用计划",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "2",
                  "params": {},
                  "parentId": 5525,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5525",
                  "children": [
                      {
                          "ancestors": ",4001,5525,5717",
                          "children": [],
                          "createTime": 1650334893000,
                          "icon": "",
                          "menuId": 5673,
                          "menuName": "碳排放监测",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5717,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1651139033000,
                  "icon": "fa fa-american-sign-language-interpreting",
                  "menuId": 5717,
                  "menuName": "碳控管理",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "3",
                  "params": {},
                  "parentId": 5525,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5525",
                  "children": [
                      {
                          "ancestors": ",4001,5525,5719",
                          "children": [],
                          "createTime": 1651139170000,
                          "icon": "",
                          "menuId": 5720,
                          "menuName": "变配站控制",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5719,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5525,5719",
                          "children": [],
                          "createTime": 1651139733000,
                          "icon": "",
                          "menuId": 5722,
                          "menuName": "末端控制",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5719,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1651139147000,
                  "icon": "fa fa-anchor",
                  "menuId": 5719,
                  "menuName": "电力控制",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "4",
                  "params": {},
                  "parentId": 5525,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5525",
                  "children": [
                      {
                          "ancestors": ",4001,5525,5328",
                          "children": [],
                          "createTime": 1655944223000,
                          "icon": "",
                          "menuId": 7559,
                          "menuName": "基本控制",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5328,
                          "perms": "business:baseControl:view",
                          "url": "/business/runPlan/baseControl"
                      },
                      {
                          "ancestors": ",4001,5525,5328",
                          "children": [],
                          "createTime": 1650336299000,
                          "icon": "",
                          "menuId": 5689,
                          "menuName": "自动运行",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5328,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1590801221000,
                  "icon": "ba iconfont iconxitongjiankong",
                  "menuId": 5328,
                  "menuName": "运行策略",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "5",
                  "params": {},
                  "parentId": 5525,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5525",
                  "children": [
                      {
                          "ancestors": ",4001,5525,5445",
                          "children": [],
                          "createTime": 1650336250000,
                          "icon": "",
                          "menuId": 5685,
                          "menuName": "电力负荷预测",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5445,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5525,5445",
                          "children": [],
                          "createTime": 1651139108000,
                          "icon": "",
                          "menuId": 5718,
                          "menuName": "热力负荷策略",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5445,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5525,5445",
                          "children": [],
                          "createTime": 1650336333000,
                          "icon": "",
                          "menuId": 5691,
                          "menuName": "产能预测",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5445,
                          "perms": "",
                          "url": "under_development"
                      }
                  ],
                  "createTime": 1618906560000,
                  "icon": "fa fa-hourglass-2",
                  "menuId": 5445,
                  "menuName": "预测分析",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "6",
                  "params": {},
                  "parentId": 5525,
                  "perms": "",
                  "url": "#"
              }
          ],
          "createTime": 1633761811000,
          "icon": "ba iconfont icontuiguangqiye",
          "menuId": 5525,
          "menuName": "碳控策略",
          "menuRank": 1,
          "menuType": "M",
          "orderNum": "4",
          "params": {},
          "parentId": 4001,
          "perms": "",
          "url": "#"
      },
      {
          "ancestors": ",4001",
          "children": [
              {
                  "ancestors": ",4001,5716",
                  "children": [
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1636532098000,
                          "icon": "",
                          "menuId": 5567,
                          "menuName": "保养标准",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsindi:viewMat",
                          "url": "/business/mfrsIndi/viewMat"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1636540461000,
                          "icon": "",
                          "menuId": 5577,
                          "menuName": "巡检标准",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsindi:viewIns",
                          "url": "/business/mfrsIndi/viewIns"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1636533723000,
                          "icon": "",
                          "menuId": 5572,
                          "menuName": "任务派发",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrs_task_plan_tp:view",
                          "url": "/business/mfrs_task_plan_tp"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1637047202000,
                          "icon": "",
                          "menuId": 5586,
                          "menuName": "保养补录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsMaintenanceRecord:viewBl",
                          "url": "/business/mfrsMaintenanceRecord/bl"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1637047270000,
                          "icon": "",
                          "menuId": 5588,
                          "menuName": "巡检补录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsinspectionrecord:viewBl",
                          "url": "/business/mfrsInspectionRecord/bl"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1635301116000,
                          "icon": "",
                          "menuId": 5521,
                          "menuName": "维修补录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "8",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:repairRecord:view",
                          "url": "/business/repairRecord"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1595376303000,
                          "icon": "",
                          "menuId": 5387,
                          "menuName": "自动抄表",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "11",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsPlctemplateInfo:view",
                          "url": "business/mfrsPlctemplateInfo"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1655178918000,
                          "icon": "",
                          "menuId": 7539,
                          "menuName": "运维记录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "13",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsOpsRecord:view",
                          "url": "/business/mfrsOpsRecord"
                      },
                      {
                          "ancestors": ",4001,5716,5520",
                          "children": [],
                          "createTime": 1655273018000,
                          "icon": "",
                          "menuId": 7542,
                          "menuName": "工单记录",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "14",
                          "params": {},
                          "parentId": 5520,
                          "perms": "business:mfrsOpsRecordSelf:view",
                          "url": "/business/mfrsOpsRecord/self"
                      }
                  ],
                  "createTime": 1635301074000,
                  "icon": "ba iconfont iconxitonggongju-",
                  "menuId": 5520,
                  "menuName": "运维管理",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "1",
                  "params": {},
                  "parentId": 5716,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5716",
                  "children": [
                      {
                          "ancestors": ",4001,5716,5327",
                          "children": [],
                          "createTime": 1590530210000,
                          "icon": "",
                          "menuId": 5321,
                          "menuName": "设备管理",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5327,
                          "perms": "business:device:view",
                          "url": "/business/device"
                      },
                      {
                          "ancestors": ",4001,5716,5327",
                          "children": [],
                          "createTime": 1641439410000,
                          "icon": "",
                          "menuId": 5634,
                          "menuName": "设备查询",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5327,
                          "perms": "business:deviceStatistic:view",
                          "url": "/business/deviceStatistic"
                      },
                      {
                          "ancestors": ",4001,5716,5327",
                          "children": [],
                          "createTime": 1636096406000,
                          "icon": "",
                          "menuId": 5560,
                          "menuName": "设备规格配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5327,
                          "perms": "business:deviceSpecifications:view",
                          "url": "/business/deviceSpecifications"
                      }
                  ],
                  "createTime": 1590801205000,
                  "icon": "fa fa-server",
                  "menuId": 5327,
                  "menuName": "设备管理",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "2",
                  "params": {},
                  "parentId": 5716,
                  "perms": "",
                  "url": "#"
              }
          ],
          "createTime": 1651138765000,
          "icon": "fa fa-anchor",
          "menuId": 5716,
          "menuName": "设备运维",
          "menuRank": 1,
          "menuType": "M",
          "orderNum": "5",
          "params": {},
          "parentId": 4001,
          "perms": "",
          "url": "#"
      },
      {
          "ancestors": ",4001",
          "children": [
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5163",
                          "children": [],
                          "createTime": 1555550624000,
                          "icon": "",
                          "menuId": 5164,
                          "menuName": "公司信息",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5163,
                          "perms": "system:mfrs:view",
                          "url": "/system/mfrs"
                      },
                      {
                          "ancestors": ",4001,5710,5163",
                          "children": [],
                          "createTime": 1631518919000,
                          "icon": "",
                          "menuId": 5502,
                          "menuName": "用户审核",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5163,
                          "perms": "business:mfrsUserApplication:view",
                          "url": "/system/mfrsUserApplication"
                      },
                      {
                          "ancestors": ",4001,5710,5163",
                          "children": [],
                          "createTime": 1521171180000,
                          "icon": "",
                          "menuId": 4100,
                          "menuName": "用户管理",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5163,
                          "perms": "system:user:view",
                          "url": "/system/mfrsMember"
                      },
                      {
                          "ancestors": ",4001,5710,5163",
                          "children": [],
                          "createTime": 1521171180000,
                          "icon": "",
                          "menuId": 4103,
                          "menuName": "部门维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5163,
                          "perms": "system:dept:view",
                          "url": "/system/dept"
                      },
                      {
                          "ancestors": ",4001,5710,5163",
                          "children": [],
                          "createTime": 1631603142000,
                          "icon": "",
                          "menuId": 5507,
                          "menuName": "岗位维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5163,
                          "perms": "business:position:view",
                          "url": "/system/position"
                      },
                      {
                          "ancestors": ",4001,5710,5163",
                          "children": [],
                          "createTime": 1660879131000,
                          "icon": "",
                          "menuId": 7604,
                          "menuName": "角色管理",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "6",
                          "params": {},
                          "parentId": 5163,
                          "perms": "system:role:view",
                          "url": "/system/role"
                      }
                  ],
                  "createTime": 1555550550000,
                  "icon": "fa fa-vcard-o",
                  "menuId": 5163,
                  "menuName": "用户设置",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "1",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5314",
                          "children": [],
                          "createTime": 1590530069000,
                          "icon": "",
                          "menuId": 5315,
                          "menuName": "项目维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5314,
                          "perms": "business:project:view",
                          "url": "/business/project"
                      },
                      {
                          "ancestors": ",4001,5710,5314",
                          "children": [],
                          "createTime": 1590518700000,
                          "icon": "",
                          "menuId": 5309,
                          "menuName": "站点维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5314,
                          "perms": "business:unit:view",
                          "url": "/business/unit"
                      }
                  ],
                  "createTime": 1590530033000,
                  "icon": "fa fa-cube",
                  "menuId": 5314,
                  "menuName": "项目设置",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "2",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5711",
                          "children": [],
                          "createTime": 1633761970000,
                          "icon": "",
                          "menuId": 5527,
                          "menuName": "电费单价维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5711,
                          "perms": "business:electricCost:view",
                          "url": "/business/electricCost"
                      },
                      {
                          "ancestors": ",4001,5710,5711",
                          "children": [],
                          "createTime": 1633761931000,
                          "icon": "",
                          "menuId": 5526,
                          "menuName": "水费单价维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5711,
                          "perms": "business:waterCost:view",
                          "url": "/business/waterCost"
                      },
                      {
                          "ancestors": ",4001,5710,5711",
                          "children": [],
                          "createTime": 1651138077000,
                          "icon": "",
                          "menuId": 5712,
                          "menuName": "地热单价维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5711,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5710,5711",
                          "children": [],
                          "createTime": 1633762012000,
                          "icon": "",
                          "menuId": 5528,
                          "menuName": "燃气单价维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5711,
                          "perms": "business:gasCost:view",
                          "url": "/business/gasCost"
                      }
                  ],
                  "createTime": 1651137410000,
                  "icon": "fa fa-database",
                  "menuId": 5711,
                  "menuName": "费用设置",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "3",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5713",
                          "children": [],
                          "createTime": 1604042895000,
                          "icon": "",
                          "menuId": 5416,
                          "menuName": "暖通组态配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5713,
                          "perms": "business:hvacDiagramDraw:view",
                          "url": "/business/diagram/diagramsign"
                      },
                      {
                          "ancestors": ",4001,5710,5713",
                          "children": [],
                          "createTime": 1624581953000,
                          "icon": "",
                          "menuId": 5459,
                          "menuName": "配电组态配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5713,
                          "perms": "business:elcDiagramDraw:view",
                          "url": "business/diagram/electricRoomDiagramsign"
                      },
                      {
                          "ancestors": ",4001,5710,5713",
                          "children": [],
                          "createTime": 1655858821000,
                          "icon": "",
                          "menuId": 7545,
                          "menuName": "暖通看板配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5713,
                          "perms": "business:diagram:view",
                          "url": "/business/diagram"
                      },
                      {
                          "ancestors": ",4001,5710,5713",
                          "children": [],
                          "createTime": 1655859030000,
                          "icon": "",
                          "menuId": 7546,
                          "menuName": "配电看板配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5713,
                          "perms": "business:diagram:view",
                          "url": "business/diagram/diagramElectric"
                      }
                  ],
                  "createTime": 1651138157000,
                  "icon": "fa fa-magnet",
                  "menuId": 5713,
                  "menuName": "组态配置",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "4",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5714",
                          "children": [],
                          "createTime": 1611286446000,
                          "icon": "",
                          "menuId": 5425,
                          "menuName": "告警规则配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5714,
                          "perms": "business:alarmRule:view",
                          "url": "/business/alarmRule"
                      }
                  ],
                  "createTime": 1651138270000,
                  "icon": "fa fa-adjust",
                  "menuId": 5714,
                  "menuName": "告警配置",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "5",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5715",
                          "children": [],
                          "createTime": 1622010806000,
                          "icon": "",
                          "menuId": 5472,
                          "menuName": "网关配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5715,
                          "perms": "business:gateway:view",
                          "url": "/business/gateway"
                      },
                      {
                          "ancestors": ",4001,5710,5715",
                          "children": [],
                          "createTime": 1594514266000,
                          "icon": "",
                          "menuId": 5364,
                          "menuName": "信号配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5715,
                          "perms": "business:mfrsPlctemplate:view",
                          "url": "/business/mfrsPlctemplate"
                      },
                      {
                          "ancestors": ",4001,5710,5715",
                          "children": [],
                          "createTime": 1595376850000,
                          "icon": "",
                          "menuId": 5390,
                          "menuName": "设备绑定信号",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5715,
                          "perms": "business:mfrsPlcSignal:view",
                          "url": "/business/mfrsPlcSignal"
                      },
                      {
                          "ancestors": ",4001,5710,5715",
                          "children": [],
                          "createTime": 1651804966000,
                          "icon": "",
                          "menuId": 5741,
                          "menuName": "设备绑定传感器",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5715,
                          "perms": "",
                          "url": "under_development"
                      },
                      {
                          "ancestors": ",4001,5710,5715",
                          "children": [],
                          "createTime": 1654590648000,
                          "icon": "",
                          "menuId": 7527,
                          "menuName": "抄表参数配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5715,
                          "perms": "business:mfrsMtdDevicePlc:view",
                          "url": "/business/mfrsMtdDevicePlc"
                      }
                  ],
                  "createTime": 1651138352000,
                  "icon": "fa fa-anchor",
                  "menuId": 5715,
                  "menuName": "调试配置",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "6",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5478",
                          "children": [],
                          "createTime": 1629943155000,
                          "icon": "",
                          "menuId": 5496,
                          "menuName": "智观页面配置",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 5478,
                          "perms": "business:templatetb:view",
                          "url": "/business/dragLayout/dragPage"
                      },
                      {
                          "ancestors": ",4001,5710,5478",
                          "children": [],
                          "createTime": 1631927499000,
                          "icon": "",
                          "menuId": 5499,
                          "menuName": "智观图标维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "3",
                          "params": {},
                          "parentId": 5478,
                          "perms": "business:mfrsicon:view",
                          "url": "/business/mfrs_icon"
                      },
                      {
                          "ancestors": ",4001,5710,5478",
                          "children": [],
                          "createTime": 1631927543000,
                          "icon": "",
                          "menuId": 5500,
                          "menuName": "数据源维护",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "4",
                          "params": {},
                          "parentId": 5478,
                          "perms": "business:jobdatasource:view",
                          "url": "/business/job_datasource"
                      },
                      {
                          "ancestors": ",4001,5710,5478",
                          "children": [],
                          "createTime": 1629943244000,
                          "icon": "",
                          "menuId": 5497,
                          "menuName": "智观页面模板",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "5",
                          "params": {},
                          "parentId": 5478,
                          "perms": "",
                          "url": "/business/dragLayout/pageTpl"
                      },
                      {
                          "ancestors": ",4001,5710,5478",
                          "children": [],
                          "createTime": 1629943287000,
                          "icon": "",
                          "menuId": 5498,
                          "menuName": "智观组件模块",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "6",
                          "params": {},
                          "parentId": 5478,
                          "perms": "",
                          "url": "/business/dragLayout/moduleTpl"
                      }
                  ],
                  "createTime": 1629943081000,
                  "icon": "fa fa-cogs",
                  "menuId": 5478,
                  "menuName": "自定义页面",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "7",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,5186",
                          "children": [],
                          "createTime": 1556411715000,
                          "icon": "",
                          "menuId": 5187,
                          "menuName": "消息通知",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "1",
                          "params": {},
                          "parentId": 5186,
                          "perms": "business:noticeRecord:view",
                          "url": "/business/noticeRecord"
                      }
                  ],
                  "createTime": 1556411674000,
                  "icon": "fa fa-volume-up",
                  "menuId": 5186,
                  "menuName": "通知管理",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "8",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              },
              {
                  "ancestors": ",4001,5710",
                  "children": [
                      {
                          "ancestors": ",4001,5710,4108",
                          "children": [],
                          "createTime": 1521171180000,
                          "icon": "",
                          "menuId": 4500,
                          "menuName": "操作日志",
                          "menuRank": 1,
                          "menuType": "C",
                          "orderNum": "2",
                          "params": {},
                          "parentId": 4108,
                          "perms": "monitor:operlog:view",
                          "url": "/monitor/operlog"
                      }
                  ],
                  "createTime": 1521171180000,
                  "icon": "fa fa-calendar-minus-o",
                  "menuId": 4108,
                  "menuName": "日志管理",
                  "menuRank": 1,
                  "menuType": "M",
                  "orderNum": "9",
                  "params": {},
                  "parentId": 5710,
                  "perms": "",
                  "url": "#"
              }
          ],
          "createTime": 1651137287000,
          "icon": "fa fa-cogs",
          "menuId": 5710,
          "menuName": "系统配置",
          "menuRank": 1,
          "menuType": "M",
          "orderNum": "6",
          "params": {},
          "parentId": 4001,
          "perms": "",
          "url": "#"
      }
  ]
    let zkMenu = zkMenuFormat(zk_menu_data);
    setMenuApiData(zkMenu.menuAll);
    setMenuLv1Id(zkMenu.menuLvFristId);

    let menuSave;
    let first = getFirstMenuItem(zkMenu.menuLv2Data[0]);
    // 如果不为空说明当前操作是刷新（刷新不用更新菜单缓存）
    if (pathname === '' || pathname === '/home') {
      // 设置应用菜单扁平化并本地缓存
    //   menuSave = menuflat(zk_menu_data);
      setStorageItems('MENU_INFO_CACHE', zkMenu.menuAll);
      // first = getFirstMenuItem(res.data[0]);
    //   setMenuItem(first);
    } else {
      menuSave = getStorageItems('MENU_INFO_CACHE');
      Object.values(menuSave).forEach((item: any) => {
        if (item.routePath === pathname) {
          first = item;
          setMenuItem(item);
        }
      });
    }

    return {
      menuLv1Data: zkMenu.menuLv1Data,
      firstItemData: first,
    };
  };

  // 存储当前点击菜单项
  const saveMenuItem = useCallback((id: string) => {
    let menuData = getStorageItems('MENU_INFO_CACHE');

    if (id && menuData[id]) {
      setMenuItem(menuData[id]);
    } else {
      Object.values(menuData).forEach((item: any) => {
        if (item.routePath === id) {
          setMenuItem(item);
        }
      });
    }
  }, []);

  const addTagFun = useCallback((e: tagDataType) => addTag(e), []);
  const removeTagFun = useCallback((e: string) => removeTag(e), []);

  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);

  return {
    counter,
    increment,
    decrement,
    tags,
    addTagFun,
    removeTagFun,
    menuItem,
    saveMenuItem,
    getFirstItem,
    updateMenuApiData,
    menuApiData,
    menuLv1Id,
    setMenuLv1Id
  };
};
