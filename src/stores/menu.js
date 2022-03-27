import { defineStore } from "pinia"
import { UseStoreResize } from "./window"
export const UseStoreMenu = defineStore('Language', {
    state: () => ({
        _isCollapse : false,
        _isMenuDrawer : false,
    }),
    getters: {
        isCollapse:({_isCollapse}) => _isCollapse,
        isMenuDrawer:({_isMenuDrawer}) => _isMenuDrawer,
        menuWidth:() => {
            const storeResize = UseStoreResize()
            const { clientWidth } = storeResize;
            if (clientWidth <= 500) {
                return '0'
            } else if (clientWidth <= 768) {
                return '64px'
            } else {
                return '220px'
            }
        },
    },
    actions: {
        setIsCollapse(bool) {
            this._isCollapse = bool
        },
        setIsMenuDrawer(bool) {
            this._isMenuDrawer = bool
        },
    }
})