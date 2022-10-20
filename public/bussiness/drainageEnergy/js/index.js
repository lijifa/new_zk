var energySavingIndex = {};
var _SITE_ID = getParams()['siteId'];
var projectId = getParams()["projectId"]; //项目id
var sitename = getParams()["sitename"]; //站点名称(也用作标题名称)
var layuiId = getParams()["layuiId"]; //标签id
var timer = null, timer1 = null;
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState == 'hidden') {
		clearInterval(timer);
	} else {
		// energySavingIndex.fiveMintueUpdata();
	}
});
var objName = layuiId;
window.onunload = function () {
	// top.unregisterListener(objName); //销毁
	clearInterval(timer);
}
// top.registerListener(objName, function(e) {
// 	// energySavingIndex.fiveMintueUpdata();
// }); //注册
energySavingIndex.init = function () {
	energySavingIndex.efficiencyChange();
	energySavingIndex.energyChange();
	energySavingIndex.energyCost();
	energySavingIndex.waterCost();
	energySavingIndex.todayEnergy();
	energySavingIndex.energyAnalyze();
	energySavingIndex.subEnergy();
	energySavingIndex.todayEnergyCost();
	// energySavingIndex.fiveMintueUpdata();
};
energySavingIndex.fiveMintueUpdata = function () {
	timer = setInterval(function () {
		energySavingIndex.energyAnalyze();
		energySavingIndex.todayEnergy();
		energySavingIndex.todayEnergyCost();
	}, 60 * 1000)
}
// 实时能效分析按钮切换
energySavingIndex.efficiencyChange = function () {
	let num = 0;
	$('.efficiency li').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
		let index = $(this).index();
		num = index + 1;
		$('.efficiencyBox').eq(index).css({
			"opacity": '1'
		}).siblings('.efficiencyBox').css({
			"opacity": '0'
		})
	})
	timer = setInterval(function () {
		let index = num % 3;
		$('.efficiency li').eq(index).addClass('on').siblings().removeClass('on');
		$('.efficiencyBox').eq(index).css({
			"opacity": '1'
		}).siblings('.efficiencyBox').css({
			"opacity": '0'
		})
		num++;
	}, 60 * 1000);
}
// 当日能耗变化按钮切换
energySavingIndex.energyChange = function () {
	let num = 0;
	$('.energyChange li').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
		let index = $(this).index();
		num = index + 1;
		$('.compontent').eq(index).css({
			"opacity": '1',
			"z-index": '1'
		}).siblings('.compontent').css({
			"opacity": '0',
			"z-index": '-100'
		})
	})
	timer1 = setInterval(function () {
		let index = num % 3;
		$('.energyChange li').eq(index).addClass('on').siblings().removeClass('on');
		$('.compontent').eq(index).css({
			"opacity": '1',
			"z-index": '1'
		}).siblings('.compontent').css({
			"opacity": '0',
			"z-index": '-100'
		})
		num++;
	}, 60 * 1000);
}
// 实时能效分析
energySavingIndex.energyAnalyze = function () {
	let H = new Date().getHours();
	let startTimePeriod = H < 10 ? '0' + H : H;
	let endTimePeriod = H + 1 < 10 ? '0' + (H + 1) : H + 1;
	startTimePeriod = startTimePeriod - 1 < 0 ? 23 : startTimePeriod - 1;
	endTimePeriod = endTimePeriod - 1 < 0 ? 23 : endTimePeriod - 1;
	$('.timePeriod').html(startTimePeriod + ':00-' + endTimePeriod + ':00');
	let todayEnergy = (Math.random() * 15 + 30).toFixed(2);
	let yetEnergy = (Math.random() * 15 + 30).toFixed(2);
	$('#todayEnergy').html(todayEnergy);
	$('#yetEnergy').html(yetEnergy);
	let TBEnergy = ((1 - (todayEnergy / yetEnergy)) * 100).toFixed(2);
	let str = '';
	if (TBEnergy > 0) {
		TBEnergy = Math.abs(TBEnergy);
		str = TBEnergy + '% <img src="/common/image/down1.png">';
		$('#TBEnergy').css({
			color: '#48D396'
		})
	} else {
		TBEnergy = Math.abs(TBEnergy);
		str = TBEnergy + '% <img src="/common/image/up1.png">';
		$('#TBEnergy').css({
			color: '#ff4444'
		})
	}
	$('#TBEnergy').html(str);
	let todayWater = 0, yetWater = 0;
	switch (H - 1) {
		case 0:
			todayWater = (((Math.random() * 13 + 26)).toFixed(2));
			yetWater = (((Math.random() * 13 + 26)).toFixed(2));
			break;
		case 1:
			todayWater = (((Math.random() * 4 + 16)).toFixed(2));
			yetWater = (((Math.random() * 4 + 16)).toFixed(2));
			break;
		case 2:
			todayWater = (((Math.random() * 3 + 15)).toFixed(2));
			yetWater = (((Math.random() * 3 + 15)).toFixed(2));
			break;
		case 3:
			todayWater = (((Math.random() * 2 + 13)).toFixed(2));
			yetWater = (((Math.random() * 2 + 13)).toFixed(2));
			break;
		case 4:
			todayWater = (((Math.random() * 2 + 13)).toFixed(2));
			yetWater = (((Math.random() * 2 + 13)).toFixed(2));
			break;
		case 5:
			todayWater = (((Math.random() * 2 + 13)).toFixed(2));
			yetWater = (((Math.random() * 2 + 13)).toFixed(2));
			break;
		case 6:
			todayWater = (((Math.random() * 4 + 16)).toFixed(2));
			yetWater = (((Math.random() * 4 + 16)).toFixed(2));
			break;
		case 7:
			todayWater = (((Math.random() * 13 + 36)).toFixed(2));
			yetWater = (((Math.random() * 13 + 36)).toFixed(2));
			break;
		case 8:
			todayWater = (((Math.random() * 13 + 36)).toFixed(2));
			yetWater = (((Math.random() * 13 + 36)).toFixed(2));
			break;
		case 9:
			todayWater = (((Math.random() * 10 + 35)).toFixed(2));
			yetWater = (((Math.random() * 10 + 35)).toFixed(2));
			break;
		case 10:
			todayWater = (((Math.random() * 10 + 30)).toFixed(2));
			yetWater = (((Math.random() * 10 + 30)).toFixed(2));
			break;
		case 11:
			todayWater = (((Math.random() * 10 + 30)).toFixed(2));
			yetWater = (((Math.random() * 10 + 30)).toFixed(2));
			break;
		case 12:
			todayWater = (((Math.random() * 10 + 45)).toFixed(2));
			yetWater = (((Math.random() * 10 + 45)).toFixed(2));
			break;
		case 13:
			todayWater = (((Math.random() * 10 + 35)).toFixed(2));
			yetWater = (((Math.random() * 10 + 35)).toFixed(2));
			break;
		case 14:
			todayWater = (((Math.random() * 13 + 26)).toFixed(2));
			yetWater = (((Math.random() * 13 + 26)).toFixed(2));
			break;
		case 15:
			todayWater = (((Math.random() * 13 + 26)).toFixed(2));
			yetWater = (((Math.random() * 13 + 26)).toFixed(2));
			break;
		case 16:
			todayWater = (((Math.random() * 10 + 25)).toFixed(2));
			yetWater = (((Math.random() * 10 + 25)).toFixed(2));
			break;
		case 17:
			todayWater = (((Math.random() * 10 + 30)).toFixed(2));
			yetWater = (((Math.random() * 10 + 30)).toFixed(2));
			break;
		case 18:
			todayWater = (((Math.random() * 10 + 50)).toFixed(2));
			yetWater = (((Math.random() * 10 + 50)).toFixed(2));
			break;
		case 19:
			todayWater = (((Math.random() * 10 + 45)).toFixed(2));
			yetWater = (((Math.random() * 10 + 45)).toFixed(2));
			break;
		case 20:
			todayWater = (((Math.random() * 10 + 35)).toFixed(2));
			yetWater = (((Math.random() * 10 + 35)).toFixed(2));
			break;
		case 21:
			todayWater = (((Math.random() * 10 + 45)).toFixed(2));
			yetWater = (((Math.random() * 10 + 45)).toFixed(2));
			break;
		case 22:
			todayWater = (((Math.random() * 10 + 30)).toFixed(2));
			yetWater = (((Math.random() * 10 + 30)).toFixed(2));
			break;
		case 23:
			todayWater = (((Math.random() * 13 + 26)).toFixed(2));
			yetWater = (((Math.random() * 13 + 26)).toFixed(2));
			break;
		default:
			break;
	}
	$('#todayWater').html(todayWater);
	$('#yetWater').html(yetWater);
	let TBWater = ((1 - (todayWater / yetWater)) * 100).toFixed(2);
	if (TBWater > 0) {
		TBWater = Math.abs(TBWater);
		str = TBWater + '% <img src="/common/image/down1.png">';
		$('#TBWater').css({
			color: '#48D396'
		})
	} else {
		TBWater = Math.abs(TBWater);
		str = TBWater + '% <img src="/common/image/up1.png">';
		$('#TBWater').css({
			color: '#ff4444'
		})
	}
	$('#TBWater').html(str);
	let todayReclaimed = 0,
		yetReclaimed = 0;
	switch (H - 1) {
		case 0:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		case 1:
			todayReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			break;
		case 2:
			todayReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			break;
		case 3:
			todayReclaimed = ((Math.random() * 3 + 1)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 1)).toFixed(2);
			break;
		case 4:
			todayReclaimed = ((Math.random() * 3 + 1)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 1)).toFixed(2);
			break;
		case 5:
			todayReclaimed = ((Math.random() * 3 + 1)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 1)).toFixed(2);
			break;
		case 6:
			todayReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			break;
		case 7:
			todayReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			break;
		case 8:
			todayReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			break;
		case 9:
			todayReclaimed = ((Math.random() * 3 + 6)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 6)).toFixed(2);
			break;
		case 10:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		case 11:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		case 12:
			todayReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			break;
		case 13:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		case 14:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		case 15:

			todayReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			break;
		case 16:
			todayReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 2)).toFixed(2);
			break;
		case 17:
			todayReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 3)).toFixed(2);
			break;
		case 18:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		case 19:
			todayReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			break;
		case 20:
			todayReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			break;
		case 21:
			todayReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 5)).toFixed(2);
			break;
		case 22:
			todayReclaimed = ((Math.random() * 3 + 6)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 6)).toFixed(2);
			break;
		case 23:
			todayReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			yetReclaimed = ((Math.random() * 3 + 4)).toFixed(2);
			break;
		default:
			break;
	}
	$('#todayReclaimed').html(todayReclaimed);
	$('#yetReclaimed').html(yetReclaimed);
	let TBReclaimed = ((1 - (todayReclaimed / yetReclaimed)) * 100).toFixed(2);
	if (TBReclaimed > 0) {
		TBReclaimed = Math.abs(TBReclaimed);
		str = TBReclaimed + '% <img src="/common/image/down1.png">';
		$('#TBReclaimed').css({
			color: '#48D396'
		})
	} else {
		TBReclaimed = Math.abs(TBReclaimed);
		str = TBReclaimed + '% <img src="/common/image/up1.png">';
		$('#TBReclaimed').css({
			color: '#ff4444'
		})
	}
	$('#TBReclaimed').html(str);
}
// 当日分项能耗监测
energySavingIndex.subEnergy = function () {
	$('#subEnergy').html((Math.random() * 150 + 450).toFixed(2));
	$('#subWater').html((Math.random() * 300 + 640).toFixed(2));
	$('#subReclaimed').html((Math.random() * 70 + 100).toFixed(2));
	// loadnum1(1844980);
	let ss = new Date().getTime() - new Date('2022-01-01 00:00').getTime();
	let dd = Math.ceil((ss / (24 * 60 * 60 * 1000)));
	let num = (Math.random() * 1500 + 6300);
	loadnum1(Math.round(num * dd));
}


