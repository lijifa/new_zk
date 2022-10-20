//这两个导入的时候，接收的成员名称（React/ReactDOM）必须这么写
import React from 'react'   //创建组件、虚拟DOM元素，生命周期

import { KeepAlive } from 'react-activation';
//开始创建一个新的React组件并导入库！
import Unity, { UnityContent } from "react-unity-webgl";

class IndexMenu extends React.Component {
  constructor(props) {
    super(props);
    /*接下来创建一个新的Unity内容对象初始化并定义WebGL构建。
    这个路径是相对于索引文件的。 */

    // let StreamingAssets = require('@/assets/unity3d/menuOneU3d/Build/StreamingAssets/');
    this.unityContent = new UnityContent(
      '/unity3d/menuOneU3d/Build/XianYiYuan.json',
      '/unity3d/menuOneU3d/Build/UnityLoader.js', {
        // streamingAssetsUrl: './Test08/Build/StreamingAssets/',
        adjustOnWindowResize: true,
      }
    );

    this.unityContent.on("progress", (progression) => {
      // Now we can use the progression to for example
      // display it on our React app.
      console.log('progression==========');
      console.log(progression);
      // this.setState({
      //   progression: progression,
      // });
    })
    this.unityContent.on("error", (message) => {
      // Now we can use the error to for example
      // display it on our React app.
      console.log(message);
    });

    // 退出
    this.unityContent.on("quitted", () => {
      console.log('unity3D退出=================');
      // Now we can for example go back to another page
    });
  }
 
  render() {
    //最后渲染Unity组件并通过通过道具统一内容。
    return <KeepAlive id={66} name={'/menuPage/menu1'} path={'/menuPage/menu1'} cacheKey={'/menuPage/menu1'}><>
     

     
    <h1 className='textColor'>县医院模型</h1>
    <Unity unityContent={this.unityContent} />
    </></KeepAlive>;
  }
}

export default IndexMenu;