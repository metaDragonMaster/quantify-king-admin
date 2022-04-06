<template>
	<el-icon class="icon-fold" @click="setMenu">
		<Fold v-show="isCollapse" />
		<Expand v-show="!isCollapse" />
	</el-icon>
</template>

<script setup>
import { Fold, Expand } from "@element-plus/icons-vue";
import { UseStoreMenu } from "@/stores/menu";
import { UseStoreResize } from "@/stores/window";
import { storeToRefs } from "pinia";
const storeMenu = UseStoreMenu();
const { setIsCollapse, setIsMenuDrawer } = storeMenu;
const { isCollapse } = storeToRefs(storeMenu);
const storeResize = UseStoreResize();
const { isPc } = storeToRefs(storeResize);
function setMenu() {
	if (isPc.value) {
		setIsCollapse(!isCollapse.value);
	} else {
		setIsMenuDrawer(true);
	}
}
</script>
<style lang="scss" scoped>
.icon-fold {
	display: inline-block;
	font-size: 28px;
	cursor: pointer;
	margin-left: auto;
}
</style>
