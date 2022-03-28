<template>
  <div>
    <el-form :model="FormData" label-width="120px" label-position="top">
      <el-form-item label="时间:秒数">
        <el-input v-model.number="FormData.timeTamp" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submit"> submit </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { lockLoadHandler, PlusElMessage } from "@/utils/PlusElement";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress } = storeToRefs(storeWeb3js);

const FormData = reactive({
  timeTamp: "",
});
async function submit() {
  const load = lockLoadHandler("setting loading...");
  try {
    const res = await setTimeTamp();
    if (res) {
      PlusElMessage({
        type: "success",
        message: "success: setTimeTamp",
      });
    } else {
      PlusElMessage({
        type: "error",
        message: "failed: setTimeTamp",
      });
    }
    load.close();
  } catch (e) {
    PlusElMessage({
      type: "error",
      message: e.message,
    });
    load.close();
  }
}

async function setTimeTamp() {
  try {
    const { QKContract } = Contracts.value;
    const { timeTamp } = FormData;
    const res = await QKContract.methods.set_time_tamp(timeTamp).send({
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
<style lang="scss" scoped></style>
