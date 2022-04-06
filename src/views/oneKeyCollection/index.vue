<template>
	<el-row class="theme-box-shadow">
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div class="usdt-model">
				<p class="p-1">全部账号余额</p>
				<p class="p-2 font-hide">{{ balanceOf.account }}</p>
			</div>
		</el-col>
		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
			<div class="usdt-model">
				<p class="p-1">全部账号授权余额</p>
				<p class="p-2 font-hide">{{ balanceOf.auth }}</p>
			</div>
		</el-col>
	</el-row>
	<div class="submit-buttons">
		<el-button type="success" @click="qAll">一键归集</el-button>
	</div>
</template>

<script setup>
import {
	// PlusElMessage,
	lockLoadHandler,
} from "@/utils/PlusElement";
import { reactive } from "vue";
import { UseStoreWeb3js, UseStoreContracts } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import baseAddress from "@/abis/contracts";
const { AbiAddressUSDT } = baseAddress;

const storeWeb3js = UseStoreWeb3js();
const { userAddress, web3 } = storeToRefs(storeWeb3js);

const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}
// function textToWei(str) {
//     return web3.value.utils.toWei(str.toString()) || str
// }
async function qAll() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.q_all(AbiAddressUSDT).send({
			from: userAddress.value,
		});
		console.log(res);
	} catch (e) {
		console.error(e);
	}
}

init();
async function init() {
	const Load = lockLoadHandler('init ...')
	try {
		await getAllBalanceOf();
		await getAllBalanceOf_();
		Load.close()
	} catch(err) {
		console.error(err);
		Load.close()
	}
}

const balanceOf = reactive({
	account: "0",
	auth: "0",
});

async function getAllBalanceOf() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.getAllBalanceOf(AbiAddressUSDT)
			.call();
		balanceOf.account = textFromWei(res);
		console.log(res);
	} catch (e) {
		console.error(e);
	}
}
async function getAllBalanceOf_() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods
			.getAllBalanceOf_(AbiAddressUSDT)
			.call();
		balanceOf.auth = textFromWei(res);
		console.log(res);
	} catch (e) {
		console.error(e);
	}
}

// ssssssssssssssss
</script>
<style lang="scss" scoped>
.usdt-model {
	text-align: center;
	padding: 60px 0;
	.p-1 {
		font-size: 20px;
	}
	.p-2 {
		margin: 40px 0 50px;
		font-size: 40px;
	}
	@media screen and (max-width: 768px) {
		padding: 20px 0 10px;
		.p-1 {
			font-size: 12px;
		}
		.p-2 {
			font-size: 20px;
			margin: 20px 0;
		}
	}
}
.submit-buttons {
	display: flex;
	justify-content: space-around;
}
</style>
