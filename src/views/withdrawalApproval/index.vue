<template>
	<div>
		<div class="search search-flex">
			<el-radio-group v-model="table.status" class="select-status">
				<el-radio-button
					v-for="item in statusList"
					:key="item.value"
					:label="item.value"
				>{{ item.label }}</el-radio-button>
			</el-radio-group>
			<el-select v-model="table.sort" placeholder="选择排序" class="select-sort">
				<el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<div class="flex right">
				<el-input placeholder="请输入钱包地址" v-model.trim="table.searchAddress"></el-input>
				<el-button type="success" @click="table.searchAddressLock = true">
					<el-icon>
						<Search />
					</el-icon>查询
				</el-button>
			</div>
		</div>
		<div class="search">
			<el-date-picker
				v-model="timeSection"
				:clearable="false"
				@change="getNewsData"
				format="YYYY-MM-DD"
				value-format="X"
				type="daterange"
				range-separator="To"
				start-placeholder="Start date"
				end-placeholder="End date"
			/>
		</div>
		<div class="table-data" ref="tableRef">
			<!-- <div>
				{{ table }}
			</div>-->
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="no" label="编号" width="72" />
				<el-table-column prop="u_address" label="地址" min-width="340">
					<template #default="{ row }">
						<u @click="PlusCopy(row.u_address)">
							{{
								row.u_address
							}}
						</u>
					</template>
				</el-table-column>
				<el-table-column prop="amount" label="金额" />
				<el-table-column prop="_status" label="状态" width="72" />
				<el-table-column prop="_type" label="类型" width="72" />
				<el-table-column prop="_time_s" label="提现时间" width="146" />
				<el-table-column label="操作" min-width="120">
					<template #default="{ row }">
						<p v-if="row.status == '0'">
							<u class="check-text" @click="approveWithdrawal(row.no, row.time_s, '1')">出款</u>
							<u class="check-text" @click="approveWithdrawal(row.no, row.time_s, '2')">拒绝</u>
						</p>
					</template>
				</el-table-column>
				<template #empty>
					<el-empty description="数据为空">
						<el-button type="success" @click="getTableData">尝试获取</el-button>
					</el-empty>
				</template>
			</el-table>
		</div>
	</div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reactive, onMounted, ref, computed } from "vue";
import DayJS from "dayjs";
import { PlusElMessage, targetLoadHandler } from "@/utils/PlusElement";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT } from "@/abis/index";
import { getReviewDataInterface } from "@/abis/interface";
import {
	ArrayKeysToObject,
	numToArr,
	deepClone,
	getValueByKey,
	flatten,
	PlusCopy,
} from "@/utils/tools";

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

const dayTimestamp = 24 * 60 * 60;
const today = DayJS().unix();
const timeSection = ref([today, today]);
const tableRef = ref();
const table = reactive({
	data: [],
	status: "0",
	sort: "1",
	searchAddressLock: false,
	searchAddress: "",
});

const status = [
	{ value: "0", label: "等待批准" },
	{ value: "1", label: "同意" },
	{ value: "2", label: "拒绝" },
];
const _type = [
	{ value: "1", label: "推广提现" },
	{ value: "2", label: "本金提现" },
	{ value: "3", label: "利息提现" },
];

function formatTableTime(timestamp) {
	const timeLength = timestamp.length;
	if (timeLength != 13 && timeLength != 10) {
		return "not timestamp";
	} else {
		const _v_time = timeLength == 10 ? timestamp * 1000 : timestamp;
		return DayJS(_v_time).format("YYYY-MM-DD HH:mm:ss");
	}
}

const tableData = computed(() => {
	let deepData = deepClone(table.data);
	if (
		table.searchAddressLock == true &&
		table.searchAddress != "" &&
		!!table.searchAddress
	) {
		deepData = searchAddressTableData(deepData);
	}
	if (table.status != "0" && table.status != "") {
		deepData = statusTableData(deepData);
	}
	if (table.sort != "" && !!table.sort) {
		sortTableData(deepData);
	}
	return deepData.map((item) => {
		item._status = getValueByKey(item.status, "label", status);
		item._type = getValueByKey(item._type, "label", _type);
		item._time_s = formatTableTime(item.time_s);
		item.amount = textFromWei(item.amount);
		return item;
	});
});

