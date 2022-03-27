import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes.js";
import { UseStoreWeb3js } from "@/stores/web3js.js";
const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        left: 0,
        behavior: "smooth",
      };
    }
  },
});

const whiteRathPathList = ["/sign/in"];

router.beforeEach(async (to, from, next) => {
  const storeWeb3js = UseStoreWeb3js();
  const { startWeb3, haveWeb3 } = storeWeb3js;
  // console.log(haveWeb3 ,!haveWeb3 && !whiteRathPathList.includes(to.path))
  if (!haveWeb3 && !whiteRathPathList.includes(to.path)) {
    try {
      const queryWeb3 = await startWeb3();
      if (queryWeb3) {
        next(to.path);
      } else {
        next("/sign/in");
      }
    } catch (error) {
      console.error(error);
      next("/");
    }
  } else {
    next();
  }
});


router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
