<template>
  <div>
    <el-form :model="FormData" label-width="120px" label-position="top">
      <el-form-item label="用户地址">
        <el-input v-model="FormData.address" />
      </el-form-item>
      <el-form-item>
        <el-tag type="danger">一旦提交，无法撤回，请确保地址正确。</el-tag>
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
  address: "",
});
async function submit() {
  const load = lockLoadHandler("up loading...");
  try {
    const res = await updateAdmin();
    if (res) {
      PlusElMessage({
        type: "success",
        message: "success: update admin",
      });
    } else {
      PlusElMessage({
        type: "error",
        message: "failed: update admin",
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

async function updateAdmin() {
  try {
    const { QKContract } = Contracts.value;
    const { address } = FormData;
    const res = await QKContract.methods.update_admin(address).send({
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
