import { getCurrentInstance, computed, unref } from "vue"
export function useVModel(props, name) {
	const emit = getCurrentInstance().emit

	return computed({
		get() {
			return props[name]
		},
		set(v) {
			emit(`update:${name}`, unref(v))
		}
	})
}

/*
父组件
	<template>
		<son v-model="value" />
	</template>
子组件
	<script setup>
		const props = defineProps({
			inputValue:{
				type:String
			}
		})
		const value = useVModel(props.inputValue, 'value')
	</script>
*/
