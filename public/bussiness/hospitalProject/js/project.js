var project = {
	sitelist: [],
	siteOnIndex: 0,
};
var _PROJECT_ID = getParams()["projectId"];
var proname = getParams()["proname"];
project.init = function () {
	project.load();
	setInterval(project.load, 60 * 1000);
	$("#innerheader").attr("data-title", decodeURI(proname));
};
//加载机房
project.load = function () {
	$.post(
		hdInterface.projectManagerHost,
		{
			projectId: _PROJECT_ID,
		},
		function (data) {
			if (data["code"] === 0) {
				// console.log(data)
				if (data["data"].length == 0) {
					$("#sites").html(`<div class="sites-nodata">
									<div class="img-nodata"></div>
								</div>`);
				} else {
					$(".project-details").css("display", "block");
					var result = data.data;
					Object.keys(result).forEach(function (item) {
						var dom = $("#" + item);
						var siteimg = $("#siteimg");
						if (dom.length > 0) {
							if (item === "sumMoney") {
								//数字递增
								numAutoPlus("sumMoney", 0, {
									time: 2000,
									num: parseInt(result[item]),
									rate: 40,
									isComma: true, //结果是否加逗号，true加，false或不传则不加
								});
							} else {
								dom.text(result[item]);
								$(".coolingHeatingArea").html(result["coolingHeatingArea"]);
							}
						}
					});
					var sitelist = result["zgSiteList"] || [];
					project.sitelist = sitelist;
					var str = "";
					for (var i = 0; i < sitelist.length; i++) {
						var siteitem = sitelist[i] || {};
						var siteName = siteitem.siteName || "--"; //机房名称
						var systemName = siteitem.systemName || "--"; //系统
						var statusimg =
							siteitem.status == "1"
								? "<img src='./image/icon_fault.png'>"
								: "<img src='./image/icon_normal.png'>";
						var statusname = siteitem.status == "1" ? "预警" : "正常";
						var deviceCount = siteitem.deviceCount + "" || "--"; //设备数量
						var energySumAll = siteitem.energySumAll || "--"; //能耗

						var res = devStatus(siteitem.status);
						statusimg = res.statusimg;
						statusname = res.statusname;
						if (i == project.siteOnIndex) {
							str += '<li class="on">';
						} else {
							str += "<li>";
						}
						str +=
							statusimg +
							`<div class="title">` +
							siteName +
							`</div>
								<div class="system">` +
							systemName +
							`</div>
							</li>`;
					}
					$("#sites").html(str);
					project.changeSite(project.siteOnIndex);
				}
			}
		}
	);
};
project.changeSite = function (index) {
	var siteitem = project["sitelist"][index] || {};
	var siteName = siteitem.siteName || "--"; //机房名称
	var systemName = siteitem.systemName || "--"; //系统
	var statusimg = "<img src='./image/icon_normal.png'>";
	var statusname = "正常";
	// console.log(siteitem.deviceCount);
	// console.log(typeof siteitem.deviceCount);
	var deviceCount =
		!siteitem.deviceCount && siteitem.deviceCount == undefind
			? "--"
			: siteitem.deviceCount + ""; //设备数量
	var energySumAll = siteitem.energyAllSum + "" || "--"; //能耗
	var res = devStatus(siteitem.status);
	statusimg = res.statusimg;
	statusname = res.statusname;
	$("#siteName1").html(siteName); //机房名称
	$("#systemName1").html(systemName); //系统
	$("#status1").html(statusname); //预警状态
	$("#equcount1").html(deviceCount); //设备数量
	$("#energySumAll1").html(energySumAll); //能耗
};

// 判断设备状态
function devStatus(e) {
	// console.log(e);
	switch (e) {
		case 0:
			statusimg = "<img src='./image/icon_normal.png' />";
			statusname = "正常";
			break;
		case 1:
			statusimg = "<img src='./image/icon_warning.png' />";
			statusname = "<span class='orange'>预警</span>";
			break;
		case 2:
			statusimg = "<img src='./image/icon_fault.png' />";
			statusname = "<span class='red'>报警</span>";
			break;
		case 3:
			statusimg = "<img src='./image/icon_off.png' />";
			statusname = "<span class='gray'>离线</span>";
			break;
		default:
			statusimg = "<img src='./image/icon_off.png' />";
			statusname = "<span class='gray'>离线</span>";
			break;
	}
	return {
		statusimg,
		statusname,
	};
}
$(document).on("click", "#sites li", function () {
	var inde = $(this).index();
	project.siteOnIndex = inde;
	project.changeSite(inde);
	$(this).addClass("on").siblings().removeClass("on");
	$(".project-details").hide();
	$(".project-details").fadeIn();
});
project.init();
window.project = project;
