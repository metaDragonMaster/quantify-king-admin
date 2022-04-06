<template>
  <div class="common-layout">
    <el-container>
      <el-header class="theme-box-shadow">
        <HeadNav></HeadNav>
      </el-header>
      <el-container>
        <el-aside class="theme-box-shadow" :width="menuWidth">
          <Menu :isCollapse="isCollapse"></Menu>
        </el-aside>
        <el-main>
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      v-model="_isMenuDrawer"
      size="220px"
      custom-class="menu-drawer"
      direction="ltr"
      :with-header="false"
      :close-on-press-escape="false"
    >
      <Menu></Menu>
    </el-drawer>
  </div>
</template>
<script setup>
import { watch, computed } from "vue";
import HeadNav from "./headNav";
import Menu from "./menu";

import { storeToRefs } from "pinia";
import { useWindowResize } from "@/hooks/useWindow";
import { UseStoreResize } from "@/stores/window";
import { UseStoreWeb3js } from "@/stores/web3js";
import { UseStoreMenu } from "@/stores/menu";

const storeResize = UseStoreResize();
const { setClientWidth } = storeResize;
const {
  isPc,
} = storeToRefs(storeResize);
useWindowResize(() => {
  setClientWidth();
});
const storeMenu = UseStoreMenu();
const { setIsCollapse, setIsMenuDrawer } = storeMenu;
const { isCollapse, menuWidth, isMenuDrawer } = storeToRefs(storeMenu);
watch(
  () => isPc.value,
  (n) => {
    console.log(n);
    setIsCollapse(!n);
  }
);
const _isMenuDrawer = computed({
  get() {
    return isMenuDrawer.value;
  },
  set(v) {
    setIsMenuDrawer(v);
  },
});


const storeWeb3js = UseStoreWeb3js();
const { startWeb3 } = storeWeb3js;
const { haveWeb3 } = storeToRefs(storeWeb3js)
init()
async function init() {
	if (!haveWeb3.value) {
		console.log('获取web3')
		await startWeb3();
	}
}

</script>
<style lang="scss" scoped>
$head-height__pc: 88px;
$head-height__ph: 64px;
$layout-background__color: #242424;
$layout-color: #ffffff;
.common-layout {
  color: #fff;
  background-color: $layout-background__color;
  min-height: 100vh;
  .el-container {
    // height: calc(100vh - 60px);
    min-height: 100vh;
  }
  .el-header {
    @media screen and (min-width: 769px) {
      height: $head-height__pc;
    }
    @media screen and (max-width: 768px) {
      height: $head-height__ph;
    }
  }
  .el-aside {
    min-height: 100%;
    transition: width 0.1s;
  }
  // .el-main {
    // @media screen and (min-width: 769px) {
    //   height: calc(100% - $head-height__pc);
    // }
    // @media screen and (max-width: 768px) {
    //   height: calc(100% - $head-height__ph);
    // }
  // }
}
:deep(.menu-drawer) {
  // width: 90%;
  background-color: $layout-background__color;
}
</style>
