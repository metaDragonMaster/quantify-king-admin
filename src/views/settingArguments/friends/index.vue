<template>
  <div>
    <div class="save">
      <el-button type="success" v-if="isChangeCell" @click="saveCell"
        >保存</el-button
      >
    </div>
    <el-table
      :data="table.data"
      style="width: 100%"
      @cell-dblclick="DBClickCell"
      v-loading="table.load"
      element-loading-text="get Data Loading..."
      :element-loading-spinner="LoadSvg"
      :element-loading-svg-view-box="svgViewBox"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="fee" label="推荐分成比例">
        <template v-slot="{ row }">
          <span v-show="!isChangeCell || row.id != table.cell.id">{{
            row.fee
          }}</span>
          <el-input
            v-if="isChangeCell && row.id == table.cell.id"
            v-model="table.cell.fee"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {
  LoadSvg,
  svgViewBox,
  lockLoadHandler,
  PlusElMessage,
} from "@/utils/PlusElement";
import { computed, reactive, onMounted } from "vue";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress } = storeToRefs(storeWeb3js);

const defaultCell = {
  id: "",
  fee: "",
};
const table = reactive({
  cell: {
    ...defaultCell,
  },
  load: false,
  data: [],
});
const isChangeCell = computed(() => !!table.cell.id);
function DBClickCell(row) {
  console.log(row);
  table.cell = {
    ...row,
  };
}

async function saveCell() {
  const res = await updateCell();
  emptyCell();
  if (res) {
    getTableData();
  }
}
function emptyCell() {
  table.cell = {
    ...defaultCell,
  };
}

onMounted(() => {
  init();
});
async function init() {
  await getTableData();
}
async function getTableData() {
  table.load = true;
  try {
    const { QKContract } = Contracts.value;
    const feeRes = await QKContract.methods.get_Re_fee().call();
    console.log(feeRes);
    console.log("data", feeRes);
    const length = feeRes && feeRes.length ? feeRes.length : 0;
    table.data = [];
    for (let i = 0; i < length; i++) {
      table.data.push({
        id: i.toString(),
        fee: feeRes[i],
      });
    }
    table.load = false;
  } catch (e) {
    console.error(e);
    table.load = false;
  }
}

async function updateCell() {
  const load = lockLoadHandler("update loading...");
  try {
    const { QKContract } = Contracts.value;
    const { id, fee } = table.cell;
    const res = await QKContract.methods.update_Re_fee(fee, id).send({
      from: userAddress.value,
    });
    load.close();
    if (res.status) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    PlusElMessage({
      type: "error",
      message: e.message,
    });
    load.close();
  }
}
</script>
<style lang="scss" scoped>
.save {
  margin-bottom: 10px;
}
</style>
