var rank = {};
/* 进度条排名
 *	obj = {
 * 		selector:'id',//容器
 * 		data:[],//数据
 * 		rankText:'',//排名文字
 * 		linkText:['',''],//关联渲染data中键名
 * 		rank:'total'
 *	}
 */
rank.processRank = function(obj){
	let selector = obj.selector;
	let data = obj.data == undefined ? [] : obj.data;
	let rank = obj.rank == undefined ? '' : obj.rank;
	let rankText = obj.rankText == undefined ? '' : obj.rankText;
	let linkText = obj.linkText == undefined ? ['name','total'] : obj.linkText;
	$(selector).html('');
	$(selector).append(`
		<ul class="Rank"></ul>
	`)
	let max = 0;
	data.forEach((item) => {
		if(item[rank] - 0 > max) max = item[rank] - 0;
	})
	data.forEach((item,index) => {
		$(selector+' .Rank').append(`
			<li class="RankLi RankLi${index}">
				<div>
					<div class="RankText">
						<span class="RankLeft">${rankText}${index+1}</span>
						<span class="RankMiddle">${item[linkText[0]] == undefined?'--':item[linkText[0]]}</span>
						<span class="RankRight">${item[linkText[1]] == undefined?'--':item[linkText[1]]}</span>
					</div>
					<div class="RankLine">
						<div class="RankProcess" style="width:${(item[rank]-0)/(max-0)*100}%;"></div>
					</div>
				</div>
			</li>
		`)
	})
}
/* 
 * 带标题排名
 * obj = {
 * 		selector:'id',//容器
 * 		data:[],//数据
 * 		title:[],//标题
 * 		rank:'',//排序
 * 		rankText:'',//排名文字
 * 		linkText:['','']//关联渲染data中键名
 * }
 * 
 */
rank.stackRank = function(obj){
	let selector = obj.selector;
	let data = obj.data == undefined ? [] : obj.data;
	let title = obj.title == undefined ? [] : obj.title;
	let rank = obj.rank == undefined ? '' : obj.rank;
	let rankText = obj.rankText == undefined ? '' : obj.rankText;
	let linkText = obj.linkText == undefined ? ['name','total'] : obj.linkText;
	$(selector).html('');
	$(selector).append(`
		<ul class="Rank">
			<div class="RankTitle">
			</div>
		</ul>
	`)
	title.forEach((item,index) => {
		$(selector+' .RankTitle').append(`
			<span class="RankTitleItem RankTitleItem${index}">${item}</span>
		`)
	})
	let max = 0;
	data.forEach((item) => {
		if(linkText[rank] > max) max = linkText[rank];
	})
	function RankItem(obj){
		let string = '';
		linkText.forEach((item,index) => {
			string+=`<span class="RankContentItem RankContentItem${index+1}">${obj[item]}</span>`
		})
		return string;
	}
	data.forEach((item,index) => {
		$(selector+' .Rank').append(`
			<li class="RankLi RankLi${index}">
				<div>
					<div class="RankText">
						<span class="RankContentItem RankContentItem0">${rankText}${index+1}</span>
						${RankItem(item)}
					</div>
					<div class="RankLine"></div>
				</div>
			</li>
		`)
	})
}
/* 类目排名
 * obj = {
 *		selector:'id',//容器
 * 		data:[],//数据
 * 		rank:'',//排序
 * 		rankText:'',//文字
 * 		rankUnit:'',//单位
 * 		linkText:'',//关联数据
 * }
 */
rank.RankCategory = function(obj){
	let selector = obj.selector;
	let data = obj.data == undefined ? [] : obj.data;
	let rank = obj.rank == undefined ? '' : obj.rank;
	let rankText = obj.rankText == undefined ? '' : obj.rankText;
	let rankUnit = obj.rankUnit == undefined ? '' : obj.rankUnit;
	let linkText = obj.linkText == undefined ? ['name','total'] : obj.linkText;
	$(selector).html('');
	$(selector).append(`
		<div class="RankCategory">
			<ul class="RankCategoryTitle"></ul>
			<ul class="RankCategoryProcess"></ul>
		</div>
	`)
	let max = 0;
	let sum = 0;
	data.forEach((item) => {
		if(item[rank] - 0 > max){
			max = item[rank] - 0;
		}
		sum += item[rank] - 0;
	})
	let average = (sum/data.length).toFixed(2);
	data.forEach((item,index) => {
		$('.RankCategoryTitle').append(`
			<li class="RankLi RankLi${index}">${item[linkText[0]]}</li>
		`)
		$('.RankCategoryProcess').append(`
			<li class="RankLi  RankLi${index}">
				<div class="RankCategoryitem">
					<div class="RankCategoryLine" style="width: ${item[rank]/max*100}%;">
						<div class="RankCategoryTop"></div>
					</div>
				</div>
			</li>
		`)
	})
	let left = ((average/max)*$('.RankCategoryProcess').width()).toFixed(2);
	$('.RankCategoryProcess').append(`
		<div class="RankCategoryAverageLine" style="left:${left}px;"></div>
		<div class="RankCategoryAverage">${rankText}${average}${rankUnit}</div>
	`)
	let width = $('.RankCategoryAverage').width();
	let leftMax = $('.RankCategoryProcess').width() - width/2;
	$('.RankCategoryAverage').css({
		'left':left > leftMax ? leftMax + 'px' : left + 'px',
	})
}