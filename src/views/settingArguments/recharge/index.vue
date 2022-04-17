<template>
  <div>
    <div class="broad theme-box-shadow">
      <p>平台余额</p>
      <p>{{ balanceOfValue }} USDT</p>
    </div>
    <el-form :model="FormData" label-width="120px" label-position="top">
      <el-form-item label="充值数额">
        <!-- <el-input v-model.number="FormData.amount"></el-input> -->
        <el-input-number
          v-model="FormData.amount"
          controls-position="right"
          size="large"
          :controls="false"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submit"> submit </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { lockLoadHandler, PlusElMessage } from "@/utils/PlusElement";
import { AbiAddressQK } from "@/abis/index";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress, web3 } = storeToRefs(storeWeb3js);

const FormData = reactive({
  amount: 0,
});
function textFromWei(str) {
  return web3.value.utils.fromWei(str) || str;
}
function textToWei(str) {
  return web3.value.utils.toWei(str.toString()) || str;
}
onMounted(() => {
  init();
});
async function init() {
  await balanceOf();
}
const balanceOfValue = ref("0");
async function balanceOf() {
  try {
    const { USDTContract } = Contracts.value;
    console.log(USDTContract);
    const res = await USDTContract.methods.balanceOf(AbiAddressQK).call();
    console.log(res);
    balanceOfValue.value = textFromWei(res);
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function submit() {
  const load = lockLoadHandler("transfer loading...");
  try {
    const res = await transfer();
    if (res) {
      PlusElMessage({
        type: "success",
        message: "success: transfer",
      });
      await init();
    } else {
    //   PlusElMessage({
    //     type: "error",
    //     message: "failed: transfer",
    //   });
    }
    load.close();
  } catch (e) {
    // PlusElMessage({
    //   type: "error",
    //   message: e.message,
    // });
    load.close();
  }
}

async function transfer() {
  try {
    const { USDTContract } = Contracts.value;
    const { amount } = FormData;
    const weiAmount = textToWei(amount);
    const res = await USDTContract.methods
      .transfer(AbiAddressQK, weiAmount)
      .send({
        from: userAddress.value,
      });
    console.log(res);
    if (res.status) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}
</script>
<style lang="scss" scoped>
.broad {
  padding: 15px 20px;
  border-radius: 4px;
  // width: fit-content;
}
.el-input-number {
  width: 100%;
}
</style>
