<template>
	<div class="search-address">
		<el-select
			:vlaue="sort"

            @change="emitSort"
			placeholder="默认"
			clearable
			class="select-sort"
		>
			<el-option
				v-for="item in sortList"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
		<div class="flex flex-right">
			<el-input
				placeholder="请输入钱包地址"
				v-model="searchAddress"
                @input="emitSearch"
				clearable
			></el-input>
			<el-button type="success" @click="emitSearch">
				<el-icon> <Search /> </el-icon>查询
			</el-button>
			<el-button type="success" :disabled="canUsersQ" @click="usersQ"
				>批量归集</el-button
			>
		</div>
	</div>
</template>

<script setup>
import { defineProps,defineEmits } from "vue";
const emits = defineEmits(['update:sort','update:searchAddressLock','update:searchAddress'])
const props = defineProps({
	sort: {
		type: String,
		default: "",
	},
	searchAddress: {
		type: String,
		default: "",
	},
	searchAddressLock: {
		type: Boolean,
		default: false,
	},
    canUsersQ: {
        type: Boolean,
		default: false,
    }
});
const { sort, searchAddress, searchAddressLock ,canUsersQ} = toRefs(props);

const sortList = [
	{
		value: "0",
		label: "钱包余额正序",
	},
	{
		value: "1",
		label: "钱包余额倒序",
	},
	{
		value: "2",
		label: "质押正序",
	},
	{
		value: "3",
		label: "质押倒序",
	},
	{
		value: "4",
		label: "提现正序",
	},
	{
		value: "5",
		label: "提现倒序",
	},
	{
		value: "6",
		label: "利息正序",
	},
	{
		value: "7",
		label: "利息倒序",
	},
	{
		value: "8",
		label: "ID正序",
	},
	{
		value: "9",
		label: "ID倒序",
	},
];

function emitSort(value) {
    emits('update:sort',value)
}
function emitSearchLock() {
    emits('update:searchAddressLock',true)
}
function emitSearch(value) {
    emits('update:searchAddress',value)
}
</script>
<style lang="scss" scoped></style>
