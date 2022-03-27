<template>
  <div>
    <ul class="grid grid-2">
      <li class="theme-box-shadow">
        <p class="p-1">钱包地址USDT余额</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">钱包地址数量</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
    </ul>
    <ul class="grid grid-3">
      <li class="theme-box-shadow">
        <p class="p-1">积累产生利息</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">积累推荐奖励</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">积累提现</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
    </ul>
    <ul class="grid grid-2">
      <li class="theme-box-shadow">
        <p class="p-1">未领取利息</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
      <li class="theme-box-shadow">
        <p class="p-1">预计下次结息数量</p>
        <p class="p-2">99999999999</p>
        <p class="p-3">
          <span class="color-green">+9999999</span>
          <time>24h</time>
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup></script>
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
