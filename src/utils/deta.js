
/*
	时间处理

	const Deta = new Deta()
	const week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

	Deta.toLocaleString() 中国时间格式 : "2017/10/18 下午4:58:42"
	Date.toString() Date对象转为英文的字符串 "Wed Oct 18 2017 17:08:09 GMT+0800 (中国标准时间)"

	Deta.toTimeString() 转换为24小时制时间字符串 :  "18:22:12 GMT+0800 (中国标准时间)"
	Deta.toDateString() Date对象的时间部分转为字符串 : "Thu Oct 19 2017"
	Deta.toUTCString() Date对象转换成世界时间的字符串 : "Thu, 19 Oct 2017 06:20:31 GMT"
	Deta.toLocaleTimeString() 转为本地am/pm 格式 : "下午2:20:31"

	Deta.getTime() 当前Date距1970年1月1日午夜的毫秒数/时间戳 : 1508317956004
	Deta.getFullYear() 返回一个表示年份的数字，获取年份 : 2017
	Deta.setFullYear(1992) 更改年份，设置年份 : Mon Jul 13 1992 11:55:28 GMT+0800 (中国标准时间)
	Deta.getMonth()+1 返回月份，获取月份 : 10
	Deta.setMonth(8) 更改月份，设置月份 : Wed Sep 13 2017 14:02:44 GMT+0800 (中国标准时间)
	Deta.getDate() 返回当前日（1-31）天数 : 18
	Deta.setDate(25) 设置某一天 : Tue Jul 25 2017 14:20:18 GMT+0800 (中国标准时间)
	week[Deta.getDay()]获取星期的某一天的数字 :  //  星期四
	Deta.getHours() 返回当前小时 : 17
	Deta.setHours(9) 用于设置/更改小时() : Thu Jul 13 2017 09:37:31 GMT+0800 (中国标准时间) //返回值为0-23
	Deta.getMinutes() 返回时间的分钟字段 : 14
	Deta.setMinutes(55,12,5) 用于设置分钟字段，范围为0-59 : Thu Jul 13 2017 15:55:12 GMT+0800 (中国标准时间)
	Deta.setMinutes(55) 用于设置分钟字段，范围为0-59 : Wed Oct 18 2017 18:55:13 GMT+0800 (中国标准时间)
	Deta.getSeconds() 获取时间的秒 范围为0-59 : 58
	Deta.setSenconds(12) 用于更改秒 : Thu Jul 13 2017 15:15:12 GMT+0800 (中国标准时间)
	Deta.getMilliseconds() 获取毫秒 : 147
	Deta.setMilliseconds(789) 更改毫秒 : 789

*/

/**
 * @description 格式化时间
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	return format.replace(/{([ymdhisa])+}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
}

/**
 * @description 格式化时间
 * @param time
 * @param option
 * @returns {string}
 */
export function formatTime(time, option) {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000
	} else {
		time = +time
	}
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		)
	}
}

/**
 * @description 10位时间戳转换
 * @param time
 * @returns {string}
 */
export function tenBitTimestamp(time) {
	const date = new Date(time * 1000)
	const y = date.getFullYear()
	let m = date.getMonth() + 1
	m = m < 10 ? '' + m : m
	let d = date.getDate()
	d = d < 10 ? '' + d : d
	let h = date.getHours()
	h = h < 10 ? '0' + h : h
	let minute = date.getMinutes()
	let second = date.getSeconds()
	minute = minute < 10 ? '0' + minute : minute
	second = second < 10 ? '0' + second : second
	return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/**
 * @description 13位时间戳转换
 * @param time
 * @returns {string}
 */
export function thirteenBitTimestamp(time) {
	const date = new Date(time / 1)
	const y = date.getFullYear()
	let m = date.getMonth() + 1
	m = m < 10 ? '' + m : m
	let d = date.getDate()
	d = d < 10 ? '' + d : d
	let h = date.getHours()
	h = h < 10 ? '0' + h : h
	let minute = date.getMinutes()
	let second = date.getSeconds()
	minute = minute < 10 ? '0' + minute : minute
	second = second < 10 ? '0' + second : second
	return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/*
	var d = new Date();//Date有需要参数可以传入
	alert(Format(d,"yyyy-MM-dd"));
*/
export function Format(now, mask) {
	var d = now;
	const zeroize = function (value, length) {
		if (!length) length = 2;
		value = String(value);
		let i = 0;
		let zeros = '';
		for (; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
		switch ($0) {
			case 'd': return d.getDate();
			case 'dd': return zeroize(d.getDate());
			case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
			case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
			case 'M': return d.getMonth() + 1;
			case 'MM': return zeroize(d.getMonth() + 1);
			case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
			case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
			case 'yy': return String(d.getFullYear()).substr(2);
			case 'yyyy': return d.getFullYear();
			case 'h': return d.getHours() % 12 || 12;
			case 'hh': return zeroize(d.getHours() % 12 || 12);
			case 'H': return d.getHours();
			case 'HH': return zeroize(d.getHours());
			case 'm': return d.getMinutes();
			case 'mm': return zeroize(d.getMinutes());
			case 's': return d.getSeconds();
			case 'ss': return zeroize(d.getSeconds());
			case 'l': return zeroize(d.getMilliseconds(), 3);
			case 'L': var m = d.getMilliseconds();
				if (m > 99) m = Math.round(m / 10);
				return zeroize(m);
			case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
			case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
			case 'Z': return d.toUTCString().match(/[A-Z]+$/);
			// Return quoted strings with the surrounding quotes removed
			default: return $0.substr(1, $0.length - 2);
		}
	});
}
