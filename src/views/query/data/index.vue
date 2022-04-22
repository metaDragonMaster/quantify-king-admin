<template>
	<el-row :gutter="10" id="viewRef">
		<el-col>
			<h3 class="title">总计</h3>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<el-card class="theme-box-shadow">
				<p class="p-1">总用户数量</p>
				<p class="p-2">{{ AllUserNum }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<el-card class="theme-box-shadow">
				<p class="p-1">存款用户数量</p>
				<p class="p-2">{{ board.users }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<el-card class="theme-box-shadow">
				<p class="p-1">授权用户数量</p>
				<p class="p-2">{{ ReUserNum }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<el-card class="theme-box-shadow">
				<p class="p-1">存款授权可归集USDT总额</p>
				<p class="p-2">{{ weiAllBalanceOf_ }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="theme-box-shadow">
				<p class="p-1">存款钱包USDT总额</p>
				<p class="p-2">{{ weiAllBalanceOf }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="theme-box-shadow">
				<p class="p-1">存款USDT总额</p>
				<p class="p-2">{{ balanceOfValue }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="theme-box-shadow">
				<p class="p-1">累积存款利息</p>
				<p class="p-2">{{ allWithdraw }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="theme-box-shadow">
				<p class="p-1">推荐奖励提现</p>
				<p class="p-2">{{ weiReWithdraw }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="theme-box-shadow">
				<p class="p-1">用户存款本金提现</p>
				<p class="p-2">{{ weiWithdraw }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="theme-box-shadow">
				<p class="p-1">预计未结利息总额</p>
				<p class="p-2">{{ board.calculateEarningsAll }}</p>
			</el-card>
		</el-col>
		<el-col>
			<h3 class="title">新增数据</h3>
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
			<!-- <p>{{ timeSection }}</p>
			<p>{{ today }}</p> -->
		</el-col>
		<!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">新增授权数量</p>
				<p class="p-2">{{ newsDate._user_counts }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">新增存款数量</p> -->
		<!-- <p class="p-2">{{ newsDate._user_counts }}</p> -->
		<!-- <p class="p-2">0</p>
			</el-card>
		</el-col> -->
		<!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">新增钱包地址USDT数量</p>
				<p class="p-2">0</p>
			</el-card>
		</el-col> -->
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">新增存款USDT数量</p>
				<p class="p-2">{{ newsDate._deposit }}</p>
			</el-card>
		</el-col>
		<!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">新增产生利息数量</p>
				<p class="p-2">0</p>
			</el-card>
		</el-col> -->
		<!-- <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">新增钱包地址USDT数量</p>
				<p class="p-2">0</p>
			</el-card>
		</el-col> -->
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">推荐奖提现金额</p>
				<p class="p-2">{{ newsDate._re_withdrawal }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">存款本金提现金额</p>
				<p class="p-2">{{ newsDate._principal_withdrawal }}</p>
			</el-card>
		</el-col>
		<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
			<el-card class="news theme-box-shadow">
				<p class="p-1">利息提现金额</p>
				<p class="p-2">{{ newsDate._withdrawal }}</p>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
import { targetLoadHandler } from "@/utils/PlusElement";
// import Decimal from "decimal.js";
import DayJS from "dayjs";
import { ref, computed, reactive, onMounted, nextTick } from "vue";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressUSDT, AbiAddressQK } from "@/abis/index";
import { getTimeJoinDataInterface } from "@/abis/interface";
import { ArrayKeysToObject, numToArr } from "@/utils/tools";
import {
	getAllUsersListFilesName,
	getReUsersListFilesName,
} from "@/common/fleekStorage";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress, web3 } = storeToRefs(storeWeb3js);
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}
// function textToWei(str) {
//   return web3.value.utils.toWei(str.toString()) || str;
// }
onMounted(() => {
	nextTick(init())
});

const board = reactive({
	AllBalanceOf: "0",
	AllBalanceOf_: "0",
	users: "0",
	withdraw: "0",
	reWithdraw: "0",
	calculateEarningsAll: "0",
});
const weiAllBalanceOf = computed(() => textFromWei(board.AllBalanceOf));
const weiAllBalanceOf_ = computed(() => textFromWei(board.AllBalanceOf_));
// const weiUsers = computed(()=> textFromWei(board.users))
const weiWithdraw = computed(() => textFromWei(board.withdraw));
const weiReWithdraw = computed(() => textFromWei(board.reWithdraw));
const allWithdraw = computed(() =>
	// textFromWei(new Decimal(board.reWithdraw) + new Decimal(board.withdraw))
	// '0'
	// textFromWei(board.reWithdraw) -
	textFromWei(board.withdraw)
);

async function init() {
	// await getTableData();
	const load = targetLoadHandler('#viewRef', "init loading...");
	try {
		await getAllUsers();
		await getReUsers();
		await balanceOf();
		await getAllBalanceOf();
		await getAllBalanceOf_();
		await getUsers();
		await getWithdrawAll();
		await getReWithdrawAll();
		await getCalculateEarningsAll();
		await startNewData();
		load.close();
	} catch (e) {
		load.close();
	}
}

const balanceOfValue = ref("0");
async function balanceOf() {
	try {
		const { USDTContract } = Contracts.value;
		console.log(USDTContract);
		const res = await USDTContract.methods.balanceOf(AbiAddressQK).call();
		console.log("balanceOf", res);
		balanceOfValue.value = textFromWei(res);
	} catch (e) {
		console.error(e);
		return false;
	}
}

async function getAllBalanceOf() {
	try {
		const { OtherContract } = Contracts.value;
		const res = await OtherContract.methods
			.getAllBalanceOf(AbiAddressUSDT)
			.call();
		console.log("getAllBalanceOf", res);
		board.AllBalanceOf = res;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}
async function getAllBalanceOf_() {
	try {
		const { OtherContract } = Contracts.value;
		const res = await OtherContract.methods
			.getAllBalanceOf_(AbiAddressUSDT)
			.call();
		console.log("getAllBalanceOf_", res);
		board.AllBalanceOf_ = res;
	} catch (e) {
		console.error(e);
	}
}
async function getUsers() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.getUsers().call();
		console.log("getUsers", res);
		board.users = res.length;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}
async function getWithdrawAll() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_withdraw_all(AbiAddressUSDT)
			.call();
		console.log("getWithdrawAll", res);
		board.withdraw = res;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}
async function getReWithdrawAll() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_re_withdraw_all(AbiAddressUSDT)
			.call();
		console.log("getReWithdrawAll", res);
		board.reWithdraw = res;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}

const dayTimestamp = 24 * 60 * 60;
const today = DayJS().unix();
const timeSection = ref([today, today]);
const newsDate = reactive({
	_deposit: "0", //存入本金
	_principal_withdrawal: "0", //本金提现
	_re_withdrawal: "0", //推荐提现
	_withdrawal: "0", //利息提现
});

async function startNewData() {
	const data = await getTimeJoinData(today * 1000);
	const userData = await getReviewUserData(today * 1000);
	console.log("userData", userData);
	setNewsDate(data);
}
function setNewsDate(data) {
	newsDate._deposit = data._deposit; //存款
	newsDate._principal_withdrawal = data._principal_withdrawal;
	newsDate._re_withdrawal = data._re_withdrawal;
	newsDate._withdrawal = data._withdrawal;
	newsDate._user_counts = data._user_counts;
}
function strAdd(a, b) {
	return (Number(a) + Number(b)).toString();
}
async function getNewsData() {
	const load = targetLoadHandler('#viewRef',"getNewsData loading...");
	console.log("getNewsData", timeSection.value);
	try {
		const _times = timeSection.value;
		if (!_times) {
			load.close();
			return;
		}
		const startDate = parseInt(_times[0]);
		const endDate = parseInt(_times[1]);
		const dayNum = (endDate - startDate) / dayTimestamp + 1;
		// console.log("dayNum", dayNum, dayTimestamp);
		const days = numToArr(dayNum);
		// console.log("days", days);
		const datas = await Promise.all(
			days.map(async (i) => {
				const oneDayTimestamp = (startDate + dayTimestamp * i) * 1000;
				const data = await getTimeJoinData(oneDayTimestamp);
				return data;
			})
		);
		const rData = datas.reduce((prex, item) => {
			prex._deposit = strAdd(prex._deposit, item._deposit);
			prex._principal_withdrawal = strAdd(
				prex._principal_withdrawal,
				item._principal_withdrawal
			);
			prex._re_withdrawal = strAdd(
				prex._re_withdrawal,
				item._re_withdrawal
			);
			prex._withdrawal = strAdd(prex._withdrawal, item._withdrawal);
			prex._user_counts = strAdd(prex._user_counts, item._user_counts);
			return prex;
		});
		// console.log(rData);
		setNewsDate(rData);
		load.close();
	} catch (error) {
		load.close();
	}
}

async function getTimeJoinData(timestamp) {
	try {
		const { QKContract } = Contracts.value;
		const strTimestamp = DayJS(timestamp).format("YYYYMD");
		const res = await QKContract.methods
			.get_time_join_data(AbiAddressUSDT, strTimestamp)
			.call()
			.then((res) => ArrayKeysToObject(res, getTimeJoinDataInterface));
		console.log("getTimeJoinData", res);
		const data = {};
		data._deposit = textFromWei(res._deposit);
		data._principal_withdrawal = textFromWei(res._principal_withdrawal);
		data._re_withdrawal = textFromWei(res._re_withdrawal);
		data._withdrawal = textFromWei(res._withdrawal);
		data._user_counts = res._user_counts;
		// console.log("getTimeJoinData", data);
		return data;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}

async function getReviewUserData(timestamp) {
	try {
		const { QKContract } = Contracts.value;
		const strTimestamp = DayJS(timestamp).format("YYYYMD");
		console.log(userAddress.value, strTimestamp);
		const res = await QKContract.methods
			.get_review_user_data(
				AbiAddressUSDT,
				userAddress.value,
				strTimestamp
			)
			.call();
		console.log("getReviewUserData", res);
		return res;
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}

async function getCalculateEarningsAll() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.get_Calculate_Earnings_All(AbiAddressUSDT)
			.call();
		console.log("getCalculateEarningsAll", res);
		board.calculateEarningsAll = textFromWei(res);
	} catch (e) {
		console.error(e);
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
	}
}

// async function getCalculateEarningsAll() {
//   try {
//     const { QKContract } = Contracts.value;
//     const res = await QKContract.methods.get_Calculate_Earnings_All(AbiAddressUSDT).call();
//     console.log("getCalculateEarningsAll", res);
//     board.calculateEarningsAll = res
//   } catch (e) {
//     console.error(e);
//     PlusElMessage({
//       type: "error",
//       message: e.message,
//     });
//   }
// }

const AllUserNum = ref(0);
async function getAllUsers() {
	try {
		const res = await getAllUsersListFilesName();
		console.log("getAllUsers", res, res.length);
		if (res) {
			AllUserNum.value = res.length;
		}
	} catch (e) {
		console.error(e);
	}
}
const ReUserNum = ref(0);
async function getReUsers() {
	try {
		const res = await getReUsersListFilesName();
		console.log("getReUsers", res, res.length);
		if (res) {
			ReUserNum.value = res.length;
		}
	} catch (e) {
		console.error(e);
	}
}
</script>
<style lang="scss" scoped>
.el-row {
	max-width: 100%;
}
.el-col {
	border-radius: 4px;
	margin-bottom: 10px;
	overflow: hidden;
	.el-card {
		border: none;
		color: inherit;
	}
	.p-1 {
		font-size: 20px;
	}
	.p-2 {
		font-size: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
.news .p-2 {
	font-size: 20px;
}
.title {
	margin-bottom: 10px;
}
</style>
