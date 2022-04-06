import piniaInstall from "./pinia";
import ElementPlus from "./elementPlus"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import VueI18n from "@/i18n"
import VueRouter from "@/router"
import Link from "@/components/Link"
export default function install(app) {
  app.use(VueRouter)
  app.use(piniaInstall);
  app.use(VueI18n);
  app.use(ElementPlus,{
    locale: zhCn
  })
  app.component('Link',Link)
}
