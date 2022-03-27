<script setup>
import {
    defineProps,
    computed
} from 'vue'
const props = defineProps({
    to: {
        type: String,
        required: true,
    },
})
function isExternal(path) {
    return /^(https?:|mailto:|tel:|\/\/)/.test(path)
}
const type = computed(() => (isExternal(props.to) ? 'a' : 'router-link'))

const linkProps = () =>
    isExternal(props.to)
        ? {
            href: props.to,
            target: '_blank',
            rel: 'noopener',
        }
        : { to: props.to }
</script>

<template>
    <component :is="type" v-bind="linkProps()">
        <slot />
    </component>
</template>
