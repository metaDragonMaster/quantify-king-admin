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
      <el-button type="success" class="all"> 归集 </el-button>
    </div>
    <div class="usdt-card theme-box-shadow">
      <p class="p-1">USDT总收益</p>
      <p class="p-2">99999999999999999</p>
      <p class="p-3">
        <span class="color-green">+9999999</span>
        <time>24h</time>
      </p>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
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
.usdt-card {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  margin-bottom: 30px;
  .p-1 {
    font-size: 20px;
  }
  .p-2 {
    margin: 40px 0 50px;
    font-size: 40px;
  }
  .p-3 {
    font-size: 12px;
    .color-green {
      color: #47a663;
    }
    time {
      border: 1px solid rgb(136, 136, 136);
      border-radius: 2px;
      margin-left: 10px;
      padding: 0 4px;
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
