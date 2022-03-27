<template>
    <div class="head">
        <Logo></Logo>
        <!-- <el-radio-group v-model="_isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>-->
        <el-icon class="icon-fold" @click="setIsMenuDrawer(true)">
            <Fold />
        </el-icon>
    </div>
</template>
<script setup>
import Logo from "./logo"
import {
    Fold
} from '@element-plus/icons-vue'

import {
    // computed,
} from 'vue'
import {
    UseStoreMenu
} from "@/stores/menu"
// import { storeToRefs } from 'pinia';
// const isCollapse = ref(true)
const storeMenu = UseStoreMenu()
const {
    setIsMenuDrawer,
} = storeMenu
</script>
<style lang="scss" scoped>
.head {
    height: 100%;
    display: flex;
    align-items: center;
}
.icon-fold {
    display: none;
    @media screen and (max-width: 500px) {
        display: inline-block;
        margin-left: auto;
        font-size: 28px;
        cursor: pointer;
    }
}
</style>