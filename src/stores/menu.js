import { defineStore } from 'pinia';
import { UseStoreResize } from './window';
export const UseStoreMenu = defineStore('Language', {
	state: () => ({
		_isCollapse: false,
		_isMenuDrawer: false,
	}),
	getters: {
		isCollapse: ({ _isCollapse }) => _isCollapse,
		isMenuDrawer: ({ _isMenuDrawer }) => _isMenuDrawer,
		menuWidth: ({ _isCollapse }) => {
			const storeResize = UseStoreResize();
			const { clientWidth } = storeResize;
			console.log('clientWidth', clientWidth, _isCollapse);
			if (clientWidth <= 500) {
				return '0';
			} else if (clientWidth <= 768||_isCollapse == true) {
				return '64px';
			} else {
				return '220px';
			}
		},
	},
	actions: {
		setIsCollapse(bool) {
			this._isCollapse = bool;
		},
		setIsMenuDrawer(bool) {
			this._isMenuDrawer = bool;
		},
	},
});
