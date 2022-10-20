//这两个导入的时候，接收的成员名称（React/ReactDOM）必须这么写
import React from 'react'   //创建组件、虚拟DOM元素，生命周期
import ReactDOM from 'react-dom'  //把创建好的组件和虚拟DOM放到页面上
 
//开始创建一个新的React组件并导入库！
import Unity, { UnityContent } from "react-unity-webgl";
 
class MenuTwo extends React.Component {
  constructor(props) {
    super(props);
 
    /*接下来创建一个新的Unity内容对象初始化并定义WebGL构建。
    这个路径是相对于索引文件的。 */

    // let StreamingAssets = require('@/assets/menuOneU3d/Build/StreamingAssets/');
    this.unityContent = new UnityContent(
      '/unity3d/Test08/Build/unity3d/Test08.json',
      '/unity3d/Test08/Build/UnityLoader.js', {
        // streamingAssetsUrl: './unity3d/Test08/Build/StreamingAssets/',
        adjustOnWindowResize: true,
      }
    );

    console.log('this.unityContent===========');
    console.log(this.unityContent);

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
  }
 
  render() {
    //最后渲染Unity组件并通过通过道具统一内容。
    return <>
      <Unity unityContent={this.unityContent} />
    </>;
  }
}

export default MenuTwo;