<template>
  <div>
    <div class="search-address">
      <h3>Your Assets</h3>
      <div class="flex">
        <el-input placeholder="请输入钱包地址"></el-input>
        <el-button type="success">
          <el-icon> <Search /> </el-icon>查询
        </el-button>
      </div>
      <el-button type="success" class="all">归集</el-button>
    </div>
    <el-table :data="table.data" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, onMounted } from "vue";
// import { ArrayKeysToObject } from "@/utils/tools";
// import { userInfoInterface } from "@/abis/interface";
import {
  // LoadSvg,
  // svgViewBox,
  // lockLoadHandler,
  PlusElMessage,
} from "@/utils/PlusElement";
import // UseStoreContracts,
// UseStoreWeb3js
"@/stores/web3js";
// import { storeToRefs } from "pinia";
// import { AbiAddressUSDT } from "@/abis/index";

// const storeContracts = UseStoreContracts();
// const storeWeb3js = UseStoreWeb3js();
// const { Contracts } = storeToRefs(storeContracts);

onMounted(() => {
  // init();
  PlusElMessage({
    type: "warning",
    message: "development...",
  });
});

// async function init() {
// const load = lockLoadHandler("select loading...");
// try {
// await getAllBalanceOf();
// await getCalculateEarningsAll()
// await getTableData();
//     load.close();
//   } catch (e) {
//     load.close();
//   }
// }
// getUser
// get_user_info
const table = reactive({
  data: [],
});

// async function getTableData() {
//   try {
//     const { QKContract } = Contracts.value;
//     const users = await QKContract.methods.getUsers().call();
//     console.log("getUser", users);
//     const userInfoData = await Promise.all(
//       users.map(async (item) => {
//         const userInfo = await QKContract.methods
//           .get_user_info(AbiAddressUSDT, item)
//           .call()
//           .then((userInfoArr) => ArrayKeysToObject(userInfoArr, userInfoInterface));
//         console.log(userInfo);
//         return userInfo;
//       })
//     );
//     console.log("getUser get_user_info", userInfoData);
//   } catch (e) {
//     console.error(e);
//     PlusElMessage({
//       type: "error",
//       message: e.message,
//     });
//   }
// }

// async function getReWithdrawAll() {
//   try {
//     const { QKContract } = Contracts.value;
//     const res = await QKContract.methods.get_re_withdraw_all(AbiAddressUSDT).call();
//     console.log("getReWithdrawAll", res);
//     board.reWithdraw = res
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
.search-address {
  margin-bottom: 20px;
  .el-input {
    margin-right: 10px;
  }
  @media screen and (min-width: 769px) {
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      margin-right: auto;
    }
    .all {
      margin-left: auto;
    }
  }

  @media screen and (min-width: 1080px) {
    .el-input {
      min-width: 450px;
    }
  }
  @media screen and (max-width: 768px) {
    h3,
    .el-input {
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 1079px) {
    .el-input {
      width: fit-content;
    }
  }
}
</style>
