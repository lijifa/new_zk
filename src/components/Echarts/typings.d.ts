interface PieData {
  type: string /*        图表类型
                          LineChart    折线图
                          BarChart     柱状图
                          VerBarChart  横向柱状图
                          RoundChart   圆环图
                          DashChart    仪表盘
                       */;
  XDATA: string[] | number[] | number | Array<any>;
  YDATA?: number[] | number[][];

  // 折线图参数 Line...
  LineName?: string | string[]; //线段名字
  LineStyleColor?: string | string[]; //线段颜色
  LineStyleOpacity?: string | string[]; //线段透明度
  LineYAxisName?: string; //Y轴单位
  LineGrid?: object; //边距
  LineXInterval?: number; //X轴数据间距
  LineYInterval?: number; //Y轴数据间距
  LineTooltipShow?: boolean; //提示框可见
  LineXtextColor?: string; //X轴刻度文字颜色
  LineColor?: string; //刻度颜色
  LineYtextColor?: string; //Y轴刻度文字颜色
  LineLegendColor?: string; //图例文字颜色
  LineLegendPadding?: number[]; //图例位置

  // 柱状图参数 Bar...
  BarName?: string | string[]; //线段名字
  BarStyleColor?: string | string[]; //线段颜色
  BarYAxisName?: string; //Y轴单位
  BarGrid?: object; //边距
  BarXInterval?: number; //X轴数据间距
  BarYInterval?: number; //Y轴数据间距
  BarTooltipShow?: boolean; //提示框可见

  // 横向柱状图参数 Ver...
  VerlabelColor?: string; //Y轴表单左侧文字颜色
  VerlabelFontSize?: number; //Y轴表单左侧文字大小
  VercountColor?: string; //Y轴表单右侧文字颜色
  VercountFontSize?: number; //Y轴表单右侧文字大小
  VershowCount?: boolean; //是否显示右侧文字
  VerstartColor?: string; //开始颜色
  VerendColor?: string; //结束颜色
  VerbarWidth?: number; //线条宽度

  // 圆环图参数 Round...
  RoundTextColor?: string; //文字颜色
  RoundStyleColor?: string; //线段颜色
  RoundPieName?: string; //线段名称
  RoundDataName?: string; //数据名称
  RoundRadius?: string[]; //宽度
  RoundTooltipShow?: boolean; //提示框可见

  // 仪表盘参数 Dash...
  DashOutTextStyle?: string; //外侧文字颜色
  DashInStyle?: string; //线段颜色
  DashMaxData?: number; //最大刻度
  DashTextPosition?: number; //文字位置
  DashPoint?: string[]; //图形位置
  DashShowText?: boolean; //是否显示文字

  // 带图例的圆环图参数 ConCom...
  ConComUnit?: string; //单位名称
  ConComTitle?: text; //中间一行
  ConComTitle2?: text; //中间第二行
  ConComTitle3?: text; //中间第三行
  ConComCircle?: Circle; //圆环属性
  ConComMiddletext?: Middletext; //中间汉字位置
  ConComOutsidetext?: Outsidetext; // 外边汉字的位置
  ConComColor?: string[]; //圆环颜色 按照顺序
}
interface text {
  text?: any; //value数据
  size?: number; // value的大小
  linHeight?: number; //value的高度
  color?: any; //数据颜色
}
interface Circle {
  max: any; //最大圆长度
  min: number; //最小圆长度
  top: any; // 左 50%
  left: any; //上 50%
  type?: any; //类型 //pie
}
interface Middletext {
  top: any; //
  left: any;
}
interface Outsidetext {
  top: any;
  left: any;
  color?: any;
  size1?: number; //第一个value大小
  size2?: number; //第二个value大小
  size3?: number; //第三个value大小
  width1?: number;
}