function statusTableData(data) {
	let _status = [];
	if (table.status == "1") {
		_status = ["0"];
	} else if (table.status == "2") {
		_status = ["1", "2"];
	} else {
		return data;
	}
	return data.filter((item) => _status.includes(item.status));
}
function sortTableData(data) {
	// const timeList =
	if (table.sort == "0") {
		console.log("时间正序排序");
		data.sort((pItem, nItem) => pItem.time_s - nItem.time_s);
	} else if (table.sort == "1") {
		console.log("时间倒序排序");
		data.sort((pItem, nItem) => nItem.time_s - pItem.time_s);
	} else if (table.sort == "2") {
		console.log("提现数量正序排序");
		data.sort((pItem, nItem) => pItem.amount - nItem.amount);
	} else if (table.sort == "3") {
		console.log("提现数量倒序排序");
		data.sort((pItem, nItem) => nItem.amount - pItem.amount);
	} else {
		return data;
	}
}
function searchAddressTableData(data) {
	table.searchAddressLock = false;
	return data.filter((item) => item.u_address == table.searchAddress);
}

async function getTableData() {
	const load = targetLoadHandler(tableRef.value, "get data loading...");
	try {
		await startTableData();
		load.close();
	} catch (error) {
		load.close();
	}
}

async function startTableData() {
	const data = await getReviewData(today * 1000);
	console.log("startTableData", data);
	table.data = data;
}

async function getNewsData() {
	// console.log("getNewsData", timeSection.value);
	const load = targetLoadHandler(tableRef.value, "get data loading...");
	try {
		const _times = timeSection.value;
		if (!_times) return;
		table.data = [];
		const startDate = parseInt(_times[0]);
		const endDate = parseInt(_times[1]);
		const dayNum = (endDate - startDate) / dayTimestamp + 1;
		const days = numToArr(dayNum);
		// days.map(async (i) => {
		// const oneDayTimestamp = (startDate + dayTimestamp * i) * 1000;
		// console.log(oneDayTimestamp);
		// });
		const datas = await Promise.all(
			days.map(async (i) => {
				const oneDayTimestamp = (startDate + dayTimestamp * i) * 1000;
				const data = await getReviewData(oneDayTimestamp);
				return data;
			})
		);
		const filterDatas = datas.filter((item) => item.length > 0);
		const flattenData = flatten(filterDatas);
		// console.log("datas", datas);
		// console.log("filterDatas", filterDatas);
		console.log("flattenData", flattenData);
		table.data = flattenData;
		load.close();
	} catch (error) {
		console.error(error);
		load.close();
	}
}

async function getReviewData(timestamp) {
	try {
		const { QKContract } = Contracts.value;
		const strTimestamp = DayJS(timestamp).format("YYYYMD");
		// console.log(userAddress.value, strTimestamp);
		const res = await QKContract.methods
			.get_review_data(AbiAddressUSDT, strTimestamp)
			.call()
			.then((res) =>
				res.map((item) =>
					ArrayKeysToObject(item, getReviewDataInterface)
				)
			);
		// console.log("getReviewData res", res);
		return res;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}

// async function getReviewUserData(timestamp) {
// 	try {
// 		const { QKContract } = Contracts.value;
// 		const strTimestamp = DayJS(timestamp).format("YYYYMD");
// 		console.log(userAddress.value , strTimestamp)
// 		const res = await QKContract.methods
// 			.get_review_user_data(AbiAddressUSDT , userAddress.value , strTimestamp)
// 			.call().then(res=> ArrayKeysToObject(res,getReviewUserDataInterface))
// 		console.log("getReviewUserData", res);
// 		return res;
// 	} catch (e) {
// 		console.error(e);
// 		PlusElMessage({
// 			type: "error",
// 			message: e.message,
// 		});
// 	}
// }

async function approveWithdrawal(no, time_s, f) {
	const load = targetLoadHandler(tableRef.value, "approve withdrawal loading...");
	try {
		const { QKContract } = Contracts.value;
		const strTimestamp = DayJS(time_s * 1000).format("YYYYMD");
		console.log(AbiAddressUSDT, no, strTimestamp, f);
		const res = await QKContract.methods
			.approve_withdrawal(AbiAddressUSDT, strTimestamp, no, f)
			.send({
				from: userAddress.value
			})
		console.log("approve_withdrawal", res);
		if (res.status) {
			table.data.map(item => {
				if (item.no == no) {
					item.status = f
				}
			})
		} else {
			// PlusElMessage({
			// 	type: "error",
			// 	message: '操作失败',
			// });
		}
		load.close();

	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
		load.close();
	}
}
</script>

<style lang="scss" scoped>
.check-text {
	margin-right: 20px;
	// @media screen and (max-width: 768px) {
	// 	display: block;
	// }
}
.search {
	margin-bottom: 10px;
	&-flex {
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
			align-items: center;
			.right {
				margin-left: auto;
			}
		}
		@media screen and (max-width: 768px) {
			display: grid;
			grid-row-gap: 10px;
		}
	}
}
</style>
