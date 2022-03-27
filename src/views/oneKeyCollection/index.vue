<template>
  <div>
    <div class="usdt-card theme-box-shadow">
      <div class="usdt-model">
        <p class="p-1">全部账号余额</p>
        <p class="p-2">{{ balanceOf.account }}</p>
      </div>
      <div class="usdt-model">
        <p class="p-1">全部账号授权余额</p>
        <p class="p-2">{{ balanceOf.auth }}</p>
      </div>
    </div>
    <el-button type="success" @click="qAll">一键归集</el-button>
    <el-button type="success" @click="ps">批量归集</el-button>
  </div>
</template>

<script setup>
import { PlusElMessage } from "@/utils/PlusElement";
import { reactive } from "vue";
import { UseStoreWeb3js, UseStoreContracts } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import baseAddress from "@/abis/contracts";
const { AbiAddressUSDT } = baseAddress;

const storeWeb3js = UseStoreWeb3js();
const { userAddress, web3 } = storeToRefs(storeWeb3js);

const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
function textFromWei(str) {
  return web3.value.utils.fromWei(str) || str;
}
// function textToWei(str) {
//     return web3.value.utils.toWei(str.toString()) || str
// }
async function qAll() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.q_all(AbiAddressUSDT).send({
      from: userAddress.value,
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

init();
async function init() {
  getAllBalanceOf();
  getAllBalanceOf_();
}

const balanceOf = reactive({
  account: "0",
  auth: "0",
});

async function getAllBalanceOf() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods.getAllBalanceOf(AbiAddressUSDT).call();
    balanceOf.account = textFromWei(res);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
async function getAllBalanceOf_() {
  try {
    const { QKContract } = Contracts.value;
    const res = await QKContract.methods
      .getAllBalanceOf_(AbiAddressUSDT)
      .call();
    balanceOf.auth = textFromWei(res);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

function ps() {
  PlusElMessage({
    type: "warning",
    message: "developmenting...",
  });
}
</script>
<style lang="scss" scoped>
.usdt-card {
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .usdt-model {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px;
    .p-1 {
      font-size: 20px;
    }
    .p-2 {
      margin: 40px 0 50px;
      font-size: 40px;
    }
  }
}
</style>
