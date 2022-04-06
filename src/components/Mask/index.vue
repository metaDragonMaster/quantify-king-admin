<template>
	<teleport to="body">
		<div
			class="mask"
			v-if="maskShow"
			:style="maskStyle"
			@click.stop="maskClick"
			ref="maskRef"
		>
			<slot></slot>
		</div>
	</teleport>
</template>

<script setup>
import {
	ref,
	computed,
	defineProps,
	// defineExpose,
	// onMounted
	watch,
} from "vue";
import { UseStoreResize } from "@/stores/window";
import { useVModel } from "@/hooks/useVModel";
import { storeToRefs } from "pinia";
const stroeResize = UseStoreResize();
const { isPc } = storeToRefs(stroeResize);
const props = defineProps({
	zIndex: {
		type: [Number, String],
		default: "999",
	},
	show: {
		type: Boolean,
		default: false,
	},
	funcClose: {
		type: Boolean,
		default: false,
	},
});
const maskStyle = computed(() => ({
	zIndex: props.zIndex,
}));
const maskRef = ref();
const maskShow = useVModel(props, "show");
function maskClick(e) {
	if (!props.funcClose && e.target == maskRef.value) {
		maskShow.value = false;
		closeMask();
	}
}
watch(maskShow, (n) => {
	n ? openMask() : closeMask();
});
function openMask() {
	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = isPc.value ? "17px" : "0";
}
function closeMask() {
	document.body.style.overflow = "";
	document.body.style.paddingRight = "";
}
// defineExpose({
// 	openMask,
// 	closeMask,
// })
</script>
<style lang="scss" scoped>
.mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba($color: #000000, $alpha: 0.6);
	color: #fff;
	:deep() .dialog {
		background-color: #333;
		border: 1px solid #999;
		border-radius: 2px;
	}
}
</style>
