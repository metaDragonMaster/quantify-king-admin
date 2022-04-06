<template>
	<div>
		<div class="search-address">
			<el-radio-group v-model="table.status" class="select-status">
				<el-radio-button
					v-for="item in statusList"
					:key="item.value"
					:label="item.value"
					>{{ item.label }}</el-radio-button
				>
			</el-radio-group>
			<el-select
				v-model="table.sort"
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
				<el-input placeholder="请输入钱包地址"></el-input>
				<el-button type="success">
					<el-icon> <Search /> </el-icon>查询
				</el-button>
			</div>
		</div>
		<el-table
			:data="table.data"
			style="width: 100%"
			v-loading="table.load"
			element-loading-text="Loading..."
			:element-loading-spinner="LoadSvg"
			:element-loading-svg-view-box="svgViewBox"
			:element-loading-background="LoadBackground"
		>
			<el-table-column prop="address" label="钱包地址" />
			<el-table-column prop="address" label="提现数量" />
			<el-table-column prop="address" label="质押本金" />
			<el-table-column prop="address" label="累计提现" />
			<el-table-column prop="address" label="钱包余额" />
			<el-table-column prop="time" label="提现时间" width="140" />
			<el-table-column prop="time" label="完成时间" width="140" />
			<el-table-column prop="address" label="状态" >
				<template #default="{row}">
					<span v-show="row.status == '0'" class="status status-success">已完成</span>
					<span v-show="row.status == '1'" class="status status-error">待审核</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="{row}">
					<u  v-show="row.status == '0'">出款</u>
					<u  v-show="row.status == '1'">拒绝</u>
				</template>
			</el-table-column>
			<template #empty>
				<p v-if="table.load">loading...</p>
				<el-empty v-else description="数据为空">
					<el-button type="success" @click="getTableData"
						>尝试获取</el-button
					>
				</el-empty>
			</template>
			<!-- <el-table-column prop="name" label="Name" width="180" /> -->
			<!-- <el-table-column prop="address" label="Address" /> -->
		</el-table>
	</div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, onMounted } from "vue";
import {
	PlusElMessage,
	LoadBackground,
	LoadSvg,
	svgViewBox,
} from "@/utils/PlusElement";

onMounted(() => {
	init();
	PlusElMessage({
		type: "warning",
		message: "development...",
	});
});

async function init() {
	getTableData();
}

const statusList = [
	{
		value: "0",
		label: "全部",
	},
	{
		value: "1",
		label: "待处理",
	},
	{
		value: "2",
		label: "已完成",
	},
];
const sortList = [
	{
		value: "0",
		label: "时间正序",
	},
	{
		value: "1",
		label: "时间倒序",
	},
	{
		value: "2",
		label: "提现数量正序",
	},
	{
		value: "3",
		label: "提现数量倒序",
	},
];

const table = reactive({
	load: false,
	data: [
		{
			address: "占位符",
			time: "2022-6-15 22:05:00",
			status: "0",
		},
		{
			address: "占位符",
			time: "2022-6-15 22:05:00",
			status: "1",
		},
	],
	status: "0",
	sort: "",
});
async function getTableData() {
	table.load = true;
	try {
		setTimeout(() => {
			table.load = false;
		}, 100);
	} catch (error) {
		table.load = false;
	}
}
</script>

<style lang="scss" scoped>
.search-address {
	margin-bottom: 20px;
	@media screen and (min-width: 769px) {
		& > *:not(:last-child) {
			margin-right: 20px;
		}
	}
	.el-input {
		margin-right: 10px;
	}
	.select-status {
		@media screen and (min-width: 769px) {
			margin-right: 20px;
		}
	}
	.select-sort {
		max-width: 136px;
	}
	@media screen and (min-width: 769px) {
		display: flex;
		// justify-content: center;
		align-items: center;
	}
}
</style>
