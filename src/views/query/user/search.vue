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
							<button
								class="update-button"
								@click="
									openDialogUpdateRe(
										row.address,
										row.resAddress
									)
								"
							>
								更改
							</button>
						</div>
						<!-- <div>
							<button
								class="update-button"
								@click="openDialogReChild(row)"
							>
								查看更多
							</button>
						</div> -->
						<div class="flex">
							<dl>
								<dt>好友等级</dt>
								<dd>一级好友</dd>
								<dd>二级好友</dd>
								<dd>三级好友</dd>
							</dl>
							<dl>
								<dt>钱包地址数量</dt>
								<dd>{{ row.resChild.s1.address.length }}</dd>
								<dd>{{ row.resChild.s2.address.length }}</dd>
								<dd>{{ row.resChild.s3.address.length }}</dd>
							</dl>
							<dl>
								<dt>钱包USDT数量</dt>
								<dd>{{ row.resChild.s1.principal }}</dd>
								<dd>{{ row.resChild.s2.principal }}</dd>
								<dd>{{ row.resChild.s3.principal }}</dd>
							</dl>
							<dl>
								<dt>存款USDT数量</dt>
								<dd>{{ row.resChild.s1.profit }}</dd>
								<dd>{{ row.resChild.s2.profit }}</dd>
								<dd>{{ row.resChild.s3.profit }}</dd>
							</dl>
							<dl>
								<dt>操作</dt>
								<dd @click="openDialogReChild(row, 's1')">
									<u>查看一级好友</u>
								</dd>
								<dd @click="openDialogReChild(row, 's2')">
									<u>查看二级好友</u>
								</dd>
								<dd @click="openDialogReChild(row, 's3')">
									<u>查看三级好友</u>
								</dd>
							</dl>
						</div>
						<!-- <div class="flex change-addres">
							<span>
								上级钱包地址: {{row.resAddress}}
							</span>
							<button
								class="change-addres-button"
								@click="openMask(row.id)"
							>
								更改
							</button>
						</div>-->
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="address" label="钱包地址" width="340">
				<template #default="{ row }">
					<u @click="PlusCopy(row.address)">{{ row.address }}</u>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="second" label="利息产生次数" /> -->
			<el-table-column prop="interest" label="利息余额" />
			<el-table-column prop="interestRate" label="利率" />
			<el-table-column prop="end_time" label="上次提取时间" width="160" />
			<el-table-column prop="_freeze" label="是否被冻结" />
			<el-table-column
				prop="interest_bearing_principal"
				label="本金余额"
			/>
			<!-- <el-table-column prop="quantity" label="已提取" /> -->
			<el-table-column prop="withdraw_times" label="提取次数" />
			<el-table-column prop="_balanceOf" label="钱包余额" />
			<el-table-column prop="u_released" label="已提现" />
			<el-table-column prop="_income" label="审核中利息" />
			<el-table-column prop="_isAss" label="是否授权归集" />

			<!-- <el-table-column prop="address" label="未领取" /> -->
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
		<el-dialog
			custom-class="update-re-user"
			title="更换推荐人"
			v-model="updateReUserData.handleUpdateRe"
		>
			<el-form ref="updateReUserDialogDom" label-width="120px">
				<el-form-item label="用户地址">
					<p>{{ updateReUserData.updateUserAddress }}</p>
				</el-form-item>
				<el-form-item label="上级地址">
					<el-input v-model.trim="updateReUserData.updateReValue" />
				</el-form-item>
			</el-form>
			<template v-slot:footer class="footer">
				<el-button @click="closeDialogUpdateRe(false)">取 消</el-button>
				<el-button type="primary" @click="updateRe">确 定</el-button>
			</template>
		</el-dialog>
		<selectLvdialog
			v-model:show="reDialog.show"
			@closeDialog="closeDialogReChild"
		>
			<search ref="selectLvdialogRef">
				<template v-slot:selectLv>
					<el-button type="success" @click="setReDialogLv('s1')"
						>lv - 1</el-button
					>
					<el-button type="success" @click="setReDialogLv('s2')"
						>lv - 2</el-button
					>
					<el-button type="success" @click="setReDialogLv('s3')"
						>lv - 3</el-button
					>
				</template>
			</search>
		</selectLvdialog>
	</div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import search from "./search.vue";
import selectLvdialog from "./selectLvdialog.vue";

import { ref, reactive, computed, defineExpose } from "vue";
import DayJS from "dayjs";
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
import { userInfoInterface, reInterestsInterface } from "@/abis/interface";
import { ArrayKeysToObject, deepClone, PlusCopy } from "@/utils/tools";
import { nextTick } from "process";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { web3, userAddress } = storeToRefs(storeWeb3js);
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}

// onMounted(() => {
// 	init();
// });

