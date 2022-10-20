var _PROJECT_ID = getParams()["projectId"];

// 项目能耗
$.ajax({
  url: hdInterface.selectEnergyByTimeZone,
  type: "post",
  data: {
    projectId: _PROJECT_ID,
  },
  success: (res) => {
    // console.log("项目能耗-------------");
    // console.log(res);
    if (!res.data) return;

    // 判断耗电统计单位是否大于1万
    if (res.data.eleEnergyCurrentYear > 100000) {
      let eleEnergyCurrentYear = (
        res.data.eleEnergyCurrentYear / 100000
      ).toFixed(2);
      // console.log(waterEnergyCurrentYear);
      $("#eleEnergyCurrentYear").text(convert(eleEnergyCurrentYear));
      $("#eleEnergyCurrentYearTit").text("万kW·h");
    } else if (res.data.eleEnergyCurrentYear < 100000) {
      $("#eleEnergyCurrentYear").text(convert(res.data.eleEnergyCurrentYear));
      $("#eleEnergyCurrentYearTit").text("kW·h");
    }
    // $("#eleEnergyCurrentYear").text(convert(res.data.eleEnergyCurrentYear));
    $("#eleEnergyCurrentMonth").text(convert(res.data.eleEnergyCurrentMonth));
    $("#eleEnergyCurrentDay").text(convert(res.data.eleEnergyCurrentDay));

    // 判断耗水统计单位是否大于1万
    if (res.data.waterEnergyCurrentYear > 100000) {
      let waterEnergyCurrentYear = (
        res.data.waterEnergyCurrentYear / 100000
      ).toFixed(2);
      // console.log(waterEnergyCurrentYear);
      $("#waterEnergyCurrentYear").text(convert(waterEnergyCurrentYear));
      $("#waterEnergyCurrentYearTit").text("万m³");
    } else if (res.data.waterEnergyCurrentYear < 100000) {
      $("#waterEnergyCurrentYear").text(
        convert(res.data.waterEnergyCurrentYear)
      );
      $("#waterEnergyCurrentYearTit").text("m³");
    }
    0;
    // $("#waterEnergyCurrentYear").text(convert(res.data.waterEnergyCurrentYear));
    $("#waterEnergyCurrentMonth").text(
      convert(res.data.waterEnergyCurrentMonth)
    );
    $("#waterEnergyCurrentDay").text(convert(res.data.waterEnergyCurrentDay));
  },
});
// 实时状态监测
$.ajax({
  url: hdInterface.selectSafetyMonitoringCJ,
  type: "post",

  success: (res) => {
    // console.log(res);
    let htmlTmp = "";
    let allImg = res.data.map((item) => {
      // console.log(item);
      if (item.type == 2) {
        let iconTmp = "";
        switch (item.refeStatus) {
          case "normal_type":
            iconTmp = "./image/hole_blue.png";
            break;
          case "d_alarm_type":
            iconTmp = "./image/hole_fault.png";
            break;
          case "o_alarm_type":
            iconTmp = "./image/hole_offline.png";
            break;
          default:
            iconTmp = "./image/hole_blue.png";
            break;
        }
        htmlTmp += `<div class="liveItem">
                <img src="${iconTmp}" class="liveItemIcon" alt="">
                <p class="liveItemText">${item.tempName + item.refeText}</p>
              </div>`;
        // console.log(item.refeStatus);
      } else if (item.type == 1) {
        let iconTmp = "";
        switch (item.refeStatus) {
          case "normal_type":
            iconTmp = "./image/管道.png";
            break;
          case "d_alarm_type":
            iconTmp = "./image/管道 拷贝 2.png";
            break;
          case "o_alarm_type":
            iconTmp = "./image/管道 拷贝.png";
            break;
          default:
            iconTmp = "./image/管道.png";
            break;
        }
        htmlTmp += `<div class="liveItem">
                <img src="${iconTmp}" class="liveItemIcon" alt="">
                <p class="liveItemText">${item.tempName + item.refeText}</p>
              </div>`;
      }
    });

    $(".cardContent").html(htmlTmp);
  },
});
//项目数据信息
$.ajax({
  url: hdInterface.selectProjectMessageCJ,
  type: "post",
  data: {
    projectId: _PROJECT_ID,
  },
  success: (res) => {
    console.log(res);
    $("#address").text(convert(res.data.address));
    $("#projectTypeName").text(convert(res.data.projectTypeName));
    $("#constructionArea").text(convert(res.data.constructionArea));
  },
});
