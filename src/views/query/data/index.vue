<template>
  <el-row :gutter="10">
    <el-col>
      <el-date-picker
        v-model="timeSection"
        type="datetimerange"
        range-separator="到"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
      <p>{{ timeSection }}</p>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <el-card class="theme-box-shadow">
        <p class="p-1">全部钱包USDT余额</p>
        <p class="p-2">{{ weiAllBalanceOf }}</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <el-card class="theme-box-shadow">
        <p class="p-1">钱包地址数量</p>
        <p class="p-2">{{ board.users }}</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="theme-box-shadow">
        <p class="p-1">累积产生利息</p>
        <p class="p-2">{{ allWithdraw }}</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="theme-box-shadow">
        <p class="p-1">推荐奖励提现</p>
        <p class="p-2">{{ weiReWithdraw }}</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="theme-box-shadow">
        <p class="p-1">用户利息提现</p>
        <p class="p-2">{{ weiWithdraw }}</p>
      </el-card>
    </el-col>
    <el-col><h3 class="news">新增数据</h3></el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="news theme-box-shadow">
        <p class="p-1">新增钱包地址数量</p>
        <p class="p-2">999999999999</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="news theme-box-shadow">
        <p class="p-1">新增钱包地址USDT数量</p>
        <p class="p-2">999999999999</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="news theme-box-shadow">
        <p class="p-1">新增质押USDT数量</p>
        <p class="p-2">999999999999</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="news theme-box-shadow">
        <p class="p-1">新增产生利息数量</p>
        <p class="p-2">999999999999</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="news theme-box-shadow">
        <p class="p-1">新增钱包地址USDT数量</p>
        <p class="p-2">999999999999</p>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      <el-card class="news theme-box-shadow">
        <p class="p-1">新增推荐奖励数量</p>
        <p class="p-2">999999999999</p>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  // LoadSvg,
  // svgViewBox,
  lockLoadHandler,
  PlusElMessage,
} from "@/utils/PlusElement";
import { ref, computed, reactive, onMounted } from "vue";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT } from "@/abis/index";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const {
  // userAddress
  web3,
} = storeToRefs(storeWeb3js);
function textFromWei(str) {
  return web3.value.utils.fromWei(str) || str;
}
// function textToWei(str) {
//   return web3.value.utils.toWei(str.toString()) || str;
// }
onMounted(() => {
  init();
});

const timeSection = ref("");

const board = reactive({
  AllBalanceOf: "0",
  users: "0",
  withdraw: "0",
  reWithdraw: "0",
  // calculateEarningsAll: '0',
});
const weiAllBalanceOf = computed(() => textFromWei(board.AllBalanceOf));
// const weiUsers = computed(()=> textFromWei(board.users))
const weiWithdraw = computed(() => textFromWei(board.withdraw));
const weiReWithdraw = computed(() => textFromWei(board.reWithdraw));
const allWithdraw = computed(() =>
  textFromWei((Number(board.reWithdraw) + Number(board.withdraw)).toString())
);

async function init() {
  // await getTableData();
  const load = lockLoadHandler("update loading...");
  try {
    await getAllBalanceOf();
    await getUsers();
    await getWithdrawAll();
    await getReWithdrawAll();
    // await getCalculateEarningsAll()
    load.close();
  } catch (e) {
    load.close();
  }
}

async function getAllBalanceOf() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.getAllBalanceOf(AbiAddressUSDT).call();
    console.log("getAllBalanceOf", res);
    board.AllBalanceOf = res;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
  }
}

async function getUsers() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.getUsers().call();
    console.log("getUsers", res);
    board.users = res.length;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
  }
}

async function getWithdrawAll() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods
      .get_withdraw_all(AbiAddressUSDT)
      .call();
    console.log("getWithdrawAll", res);
    board.withdraw = res;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
  }
}
async function getReWithdrawAll() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods
      .get_re_withdraw_all(AbiAddressUSDT)
      .call();
    console.log("getReWithdrawAll", res);
    board.reWithdraw = res;
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
  }
}

// async function getCalculateEarningsAll() {
//   try {
//     const { QKContract } = Contracts.value;
//     const res = await QKContract.methods.get_Calculate_Earnings_All(AbiAddressUSDT).call();
//     console.log("getCalculateEarningsAll", res);
//     board.calculateEarningsAll = res
//   } catch (e) {
//     console.error(e);
//     PlusElMessage({
//       type: "error",
//       message: e.message,
//     });
//   }
// }
</script>
<style lang="scss" scoped>
.el-row {
  max-width: 100%;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  .el-card {
    border: none;
    color: inherit;
  }
  .p-1 {
    font-size: 20px;
  }
  .p-2 {
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.news .p-2 {
  font-size: 20px;
}
</style>
