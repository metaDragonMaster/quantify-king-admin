
import { defineStore } from "pinia"
// import { getScroll ,getClientWidth} from "@/utils/tools"
import {
	getScroll,
	// getWindowInnerHeight,
	getWindowInnerWidth,
} from "@/utils/window"

export const UseStoreResize = defineStore('Resize', {
    state: () => ({
        _ClientWidth:getWindowInnerWidth(),//页面宽度
    }),
    getters: {
        clientWidth: ({ _ClientWidth }) => _ClientWidth,
        isPc: ({ _ClientWidth }) => _ClientWidth > 768,
    },
    actions: {
        setClientWidth() {
            this._ClientWidth = getWindowInnerWidth();
        },
    }
})

export const UseStoreScroll = defineStore('Scroll', {
    state: () => ({
        _ScrollTop: getScroll(),//滚动条高度
    }),
    getters: {
        scrollTop: ({ _ScrollTop }) => _ScrollTop,
    },
    actions: {
        setScrollTop() {
            this._ScrollTop = getScroll();
        },
    }
})