// 全局JS
function delDom (): void {
	let u3dScriptDom = document.getElementsByClassName("newU3d");
	console.log('u3dScriptDom ==============');
	console.log(u3dScriptDom);
	// if (u3dScriptDom && u3dScriptDom.length > 0) {
	// 	let bodyDom = document.getElementsByTagName("body");
	// 	bodyDom.removeChild(u3dScriptDom);
	// }
}

function testAlert(params:string): void{
    alert(params)
}