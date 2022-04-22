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
        <div class="search-address">
			<slot name="selectLv"></slot>
		</div>
		<el-table
			:data="tableData"
			style="width: 100%"
			v-loading="table.load"
			element-loading-text="Loading..."
			:element-loading-spinner="LoadSvg"
			:element-loading-svg-view-box="svgViewBox"
			:element-loading-background="LoadBackground"
			@expand-change="expandChange"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection"></el-table-column>
			<el-table-column type="expand">
				<template #default="{ row }">
					<div class="table-expand">
						<div class="flex res-address">
							<p>上级钱包地址: {{ row.resAddress }}</p>
						</div>
						<div class="flex">
							<dl>
								<dt>好友等级</dt>
								<dd>一级好友</dd>
								<dd>二级好友</dd>
								<dd>三级好友</dd>
							</dl>
							<dl>
								<dt>钱包地址数量</dt>
								<dd>{{ row.resChild.re1.length }}</dd>
								<dd>{{ row.resChild.re2.length }}</dd>
								<dd>{{ row.resChild.re3.length }}</dd>
							</dl>
							<dl>
								<dt>操作</dt>
								<dd @click="openDialogReChild(row, lvs[0])">
									<u>查看一级好友</u>
								</dd>
								<dd @click="openDialogReChild(row, lvs[1])">
									<u>查看二级好友</u>
								</dd>
								<dd @click="openDialogReChild(row, lvs[2])">
									<u>查看三级好友</u>
								</dd>
							</dl>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="address" label="钱包地址" min-width="340">
				<template #default="{ row }">
					<u @click="PlusCopy(row.address)">{{ row.address }}</u>
				</template>
			</el-table-column>
			<el-table-column prop="_re_time" label="认证时间" width="160" />
			<el-table-column
				prop="_balanceOf"
				label="钱包余额"
				min-width="160"
			/>
			<el-table-column prop="_isAss" label="是否授权归集" />
			<el-table-column prop="_freeze" label="是否被冻结" />
			<el-table-column label="操作">
				<template #default="{ row }">
					<el-link type="success" @click="q(row.address)"
						>归集</el-link
					>
					<el-link
						type="success"
						@click="setUserFreeze(row.address, !row.freeze)"
						>{{ row.freeze ? "用户解冻" : "冻结用户" }}</el-link
					>
					<el-link
						type="success"
						@click="addAssistant(row.address, !row.isAss)"
						>{{ row.isAss ? "取消授权" : "授权归集" }}</el-link
					>
				</template>
			</el-table-column>
		</el-table>
		<selectLvdialog
			v-model:show="reDialog.show"
			@closeDialog="closeDialogReChild"
		>
			<search ref="selectLvdialogRef">
				<template v-slot:selectLv>
					<el-button
						:type="reDialog.lv == item ? 'success' : ''"
						v-for="item in lvs"
						:key="item"
						@click="setReDialogLv(item)"
						>{{ item }}</el-button
					>
				</template>
			</search>
		</selectLvdialog>
	</div>
</template>

<script setup>
import search from "./search.vue";
import selectLvdialog from "./selectLvdialog.vue";
import { Search } from "@element-plus/icons-vue";
import { ref, reactive, computed, defineExpose, nextTick } from "vue";
import DayJS from "dayjs";
import axios from "@/utils/request";
// import Decimal from "decimal.js";
import {
	PlusElMessage,
	lockLoadHandler,
	LoadBackground,
	LoadSvg,
	svgViewBox,
} from "@/utils/PlusElement";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT } from "@/abis/index";
import { userInfoInterface } from "@/abis/interface";
import { ArrayKeysToObject, deepClone, PlusCopy } from "@/utils/tools";
import {
	getAllUsersFileUrl,
	getRelationChildLvListFileUrl,
	lvs,
} from "@/common/fleekStorage.js";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { web3, userAddress } = storeToRefs(storeWeb3js);
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}

const selectLvdialogRef = ref();
const reDialog = reactive({
	show: false,
	usersAddressList: [],
	rowResChild: defaultResChild,
	lv: lvs[0],
});

function openDialogReChild(row, lv) {

	reDialog.rowResChild = deepClone(row.resChild);
	if (lv) reDialog.lv = lv;
	reDialogGetBaseData();
	reDialog.show = true;
}
function closeDialogReChild() {
	reDialog.usersAddressList = [];
	reDialog.rowResChild = defaultResChild;
	reDialog.lv = lvs[0];
	reDialog.show = false;
}
function reDialogGetBaseData() {
	reDialog.usersAddressList = reDialog.rowResChild[reDialog.lv];
	nextTick(() => {
		console.log(selectLvdialogRef.value)
		selectLvdialogRef.value.getBaseTableData(reDialog.usersAddressList);
	});
}

