import { 
	ref ,
	onMounted, 
	onUnmounted 
} from "vue";
import { throttle } from "lodash"
import {
	getScroll,
	getWindowInnerHeight,
	getWindowInnerWidth,
} from "@/utils/window"
import {
	useSafeListener
} from './useSafeListener'
export function useWindowResize(callback,wait = 16) {
	let width = getWindowInnerWidth();
	let height = getWindowInnerHeight();
	const onResize = throttle(() => {
		width = getWindowInnerWidth();
		height = getWindowInnerHeight();
		console.log(`获取浏览器视图宽度(w:${width},h:${height})`)
		callback&&callback(width,height)
	}, wait, { leading: true })
	// useSafeListener('resize', onResize)
	function add() {
		window.addEventListener('resize', onResize, true);
		onResize();
	}
	function remove() {
		window.removeEventListener('resize', onResize, true);
	}
	onMounted(() => {
		remove()
		add()
	});
	onUnmounted(() => {
		remove()
	});
	return {
		width,
		height
	};
}

export function useWindowScroll(callback,wait = 16) {
	const scrollTopValue = ref(0);
	const onScroll = throttle(() => {
		scrollTopValue.value = getScroll();
		callback&&callback(scrollTopValue)
		// console.log(`获取浏览器滚动条:(top:${scrollTopValue.value})`)
	}, wait, { leading: true })
	useSafeListener('scroll', onScroll)
	return {
		scrollTopValue
	};
}