// async function init() {
// 	getBaseTableData();
// }
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
		label: "存款正序",
	},
	{
		value: "3",
		label: "存款倒序",
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

const selectLvdialogRef = ref();
const reDialog = reactive({
	show: false,
	usersAddressList: [],
	rowResChild: defaultResChild,
	lv: "s1",
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
	reDialog.lv = "s1";
	reDialog.show = false;
}
function reDialogGetBaseData() {
	reDialog.usersAddressList = reDialog.rowResChild[reDialog.lv].address;
	nextTick(() => {
		selectLvdialogRef.value.getBaseTableData(reDialog.usersAddressList);
	});
}

function setReDialogLv(lv) {
	reDialog.lv = lv;
	reDialogGetBaseData();
}

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
	let deepData = deepClone(table.data);
	console.log(deepData);
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
		item._balanceOf = textFromWei(item._balanceOf);
		item.interest_bearing_principal = textFromWei(
			item.interest_bearing_principal
		);
		item.quantity = textFromWei(item.quantity);
		item.end_time =
			Number(item.end_time) > 0
				? DayJS(item.end_time * 1000).format("YYYY-MM-DD HH:mm:ss")
				: "未领取";
		item._freeze = item.freeze ? "已冻结" : "未冻结";
		item._released =
			Number(textFromWei(item._released)) + Number(item.quantity);
		item._income = textFromWei(item._income);
		item._isAss = item.isAss ? "已授权" : "未授权";
		return item;
	});
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
	} else if (table.sort == "2") {
		console.log("存款正序");
		data.sort(
			(pItem, nItem) =>
				pItem.interest_bearing_principal -
				nItem.interest_bearing_principal
		);
	} else if (table.sort == "3") {
		console.log("存款倒序");
		data.sort(
			(pItem, nItem) =>
				nItem.interest_bearing_principal -
				pItem.interest_bearing_principal
		);
	} else if (table.sort == "4") {
		console.log("提现正序");
		data.sort((pItem, nItem) => pItem.u_released - nItem.u_released);
	} else if (table.sort == "5") {
		console.log("提现倒序");
		data.sort((pItem, nItem) => nItem.u_released - pItem.u_released);
	} else if (table.sort == "6") {
		console.log("利息正序");
		data.sort((pItem, nItem) => pItem.interest - nItem.interest);
	} else if (table.sort == "7") {
		console.log("利息倒序");
		data.sort((pItem, nItem) => nItem.interest - pItem.interest);
	} else if (table.sort == "8") {
		console.log("ID正序");
		data.sort((pItem, nItem) => pItem.id - nItem.id);
	} else if (table.sort == "9") {
		console.log("ID倒序");
		data.sort((pItem, nItem) => nItem.id - pItem.id);
	}
}
async function expandChange(row) {
	table.load = true;
	try {
		const resAddress = await getRes(row.address);
		const resChild = await getResChild(row.address);
		console.log("getResChild:", res);
		row.resAddress = resAddress;
		row.resChild = resChild;
		table.load = false;
	} catch (error) {
		table.load = false;
	}
}

async function handleSelectionChange(rows) {
	console.log(rows);
	table.selectionData = rows.map((item) => item.address);
}

const defaultResChild = {
	s1: {
		address: [],
		principal: "0",
		profit: "0",
	},
	s2: {
		address: [],
		principal: "0",
		profit: "0",
	},
	s3: {
		address: [],
		principal: "0",
		profit: "0",
	},
};
defineExpose({
	getBaseTableData,
});
// async function getBaseTableData() {
// 	table.load = true;
// 	try {
// 		const users = await getUsers();
// 		table.data = await getTableData(users);
// 		table.load = false;
// 	} catch (error) {
// 		table.load = false;
// 	}
// }

