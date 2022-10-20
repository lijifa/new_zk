/*数字从0增长到指定数字大小*/
function numAutoPlus(targetEle, xiaoshu, options) {
	options = options || {}
	// 获取dom元素
	let $this = document.getElementById(targetEle)
	// 动画时长(毫秒数)
	// 也可以将需要的参数写在dom上如：[data-XXX]
	let time = options.time || $this.getAttribute('data-time')
	// 最终要显示的数字
	let finalNum = options.num || $this.getAttribute('data-time')
	// 调节器(毫秒数) 改变数字增加速度
	let rate = options.rate || $this.getAttribute('data-rate')
	// 步长
	let step = finalNum / (time / rate)
	// 计数器
	let count = 0
	// 初始值
	let initNum = 0
	// 定时器
	let timer = setInterval(function () {
		count = count + step
		if (count >= finalNum) {
			clearInterval(timer)
			count = finalNum
		}
		// t未发生改变的话就直接返回
		// 减少dom操作 提高DOM性能
		// let t = Math.floor(count)
		if(count==null) return
		let t = count.toFixed(xiaoshu);		
		if (t === initNum) return
		if (options.num > 10000000 && options.num < 100000000) {
			if (t < 10) {
				t = "0000000" + t
			} else if (t < 100 && t >= 10) {
				t = "000000" + t
			} else if (t < 1000 && t >= 100) {
				t = "00000" + t
			} else if (t < 10000 && t >= 1000) {
				t = "0000" + t
			}else if (t < 100000 && t >= 10000) {
				t = "000" + t
			}else if (t < 1000000 && t >= 100000) {
				t = "00" + t
			}else if (t < 10000000 && t >= 1000000) {
				t = "0" + t
			}
		}
		if (options.num > 1000000 && options.num < 10000000) {
			if (t < 10) {
				t = "000000" + t
			} else if (t < 100 && t >= 10) {
				t = "00000" + t
			} else if (t < 1000 && t >= 100) {
				t = "0000" + t
			} else if (t < 10000 && t >= 1000) {
				t = "000" + t
			}else if (t < 100000 && t >= 10000) {
				t = "00" + t
			}else if (t < 1000000 && t >= 100000) {
				t = "0" + t
			}
		}
		if (options.num > 100000 && options.num < 1000000) {
			if (t < 10) {
				t = "00000" + t
			} else if (t < 100 && t >= 10) {
				t = "0000" + t
			} else if (t < 1000 && t >= 100) {
				t = "000" + t
			} else if (t < 10000 && t >= 1000) {
				t = "00" + t
			}else if (t < 100000 && t >= 10000) {
				t = "0" + t
			}
		}
		if (options.num > 10000 && options.num < 100000) {
			if (t < 10) {
				t = "0000" + t
			} else if (t < 100 && t >= 10) {
				t = "000" + t
			} else if (t < 1000 && t >= 100) {
				t = "00" + t
			} else if (t < 10000 && t >= 1000) {
				t = "0" + t
			}
		}
		if (options.num > 1000 && options.num < 10000) {
			if (t < 10) {
				t = "000" + t
			} else if (t < 100 && t >= 10) {
				t = "00" + t
			} else if (t < 1000 && t >= 100) {
				t = "0" + t
			}
		}
		initNum = t
		var result = (typeof options.format !== 'undefined') && options.format ? parseInt(initNum).toLocaleString() : initNum;
		$this.innerHTML = options.isComma===true?format_number(result):result;
	}, 30)
}

/**
 * 给数字加逗号
 */
function format_number(nStr ){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}