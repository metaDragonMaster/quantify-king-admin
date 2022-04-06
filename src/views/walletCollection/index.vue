<template>
	<div>
		<div class="search-address">
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
			<el-table-column type="expand">
				<template #default="{ row }">
					<div class="table-expand">
						<div class="flex panel">
							<dl>
								<dt>好友等级</dt>
								<dd>一级好友</dd>
								<dd>二级好友</dd>
								<dd>三级好友</dd>
							</dl>
							<dl>
								<dt>钱包地址数量</dt>
								<dd>1</dd>
								<dd>2</dd>
								<dd>3</dd>
							</dl>
							<dl>
								<dt>钱包USDT数量</dt>
								<dd>1</dd>
								<dd>2</dd>
								<dd>3</dd>
							</dl>
							<dl>
								<dt>质押USDT数量</dt>
								<dd>1</dd>
								<dd>2</dd>
								<dd>3</dd>
							</dl>
						</div>
						<div class="flex change-addres">
							<span>
								上级钱包地址: 11111111111111111111111111111
							</span>
							<button
								class="change-addres-button"
								@click="openMask(row.id)"
							>
								更改
							</button>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="address" label="钱包地址" />
			<el-table-column prop="address" label="钱包USDT数量" />
			<el-table-column prop="address" label="累计产生利息" />
			<el-table-column prop="address" label="质押本金" />
			<el-table-column prop="address" label="已提现" />
			<el-table-column prop="address" label="团队奖励" />
			<el-table-column prop="address" label="未领取" />
			<el-table-column label="操作">
				<!-- <template #default="{row}">
				</template> -->
			</el-table-column>
			<template #empty>
				<p v-if="table.load">loading...</p>
				<el-empty v-else description="数据为空">
					<el-button type="success" @click="getTableData"
						>尝试获取</el-button
					>
				</el-empty>
			</template>
		</el-table>
		<Mask v-model:show="table.maskShow" :funcClose="true">
			<div class="dialog change-address-dialog">
				<p class="title">输入要切换的钱包地址</p>
				<el-input v-model="table._address" placeholder="请输入地址" />
				<div class="footer">
					<button
						class="theme-bg-shadow-green"
						@click="changeSuperiorAddress"
					>
						确认
					</button>
					<button
						class="theme-bg-shadow-black"
						@click="table.maskShow = false"
					>
						取消
					</button>
				</div>
			</div>
		</Mask>
	</div>
</template>

<script setup>
import Mask from "@/components/Mask";
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
const sortList = [
	{
		value: "0",
		label: "余额正序",
	},
	{
		value: "1",
		label: "余额倒序",
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

const table = reactive({
	load: false, //列表等待锁
	maskShow: false, //更改上级地址蒙层
	currentId: "", //当前选中的列ID
	_address: "", //当前选中的列ID
	sort: "", //条件搜索： 排序
	data: [
		//列表数据
		{
			id: "0",
			address: "占位符",
			time: "2022-6-15 22:05:00",
			status: "0",
		},
		{
			id: "1",
			address: "占位符",
			time: "2022-6-15 22:05:00",
			status: "1",
		},
	],
});
function openMask(id) {
	table.currentId = id;
	table.maskShow = true;
}
function changeSuperiorAddress() {}
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
	@media screen and (min-width: 769px) {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		& > *:not(:last-child) {
			margin-right: 20px;
		}
		.select-status {
			margin-right: 20px;
		}
	}
	@media screen and (max-width: 768px) {
		& > * {
			margin-bottom: 10px;
		}
	}
	.el-input {
		margin-right: 10px;
	}

	.select-sort {
		max-width: 136px;
	}
}
.table-expand {
	display: flex;
	align-items: center;
	color: #fff;
	.panel {
		padding: 0 20px 0 48px;
	}
	dl {
		text-align: center;
		&:not(:last-child) {
			margin-right: 20px;
		}
		dt {
			color: #999;
		}
		dd {
			margin-top: 10px;
		}
	}
	.change-addres {
		align-items: center;
	}
	.change-addres-button {
		border-radius: 4px;
		padding: 4px 10px;
		border: 1px solid #fff;
		margin-left: 10px;
		transition: background-color 0.1s;
		&:hover {
			background-color: #999;
		}
		&:active {
			background-color: #666;
		}
	}
}
.change-address-dialog {
	max-width: 550px;
	text-align: center;
	margin: 20vh auto 0;
	padding: 20px 60px 30px;
	@media screen and (max-width: 768px) {
		padding: 10px 20px 20px;
		margin: 20vh 10px 0;
		.el-input {
			margin: 20px 0;
		}
	}
	.el-input {
		margin: 40px 0;
	}
	.footer {
		width: 100%;
		display: flex;
		justify-content: space-around;
		button {
			padding: 6px 25px;
			border-radius: 4px;
		}
	}
}
</style>
