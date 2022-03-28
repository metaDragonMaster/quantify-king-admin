<template>
  <div>
    <el-table
      :data="table.data"
      style="width: 100%"
      v-loading="table.load"
      element-loading-text="get Data Loading..."
      :element-loading-spinner="LoadSvg"
      :element-loading-svg-view-box="svgViewBox"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="_payee" label="地址"></el-table-column>
      <el-table-column prop="_shares" label="比例"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { LoadSvg, svgViewBox } from "@/utils/PlusElement";
import { reactive, onMounted } from "vue";
import {
  UseStoreContracts,
  // UseStoreWeb3js
} from "@/stores/web3js";
import { storeToRefs } from "pinia";
const storeContracts = UseStoreContracts();
// const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
// const { userAddress } = storeToRefs(storeWeb3js);

// const tableCell = reactive(defaultCell);
const table = reactive({
  load: false,
  data: [],
});

onMounted(() => {
  init();
});
async function init() {
  console.log(table);
  await getTableData();
}

const payeeNum = process.env.NODE_ENV == "development" ? [0, 1] : [0, 1, 2, 3];
async function getTableData() {
  try {
    const { QKContract } = Contracts.value;
    table.data = await Promise.all(
      payeeNum.map(async (item) => {
        const _payee = await QKContract.methods.payee(item).call();
        const _shares = await QKContract.methods.shares(_payee).call();
        return {
          _payee,
          _shares: `${_shares}%`,
        };
      })
    );
  } catch (e) {
    console.log(e);
  }
}

/*
    
async function getTableData() {
  table.load = true;
  try {
    const { QKContract } = Contracts.value;
    const Interests = await QKContract.methods.get_interest().call();
    const Conditionals = await QKContract.methods
      .get_conditional_value()
      .call();
    console.log("data", Interests, Conditionals);
    const length =
      Conditionals.length == Interests.length ? Conditionals.length : 0;
    table.data = [];
    for (let i = 0; i < length; i++) {
      table.data.push({
        id: i.toString(),
        conditional: Conditionals[i],
        interest: Interests[i],
      });
    }
    table.load = false;
  } catch (e) {
    console.error(e);
    table.load = false;
  }
}
*/
</script>
<style lang="scss" scoped>
.save {
  margin-bottom: 10px;
}
</style>
