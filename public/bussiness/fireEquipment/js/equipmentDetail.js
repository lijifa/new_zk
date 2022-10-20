var equipmentDetail = {}
equipmentDetail.getNextMonth = function (date){
	var arr = date.split('-');  
	var year = arr[0]; //获取当前日期的年份  
	var month = arr[1]; //获取当前日期的月份  
	var day = arr[2]; //获取当前日期的日  
	var days = new Date(year, month, 0);  
	days = days.getDate(); //获取当前日期中的月的天数  
	var year2 = year;  
	var month2 = parseInt(month) + 1;  
	if (month2 == 13) {  
		year2 = parseInt(year2) + 1;  
		month2 = 1;  
	}  
	var day2 = day;  
	var days2 = new Date(year2, month2, 0);  
	days2 = days2.getDate();  
	if (day2 > days2) {  
		day2 = days2;  
	}  
	if (month2 < 10) {  
		month2 = '0' + month2;  
	}  
  
	var t2 = year2 + '-' + month2 + '-' + day2;  
	return t2;
}
// console.log(equipmentDetail.getNextMonth('2021-12-01'));
equipmentDetail.timeChange = function(){
	let date = new Date();
	let Y = date.getFullYear();
	let M = date.getMonth()+1;
	M = M < 10 ? '0' + M : M;
	return Y-4+'-'+M+'-01';
}
let listArray = [
		{systemType:'fireHyDrant', num:'M01 87',name:'手提式磷酸铵盐干粉灭火器',system:'消火栓监控系统',type:'灭火器',pp:'南安闵文消防',time:getIntervalDate(97,0),using:'8年',state:'-1',site:'二层商业A177'},
		{systemType:'fireHyDrant', num:'M01 16',name:'手提式磷酸铵盐干粉灭火器',system:'消火栓监控系统',type:'灭火器',pp:'南安闵文消防',time:getIntervalDate(97,0),using:'8年',state:'-1',site:'二层商业A402'},
		{systemType:'fireHyDrant', num:'M01 57',name:'手提式磷酸铵盐干粉灭火器',system:'消火栓监控系统',type:'灭火器',pp:'南安闵文消防',time:getIntervalDate(97,0),using:'8年',state:'-1',site:'二层商业A198'},
		{systemType:'fireHyDrant', num:'M01 03',name:'手提式磷酸铵盐干粉灭火器',system:'消火栓监控系统',type:'灭火器',pp:'南安闵文消防',time:getIntervalDate(97,0),using:'8年',state:'-1',site:'二层商业A255'},
		{systemType:'AILighting', num:'A08 501',name:'应急照明灯',system:'智能应急照明系统',type:'照明灯',pp:'杰澜斯',time: getIntervalDate(47,0),using:'4年',state:'0',site:'塔楼B座4层楼道'},
		{systemType:'AILighting', num:'A03 431',name:'应急照明灯',system:'智能应急照明系统',type:'照明灯',pp:'杰澜斯',time: getIntervalDate(47,0),using:'4年',state:'0',site:'塔楼A座5层楼道'},
		{systemType:'AILighting', num:'A07 612',name:'应急照明灯',system:'智能应急照明系统',type:'照明灯',pp:'杰澜斯',time: getIntervalDate(47,0),using:'4年',state:'0',site:'塔楼B座4层楼道'},
		{systemType:'AILighting', num:'A08 309',name:'应急照明灯',system:'智能应急照明系统',type:'照明灯',pp:'杰澜斯',time: getIntervalDate(47,0),using:'4年',state:'0',site:'塔楼A座4层楼道'},
		{systemType:'AILighting', num:'A08 428',name:'应急照明灯',system:'智能应急照明系统',type:'照明灯',pp:'杰澜斯',time: getIntervalDate(47,0),using:'4年',state:'0',site:'塔楼B座5层楼道'},
		{systemType:'autoFireAlarm', num:'L188',name:'火灾报警控制器(联动型)',system:'火灾自动报警系统',type:'火灾报警控制器',pp:'泰和安',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层消防中控室'},
		{systemType:'autoFireAlarm', num:'L187',name:'消防控制室图形显示装置',system:'火灾自动报警系统',type:'火灾报警控制器',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层消防中控室'},
		{systemType:'autoFireAlarm', num:'L-S18',name:'火灾声光报警器',system:'火灾自动报警系统',type:'声光报警器',pp:'泛吉尔',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层B605室楼道'},
		{systemType:'autoFireAlarm', num:'A08 161',name:'消火栓按钮',system:'火灾自动报警系统',type:'消火栓按钮',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层A503'},
		{systemType:'autoFireAlarm', num:'A08 106',name:'消火栓按钮',system:'火灾自动报警系统',type:'消火栓按钮',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层A504'},
		{systemType:'autoFireAlarm', num:'A08 071',name:'消火栓按钮',system:'火灾自动报警系统',type:'消火栓按钮',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层A603'},
		{systemType:'autoFireAlarm', num:'A08 101',name:'消火栓按钮',system:'火灾自动报警系统',type:'消火栓按钮',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层A604'},
		{systemType:'autoFireAlarm', num:'A07 081',name:'消火栓按钮',system:'火灾自动报警系统',type:'消火栓按钮',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层A513'},
		{systemType:'autoFireAlarm', num:'A05 187',name:'消火栓按钮',system:'火灾自动报警系统',type:'消火栓按钮',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层A614'},
		{systemType:'autoFireAlarm', num:'A03 654',name:'输入模块',system:'火灾自动报警系统',type:'输入模块',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层消防中控室'},
		{systemType:'autoFireAlarm', num:'A03 591',name:'输入模块',system:'火灾自动报警系统',type:'输入模块',pp:'营口天成消防设备',time:getIntervalDate(73,0),using:'12年',state:'1',site:'一层消防中控室'},
		{systemType:'fireWaterMonitor', num:'A11 294',name:'湿式报警阀',system:'消防给水监控系统',type:'报警阀',pp:'北京精艺正泰消防',time:getIntervalDate(71,0),using:'长期',state:'1',site:'负一层消防报警阀室'},
	];
equipmentDetail.init = function(){
	equipmentDetail.changeBtn();
	equipmentDetail.tableData(listArray,equipmentDetail.systemType);
}
equipmentDetail.systemType = '';
equipmentDetail.changeBtn = function(){
	$('button').on('click',function(){
		$(this).addClass('on').siblings().removeClass('on');
		let systemType = $(this).attr('data-systemType');
		if(systemType == equipmentDetail.systemType){
			console.log('重复点击!');
		} else {
			equipmentDetail.systemType = systemType;
			equipmentDetail.tableData(listArray,equipmentDetail.systemType);
		}
	})
}
equipmentDetail.tableData = function(data,systemType){
	let temp = [];
	if(systemType !== ''){
		data.forEach((item) => {
			if(item['systemType'] == systemType){
				temp.push(item)
			}
		})
	} else {
		temp = data;
	}
	$('#table').html('');
	if(temp.length == 0){
		$('.hd-loadmask').show();
		$('.hd-loadmask').html(`
			<img src="../../common/image/nodata.png" class="posiImg">
		`)
	} else {
		$('.hd-loadmask').hide();
		$('#table').html(`
		<tr>
			<th>设备编号</th>
			<th>设备名称</th>
			<th>所属系统</th>
			<th>设备分类</th>
			<th>品牌</th>
			<th>开始使用日期</th>
			<th>设备寿命</th>
			<th>状态</th>
			<th>所在位置</th>
		</tr>
		`)
		temp.forEach((item) => {
			$('#table').append(`
			<tr>
				<td>${item.num}</td>
				<td>${item.name}</td>
				<td>${item.system}</td>
				<td>${item.type}</td>
				<td>${item.pp}</td>
				<td>${item.time}</td>
				<td>${item.using}</td>
				<td>${item.state=='-1'?'待维护':item.state=='0'?'即将到期':'正常'}</td>
				<td>${item.site}</td>
			</tr>
			`)
		})
	}
	$('td').css('color',function(){
		if($(this).html().indexOf('待维护') !== -1){
			return '#ff4444';
		} else if($(this).html().indexOf('即将到期') !== -1) {
			return '#FFB72C';
		}
	})
	$('td').hover(function(){
		$(this).parent().addClass('texthover');
	},function(){
		$(this).parent().removeClass('texthover');
	})
}
equipmentDetail.init();

function list(num){
	let diviceNo = ['x57','x56','x55','x54','x53','x52','x51','x50','x49','x48'];
	let deviceName = ['消防1','消防2','消防3','消防4','消防5','消防6','消防7','消防7','消防9'];
	let systom = ['消防给水监控系统','消防给水监控系统','智能应急疏散系统','火灾自动报警系统'];
	let type = ['湿式报警阀组','水表','灯具','蓄电池','湿式报警阀组','水表','灯具','蓄电池','湿式报警阀组','水表'];
	let ppName = ['品牌1','品牌2','品牌3','品牌4','品牌5','品牌6','品牌7','品牌7','品牌9'];
	let time = ['2021-03-31','2021-03-30','2021-03-28','2021-03-20','2021-03-25','2021-03-21','2021-03-27'];
	let usimg = ['4年','5年','1年','2年','3年'];
	let state = ['即将到期','已到期','正常'];
	let site = ['一层A3-1', 'B栋5层022室', '一层A3-2', 'B栋5层020室', '一层A3-3'];
	let temp = [];
	for(let i = 0; i<num; i++){
		let obj = {
			// diviceNo:diviceNo[Math.round(Math.random()*(diviceNo.length-1))],
			diviceNo:'x'+Math.round(Math.random()*num),
			deviceName:deviceName[Math.round(Math.random()*(deviceName.length-1))],
			systom:systom[Math.round(Math.random()*(systom.length-1))],
			type:type[Math.round(Math.random()*(type.length-1))],
			ppName:ppName[Math.round(Math.random()*(ppName.length-1))],
			time:time[Math.round(Math.random()*(time.length-1))],
			usimg:usimg[Math.round(Math.random()*(usimg.length-1))],
			state:state[Math.round(Math.random()*(state.length-1))],
			site:site[Math.round(Math.random()*(site.length-1))],
		}
		temp.push(obj);
	}
	return temp;
}
