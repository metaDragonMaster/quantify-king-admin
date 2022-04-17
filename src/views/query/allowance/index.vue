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
				<el-input
					placeholder="请输入钱包地址"
					v-model="table.searchAddress"
					clearable
				></el-input>
				<el-button
					type="success"
					@click="table.searchAddressLock = true"
				>
					<el-icon> <Search /> </el-icon>查询
				</el-button>
				<el-button type="success" :disabled="canUsersQ" @click="usersQ"
					>批量归集</el-button
				>
			</div>
		</div>
		<el-table
			:data="tableData"
			style="width: 100%"
			v-loading="table.load"
			element-loading-text="Loading..."
			:element-loading-spinner="LoadSvg"
			:element-loading-svg-view-box="svgViewBox"
			:element-loading-background="LoadBackground"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="address" label="钱包地址" min-width="340">
				<template #default="{ row }">
					<u @click="PlusCopy(row.address)">{{ row.address }}</u>
				</template>
			</el-table-column>
			<el-table-column prop="re_time" label="认证时间" width="160" />
			<el-table-column
				prop="_balanceOf"
				label="钱包余额"
				min-width="160"
			/>
			<el-table-column label="操作">
				<template #default="{ row }">
					<el-link type="success" @click="q(row.address)"
						>归集</el-link
					>
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
		</el-table>
	</div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, onMounted, computed } from "vue";
import DayJS from "dayjs";
import axios from "@/utils/request";
import Decimal from "decimal.js";
import {
	PlusElMessage,
	lockLoadHandler,
	LoadBackground,
	LoadSvg,
	svgViewBox,
} from "@/utils/PlusElement";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT, AbiAddressQK } from "@/abis/index";
import { userInfoInterface } from "@/abis/interface";
import { ArrayKeysToObject, deepClone, PlusCopy } from "@/utils/tools";
import {
	getAllowanceFileUrl,
	getAllowanceListFilesName,
	BaseBucketAllowance,
} from "@/common/fleekStorage.js";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { web3, userAddress } = storeToRefs(storeWeb3js);
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}

onMounted(() => {
	init();
});

async function init() {
	getTableData();
}

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
	sort: "", //条件搜索： 排序
	data: [], //列表数据
	searchAddress: "",
	searchAddressLock: false,
	selectionData: [],
});
const canUsersQ = computed(() => !(table.selectionData.length > 0));
const tableData = computed(() => {
	let deepData = deepClone(table.data).filter((item) => item.f != true);
	if (
		table.searchAddressLock == true &&
		table.searchAddress != "" &&
		!!table.searchAddress
	) {
		deepData = searchAddressTableData(deepData);
	}
	if (table.sort != "" && !!table.sort) {
		sortTableData(deepData);
	} else {
		deepData.sort((pItem, nItem) => nItem.id - pItem.id);
	}
	return deepData;
});
function searchAddressTableData(data) {
	table.searchAddressLock = false;
	return data.filter((item) => item.address == table.searchAddress);
}
function sortTableData(data) {
	// // const timeList =
	if (table.sort == "0") {
		console.log("钱包余额正序");
		data.sort((pItem, nItem) => pItem._balanceOf - nItem._balanceOf);
	} else if (table.sort == "1") {
		console.log("钱包余额倒序");
		data.sort((pItem, nItem) => nItem._balanceOf - pItem._balanceOf);
	} else if (table.sort == "8") {
		console.log("ID正序");
		data.sort((pItem, nItem) => pItem.id - nItem.id);
	} else if (table.sort == "9") {
		console.log("ID倒序");
		data.sort((pItem, nItem) => nItem.id - pItem.id);
	}
}

