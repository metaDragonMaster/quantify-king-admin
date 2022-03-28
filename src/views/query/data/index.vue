<template>
  <div>
    <ul class="grid grid-2">
      <li class="theme-box-shadow">
        <p class="p-1">全部钱包USDT余额</p>
        <p class="p-2">{{ weiAllBalanceOf }}</p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">钱包地址数量</p>
        <p class="p-2">{{ board.users }}</p>
      </li>
    </ul>
    <ul class="grid grid-3">
      <li class="theme-box-shadow">
        <p class="p-1">累积产生利息</p>
        <p class="p-2">{{ allWithdraw }}</p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">推荐奖励提现</p>
        <p class="p-2">{{ weiReWithdraw }}</p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">用户利息提现</p>
        <p class="p-2">{{ weiWithdraw }}</p>
      </li>
    </ul>
    <!-- <ul class="grid grid-2"> -->
    <!-- <li class="theme-box-shadow">
        <p class="p-1">未领取利息</p>
        <p class="p-2">99999999999</p>
      </li> -->
    <!-- <li class="theme-box-shadow">
        <p class="p-1">预计下次结息数量</p>
        <p class="p-2">99999999999</p>
      </li> -->
    <!-- </ul> -->
  </div>
</template>

<script setup>
import {
  // LoadSvg,
  // svgViewBox,
  lockLoadHandler,
  PlusElMessage,
} from "@/utils/PlusElement";
import { computed, reactive, onMounted } from "vue";
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
const allWithdraw = computed(
  () => textFromWei((Number(board.reWithdraw) + Number(board.withdraw)).toString())
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
.grid {
  display: grid;
  grid-gap: 30px;
  margin-bottom: 30px;
  li {
    border-radius: 4px;
    max-width: 100%;
    @media screen and (min-width: 1280px) {
      padding: 40px 50px;
    }
    @media screen and (min-width: 769px) and (max-width: 1279px) {
      padding: 20px 30px;
    }
    @media screen and (max-width: 768px) {
      padding: 10px 20px;
    }
    .p-1 {
      font-size: 20px;
    }
    .p-2 {
      //   margin: 40px 0 50px;
      font-size: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.grid-2 {
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.grid-3 {
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
