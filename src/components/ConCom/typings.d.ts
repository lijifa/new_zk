declare namespace API {
    interface Props {
        ID: any; //id
        Data?: Array<any>; //数据data
        unit?: string; //单位名称
        title?: text;//中间一行
        title2?: text;//中间第二行
        title3?: text; //中间第三行
        circle?:Circle, //圆环属性
        middletext ? :Middletext //中间汉字位置
        outsidetext ? :Outsidetext // 外边汉字的位置
      }
      interface text {
        text?: any; //value数据
        size?: number; // value的大小
        linHeight?: number; //value的高度
        color?: any; //数据颜色
      }
      interface Circle {
        max:any, //最大圆长度
        min:number,//最小圆长度
        top:any, // 左 50%
        left:any, //上 50%
        type?:any //类型 //pie
      }
      interface Middletext {
        top:any //
        left:any
      }
      interface Outsidetext {
        top:any, 
        left :any,
        color?:any,
        size1?:number, //第一个value大小
        size2?:number,//第二个value大小
        size3?:number,//第三个value大小
        width1?:number,
      }







}