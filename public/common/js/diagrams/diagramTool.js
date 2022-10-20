// 创建画布
let GO_obj = go.GraphObject.make;
// 左侧工具栏的设备组件
let paleImgBaseURL = 'http://zg.hdzhenergy.cn/common/image/img/';
let paletteList = {
    hvac: [ // 暖通Palette面板里的内容
        {
            category   : "lengji",
            text       : "制冷机",
            source     : paleImgBaseURL+"lengji.png",
            isDev      : 1,
            isOpen     : "1",
            isAnimation: 2,
            classify   : 0,
            isSize     : 1,
            size       : '70 60',
        },
        {
            category: "shuixiang",
            text    : "水箱",
            source  : paleImgBaseURL+"shuixiang.png",
            isDev   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 1,
            size    : '65 55',
        },
        {
            category: "shuichuliqi",
            text    : "水处理器",
            source  : paleImgBaseURL+"shuichuliqi.png",
            isDev   : 1,
            classify: 0,
            isSize  : 0,
            size    : '50 60',
        },
        {
            category   : "lengqueta",
            text       : "冷却塔",
            source     : paleImgBaseURL+"lengqueta.png",
            sourceAni  : paleImgBaseURL+"fengshan.png",
            isAnimation: 1,
            isDev      : 1,
            isOpen     : "1",
            classify   : 0,
            isSize     : 0,
            size       : '62 62',
        },
        {
            category   : "jifenshuiqi",
            text       : "集分水器1",
            source     : paleImgBaseURL+"jifenshuiqi.png",
            isDev      : 1,
            isOpen     : "1",
            isAnimation: 2,
            classify   : 0,
            isSize     : 1,
            size       : '65 46',
        },
        {
            category   : "jifenshuiqi2",
            text       : "集分水器2",
            source     : paleImgBaseURL+"jifenshuiqi2.png",
            isDev      : 1,
            isOpen     : "1",
            isAnimation: 2,
            classify   : 0,
            isSize     : 1,
            size       : '65 46',
        },
        {
            category   : "shuibeng",
            text       : "水泵1",
            source     : paleImgBaseURL+"shuibeng.png",
            sourceAni  : paleImgBaseURL+"fengshan.png",
            handleIcon : paleImgBaseURL+"handleIcon.png",
            isDev      : 1,
            isOpen     : "1",
            isAnimation: 1,
            classify   : 0,
            isSize     : 0,
            size       : '60 40',
        },
        {
            category   : "shuibeng_reverse",
            text       : "水泵2",
            source     : paleImgBaseURL+"shuibeng_reverse.png",
            sourceAni  : paleImgBaseURL+"fengshan_reverse.png",
            handleIcon : paleImgBaseURL+"handleIcon.png",
            isDev      : 1,
            isOpen     : "1",
            isAnimation: 3,
            classify   : 0,
            isSize     : 0,
            size       : '60 40',
        },
        {
            category: "guolu",
            text    : "锅炉",
            source  : paleImgBaseURL+"guolu.png",
            isDev   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 0,
            size    : '65 45',
        },
        {
            category: "banhuan",
            text    : "板换",
            source  : paleImgBaseURL+"banhuan.png",
            isDev   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 0,
            size    : '50 50',
        },
        {
            category: "qianshuibeng",
            text    : "潜水泵",
            source  : paleImgBaseURL+"qianshuibeng.png",
            isDev   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 0,
            size    : '30 40',
        },
        {
            category: "direjing",
            text    : "地热井",
            source  : paleImgBaseURL+"direjing.png",
            isDev   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 0,
            size    : '30 50',
        },
        {
            category  : "famen",
            text      : "阀门",
            source    : paleImgBaseURL+"famen.png",
            handleIcon: paleImgBaseURL+"handleIcon.png",
            isDev     : 1,
            classify  : 0,
            isSize    : 0,
            size      : '30 30',
        },
        {
            category  : "chuanganqi",
            text      : "传感器",
            source    : paleImgBaseURL+"chuanganqi.png",
            handleIcon: paleImgBaseURL+"handleIcon.png",
            isDev     : 1,
            isOpen    : "1",
            classify  : 1,
            isSize    : 0,
            size      : '30 40',
        },
        {
            category: "xinxi",
            text    : "信号模板",
            isDev   : 0,
            isPlc   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 0
        },
        {
            category: "shuoming",
            text    : "文字说明",
            isDev   : 0,
            isPlc   : 0
        },
    ],
    electric: [ //配电室Palette面板里的内容
        {
            category   : "bianyaqi",
            text       : "变压器",
            source     : paleImgBaseURL+"transformer.png",
            handleIcon : paleImgBaseURL+"handleIcon.png",
            isDev      : 1,
            isOpen     : 0,
            isAnimation: 2,
            classify   : 0,
            isSize     : 1,
            size       : '30 50',
        },
        {
            category   : "dianronggui",
            text       : "电容柜",
            source     : paleImgBaseURL+"capacitance.png",
            isDev      : 1,
            isOpen     : 0,
            isAnimation: 2,
            classify   : 0,
            isSize     : 1,
            size       : '50 50',
        },
        {
            category : "kaiguan1",
            text     : "开关1",
            source   : paleImgBaseURL+"switchOne.png",
            handleIcon : paleImgBaseURL+"handleIcon.png",
            sourceAni: paleImgBaseURL+"switch_1.png",
            isDev    : 0,
            isPlc    : 1,
            isOpen   : "1",
            classify : 0,
            isSize   : 1,
            size     : '20 60',
            defaultState:'0',  //0是关 1是开
        },
        {
            category : "kaiguan2",
            text     : "开关2",
            source   : paleImgBaseURL+"switchTwo.png",
            handleIcon : paleImgBaseURL+"handleIcon.png",
            sourceAni: paleImgBaseURL+"switch_2.png",
            isDev    : 0,
            isPlc    : 1,
            isOpen   : "1",
            classify : 0,
            isSize   : 1,
            size     : '40 60',
            defaultState:'0',  //0是关 1是开
        },
        {
            category: "shuoming",
            text    : "文字说明",
            isDev   : 0,
            isPlc   : 0
        },
        {
            category: "wenbenkuang",
            text    : "文本框",
            source  : paleImgBaseURL+"TextBox.png",
            handleIcon : paleImgBaseURL+"handleIcon.png",
            isSize  : 1,
            size    : '40 60',
        },
        {
            category: "xinxi",
            text    : "信号模板",
            isDev   : 0,
            isPlc   : 1,
            isOpen  : "1",
            classify: 0,
            isSize  : 0
        }
    ],
}