async function getBaseTableData(users) {
	if (!users) {
		console.log("users is null");
		return;
	}

	console.log("getBaseTableData -->",users);
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
				const userInfo = await getUserInfo(item);
				const _balanceOf = await balanceOf(item);
				const reInterests = await getReInterests(item);
				const userCalc = await calculateEarnings(
					item,
					userInfo.interest_bearing_principal
				);
				const isAss = await isAssistant(item);
				return {
					id: index,
					address: item,
					_balanceOf,
					...reInterests,
					u_released:
						Number(textFromWei(reInterests._released)) +
						Number(textFromWei(userInfo.quantity)),
					...userCalc,
					...userInfo,
					resChild: defaultResChild,
					resAddress: "",
					isAss,
				};
			})
		);
		return data;
	} catch (error) {
		return [];
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
// 		return [];
// 	}
// }
async function getUserInfo(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_user_info(AbiAddressUSDT, address)
			.call()
			.then((res) => ArrayKeysToObject(res, userInfoInterface));
		// console.log(res);
		return res;
	} catch (e) {
		console.error(e);
		// load.close()
		return {};
	}
}
async function balanceOf(address) {
	try {
		const { USDTContract } = Contracts.value;
		const res = await USDTContract.methods.balanceOf(address).call();
		console.log("_balanceOf", res);
		return res;
	} catch (e) {
		console.error(e);
		return "0";
	}
}
async function getReInterests(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_re_interests(AbiAddressUSDT, address)
			.call()
			.then((res) => ArrayKeysToObject(res, reInterestsInterface));
		/*
			_income: "0" 可领取
			_released: "0" 已领取
		*/
		// console.log("getReInterests", res);
		return res;
	} catch (e) {
		console.error(e);
		return {};
	}
}
async function calculateEarnings(address, val) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.calculate_earnings(AbiAddressUSDT, address, val)
			.call()
			.then((res) => ({
				second: res[0],
				interest: textFromWei(res[1]),
				interestRate: (res[2] / 10).toString(),
			}));
		// console.log("calculateEarnings", res);
		return res;
	} catch (e) {
		console.error(e);
		// load.close()
		// earning.Load = false;
		return [];
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
async function getResChild(address) {
	try {
		const { QKContract } = Contracts.value;
		const s1_address = await QKContract.methods
			.getResChildS1(address)
			.call();
		const s2_address = await QKContract.methods
			.getResChildS2(address)
			.call();
		const s3_address = await QKContract.methods
			.getResChildS3(address)
			.call();
		const s1_of = await getUserAllReBalanceOf(address, "0");
		const s2_of = await getUserAllReBalanceOf(address, "1");
		const s3_of = await getUserAllReBalanceOf(address, "2");
		return {
			s1: {
				address: s1_address,
				principal: s1_of.principal,
				profit: s1_of.profit,
			},
			s2: {
				address: s2_address,
				principal: s2_of.principal,
				profit: s2_of.profit,
			},
			s3: {
				address: s3_address,
				principal: s3_of.principal,
				profit: s3_of.profit,
			},
		};
	} catch (e) {
		console.error(e);
		return defaultResChild;
	}
}
async function getUserAllReBalanceOf(address, id) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_user_All_re_BalanceOf(AbiAddressUSDT, address, id)
			.call()
			.then((res) => ({
				principal: textFromWei(res[0]),
				profit: textFromWei(res[1]),
			}));
		return res;
	} catch (e) {
		console.error(e);
		return {
			principal: "0",
			profit: "0",
		};
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
		} else {
			// PlusElMessage({
			// 	type: "error",
			// 	message: '冻结失败',
			// });
		}
		Load.close();
		// return res.status ? res.status : false;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
		Load.close();
		// return false;
	}
}

const updateReUserDialogDom = ref();
const updateReUserData = reactive({
	handleUpdateRe: false,
	updateUserAddress: "",
	updateReValue: "",
});

function openDialogUpdateRe(address, reAddress) {
	updateReUserData.updateUserAddress = address;
	updateReUserData.updateReValue = reAddress;
	updateReUserData.handleUpdateRe = true;
}
function closeDialogUpdateRe(success) {
	updateReUserData.handleUpdateRe = false;
	updateReUserData.updateUserAddress = "";
	updateReUserData.updateReValue = "";
	if (success) {
		PlusElMessage({
			type: "success",
			message: "success update re",
		});
	}
}

function validateUpdateRe() {
	const value = updateReUserData.updateReValue;
	if (!value || value == "") {
		PlusElMessage({
			type: "warning",
			message: "请填写地址",
		});
	} else if (!/^[a-zA-Z0-9]+$/.test(value)) {
		PlusElMessage({
			type: "warning",
			message: "必须是数字和字母的正确组合",
		});
	} else if (value.length != 42) {
		PlusElMessage({
			type: "warning",
			message: "地址长度错误",
		});
	} else {
		return true;
	}
	return false;
}
async function updateRe() {
	const validateValue = validateUpdateRe();
	if (!validateValue) return;
	const load = lockLoadHandler("updateRe loading...");
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.update_re(
				updateReUserData.updateUserAddress,
				updateReUserData.updateReValue
			)
			.send({
				from: userAddress.value,
			});
		load.close();
		if (res) {
			table.data.map((item) => {
				if (item.address == updateReUserData.updateUserAddress) {
					item.reAddress = updateReUserData.updateReValue;
				}
			});
			closeDialogUpdateRe(true);
		}
	} catch (e) {
		console.error(e);
		load.close();
		return false;
	}
}

async function isAssistant(address) {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.is_assistant(address).call();
		console.log("isAssistant", res);
		return res;
	} catch (e) {
		console.error(e);
		return false;
	}
}
async function addAssistant(address, bool) {
	const load = lockLoadHandler("addAssistant loading...");
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.add_assistant(address, bool).send({
			from: userAddress.value,
		});
		console.log(res);
		if (res && res.status) {
			table.data.map((item) => {
				if (item.address == address) {
					item.isAss = bool;
				}
			});
		}
		load.close();
	} catch (e) {
		console.error(e);
		load.close();
	}
}
</script>
