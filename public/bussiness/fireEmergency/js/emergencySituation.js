var emergencySitua = {};
var _SITE_ID = getParams()["siteId"]; //站点id
var sitename = getParams()["sitename"]; //站点名称
var timer = null;
document.addEventListener('visibilitychange',function(){
	if(document.visibilityState == 'hidden'){
		clearInterval(timer);
	} else {
		
	}
})
emergencySitua.init = function(){
	emergencySitua.baseData();
	emergencySitua.deviceList1();// 设备故障详情
	emergencySitua.deviceList2();// 设备故障详情
}
emergencySitua.baseData = function(){
	$('#alarm1').html('正常');
	$('#fault1').html(5);
	$('#onLine1').html('正常');
	$('#outLine1').html(0);
	$('#alarm2').html('正常');
	$('#fault2').html(9);
	$('#onLine2').html(2156);
	$('#outLine2').html(36);
	$('#main1').html(47);
	$('#main2').html(8);
	$('#main3').html(55);
	$('#main4').html(47);
	$('#main5').html(47);
	$('#main6').html(4);
	$('#main7').html(754);
	$('#main8').html(960);
	$('#main9').html(18);
	$('#main10').html(9);
}
// 设备故障详情
emergencySitua.deviceList1 = function(){
	let flag = Math.round(Math.random()*10);
	if(flag<0){
		$('#device1 .hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		var deviceDetailParam = {
			title: ['设备名称', '所在位置','故障时间'], //列表标题
			list: [], //列表数据.
			hangLie: {
				lieflag: true, //间隔列开
				lienum: '8', //间隔列 从0开始
				hangflag: true, //间隔行开
				hangnum: '1', //间隔行 从0开始
			}
		}
		let list = [
			{
				name: 'B03 108联动闭门器',
				site: '二层',
				time: changeTimeDate(1)+' 13:28:34'
			},
			{
				name: 'B03 183电子门磁',
				site: '一层',
				time: changeTimeDate(1)+' 15:24:38'
			},
			{
				name: 'B07 038防火门监测器',
				site: '二层',
				time: changeTimeDate(2)+' 15:25:13'
			},
			{
				name: 'B07 108防火门监测器',
				site: '二层',
				time: changeTimeDate(2)+' 17:10:55'
			},
			{
				name: 'B07 168防火门监测器',
				site: '一层',
				time: changeTimeDate(3)+' 05:16:35'
			},
		]
		deviceDetailParam.list = list;
		// console.log(deviceDetailParam.list);
		let obj1 = new listRollNew('device1', deviceDetailParam);
	}
}
emergencySitua.deviceList2 = function(){
	let flag = Math.round(Math.random()*10);
	if(flag<0){
		$('#device2 .hd-loadmask').html(`
		<img src="../../common/image/nodata.png" class="nodata">
		`)
	} else {
		var deviceDetailParam = {
			title: ['设备名称', '所在位置','故障时间'], //列表标题
			list: [], //列表数据.
			hangLie: {
				lieflag: true, //间隔列开
				lienum: '2', //间隔列 从0开始
				hangflag: true, //间隔行开
				hangnum: '1', //间隔行 从0开始
			}
		}
		let list = [
			{
				name: 'B03 136应急照明灯',
				site: '三层A604',
				time: changeTimeDate(1)+' 09:54:41'
			},
			{
				name: 'B03 145应急照明灯',
				site: '三层A508',
				time: changeTimeDate(1)+' 11:20:30'
			},
			{
				name: 'B03 091应急电源',
				site: '二层A621',
				time: changeTimeDate(1)+' 23:28:34'
			},
			{
				name: 'B03 091应急电源',
				site: '二层A621',
				time: changeTimeDate(1)+' 23:28:34'
			},
			{
				name: 'B03 118应急电源',
				site: '二层A607',
				time: changeTimeDate(2)+' 20:23:34'
			},
			{
				name: 'B03 108单向指示灯',
				site: '二层A519',
				time: changeTimeDate(3)+' 13:09:34'
			},
			{
				name: 'B03 183应急照明灯',
				site: '一层A608',
				time: changeTimeDate(3)+' 15:24:38'
			},
			{
				name: 'B07 106应急照明灯',
				site: '二层A512',
				time: changeTimeDate(3)+' 17:25:13'
			},
			{
				name: 'B07 125应急照明灯',
				site: '二层A524',
				time: changeTimeDate(4)+' 03:10:55'
			},
			{
				name: 'B08 163单向指示灯',
				site: '一层A601',
				time: changeTimeDate(4)+' 05:16:35'
			},
		]
		deviceDetailParam.list = list;
		// console.log(deviceDetailParam.list.length);
		let obj2 = new listRollNew('device2', deviceDetailParam);
	}
}
emergencySitua.init();
window.emergencySitua = emergencySitua;
function list(num){
	let deviceName = ['水流指示',' 消火栓按钮',' 信号阀'];
	let site = ['商业2层605号','商业2层601号','商业3层605号','商业3层603号','商业2层606号'];
	let time = ['2021.03.21 09:17:24','2021.03.25 12:56:39','2021.03.27 16:24:19','2021.03.22 20:44:25','2021.03.23 19:08:55']
	let temp = [];
	for(let i = 0; i<num; i++){
		let obj = {
			deviceName:deviceName[Math.round(Math.random()*(deviceName.length-1))],
			site:site[Math.round(Math.random()*(site.length-1))],
			time:time[Math.round(Math.random()*(time.length-1))],
		}
		temp.push(obj);
	}
	return temp;
}