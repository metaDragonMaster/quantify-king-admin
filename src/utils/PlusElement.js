import { ElLoading, ElMessage } from "element-plus";
/*
	target	Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点	object/string	—	document.body
	body	同 v-loading 指令中的 body 修饰符	boolean	—	false
	fullscreen	同 v-loading 指令中的 fullscreen 修饰符	boolean	—	true
	lock	同 v-loading 指令中的 lock 修饰符	boolean	—	false
	text	显示在加载图标下方的加载文案	string	—	—
	spinner	自定义加载图标类名	string	—	—
	background	遮罩背景色	string	—	—
	custom-class	Loading 的自定义类名	string	—	—
*/
/*
element-loading-text	显示在加载图标下方的加载文案	string
element-loading-spinner	自定义加载图标	string
element-loading-svg	自定义加载图标 (与 element-loading-spinner 相同)	string
element-loading-background	背景遮罩的颜色	string

	element-loading-text="Loading..."
	:element-loading-spinner="LoadSvg"
	:element-loading-svg-view-box="svgViewBox"
	:element-loading-background="LoadBackground"

import {
	PlusElMessage,
	LoadBackground,
	LoadSvg,
	svgViewBox,
} from "@/utils/PlusElement";
*/

export const LoadBackground = 'rgba(0, 0, 0, 0.8)'
export const LoadSvg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;
export const svgViewBox = "-10, -10, 50, 50";
export const lockLoadHandler = (text) => {
  return ElLoading.service({
    lock: true,
    text: text,
    spinner: LoadSvg,
    svgViewBox: svgViewBox,
    background: LoadBackground,
  });
};
export const targetLoadHandler = (target, text) => {
	return ElLoading.service({
		target,
		text,
		spinner: LoadSvg,
		svgViewBox: svgViewBox,
		background: LoadBackground,
	});
};


export async function tryFunction(fn, errFn, loadText = "loading...") {
  const lockLoad = lockLoadHandler(loadText);
  try {
    if (fn) {
      await fn(lockLoad);
    }
    lockLoad.close();
  } catch (error) {
    console.error(error);
    errFn(error);
    lockLoad.close();
  }
}
export const PlusElMessage = (option) => {
  if(option.type == 'error') option.duration = 0
  return ElMessage({
    grouping: true,
    showClose: true,
    ...option,
  });
};