async function handleSelectionChange(rows) {
	console.log(rows);
	table.selectionData = rows.map((item) => item.address);
}
async function getTableData() {
	table.load = true;
	try {
		const users = await getUsers();
		table.data = await Promise.all(
			users.map(async (item, index) => {
				const re_time = await getReTime(item);
				const _balanceOf = await balanceOf(item);
				const userInfo = await getUserInfo(item);
				return {
					id: index,
					address: item,
					_balanceOf,
					re_time,
					f: userInfo.f || false,
				};
			})
		);
		table.load = false;
	} catch (error) {
		table.load = false;
	}
}
// async function getUsers() {
// 	try {
// 		const { QKContract } = Contracts.value;
// 		const res = await QKContract.methods.getUsers().call();
// 		console.log("getUsers res", res);
// 		return res;
// 	} catch (e) {
// 		console.error(e);
// 		// PlusElMessage({
// 		// 	type: "error",
// 		// 	message: e.message,
// 		// });
// 		return [];
// 	}
// }

async function getUsers() {
	try {
		const list = await getAllowanceListFilesName();
		console.log("init getAllowanceListFilesName---->", list);
		const names = list.map((item) =>
			item.key.slice(
				BaseBucketAllowance.length + 1,
				item.key.length - ".json".length
			)
		);
		console.log("getAllowanceListFilesName---->", names);
		return names;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
		return [];
	}
}

async function balanceOf(address) {
	try {
		const { USDTContract } = Contracts.value;
		const res = await USDTContract.methods.balanceOf(address).call();
		// console.log("_balanceOf", res);
		return textFromWei(res);
	} catch (e) {
		console.error(e);
		return "0";
	}
}

async function getUserInfo(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_user_info(AbiAddressUSDT, address)
			.call()
			.then((res) => ArrayKeysToObject(res, userInfoInterface));
		return res;
	} catch (e) {
		console.error(e);
		// load.close()
		return {};
	}
}
async function getReTime(address) {
	try {
		const alled = await allowance(address);
		if (alled) return "未认证";
		const url = getAllowanceFileUrl(address);
		const res = await axios.get(url);
		return res && res.time
			? DayJS(res.time * 1000).format("YYYY-MM-DD HH:mm:ss")
			: "获取失败";
	} catch (e) {
		// console.error(e);//大部分会没有，所以不用打印了
		return "获取失败";
	}
}
async function allowance(address) {
	try {
		const { USDTContract } = Contracts.value;
		const res_allowance = await USDTContract.methods
			.allowance(address, AbiAddressQK)
			.call();
		const v = new Decimal(res_allowance);
		return v <= 0;
	} catch (e) {
		// setUserAddress('')
		console.error(e);
	}
}

async function usersQ() {
	if (canUsersQ.value) {
		// PlusElMessage({
		// 	type: "error",
		// 	message: "请选择地址",
		// });
		return;
	} else {
		const Load = lockLoadHandler("q all loading...");
		try {
			const res = await qAllArray(table.selectionData);
			console.log("qAllArray", res);
			if (res) {
				PlusElMessage({
					type: "success",
					message: "归集完成",
				});
				table.selectionData = [];
			} else {
				// PlusElMessage({
				// 	type: "error",
				// 	message: "归集失败",
				// });
			}
			Load.close();
		} catch (e) {
			console.error(e);
			// PlusElMessage({
			// 	type: "error",
			// 	message: e.message,
			// });
			Load.close();
		}
	}
}

//用户归集
async function q(address) {
	const Load = lockLoadHandler("q one loading...");
	try {
		const res = await qAllArray([address]);
		Load.close();
		return res.status ? res.status : false;
	} catch (e) {
		console.error(e);
		Load.close();
		return false;
	}
}
//用户集体归集
async function qAllArray(addressList) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.q_all_array(AbiAddressUSDT, addressList)
			.send({
				from: userAddress.value,
			});
		return res.status ? res.status : false;
	} catch (e) {
		console.error(e);
		return false;
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
	color: #fff;
	padding: 0 20px 0 48px;
	.res-address {
		margin-bottom: 10px;
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
.el-link {
	font-size: 12px;
	&:not(:last-child) {
		margin-right: 6px;
	}
}
</style>
