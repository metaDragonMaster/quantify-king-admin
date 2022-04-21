<template>
	<el-dialog
		title="下级"
		v-model="showDialog"
		fullscreen
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		@closed="close"
	>
		<slot></slot>
	</el-dialog>
</template>

<script setup>
import {defineEmits,defineProps} from "vue"
import { useVModel } from "@/hooks/useVModel";
const emits = defineEmits(["closeDialog"]);
const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
});
const showDialog = useVModel(props, "show");
function close() {
	emits("closeDialog");
}
</script>
