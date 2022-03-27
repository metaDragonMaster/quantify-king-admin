<template>
  <div>
    <div class="buttons">
      <Link to="/settingArguments/set"
        ><el-button type="success">设置参数</el-button></Link
      >
      <Link to="/settingArguments/friends"
        ><el-button type="success">好友奖励</el-button></Link
      >
      <Link to="/settingArguments/updateAdmin"
        ><el-button type="success">变更管理员</el-button></Link
      >
      <Link to="/settingArguments/recharge"
        ><el-button type="success">充值到平台</el-button></Link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.buttons {
  margin-bottom: 10px;
  .el-button {
    margin-right: 10px;
  }
}
</style>
