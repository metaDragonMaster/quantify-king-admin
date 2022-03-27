
export const getScroll = () => document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
export const getClientWidth = () => document.documentElement.clientWidth || window.innerWidth;
export const getWindowHeight = () => window.outerHeight;//获取整个浏览器的高度
export const getWindowInnerHeight = () => window.innerHeight || document.documentElement.clientHeight;//获取浏览器视图的高度
export const getWindowInnerWidth = () => window.innerWidth || document.documentElement.clientWidth;//获取浏览器视图的高度
export const getWindowToolHeight = () => window.outerHeight - window.innerHeight;//获取浏览器工具栏的高度
export const startLanguage = () => localStorage.getItem('language') || (navigator.language ? navigator.language : navigator.userLanguage).toLowerCase().split("-")[0] || "zh";
