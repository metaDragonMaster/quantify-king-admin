import { onMounted, onUnmounted } from "vue";

export function useSafeHook(run,clear) {
	onMounted(() => {
		clear()
		run()
	});
	onUnmounted(() => {
		clear()
	});
}

//获得一个安全的定时器
export function useSafeInterval(fn, wait = 1000) {
	let timer = null;
	function runTimer() {
		timer = setInterval(fn, wait)
	}
	function clearTimer() {
		clearInterval(timer)
	}
	useSafeHook(runTimer,clearTimer)
	return { runTimer, clearTimer };
}

//获得一个安全的window绑定事件
export function useSafeListener(eventType, fn, useCapture = false) {
	function add() {
		window.addEventListener(eventType, fn, useCapture);
		fn(document);
	}
	function remove() {
		window.removeEventListener(eventType, fn, useCapture);
	}
	useSafeHook(add,remove)
	return { add, remove };
}

//获得一个节点的安全事件监听
export function useSafeTargetListener(Target, eventType, fn, useCapture = false) {
	function add() {
		Target.addEventListener(eventType, fn, useCapture);
		fn();
	}
	function remove() {
		Target.removeEventListener(eventType, fn, useCapture);
	}
	useSafeHook(add,remove);
	return { add, remove };
}
