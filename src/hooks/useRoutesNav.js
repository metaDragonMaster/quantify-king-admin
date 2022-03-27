import { ref } from "vue"
import { useRouter } from "vue-router"
import { deepClone } from "@/utils/tools"
function flatDeepArr(arr) {
    const deepArr = deepClone(arr);
    return deepSome(deepArr);
}
function deepSome(arr) {
    let list = [];
    for (const i in arr) {
        const element = arr[i];
        if (element.children) {
            const nav = element.children.filter(item => item.meta && item.meta.isNav)
            nav.map(item => {
                list.push({
                    path: item.path,
                    name: item.name,
                    title: item.meta && item.meta.title ? item.meta.title : '',
                })
            })
        }
    }
    return list;
}
export function RoutesNav() {
    const Router = useRouter()
    const navList = ref(flatDeepArr(Router.options.routes))
    return navList
}