function setReDialogLv(lv) {
	reDialog.lv = lv;
	reDialogGetBaseData();
}
const defaultResChild = {
	re1: [],
	re2: [],
	re3: [],
};
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
	let deepData = deepClone(table.data).filter((item) => item.freeze != true);
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
	deepData.map((item) => {
		item._isAss = item.isAss ? "已授权" : "未授权";
		item._freeze = item.freeze ? "已冻结" : "未冻结";
		return item;
	});
	return deepData;
	// return []
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
defineExpose({
	getBaseTableData,
});
async function getBaseTableData(users) {
	if (!users) {
		console.log("users is null");
		return;
	}
	console.log("getBaseTableData -->", users);
	table.load = true;
	try {
		table.data = await getTableData(users);
		table.load = false;
	} catch (error) {
		table.load = false;
	}
}

async function getTableData(users) {
	try {
		const data = await Promise.all(
			users.map(async (item, index) => {
				const re_time = await getReTime(item);
				const _re_time =
					re_time != 0
						? DayJS(re_time * 1000).format("YYYY-MM-DD HH:mm:ss")
						: "获取失败";
				const _balanceOf = await balanceOf(item);
				const userInfo = await getUserInfo(item);
				const isAss = await isAssistant(item);
				return {
					id: index,
					...userInfo,
					// freeze: userInfo.freeze || false,
					address: item,
					isAss,
					_balanceOf,
					re_time,
					_re_time,
					resAddress: "",
					resChild: defaultResChild,
				};
			})
		);
		console.log(data);
		return data;
	} catch (error) {
		console.error("getTableData error:");
		console.error(error);
	}
}

async function expandChange(row) {
	console.log(row);
	table.load = true;
	try {
		const resAddress = await getRes(row.address);
		const resChild = await getResChild(row.address);
		console.log("resAddress:", resAddress);
		console.log("resChild:", resChild);
		row.resAddress = resAddress;
        row.resChild = resChild
		table.load = false;
	} catch (error) {
		table.load = false;
	}
}

async function getResChild(address) {
	try {
		const re1 = await getResChildLv(address, lvs[0]);
		const re2 = await getResChildLv(address, lvs[1]);
		const re3 = await getResChildLv(address, lvs[2]);
		console.log(re1,re2,re3)
		return {
			re1,
			re2,
			re3,
		};
	} catch (e) {
		console.error(e);
		return defaultResChild;
	}
}

async function getResChildLv(address, lv) {
	try {
		const res = await getRelationChildLvListFileUrl(address, lv);
		return res;
	} catch (e) {
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
		// console.log("getuserinfo res", res);
		return res;
	} catch (e) {
		console.error(e);
		// load.close()
		return {};
	}
}
async function getReTime(address) {
	try {
		const url = getAllUsersFileUrl(address);
		const res = await axios.get(url);
		return res && res.time ? res.time : 0;
	} catch (e) {
		return 0;
	}
}
// async function allowance(address) {
// 	try {
// 		const { USDTContract } = Contracts.value;
// 		const res_allowance = await USDTContract.methods
// 			.allowance(address, AbiAddressQK)
// 			.call();
// 		const v = new Decimal(res_allowance);
// 		return v <= 0;
// 	} catch (e) {
// 		// setUserAddress('')
// 		console.error(e);
// 	}
// }

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

async function getRes(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.getRes(address).call();
		return res;
	} catch (e) {
		console.error(e);
		return "0x0000000000000000000000000000000000000000";
	}
}
// 冻结用户|解冻用户
async function setUserFreeze(address, freeze) {
	const Load = lockLoadHandler("User Freeze loading...");
	console.log(address, freeze);
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.set_user_freeze(AbiAddressUSDT, address, freeze)
			.send({
				from: userAddress.value,
			});
		console.log("setUserFreeze", res);
		if (res.status) {
			PlusElMessage({
				type: "success",
				message: "操作成功",
			});
			table.data.map((item) => {
				if (item.address == address) {
					item.freeze = freeze;
				}
			});
		}
		Load.close();
	} catch (e) {
		console.error(e);
		Load.close();
	}
}

async function isAssistant(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.is_assistant(address).call();
		// console.log("isAssistant", res);
		return res;
	} catch (e) {
		console.error(e);
		return false;
	}
}
async function addAssistant(address, bool, row) {
	const load = lockLoadHandler("addAssistant loading...");
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.add_assistant(address, bool).send({
			from: userAddress.value,
		});
		console.log(res);
		if (res && res.status) {
			row.isAss = bool;
		}
		load.close();
	} catch (e) {
		console.error(e);
		load.close();
	}
}
</script>