/*
* 拖拽组态图
* selector: 需要承载组态图的容器id
* param: {
* 	diagramId: 组态图Id
* 	sourcePath: 资源目录【必传】
* 	paletteDivId: 组态图工具栏ID（如果diagramOper非Detail）【必传】
* 	diagramData: 组态图Json数据(用于绘制图形)【必传】
* 	defLinkTemple: 线段类型(默认线类型，默认为蚂蚁线，如果想修改为实线，请传入null 如果一种图中有多种颜色，也请传入null)
* 	isLineflowing: 是否开启线的流动效果【true/false】
*
* 	clickNodeFun: 点击节点回调函数
* 	clickLineFun: 点击线段回调函数
* 	clickBackgroundFun: 点击背景回调函数
* 	delNodeFun: 监听节点删除的回调函数
* 	editNodeFun: 监听添加编辑节点的回调函数
*
* 	completeCallback: 加载完成后的回调函数
* }
*/
let DiagramTool = (function ($) {
    function DiagramTool(selector, param) {
        // 容器
        this.elementId = selector;
        // 参数
        this.param = param;
        // 初始化
        this.initTool();
    }
    DiagramTool.prototype = {
        constructor: DiagramTool,
        initTool: function () {
            // 处理参数
            this.param = $.extend({
                "diagramId": '',                                            // 组态图Id
                "sourcePath": 'http://zg.hdzhenergy.cn/common/image/img',   // 资源目录【必传】

                "diagramOper": 'detail',                                    // 操作类型
                "paletteDivId": '',                                         // 组态图工具栏ID（如果diagramOper非Detail，必填）
                "diagramType": 'hvac',                                      // electric: 配电；hvac: 暖通
                "InfiniteScroll":true,                                      //是否启用无限滚动
                "diagramData": {},                                          // 组态数据
                "defLinkTemple": null,                                  // 线段：直线/虚线
                "isLineflowing": false,                                     // 是否开启线的流动效果
                "clickLineFun": '',                                         // 点击节点连线回调函数
                "clickNodeFun": '',                                         // 点击节点回调函数
                "delNodeFun": '',                                           // 删除节点回调函数
                "editNodeFun": '',                                          // 编辑节点回调函数 修改大小 旋转的操作
                "clickBackgroundFun": '',                                   // 点击背景回调函数
            }, this.param)

            paleImgBaseURL = this.sourcePath;
            if(this.param.diagramData.nodeDataArray.length != 0 && this.param.diagramData.nodeDataArray[0].sysId == '1'){
                this.param.diagramType = 'hvac';
            }else{
                this.param.diagramType = 'electric'
            }
            // 实例化拖拽对象
            this.DiagramObject = this.initConfig();
            // 初始化模型范例
            this.DiagramObject.model = go.Model.fromJson({
                "class": "go.GraphLinksModel",
                "linkFromPortIdProperty": "fromPort",
                "linkToPortIdProperty": "toPort",
                "nodeDataArray": [],
                "linkDataArray": []
            });
            // 旋转修饰
            this.nodeRotateAdornmentTemplate = GO_obj(go.Adornment, {
                    locationSpot: go.Spot.Center,
                    locationObjectName: "CIRCLE",
                    // rotateAdornmentTemplate:  // specify appearance of rotation handle
                    //     GO(go.Adornment,
                    //         { locationSpot: go.Spot.Center },
                    //         GO(go.Shape, "BpmnActivityLoop",
                    //             { width: 12, height: 12, cursor: "pointer",
                    //                 background: "transparent", stroke: "dodgerblue", strokeWidth: 2 })),

                }, GO_obj(go.Picture, {
                    width: 20,
                    height: 20,
                    name: 'FSS',
                    cursor: 'pointer'
                }, new go.Binding("source", "handleIcon")),
                // GO(go.Shape, "Circle", {  //旋转小圆点
                //     name: "CIRCLE",
                //     cursor: "pointer",
                //     desiredSize: new go.Size(10, 10),
                //     fill: "lightblue",
                //     stroke: "deepskyblue"
                // }),
                // GO(go.Shape, {  //旋转小圆点狭下面的线
                //     geometryString: "M10 12 L10 100",
                //     isGeometryPositioned: true,
                //     stroke: "lightblue",
                //     strokeWidth: 2,
                //     strokeDashArray: [4, 2]
                // })
            );

            // 初始化拖拽对象
            if (this.param.diagramOper == 'detail') {
                this.drawDiagram(this.param.diagramData);
            } else {
                this.editDiagram();
            }
        },

        // 初始化配置信息
        initConfig: function() {
            let configObj = {}, that = this;
            if (this.param.diagramOper != 'detail') {
                //鼠标单击删除节点
                let deletePointButton = GO_obj(
                    go.Adornment, "Spot", {
                        layerName: "Tool", // in front of Adornments
                        background: "transparent",
                        mouseLeave: function (e) { // hide this button
                            e.diagram.remove(deletePointButton);
                            deletePointButton.adornedObject = null;
                        }
                    },
                    GO_obj(go.Placeholder),
                    GO_obj("Button",
                        GO_obj(go.Shape, "XLine", {
                            stroke: "red",
                            strokeWidth: 2,
                            width: 10,
                            height: 10
                        }), { // button is above-right of the reshape handle circle
                            alignment: go.Spot.TopRight,
                            alignmentFocus: go.Spot.BottomLeft,
                            click: function (e, button) {
                                let handle = button.part.adornedObject;
                                let link = handle.part.adornedPart;
                                let seg = handle.segmentIndex;
                                let pts = link.points.copy();
                                pts.removeAt(seg);
                                e.diagram.commit(function (diag) {
                                    link.points = pts;
                                    if (pts.count < 3) link.invalidateRoute();
                                }, "deleted point from link route");
                            }
                        })
                );

                configObj = {
                    "draggingTool": new GuidedDraggingTool(),       // 开启元素对齐辅助线
                    "draggingTool.horizontalGuidelineColor": "#B7BCBC",
                    "draggingTool.verticalGuidelineColor": "#B7BCBC",
                    "draggingTool.centerGuidelineColor": "#B7BCBC",
                    "draggingTool.guidelineWidth": 1.5,
                    "initialContentAlignment": go.Spot.Center,      // 居中显示内容
                    "scrollMode": this.param.InfiniteScroll?go.Diagram.InfiniteScroll:go.Diagram.DocumentScroll,        // 无限画布拖动
                    "undoManager.isEnabled": true,                  // 启用Ctrl-Z和Ctrl-Y撤销重做功能
                    "commandHandler.copiesTree": true,              // 启用Ctrl-C和Ctrl-V
                    "draggingTool.dragsLink": true,                 // 连线是否能拖拽
                    "allowDrop": true,                              // 是否允许从Palette面板拖入元素
                    // "LinkDrawn": showLinkLabel,                     // 每次画线后调用的事件：为条件连线加上标签，该方法再后面定义
                    // "LinkRelinked": showLinkLabel,                  // 每次重画线后调用的事件：同上LinkDrawn
                    "scrollsPageOnFocus": false,                    // 图选中时页面不会滚动
                    "BackgroundSingleClicked": typeof this.param.clickBackgroundFun === 'function' ? this.param.clickBackgroundFun : null,     // 点击空白处关闭侧滑菜单
                    "linkingTool.isUnconnectedLinkValid": true,
                    "linkingTool.portGravity": 20,
                    "relinkingTool.isUnconnectedLinkValid": true,
                    "relinkingTool.portGravity": 20,
                    "relinkingTool.fromHandleArchetype": GO_obj(go.Shape, "Diamond", {
                        segmentIndex: 0,
                        cursor: "pointer",
                        desiredSize: new go.Size(8, 8),
                        fill: "tomato",
                        stroke: "darkred"
                    }),
                    "relinkingTool.toHandleArchetype": GO_obj(go.Shape, "Diamond", {
                        segmentIndex: -1,
                        cursor: "pointer",
                        desiredSize: new go.Size(8, 8),
                        fill: "darkred",
                        stroke: "tomato"
                    }),
                    //鼠标放上显示x图标
                    "linkReshapingTool.handleArchetype": GO_obj(go.Shape, "Circle", { // change the default reshape handle to be a large circle
                        width: 10,
                        height: 10,
                        fill: "lightblue",
                        stroke: "dodgerblue",
                        mouseEnter: function (e, shape) { // show the delete button
                            deletePointButton.adornedObject = shape;
                            e.diagram.add(deletePointButton);
                        }
                    }),

                    "rotatingTool.snapAngleMultiple": 90,
                    "rotatingTool.handleAngle": 270,
                    "rotatingTool.snapAngleEpsilon": 45,
                    // 当画布中有变化，实时显示画布中的节点数据
                    //     "ModelChanged": function (e) { // just for demonstration purposes,
                    //     if (e.isTransactionFinished) {
                    //         document.getElementById("mySavedModel").textContent = e.model.toJson();
                    //     }
                    // },
                }
            }else {
                configObj = {
                    "initialContentAlignment": go.Spot.Center,      // 居中显示内容
                    "contentAlignment": go.Spot.Center,             // 画布自动管理
                    "initialAutoScale": go.Diagram.Uniform,         // 初始布局自适应
                    "scrollMode": this.param.InfiniteScroll?go.Diagram.InfiniteScroll:go.Diagram.DocumentScroll,        // 无限画布拖动
                    "undoManager.isEnabled": true,                  // 启用Ctrl-Z和Ctrl-Y撤销重做功能
                    "allowDrop": true,                              // 是否允许从Palette面板拖入元素
                    // "LinkDrawn": showLinkLabel,                  // 每次画线后调用的事件：为条件连线加上标签，该方法再后面定义
                    // "LinkRelinked": showLinkLabel,               // 每次重画线后调用的事件：同上LinkDrawn
                    "scrollsPageOnFocus": false,                    // 图选中时页面不会滚动
                    "isReadOnly": true,                             // 是否只读属性
                    "allowSelect": false,                           // 禁止选中
                    // "ModelChanged": function (e) { // just for demonstration purposes,
                    //     if (e.isTransactionFinished) { // show the model data in the page's TextArea
                    //         if (!($("#mySavedModel").length == 0)) {
                    //             document.getElementById("mySavedModel").textContent = e.model.toJson();
                    //         }
                    //     }
                    // }
                }
            }
            return GO_obj( go.Diagram, this.elementId, configObj );
        },

        // 添加左侧组件工具栏
        addPaletteList: function() {
            let that = this;
            let paletteData = paletteList[this.param.diagramType];
            // 在图形页面的左边初始化图例Palette面板
            GO_obj(go.Palette, this.param.paletteDivId, // 必须同HTML中Div元素id一致
                {
                    scrollsPageOnFocus: false, // 图选中时页面不会滚动
                    nodeTemplateMap: that.DiagramObject.nodeTemplateMap, // 同myDiagram公用一种node节点模板
                    linkTemplate: GO_obj(
                        go.Link, {
                            locationSpot: go.Spot.Center,
                            selectionAdornmentTemplate: GO_obj(
                                go.Adornment, "Link", {
                                    locationSpot: go.Spot.Center
                                },
                                GO_obj(go.Shape, {
                                    isPanelMain: true,
                                    fill: '#22c8f7',
                                    stroke: "#22c8f7",
                                    strokeWidth: 0,
                                    cursor: "pointer"
                                }),
                                GO_obj(go.Shape, // the arrowhead
                                    {
                                        toArrow: "Standard",
                                        fill: '#22c8f7',
                                        stroke: '#22c8f7',
                                        cursor: "pointer"
                                    })
                            )
                        }, {
                            routing: go.Link.AvoidsNodes,
                            curve: go.Link.JumpOver,
                            corner: 5,
                            toShortLength: 4
                        },
                        new go.Binding("points"),
                        GO_obj(go.Shape, {
                            isPanelMain: true,
                            strokeWidth: 2,
                            stroke: "#22c8f7",
                            strokeDashArray: [10, 10],
                            cursor: "pointer"
                        }),
                        GO_obj(go.Shape, {
                            toArrow: "Standard",
                            fill: '#22c8f7',
                            stroke: "#22c8f7",
                            cursor: "pointer"
                        })
                    ),
                    model: new go.GraphLinksModel(paletteData, [
                        {
                            points: new go.List().addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]),
                        },
                    ])
                }, {
                }
            );

            // 点击键盘微移
            this.keyBoradListening(that);

            //添加监听线生成事件
            // this.DiagramObject.addDiagramListener("LinkDrawn", function (e) {
            //     //onSelectionChanged();
            // })

            //监听节点删除事件
            this.DiagramObject.addDiagramListener("SelectionDeleted", function (e) {
                if (that.delNodeFun && typeof that.delNodeFun === 'function') {
                    that.delNodeFun(null);
                }
            })

            // 监听新拖拽到画布或者从画布删除的节点
            this.DiagramObject.addModelChangedListener(function (evt) {
                // 忽略不重要的事务事件
                if (!evt.isTransactionFinished) return;
                if (that.editNodeFun && typeof that.editNodeFun === 'function') {
                    that.editNodeFun();
                }
                var txn = evt.object; // 交易
                if (txn === null) return;
                // 迭代事务的所有实际变更
                txn.changes.each(function (e) {
                    // 忽略除添加/删除节点以外的任何更改
                    if (e.modelChange !== "nodeDataArray") return;
                    // 记录节点插入和删除
                    if (e.change === go.ChangedEvent.Insert) {
                        let nodeData = e.newValue;
                        nodeData['contentFlag'] = 1
                        that.DiagramObject.model.updateTargetBindings(nodeData);
                    } else if (e.change === go.ChangedEvent.Remove) {
                    }
                });
            });
        },

        // 节点部分 开始 ==================================================
        // 节点公共样式
        nodeStyle: function() {
            return [
                // 将节点位置信息 Node.location 同节点模型数据中 "loc" 属性绑定：
                // 节点位置信息从 节点模型 "loc" 属性获取, 并由静态方法 Point.parse 解析.
                // 如果节点位置改变了, 会自动更新节点模型中"loc"属性, 并由 Point.stringify 方法转化为字符串
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                {
                    // 节点位置 Node.location 定位在节点的中心
                    locationSpot: go.Spot.Center
                }
            ]
        },

        // 文字公共样式
        textStyle: function() {
            return {
                font: "10pt Helvetica, Arial, sans-serif",
                stroke: "whitesmoke",
                //stroke: "#666"
            }
        },

        //显示连接点
        makePort: function(name, align, spot, output, input) {
            // 端口基本上只是一个透明的小圆圈
            return GO_obj(go.Shape, "Circle", {
                fill: 'transparent',    // 透明的,
                stroke: null,
                desiredSize: new go.Size(10, 10),
                alignment: align,       // 同其节点对齐
                alignmentFocus: spot,   // 就在形状里面
                portId: name,           // 将此对象声明为“端口”
                fromSpot: spot,
                toSpot: spot,           // 声明链接在此端口的连接位置
                fromLinkable: output,
                toLinkable: input,      // 声明用户是否可以在此处绘制链接
                cursor: "pointer"       // 显示不同的光标以指示潜在的链接点
            });
        },

        //鼠标移入显示节点
        showNodeSmallPorts: function(node, isShow = true) {
            let isEdit = this.param.diagramOper != 'detail';
            if (isEdit) {
                node.ports.each(function (port) {
                    if (port.portId !== "") { // don't change the default port, which is the big shape
                        port.fill = isShow ? "rgba(254,0,0,.7)" : null;
                    }
                });
            }
        },

        // 点击节点
        clickNodeParentFun: function(nodeObj) {
            let isEdit = this.param.diagramOper != 'detail';
            if (isEdit && this.param.clickNodeFun && typeof this.param.clickNodeFun === 'function') {
                this.param.clickNodeFun(nodeObj);
            }
        },

        // 后去全部节点数据
        getAllModel: function() {
            let that = this;
            //暖通组态图的model
            const hvacModel = [
                {
                    name: "lengji",                                         //制冷机
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 70,
                                height: 60,
                                cursor: "pointer"
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)), {
                                click: function (e, node) { // 单击事件
                                    //node, diagramObj, funFlag = '', id
                                    that.clickNodeParentFun(node.part);
                                }
                            },
                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", new go.Spot(0.27, 0.05), go.Spot.Top, true, true),
                            this.makePort("L1", new go.Spot(0.05, 0.4), go.Spot.Left, true, true),
                            this.makePort("L2", new go.Spot(0.05, 0.82), go.Spot.Left, true, true),
                            this.makePort("R1", new go.Spot(0.95, 0.4), go.Spot.Right, true, true),
                            this.makePort("R2", new go.Spot(0.95, 0.82), go.Spot.Right, true, true),
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 5,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit,         // 尺寸自适应
                                editable: false                     // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()),   // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "shuichuliqi",    //水处理器
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                    width: 50,
                                    height: 60,
                                    cursor: "pointer"
                                },
                                new go.Binding("source")), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            this.makePort("T", new go.Spot(0.75, 0.02), go.Spot.Top, true, true),
                            this.makePort("L", new go.Spot(0.02, 0.8), go.Spot.Left, true, true),
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "jifenshuiqi",    //集分水器
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 65,
                                height: 46,
                                cursor: "pointer"
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)),

                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T1", new go.Spot(0.2, 0.2), go.Spot.Top, true, true),
                            this.makePort("T2", new go.Spot(0.4, 0.2), go.Spot.Top, true, true),
                            this.makePort("T3", new go.Spot(0.6, 0.2), go.Spot.Top, true, true),
                            this.makePort("T4", new go.Spot(0.8, 0.2), go.Spot.Top, true, true), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            }
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false, // 文字可编辑
                                textAlign: 'center'
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "jifenshuiqi2",    //集分水器
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 65,
                                height: 46,
                                cursor: "pointer"
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)),

                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T1", new go.Spot(0.12, 0.2), go.Spot.Top, true, true),
                            this.makePort("T2", new go.Spot(0.28, 0.2), go.Spot.Top, true, true),
                            this.makePort("T3", new go.Spot(0.425, 0.2), go.Spot.Top, true, true),
                            this.makePort("T4", new go.Spot(0.57, 0.2), go.Spot.Top, true, true),
                            this.makePort("T5", new go.Spot(0.72, 0.2), go.Spot.Top, true, true),
                            this.makePort("T6", new go.Spot(0.86, 0.2), go.Spot.Top, true, true),
                            {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            }
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false, // 文字可编辑
                                textAlign: 'center'
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node,true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node,false)
                            }
                        }
                    )
                },
                {
                    name: "shuibeng",   //水泵
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot", {
                                width: 60,
                                height: 40
                                //background: "#F5F5F5"
                            },
                            GO_obj(go.Picture, {
                                width: 60,
                                height: 40,
                                cursor: "pointer"
                            }, new go.Binding("source")),
                            GO_obj(go.Picture, {
                                width: 28,
                                height: 28,
                                cursor: "pointer",
                                name: "XFS",
                                alignment: new go.Spot(0.49, 0.5)
                            }, new go.Binding("source", "sourceAni")),

                            this.makePort("L", new go.Spot(0.02, 0.72), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(0.96, 0.22), go.Spot.Right, true, true), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            }
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false, // 文字可编辑
                                //alignment: new go.Spot(0.5, 1.4), //go.Spot.Bottom,
                                textAlign: "center"
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "shuibeng_reverse",   //反向旋转的水泵
                    model: GO_obj(go.Node, "Vertical",this.nodeStyle(),
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot", {
                                width: 60,
                                height: 40
                                //background: "#F5F5F5"
                            },
                            GO_obj(go.Picture, {
                                width: 60,
                                height: 40,
                                cursor: "pointer"
                            }, new go.Binding("source")),
                            GO_obj(go.Picture, {
                                width: 28,
                                height: 28,
                                cursor: "pointer",
                                name: "XFS",
                                alignment: new go.Spot(0.49, 0.5)
                            }, new go.Binding("source", "sourceAni")),

                            this.makePort("L", new go.Spot(0.0, 0.23), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(0.98, 0.75), go.Spot.Right, true, true), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            }
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false, // 文字可编辑
                                //alignment: new go.Spot(0.5, 1.4), //go.Spot.Bottom,
                                textAlign: "center"
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "shuixiang",    //水箱
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 65,
                                height: 55,
                                cursor: "pointer"
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)),

                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", new go.Spot(0.86, 0.05), go.Spot.Top, true, true),
                            this.makePort("L", new go.Spot(0, 0.76), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(1, 0.76), go.Spot.Right, true, true),
                            this.makePort("B", new go.Spot(0.5, 0.86), go.Spot.Bottom, true, true), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            }
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "famen",      //阀门
                    model: GO_obj(go.Node, "Vertical",
                        this.nodeStyle(), { //设置其可旋转
                            rotatable: true,
                            rotateObjectName: "FM",
                            rotateAdornmentTemplate: this.nodeRotateAdornmentTemplate
                        },
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            //{name: "FM"},
                            GO_obj(go.Picture, {
                                width: 30,
                                height: 30,
                                cursor: "pointer"
                            }, new go.Binding("source")),
                            this.makePort("L", new go.Spot(0.05, 0.65), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(0.95, 0.65), go.Spot.Right, true, true),
                        ),
                        GO_obj(
                            go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()
                        ), // 双向绑定模型中"text"属性
                        {
                            click: function (e, node) { // 单击事件
                                that.clickNodeParentFun(node.part)
                            },
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "banhuan",    //板换
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 50,
                                height: 50,
                                cursor: "pointer"
                            }, new go.Binding("source")), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            this.makePort("L1", new go.Spot(0.04, 0.2), go.Spot.Left, true, true),
                            this.makePort("L2", new go.Spot(0.04, 0.8), go.Spot.Left, true, true),
                            this.makePort("R1", new go.Spot(0.96, 0.2), go.Spot.Right, true, true),
                            this.makePort("R2", new go.Spot(0.96, 0.8), go.Spot.Right, true, true),
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "chuanganqi",   //传感器
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(), { //设置其可旋转
                            rotatable: true,
                            rotateObjectName: "FM",
                            rotateAdornmentTemplate: this.nodeRotateAdornmentTemplate
                        },
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 30,
                                height: 40,
                                cursor: "pointer"
                            }, new go.Binding("source")), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            this.makePort("L", new go.Spot(0.04, 0.88), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(0.98, 0.88), go.Spot.Right, true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "guolu",    //锅炉
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 65,
                                height: 45,
                                cursor: "pointer"
                            }, new go.Binding("source")), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            this.makePort("L", new go.Spot(0, 0.55), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(1, 0.55), go.Spot.Right, true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "direjing",   //地热井
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 30,
                                height: 50,
                                cursor: "pointer"
                            }, new go.Binding("source")), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            this.makePort("T", new go.Spot(0.5, 0), go.Spot.Top, true, true),
                            this.makePort("B", new go.Spot(0.5, 1), go.Spot.Bottom, true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: 'qianshuibeng',   //潜水泵
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 30,
                                height: 40,
                                cursor: "pointer"
                            }, new go.Binding("source")), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            this.makePort("T", new go.Spot(0.5, 0), go.Spot.Top, true, true),
                            this.makePort("B", new go.Spot(0.5, 1), go.Spot.Bottom, true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性

                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "xinxi",      //信号模板
                    model: GO_obj(go.Node, "Table", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Auto",
                            GO_obj(go.Shape,
                                'RoundedRectangle', {
                                    stroke: "#23cccc",
                                    fill: 'rgb(30,160,255,0.2)',
                                    cursor: "pointer"
                                },
                                new go.Binding('stroke'),
                                new go.Binding('fill')
                            ),
                            //GO_obj(go.Picture, { width: 'auto', height: 40 }, new go.Binding("source")),
                            GO_obj(go.TextBlock, {
                                    font: "10pt Helvetica, Arial, sans-serif",
                                    stroke: "whitesmoke",
                                    //verticalAlignment: "Center",
                                    //background: "lightblue",
                                }, {
                                    margin: 8,
                                    maxSize: new go.Size(180, NaN),
                                    // wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                    editable: false, // 文字可编辑
                                    cursor: "pointer",
                                    textAlign: "center"
                                },
                                new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                            {
                                click: function (e, node) {
                                    that.clickNodeParentFun(node.part)
                                }
                            }
                        )
                    )
                },
                {
                    name: "lengqueta",        //冷却塔
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot", {
                                width: 62,
                                height: 65,
                                // background: "#F5F5F5"
                            },
                            GO_obj(go.Picture, {
                                width: 62,
                                height: 62,
                                name: "LQT",
                                cursor: "pointer"
                            }, new go.Binding("source")),
                            GO_obj(go.Picture, {
                                width: 30,
                                height: 30,
                                name: "XFS",
                                cursor: "pointer",
                                alignment: new go.Spot(0.5, 0.58)
                            }, new go.Binding("source", "sourceAni")), // 双向绑定模型中"text"属性
                            {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },

                            this.makePort("T", new go.Spot(0.5, 0), go.Spot.Top, true, true),
                            this.makePort("L", new go.Spot(0, 0.55), go.Spot.Left, true, true),
                            this.makePort("R", new go.Spot(1, 0.55), go.Spot.Right, true, true),
                            this.makePort("B", new go.Spot(0.5, 1), go.Spot.Bottom, true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 8,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false, // 文字可编辑
                                alignment: go.Spot.Bottom,
                                //textAlign: "center"
                            },
                            new go.Binding("text").makeTwoWay()),
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "shuoming",
                    model: GO_obj(go.Node, "Table", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Auto",
                            GO_obj(go.Shape,
                                'RoundedRectangle', {
                                    stroke: "rgba(0,0,0,0)",
                                    fill: 'rgba(0,0,0,0)',
                                    cursor: "pointer"
                                }
                            ),
                            //GO_obj(go.Picture, { width: 'auto', height: 40 }, new go.Binding("source")),
                            GO_obj(go.TextBlock, {
                                    font: "10pt Helvetica, Arial, sans-serif",
                                    stroke: "whitesmoke",
                                    // verticalAlignment: "Center",
                                    // background: "lightblue",
                                }, {
                                    margin: 8,
                                    maxSize: new go.Size(220, NaN),
                                    width: 90,
                                    wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                    editable: false, // 文字可编辑
                                    cursor: "pointer",
                                    // textEditor: window.TextEditorSelectBox,
                                    // textEdited:
                                },
                                new go.Binding("text").makeTwoWay(), new go.Binding("stroke", "color"), ), // 双向绑定模型中"text"属性

                            {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                    // bindTextColor(node.part);
                                }
                            }
                        )
                    )
                },
            ]
            //配电室组态图的model
            const electricModel = [
                {
                    name: "bianyaqi",
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        { //设置其可旋转
                            rotatable: true,
                            rotateObjectName: "BYQ",
                            rotateAdornmentTemplate: that.nodeRotateAdornmentTemplate
                        },
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 30,
                                height: 50,
                                cursor: "pointer",
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", new go.Spot(0.5, 0.05), go.Spot.Top, true, true),
                            this.makePort("B", new go.Spot(0.5, 1), go.Spot.Bottom, true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 5,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    ) // 默认类型
                },
                {
                    name: "dianronggui",
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 70,
                                height: 60,
                                cursor: "pointer"
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", go.Spot.Top, new go.Spot(0.5, 0), true, true),
                            this.makePort("B", go.Spot.Bottom, new go.Spot(0.5, 1), true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 5,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: 'kaiguan1',
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        { //设置其可旋转
                            rotatable: true,
                            rotateObjectName: "KG1",
                            rotateAdornmentTemplate: this.nodeRotateAdornmentTemplate
                        },
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 70,
                                height: 60,
                                cursor: "pointer",
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", go.Spot.Top, new go.Spot(0.56, -0.01), true, true),
                            this.makePort("B", go.Spot.Bottom, new go.Spot(0.5, 1), true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 5,
                                maxLines: 8,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            },
                            click: async function (e, node) {
                                that.clickNodeParentFun(node.part)
                                //await signalNodeClickHandle(this.hoverAndClick,id,node,flag,false)
                            }
                        }
                    )
                },
                {
                    name: "kaiguan2",
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        { //设置其可旋转
                            rotatable: true,
                            rotateObjectName: "KG2",
                            rotateAdornmentTemplate: this.nodeRotateAdornmentTemplate
                        },
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 70,
                                height: 60,
                                cursor: "pointer",
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", go.Spot.Top, new go.Spot(0.5, 0), true, true),
                            this.makePort("B", go.Spot.Bottom, new go.Spot(0.5, 1), true, true)
                        ),
                        GO_obj(
                            go.TextBlock, this.textStyle(), {
                                margin: 5,
                                maxLines: 3,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()
                        ), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "wenbenkuang",
                    model: GO_obj(go.Node, "Vertical", this.nodeStyle(),
                        { //设置其可旋转
                            rotatable: true,
                            rotateObjectName: "WBK",
                            rotateAdornmentTemplate: this.nodeRotateAdornmentTemplate
                        },
                        new go.Binding("angle").makeTwoWay(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Spot",
                            GO_obj(go.Picture, {
                                width: 40,
                                height: 60,
                                cursor: "pointer",
                            }, new go.Binding("source"), new go.Binding('desiredSize', 'size', go.Size.parse)), {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                }
                            },
                            // 上、左、右可以入，左、右、下可以出
                            // "Top"表示中心，"TopSide"表示上方任一位置，自动选择
                            this.makePort("T", go.Spot.Top, new go.Spot(0.5, 0), true, true),
                            this.makePort("B", go.Spot.Bottom, new go.Spot(0.5, 1), true, true)
                        ),
                        GO_obj(go.TextBlock, this.textStyle(), {
                                margin: 5,
                                maxLines: 2,
                                maxSize: new go.Size(70, NaN),
                                wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                editable: false // 文字可编辑
                            },
                            new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                        { //鼠标移入/移出 ---- 显示/隐藏连接点操作
                            mouseEnter: function (e, node) {
                                that.showNodeSmallPorts(node, true)
                            },
                            mouseLeave: function (e, node) {
                                that.showNodeSmallPorts(node, false)
                            }
                        }
                    )
                },
                {
                    name: "shuoming",
                    model: GO_obj(go.Node, "Table", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Auto",
                            GO_obj(go.Shape,
                                'RoundedRectangle', {
                                    stroke: "rgba(0,0,0,0)",
                                    fill: 'rgba(0,0,0,0)',
                                    cursor: "pointer"
                                }
                            ),
                            //GO_obj(go.Picture, { width: 'auto', height: 40 }, new go.Binding("source")),
                            GO_obj(go.TextBlock, {
                                    font: "10pt Helvetica, Arial, sans-serif",
                                    stroke: "whitesmoke",
                                    // verticalAlignment: "Center",
                                    // background: "lightblue",
                                }, {
                                    margin: 8,
                                    maxSize: new go.Size(220, NaN),
                                    width: 90,
                                    wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                    editable: false, // 文字可编辑
                                    cursor: "pointer",
                                    // textEditor: window.TextEditorSelectBox,
                                    // textEdited:
                                },
                                new go.Binding("text").makeTwoWay(), new go.Binding("stroke", "color"), ), // 双向绑定模型中"text"属性

                            {
                                click: function (e, node) { // 单击事件
                                    that.clickNodeParentFun(node.part)
                                    // bindTextColor(node.part);
                                }
                            }
                        )
                    )
                },
                {
                    name: "xinxi",
                    model: GO_obj(go.Node, "Table", this.nodeStyle(),
                        // 步骤节点是一个包含可编辑文字块的长方形图块
                        GO_obj(go.Panel, "Auto",
                            GO_obj(go.Shape,
                                'RoundedRectangle', {
                                    stroke: "#23cccc",
                                    fill: 'rgb(30,160,255,0.2)',
                                    cursor: "pointer"
                                },
                                new go.Binding('stroke'),
                                new go.Binding('fill')
                            ),
                            //GO_obj(go.Picture, { width: 'auto', height: 40 }, new go.Binding("source")),
                            GO_obj(go.TextBlock, {
                                    font: "10pt Helvetica, Arial, sans-serif",
                                    stroke: "whitesmoke",
                                    //verticalAlignment: "Center",
                                    //background: "lightblue",
                                }, {
                                    margin: 8,
                                    maxSize: new go.Size(180, NaN),
                                    // wrap: go.TextBlock.WrapFit, // 尺寸自适应
                                    editable: false, // 文字可编辑
                                    cursor: "pointer",
                                    textAlign: "center"
                                },
                                new go.Binding("text").makeTwoWay()), // 双向绑定模型中"text"属性
                            {
                                click: async function (e, node) {
                                    that.clickNodeParentFun(node.part)
                                    // await signalNodeClickHandle(this.hoverAndClick,id,node,flag,true)
                                }
                            }
                        )
                    )
                },
            ]

            switch (this.param.diagramType) {
                case 'hvac':
                    return hvacModel;
                case 'electric':
                    return electricModel;
                default:
                    return hvacModel;
            }
        },
        // 节点部分 结束====================================================

        // 初始化 添加所有节点Model
        addAllModel: function() {
            let AllModel = this.getAllModel();
            AllModel.forEach(item => {
                this.DiagramObject.nodeTemplateMap.add(item.name, item.model);
            });

            if (this.param.diagramOper != 'detail'){
                this.addPaletteList();
            }
        },

        // 详情
        detailDiagram: function() {
            // let configObj = {
            //     "initialContentAlignment": go.Spot.Center,      // 居中显示内容
            //     "contentAlignment": go.Spot.Center,             // 画布自动管理
            //     "initialAutoScale": go.Diagram.Uniform,         // 初始布局自适应
            //     "scrollMode": go.Diagram.InfiniteScroll,        // 无限画布拖动
            //     "undoManager.isEnabled": true,                  // 启用Ctrl-Z和Ctrl-Y撤销重做功能
            //     "allowDrop": true,                              // 是否允许从Palette面板拖入元素
            //     // "LinkDrawn": showLinkLabel,                  // 每次画线后调用的事件：为条件连线加上标签，该方法再后面定义
            //     // "LinkRelinked": showLinkLabel,               // 每次重画线后调用的事件：同上LinkDrawn
            //     "scrollsPageOnFocus": false,                    // 图选中时页面不会滚动
            //     "isReadOnly": true,                             // 是否只读属性
            //     "allowSelect": false,                           // 禁止选中
            //     // "ModelChanged": function (e) { // just for demonstration purposes,
            //     //     if (e.isTransactionFinished) { // show the model data in the page's TextArea
            //     //         if (!($("#mySavedModel").length == 0)) {
            //     //             document.getElementById("mySavedModel").textContent = e.model.toJson();
            //     //         }
            //     //     }
            //     // }
            // }
            // this.DiagramObject = GO_obj( go.Diagram, this.elementId, configObj );

            this.addAllModel();

            this.DiagramObject.linkTemplate = GO_obj(go.Link, {
                    //locationSpot: go.Spot.Center,
                    toShortLength: -2,
                    fromShortLength: -2,
                    layerName: "Background",
                    corner: 5,
                    routing: go.Link.AvoidsNodes,
                    // fromSpot: go.Spot.RightSide,
                    // toSpot: go.Spot.LeftSide
                },
                // 确保链接从正确的方向进入并适当地退出
                new go.Binding("fromSpot", "fromSpot", function (d) {
                    return this.spotConverter(d);
                }),
                new go.Binding("toSpot", "toSpot", function (d) {
                    return this.spotConverter(d);
                }),
                new go.Binding("points").makeTwoWay(),
                // mark each Shape to get the link geometry with isPanelMain: true
                // GO_obj(go.Shape, {isPanelMain: true, stroke: colors.lightblue, strokeWidth: 10},
                //     new go.Binding("stroke", "color", function (c) {
                //         return colors[c];
                //     })),
                GO_obj(go.Shape, {
                    isPanelMain: true,
                    stroke: '#22c8f7',
                    strokeWidth: 2,
                    name: "PIPE",
                    strokeDashArray: this.param.defLinkTemple
                }, new go.Binding("strokeDashArray", "linkType"), new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "lineWidth")),
                // $(go.Shape, {
                //     toArrow: "Standard",
                //     fill: '#22C8F7',
                //     segmentIndex: NaN
                // })
            );
        },

        // 编辑
        editDiagram: function() {
            // 节点
            this.addAllModel();

            let linkSelectionAdornmentTemplate = $(go.Adornment, "Link",
                $(go.Shape,
                    // isPanelMain declares that this Shape shares the Link.geometry
                    {
                        isPanelMain: true,
                        fill: null,
                        stroke: "deepskyblue",
                        strokeWidth: 0
                    }) // use selection object's strokeWidth
            );
            // 线段
            let that = this;
            this.DiagramObject.linkTemplate = GO_obj(go.Link, {
                    selectable: true,
                    selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
                    relinkableFrom: true,
                    relinkableTo: true, // enable the RelinkingTool
                    reshapable: true, // enable the LinkReshapingTool
                    // adjusting: go.Link.Normal, // or go.Link.End
                    click: function (e, link) {
                        let p = e.diagram.lastInput.documentPoint;
                        let seg = link.findClosestSegment(p);
                        let pts = link.points.copy();
                        pts.insertAt(seg + 1, p.copy());
                        e.diagram.commit(function (diag) {
                            link.points = pts;
                        }, "inserted point in link route");
                    }
                },
                {
                    //locationSpot: go.Spot.Center,
                    toShortLength: -2,
                    fromShortLength: -2,
                    layerName: "Background",
                    corner: 5,
                    routing: go.Link.Orthogonal,
                    resegmentable: true,
                    // fromSpot: go.Spot.RightSide,
                    // toSpot: go.Spot.LeftSide
                },
                // 确保链接从正确的方向进入并适当地退出
                // new go.Binding("fromSpot", "fromSpot", function (d) {
                //     return spotConverter(d);
                // }),
                // new go.Binding("toSpot", "toSpot", function (d) {
                //     return spotConverter(d);
                // }),
                new go.Binding("points").makeTwoWay(),
                new go.Binding("routing", "routingType"),

                GO_obj(go.Shape, {
                    cursor: "pointer"
                }, {
                    isPanelMain: true,
                    stroke: '#22c8f7',
                    strokeWidth: 2,
                    name: "PIPE",
                    strokeDashArray: that.param.defLinkTemple
                }, new go.Binding("strokeDashArray", "linkType"), new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "lineWidth")), {
                    click: function (e, node) {
                        that.param.clickLineFun(e,node,that.DiagramObject);
                    }
                }
            );
        },
        // 处理线段
        // addLinkTpl() {
        //     this.DiagramObject.linkTemplate = GO_obj(go.Link, {
        //             //locationSpot: go.Spot.Center,
        //             toShortLength: -2,
        //             fromShortLength: -2,
        //             layerName: "Background",
        //             corner: 5,
        //             routing: go.Link.AvoidsNodes,
        //             // fromSpot: go.Spot.RightSide,
        //             // toSpot: go.Spot.LeftSide
        //         },
        //         // 确保链接从正确的方向进入并适当地退出
        //         new go.Binding("fromSpot", "fromSpot", function (d) {
        //             return this.spotConverter(d);
        //         }),
        //         new go.Binding("toSpot", "toSpot", function (d) {
        //             return this.spotConverter(d);
        //         }),
        //         new go.Binding("points").makeTwoWay(),
        //         // mark each Shape to get the link geometry with isPanelMain: true
        //         // GO_obj(go.Shape, {isPanelMain: true, stroke: colors.lightblue, strokeWidth: 10},
        //         //     new go.Binding("stroke", "color", function (c) {
        //         //         return colors[c];
        //         //     })),
        //         GO_obj(go.Shape, {
        //             isPanelMain: true,
        //             stroke: '#22c8f7',
        //             strokeWidth: 2,
        //             name: "PIPE",
        //             strokeDashArray: this.param.defLinkTemple
        //         }, new go.Binding("strokeDashArray", "linkType"), new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "lineWidth")),
        //         // $(go.Shape, {
        //         //     toArrow: "Standard",
        //         //     fill: '#22C8F7',
        //         //     segmentIndex: NaN
        //         // })
        //     );
        // }

        // 动态线
        spotConverter: function(dir) {
            if (dir === "left") return go.Spot.LeftSide;
            if (dir === "right") return go.Spot.RightSide;
            if (dir === "top") return go.Spot.TopSide;
            if (dir === "bottom") return go.Spot.BottomSide;
            if (dir === "rightsingle") return go.Spot.Right;
        },

        // 键盘微调
        keyBoradListening: function() {
            let thatDiagramObj = this.DiagramObject;
            thatDiagramObj.commandHandler.doKeyDown = function () {
                let selectNodeList = [];
                let nodeList = thatDiagramObj.selection;
                nodeList.each(nodeItem => {
                    selectNodeList.push(nodeItem);
                })

                var e = thatDiagramObj.lastInput;
                if (selectNodeList.length !== 0) {
                    if (e.key === 'Up') {
                        selectNodeList.forEach(item => {
                            let x = Number(item.data.loc.split(' ')[0]);
                            let y = Number(item.data.loc.split(' ')[1]);
                            thatDiagramObj.model.setDataProperty(item.data, 'loc', `${x} ${y-0.1}`)
                        });
                        return;
                    } else if (e.key === 'Down') {
                        selectNodeList.forEach(item => {
                            let x = Number(item.data.loc.split(' ')[0]);
                            let y = Number(item.data.loc.split(' ')[1]);
                            thatDiagramObj.model.setDataProperty(item.data, 'loc', `${x} ${y+0.1}`)
                        });
                        return;
                    }
                    if (e.key === 'Left') {
                        selectNodeList.forEach(item => {
                            let x = Number(item.data.loc.split(' ')[0]);
                            let y = Number(item.data.loc.split(' ')[1]);
                            thatDiagramObj.model.setDataProperty(item.data, 'loc', `${x-0.1} ${y}`)
                        });
                        return;
                    } else if (e.key === 'Right') {
                        selectNodeList.forEach(item => {
                            let x = Number(item.data.loc.split(' ')[0]);
                            let y = Number(item.data.loc.split(' ')[1]);
                            thatDiagramObj.model.setDataProperty(item.data, 'loc', `${x+0.1} ${y}`)
                        });
                        return;
                    }
                    go.CommandHandler.prototype.doKeyDown.call(this)
                } else {
                    // console.log("当前未选中节点");
                }
            }
        },

        // 控制管道动画流动
        onSelectionChanged: function() {
            //箭头流动动画
            // animateColorAndFraction(diagramInstance);
            var animation = new go.Animation();
            animation.easing = go.Animation.EaseLinear;

            this.DiagramObject.links.each(function (link) {
                if (link.data.isFoll == false) {

                } else {
                    animation.add(link.findObject("PIPE"), "strokeDashOffset", 20, 0)
                }

            });
            // Run indefinitely
            animation.runCount = Infinity;
            animation.start();
        },

        // 控制节点旋转动画
        nodeAngle: function(key, isOpen = true) {
            var animation = new go.Animation();
            // 获取对应Key的节点对象（以下两种不同的方法）
            var nodeObj = this.DiagramObject.findNodeForKey(key);
            var angleNode = nodeObj.findObject('XFS')
            // var nodeData = myDiagram.findNodesByExample({"category":"lengqueta"})

            if (isOpen) {
                animation.add(angleNode, "angle", 0, 360); // 旋转
                animation.easing = go.Animation.EaseLinear; // 匀速
                animation.runCount = Infinity;
                animation.duration = 2000; // 动画时长
                animation.start(); // 开始动画操作
            } else {
                animation.stop()
            }
        },

        // 反向旋转节点动画
        nodeAngleReverse: function(key, isOpen = true) {
            var animation = new go.Animation();
            // 获取对应Key的节点对象（以下两种不同的方法）
            var nodeObj = this.DiagramObject.findNodeForKey(key);
            var angleNode = nodeObj.findObject('XFS')
            // var nodeData = myDiagram.findNodesByExample({"category":"lengqueta"})

            if (isOpen) {
                animation.add(angleNode, "angle", 360, 0);      // 旋转
                animation.easing = go.Animation.EaseLinear;     // 匀速
                animation.runCount = Infinity;
                animation.duration = 2000; // 动画时长
                animation.start(); // 开始动画操作
            } else {
                // animation.stop();           // 开始动画操作
                //nodeObj.animationManager.stopAnimation(true);
                //myDiagram.animationManager.stopAnimation(true)
                animation.stop()
            }
        },

        // 控制节点呼吸动画
        nodeOpacity: function(key, isOpen = true) {
            var animation = new go.Animation();
            // 获取对应Key的节点对象（以下两种不同的方法）
            var nodeObj = this.DiagramObject.findNodeForKey(key);
            if (isOpen) {
                animation.add(nodeObj, "opacity", 0.3, 1); // 呼吸动效
                animation.easing = go.Animation.EaseInOutQuad; // 匀速
                animation.runCount = Infinity;
                animation.reversible = true; // 反向重复（用于呼吸循环效果）
                animation.duration = 1000; // 动画时长
                animation.start();          // 开始动画操作
            } else {
                animation.stop(); // 停止动画操作
            }
        },

        //将图片资源的路径统一替换成公共资源路径
        replaceImgSrc: function(imgSrc = '') {
            let imgName = imgSrc.substr(imgSrc.lastIndexOf('/'));
            return this.param.sourcePath + imgName;
        },

        // 根据状态改变节点的背景图片
        changeNodeImg: function(jsonData, key, state) {
            let data = jsonData;
            data.nodeDataArray.map(item => {
                if (item.key == key) {
                    if (item.source || item.sourceAni) {
                        if (state == 'grey') {
                            item.source = item.source.replace('.png', '_1.png');
                        } else if (state == 'red') {
                            item.source = item.source.replace('.png', '_red.png');
                        }else if (state == 'green') {
                            item.source = item.source.replace('.png', '_green.png');
                        }
                    }
                    if (item.sourceAni) {
                        if (state == 'grey') {
                            item.sourceAni = item.sourceAni.replace('.png', '_1.png');
                        } else if (state == 'red') {
                            item.sourceAni = item.sourceAni.replace('.png', '_red.png');
                        }else if (state == 'green') {
                            item.sourceAni = item.sourceAni.replace('.png', '_green.png');
                        }
                    }
                }
            });
            return data;
        },

        // 电力组态图默认开关状态验证
        elecSwitchDefaultState: function(switchId, state){
            //switchId 为1是开关1 switchId为2是开关2    state 0关 1开
            let imgPath = this.param.sourcePath;
            if(switchId == 1){
                return state === '1' ? imgPath+'/switchOne_open.png' : imgPath+'/switchOne.png';
            }else{
                return state === '1' ? imgPath+'/switchTwo_open.png' : imgPath+'/switchTwo.png';
            }
        },

        // 绘制组态图
        drawDiagram: function(jsonData) {
            // let jsonData = this.param.diagramData;
            // let diagObj = this.DiagramObject;
            this.addAllModel();

            this.DiagramObject.linkTemplate = GO_obj(go.Link, {
                    //locationSpot: go.Spot.Center,
                    toShortLength: -2,
                    fromShortLength: -2,
                    layerName: "Background",
                    corner: 5,
                    routing: go.Link.AvoidsNodes,
                    // fromSpot: go.Spot.RightSide,
                    // toSpot: go.Spot.LeftSide
                },
                // 确保链接从正确的方向进入并适当地退出
                new go.Binding("fromSpot", "fromSpot", function (d) {
                    return this.spotConverter(d);
                }),
                new go.Binding("toSpot", "toSpot", function (d) {
                    return this.spotConverter(d);
                }),
                new go.Binding("points").makeTwoWay(),
                // mark each Shape to get the link geometry with isPanelMain: true
                // GO_obj(go.Shape, {isPanelMain: true, stroke: colors.lightblue, strokeWidth: 10},
                //     new go.Binding("stroke", "color", function (c) {
                //         return colors[c];
                //     })),
                GO_obj(go.Shape, {
                    isPanelMain: true,
                    stroke: '#22c8f7',
                    strokeWidth: 2,
                    name: "PIPE",
                    strokeDashArray: this.param.defLinkTemple
                }, new go.Binding("strokeDashArray", "linkType"), new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "lineWidth")),
                // $(go.Shape, {
                //     toArrow: "Standard",
                //     fill: '#22C8F7',
                //     segmentIndex: NaN
                // })
            );
            let iconPath = this.param.sourcePath;
            // var jsonstr = jsonData != undefined ? jsonData : [];

            // 获取页面全部节点, 判断动画节点
            // 遍历数据 加上信号传过来的值
            // jsonData.nodeDataArray[2].plctempValue = 1;
            if (jsonData.length != 0) {
                jsonData.nodeDataArray.map((item) => {
                    if(item.source){
                        item.source = this.replaceImgSrc(item.source);
                    }
                    if(item.sourceAni){
                        item.sourceAni = this.replaceImgSrc(item.sourceAni);
                    }
                    if(item.isPlc == 1) {
                        if (item.category == 'kaiguan1') {
                            item.source = iconPath+"/switchOne.png";
                            switch (item.plctempValue) {
                                case "闭合":
                                    item.source = iconPath+"/switchOne_open.png";
                                    break;
                                case "断开":
                                    item.source = iconPath+"/switchOne_red.png";
                                    break;
                                case "--":
                                    item.source = iconPath+"/switchOne_1.png";
                                    break;
                                default:
                                    item.source = this.elecSwitchDefaultState(1, item.defaultState)
                            }
                        }
                        if (item.category == 'kaiguan2') {
                            item.source = iconPath+"/switchTwo.png";
                            switch (item.plctempValue) {
                                case "闭合":
                                    item.source = iconPath+"/switchTwo_open.png";
                                    break;
                                case "断开":
                                    item.source = iconPath+"/switchTwo_red.png";
                                    break;
                                case "--":
                                    item.source = iconPath+"/switchTwo_1.png";
                                    break;
                                default:
                                    item.source = this.elecSwitchDefaultState(2, item.defaultState);
                            }
                        }
                    }
                    if(item.category == 'xinxi') {
                        if (item.alarmType == '5') {
                            item['text'] = item.text + '离线';
                        } else {
                            item['text'] = item.text + (item.plctempValue ? item.plctempValue : '');
                        }
                    }
                    if(item.sysId=='1'){ //暖通的走这里
                        if (item.refeStatus != 'start_type') {
                            // jsonData = NoNormalLine(jsonData, item.key);
                            item.isAnimation = '';
                        }
                        //锅炉 水泵 反向水泵 制冷机运行状态绿色图片切换
                        if (item.category === 'shuibeng' || item.category == 'shuibeng_reverse' || item.category === 'lengji' || item.category === 'guolu') {
                            if (item.refeStatus == 'start_type') {
                                jsonData = this.changeNodeImg(jsonData, item.key, 'green');
                            }
                        }
                        if(item.category === 'guolu' && item.refeStatus == 'start_type'){   //锅炉的开启状态
                            item.isAnimation= 2;    //呼吸动画
                        }
                        if(item.category === 'lengji' && item.refeStatus == 'start_type'){   //冷机的开启状态
                            item.isAnimation= 2;    //呼吸动画
                        }
                        // if (item.refeStatus == 'stop_type') {
                        //     jsonData = changeBgImg(jsonData, item.key, 'grey');
                        // }
                        if (item.refeStatus == 'o_alarm_type') { //离线
                            jsonData = this.changeNodeImg(jsonData, item.key, 'grey');
                        }
                        if (item.refeStatus == 'd_alarm_type') { //报警
                            jsonData = this.changeNodeImg(jsonData, item.key, 'red');
                        }
                    }
                })
            }

            this.DiagramObject.model = go.Model.fromJson(jsonData);

            // if (isLineflowing === true) {
            //     // onSelectionChanged(diagObj);
            // }

            // 获取页面全部节点, 判断动画节点
            if (jsonData.length != 0) {
                jsonData.nodeDataArray.map((item) => {
                    if (item.isAnimation == 1) {
                        this.nodeAngle(item.key)
                    }
                    if (item.isAnimation == 2) {
                        if(item.category === 'guolu' || item.category === 'lengji'){
                            this.nodeOpacity (item.key)
                        }
                    }
                    if (item.isAnimation == 3) { //反向旋转节点
                        this.nodeAngleReverse(item.key);
                    }
                    if (item.category == 'shuibeng' || item.category == 'shuibeng_reverse') {
                        if (item.refeStatus == "start_type") {
                            this.onSelectionChanged(this.DiagramObject);
                        }
                    }
                    //0正常 3预警 4规则报警 5离线 6故障
                    if (item.category == 'xinxi') {
                        if (item.alarmType == '3' || item.alarmType == '4' || item.alarmType == '6') {
                            let myObj = this.DiagramObject.findNodeForKey(item.key);
                            //红
                            this.DiagramObject.model.setDataProperty(myObj.part.data, 'fill', '#481e1e');
                            this.DiagramObject.model.setDataProperty(myObj.part.data, 'stroke', '#FF4444');
                        } else if (item.alarmType == '5') {
                            let myObj = this.DiagramObject.findNodeForKey(item.key);
                            //灰
                            this.DiagramObject.model.setDataProperty(myObj.part.data, 'fill', '#2B3745');
                            this.DiagramObject.model.setDataProperty(myObj.part.data, 'stroke', '#999999');
                        }
                    }
                })
            }

            if (this.param.isLineflowing === true) {
                this.onSelectionChanged();
            }
        }
    }

    return DiagramTool;
})(jQuery);
