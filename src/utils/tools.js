// import { ElMessage } from "element-plus"
import { PlusElMessage } from '@/utils/PlusElement';

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments', 'deepClone');
	}
	const targetObj = source.constructor === Array ? [] : {};
	Object.keys(source).forEach((keys) => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys]);
		} else {
			targetObj[keys] = source[keys];
		}
	});
	return targetObj;
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
	const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
	if (!search) {
		return {};
	}
	const obj = {};
	const searchArr = search.split('&');
	searchArr.forEach((v) => {
		const index = v.indexOf('=');
		if (index !== -1) {
			const name = v.substring(0, index);
			const val = v.substring(index + 1, v.length);
			obj[name] = val;
		}
	});
	return obj;
}
export const countStatistics = (n) => {
	//统计字数
	/*	@统计规则：
			中文 	+1
			图片标签 +1
			英文		+1/2
	*/
	let temp = n.replace(/<\/?.+?>/g, '');
	let result = temp.replace(/ /g, ''); //result为获取冲文字得到后的内容，去除空格
	let zh = temp.replace(/[a-zA-Z]+/g, ''); //去除英文
	let imageLabel = n.match(/<img[^>]+>/g); //图片标签：type:Array
	let imageLength;
	if (imageLabel) {
		imageLength = imageLabel.length;
	}
	if (!imageLabel) {
		imageLength = 0;
	}
	return imageLength + zh.length + (result.length - zh.length) / 2;
	// console.log("格式化之后的内容：",this.spanInfo)
};

export const debounce = (fn, delay = 300) => {
	let timer = null;
	return function () {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
};
export const throttle = (fn, delay = 1000) => {
	var timer = null;
	return function () {
		if (timer) return;
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
};

export const assign = function (objs) {
	return Object.assign(...objs);
};
export const getItemByKey = function (value, list, key = 'value') {
	return list.filter((item) => value == item[key])[0] || undefined;
};
export const getValueByKey = function (value, attr, list, key = 'value') {
	return list.filter((item) => value == item[key])[0][attr] || undefined;
};
export const getObjectKeyAndValue = function (
	object,
	keyName = 'key',
	valueName = 'value'
) {
	let obj = [];
	for (let i in object) {
		console.log(object[i], i);
		obj.push({
			[keyName]: i,
			[valueName]: object[i],
		});
	}
	return obj;
};

export const ArrayKeysToObject = function (Arr, Interface) {
	let _project = {};
	let i;
	for (i in Arr) {
		if (Interface.includes(i)) {
			_project[i] = Arr[i];
		}
	}
	return _project;
};

export function copy(text) {
	// console.log('copyText');
	const textareaEl = document.createElement('textarea');
	textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
	textareaEl.style.position = 'absolute';
	textareaEl.style.left = '-100vw';
	textareaEl.value = text;
	document.body.appendChild(textareaEl);
	textareaEl.select();
	const success = document.execCommand('copy');
	document.body.removeChild(textareaEl);
	// if (fn) fn(success);
	// if (success) {
	// 	ElMessage({
	// 		type: 'success',
	// 		message: 'copy success',
	// 		grouping: true,
	// 		showClose: true,
	// 	})
	// }
	return success;
}
export function PlusCopy(text) {
	const res = copy(text);
	PlusElMessage({
		type: res ? 'success' : 'error',
		message: res ? 'copy success' : 'copy error',
	});
}
export const downloadFile = function (file) {
	const a = document.createElement('a');
	let url = window.URL.createObjectURL(file);
	a.href = url;
	a.download = file.name;
	a.click();
	window.URL.revokeObjectURL(url);
};

export const fileToUrl = function (file) {
	let url = window.URL.createObjectURL(file);
	window.URL.revokeObjectURL(url);
	return url;
};

/**
 * 计算百分比
 * @param   {number} num   分子
 * @param   {number} total 分母
 * @returns {number} 返回数百分比
 */
export function Percentage(num, total) {
	if (num == 0 || total == 0) {
		return 0;
	}
	return Math.round((num / total) * 10000) / 100.0; // 小数点后两位百分比
}

export function truncationAddress(address, startNum = 6, endNum = 4) {
	return `${address.slice(0, startNum)}****${address.slice(-endNum)}`;
}
export function numToArr(num) {
	if (typeof num != 'number' || num <= 0) return [];
	const arr = [];
	let i = 0;
	do {
		arr.push(i++);
	} while (arr.length < num);
	return arr;
}

export function flatten(arr) {
	return arr.reduce((result, item) => {
		return result.concat(Array.isArray(item) ? flatten(item) : item);
	}, []);
}