// 近30天耗电费用
energySavingIndex.energyCost = function () {
	let dataX = nearlyThirtyDays(30, '.'), dataY = [];
	dataX.forEach((item, index) => {
		dataY.push((Math.random() * 150 + 450).toFixed(2));
	})
	echarsComponent.getLineShadow({
		elementId: 'dianConst',
		xdata: dataX,
		ydata: [dataY],
		linecolors: ['rgba(0, 255, 255, 1)'],
		yAxisMinInterval: 100,
		// yAxisMin:0,
		grid: {
			left: '0',
			right: '20px',
			bottom: '0',
			top: '10px'
		},
		offectTop: "rgba(0, 255, 255, 1)",
		offectMiddle: "rgba(0, 255, 255, 0.5)",
		offectBottom: "rgba(0, 255, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
}
// 近30天耗水费用
energySavingIndex.waterCost = function () {
	let dataX = nearlyThirtyDays(30, '.'), dataY = [];
	dataX.forEach((item, index) => {
		dataY.push((Math.random() * 2100 + 4300).toFixed(2));
	})
	echarsComponent.getLineShadow({
		elementId: 'shuiConst',
		xdata: dataX,
		ydata: [dataY],
		linecolors: ['rgba(0, 255, 255, 1)'],
		yAxisMinInterval: 1000,
		grid: {
			left: '0',
			right: '20px',
			bottom: '0',
			top: '10px'
		},
		offectTop: "rgba(0, 255, 255, 1)",
		offectMiddle: "rgba(0, 255, 255, 0.5)",
		offectBottom: "rgba(0, 255, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
}
// 当日能耗变化
energySavingIndex.todayEnergy = function () {
	let dataX = onTheHour(), dataY = [], dataY1 = [], dataY2 = [];
	dataX.forEach((item, index) => {
		switch (index) {
			case 0:
				dataY.push(Math.round(Math.random() * 6 + 17));
				break;
			case 1:
				dataY.push(Math.round(Math.random() * 6 + 17));
				break;
			case 2:
				dataY.push(Math.round(Math.random() * 6 + 22));
				break;
			case 3:
				dataY.push(Math.round(Math.random() * 6 + 10));
				break;
			case 4:
				dataY.push(Math.round(Math.random() * 6 + 10));
				break;
			case 5:
				dataY.push(Math.round(Math.random() * 6 + 10));
				break;
			case 6:
				dataY.push(Math.round(Math.random() * 6 + 16));
				break;
			case 7:
				dataY.push(Math.round(Math.random() * 6 + 17));
				break;
			case 8:
				dataY.push(Math.round(Math.random() * 6 + 29));
				break;
			case 9:
				dataY.push(Math.round(Math.random() * 6 + 18));
				break;
			case 10:
				dataY.push(Math.round(Math.random() * 6 + 20));
				break;
			case 11:
				dataY.push(Math.round(Math.random() * 6 + 20));
				break;
			case 12:
				dataY.push(Math.round(Math.random() * 6 + 18));
				break;
			case 13:
				dataY.push(Math.round(Math.random() * 6 + 22));
				break;
			case 14:
				dataY.push(Math.round(Math.random() * 6 + 21));
				break;
			case 15:
				dataY.push(Math.round(Math.random() * 6 + 21));
				break;
			case 16:
				dataY.push(Math.round(Math.random() * 6 + 20));
				break;
			case 17:
				dataY.push(Math.round(Math.random() * 6 + 20));
				break;
			case 18:
				dataY.push(Math.round(Math.random() * 6 + 25));
				break;
			case 19:
				dataY.push(Math.round(Math.random() * 6 + 20));
				break;
			case 20:
				dataY.push(Math.round(Math.random() * 6 + 19));
				break;
			case 21:
				dataY.push(Math.round(Math.random() * 6 + 18));
				break;
			case 22:
				dataY.push(Math.round(Math.random() * 6 + 16));
				break;
			case 23:
				dataY.push(Math.round(Math.random() * 6 + 16));
				break;
			default:
				break;
		}
		switch (index) {
			case 0:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			case 1:
				dataY2.push(Math.round(Math.random() * 3 + 2));
				break;
			case 2:
				dataY2.push(Math.round(Math.random() * 3 + 2));
				break;
			case 3:
				dataY2.push(Math.round(Math.random() * 3 + 1));
				break;
			case 4:
				dataY2.push(Math.round(Math.random() * 3 + 1));
				break;
			case 5:
				dataY2.push(Math.round(Math.random() * 3 + 1));
				break;
			case 6:
				dataY2.push(Math.round(Math.random() * 3 + 2));
				break;
			case 7:
				dataY2.push(Math.round(Math.random() * 3 + 3));
				break;
			case 8:
				dataY2.push(Math.round(Math.random() * 3 + 5));
				break;
			case 9:
				dataY2.push(Math.round(Math.random() * 3 + 6));
				break;
			case 10:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			case 11:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			case 12:
				dataY2.push(Math.round(Math.random() * 3 + 3));
				break;
			case 13:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			case 14:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			case 15:
				dataY2.push(Math.round(Math.random() * 3 + 3));
				break;
			case 16:
				dataY2.push(Math.round(Math.random() * 3 + 2));
				break;
			case 17:
				dataY2.push(Math.round(Math.random() * 3 + 3));
				break;
			case 18:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			case 19:
				dataY2.push(Math.round(Math.random() * 3 + 5));
				break;
			case 20:
				dataY2.push(Math.round(Math.random() * 3 + 5));
				break;
			case 21:
				dataY2.push(Math.round(Math.random() * 3 + 5));
				break;
			case 22:
				dataY2.push(Math.round(Math.random() * 3 + 6));
				break;
			case 23:
				dataY2.push(Math.round(Math.random() * 3 + 4));
				break;
			default:
				break;
		}
		switch (index) {
			case 0:
				dataY1.push((Math.round(Math.random() * 13 + 26)));
				break;
			case 1:
				dataY1.push((Math.round(Math.random() * 4 + 16)));
				break;
			case 2:
				dataY1.push((Math.round(Math.random() * 3 + 15)));
				break;
			case 3:
				dataY1.push((Math.round(Math.random() * 2 + 13)));
				break;
			case 4:
				dataY1.push((Math.round(Math.random() * 2 + 13)));
				break;
			case 5:
				dataY1.push((Math.round(Math.random() * 2 + 13)));
				break;
			case 6:
				dataY1.push((Math.round(Math.random() * 4 + 16)));
				break;
			case 7:
				dataY1.push((Math.round(Math.random() * 13 + 36)));
				break;
			case 8:
				dataY1.push((Math.round(Math.random() * 13 + 36)));
				break;
			case 9:
				dataY1.push((Math.round(Math.random() * 10 + 35)));
				break;
			case 10:
				dataY1.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 11:
				dataY1.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 12:
				dataY1.push((Math.round(Math.random() * 10 + 45)));
				break;
			case 13:
				dataY1.push((Math.round(Math.random() * 10 + 35)));
				break;
			case 14:
				dataY1.push((Math.round(Math.random() * 13 + 26)));
				break;
			case 15:
				dataY1.push((Math.round(Math.random() * 13 + 26)));
				break;
			case 16:
				dataY1.push((Math.round(Math.random() * 10 + 25)));
				break;
			case 17:
				dataY1.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 18:
				dataY1.push((Math.round(Math.random() * 10 + 50)));
				break;
			case 19:
				dataY1.push((Math.round(Math.random() * 10 + 45)));
				break;
			case 20:
				dataY1.push((Math.round(Math.random() * 10 + 35)));
				break;
			case 21:
				dataY1.push((Math.round(Math.random() * 10 + 45)));
				break;
			case 22:
				dataY1.push((Math.round(Math.random() * 10 + 30)));
				break;
			case 23:
				dataY1.push((Math.round(Math.random() * 13 + 26)));
				break;
			default:
				break;
		}
	})
	echarsComponent.getLineShadow({
		elementId: 'dian',
		xdata: dataX,
		ydata: [dataY],
		linecolors: ['rgba(0, 255, 255, 1)'],
		yAxisMinInterval: 10,
		unit: 'kW·h',
		grid: {
			left: '0',
			right: '20px',
			bottom: '0',
			top: '30px'
		},
		offectTop: "rgba(0, 255, 255, 1)",
		offectMiddle: "rgba(0, 255, 255, 0.5)",
		offectBottom: "rgba(0, 255, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
	echarsComponent.getLineShadow({
		elementId: 'water',
		xdata: dataX,
		ydata: [dataY1],
		linecolors: ['rgba(0, 255, 255, 1)'],
		yAxisMinInterval: 10,
		unit: 'm³',
		grid: {
			left: '0',
			right: '20px',
			bottom: '0',
			top: '30px'
		},
		offectTop: "rgba(0, 255, 255, 1)",
		offectMiddle: "rgba(0, 255, 255, 0.5)",
		offectBottom: "rgba(0, 255, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
	echarsComponent.getLineShadow({
		elementId: 'shui',
		xdata: dataX,
		ydata: [dataY2],
		linecolors: ['rgba(0, 255, 255, 1)'],
		yAxisMinInterval: 2,
		unit: 'm³',
		grid: {
			left: '0',
			right: '20px',
			bottom: '0',
			top: '30px'
		},
		offectTop: "rgba(0, 255, 255, 1)",
		offectMiddle: "rgba(0, 255, 255, 0.5)",
		offectBottom: "rgba(0, 255, 255, 0.1)",
		areaStyleOpacity: 0.5
	})
}
// 当日能耗费用
energySavingIndex.todayEnergyCost = function () {
	$('#todayEnergyCost').html((Math.random() * 150 + 450).toFixed(2));
	$('#todayEnergyCostPlan').html(1000);
	$('#todayWaterCost').html((Math.random() * 1700 + 3700).toFixed(2));
	$('#todayWaterCostPlan').html(6300);
	$('#todayReclaimedCost').html((Math.random() * 410 + 580).toFixed(2));
	$('#todayReclaimedCostPlan').html(1200);
}


window.energySavingIndex = energySavingIndex;
energySavingIndex.init();

//数字特效
function loadnum1(var1) {
	numAutoPlus('energySaving', 0, {
		time: 2000,
		num: var1,
		rate: 40,
		format: true
	})
}
// 近30天时间
function nearlyThirtyDays(dateNumbers, interval = '-', showYear = false) {
	let date = new Date();
	let time = date.getTime();
	let dateArray = [];
	for (let i = 1; i <= dateNumbers; i++) {
		let earlyTime = time - 24 * 60 * 60 * 1000 * i;
		let Y = new Date(earlyTime).getFullYear();
		let M = new Date(earlyTime).getMonth() + 1;
		let D = new Date(earlyTime).getDate();
		M = M < 10 ? '0' + M : M;
		D = D < 10 ? '0' + D : D;
		if (showYear) {
			dateArray.push(`${Y}${interval}${M}${interval}${D}`);
		} else {
			dateArray.push(`${M}${interval}${D}`);
		}
	}
	dateArray.reverse();
	return dateArray;
}