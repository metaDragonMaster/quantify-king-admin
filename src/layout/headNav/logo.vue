<template>
    <Link class="logo" to="/">
        <!-- <img src="@/assets/icons/logo-n.png" alt=""> -->
        <img class="logo-image" src="@/assets/icons/logo.png" alt="">
        <p class="font-orbitron">
            <span class="gray">uantify</span>
            <span>King</span>
        </p>
        <p style="margin-left: 10px;" >后台管理系统</p>
    </Link>
</template>

<script setup>

</script>
<style lang='scss' scoped>
.logo {
    display: flex;
    align-items: flex-end;
}
.logo-image {
    padding-right: 4px;
}
.gray {
    color: #A39FB2;
}
</style>