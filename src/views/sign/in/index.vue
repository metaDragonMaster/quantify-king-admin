<template>
  <div>
    <Link to="/query/data"><el-button>登入</el-button></Link>
  </div>
</template>

<script setup>
import { UseStoreWeb3js } from "@/stores/web3js";

const storeWeb3js = UseStoreWeb3js();
const { startWeb3 } = storeWeb3js;
async function init() {
  await startWeb3();
}
</script>
<style lang="scss" scoped></style>
