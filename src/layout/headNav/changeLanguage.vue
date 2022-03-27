<template>
    <button class="font-orbitron change-language" @click="change">
        <img class="icon" src="@/assets/icons/icon-i18n.png" />
        <span>{{ $t('语言') }}</span>
    </button>
</template>

<script setup>
import { useLanguage } from '@/hooks/useLanguage.js'
const { change } = useLanguage()
</script>
<style lang='scss' scoped>
.change-language {
    font-size: 20px;
    // display: flex;
    // align-items: center;
    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
    .icon {
        margin-right: 10px;
    }
}
</style>