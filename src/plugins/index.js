import piniaInstall from "./pinia";
import ElementPlus from "./elementPlus"
import VueI18n from "@/i18n"
import VueRouter from "@/router"
import Link from "@/components/Link"
export default function install(app) {
  app.use(VueRouter)
  app.use(piniaInstall);
  app.use(VueI18n);
  app.use(ElementPlus)
  app.component('Link',Link)
}
