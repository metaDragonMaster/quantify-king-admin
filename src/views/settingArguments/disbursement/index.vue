<template>
	<div>
		<div class="broad theme-box-shadow">
			<p>当前出款地址</p>
			<p>{{ oldAddress }}</p>
			<el-button @click="increaseAllowance">请切换到出款地址点击授权</el-button>
		</div>
		<el-form :model="FormData" label-width="120px" label-position="top">
			<el-form-item label="地址">
				<el-input v-model="FormData.address" />
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="submit"> submit </el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { lockLoadHandler, PlusElMessage } from "@/utils/PlusElement";
import { UseStoreContracts, UseStoreWeb3js } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import { AbiAddressQK, addedValue } from "@/abis/index";

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress } = storeToRefs(storeWeb3js);

onMounted(() => {
	getSplitAccounts();
});

const FormData = reactive({
	address: "",
});
async function submit() {
	const load = lockLoadHandler("setting loading...");
	try {
		const res = await setSplitAccounts();
		if (res) {
			PlusElMessage({
				type: "success",
				message: "success: setSplitAccounts",
			});
		} else {
			// PlusElMessage({
			// 	type: "error",
			// 	message: "failed: setSplitAccounts",
			// });
		}
		load.close();
	} catch (e) {
		// PlusElMessage({
		// 	type: "error",
		// 	message: e.message,
		// });
		load.close();
	}
}

async function setSplitAccounts() {
	try {
		const { QKContract } = Contracts.value;
		const { address } = FormData;
		const res = await QKContract.methods.set_split_accounts(address).send({
			from: userAddress.value,
		});
		console.log(res);
		if (res.status) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.error(e);
		return false;
	}
}

const oldAddress = ref("");
async function getSplitAccounts() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_split_accounts().call();
		console.log(res);
		oldAddress.value = res;
	} catch (e) {
		console.error(e);
		return false;
	}
}

async function increaseAllowance() {
	const load = lockLoadHandler("increaseAllowance loading...");
	if(oldAddress.value != userAddress.value) {
		// PlusElMessage({
		// 	type: "error",
		// 	message: '请切换到出款地址授权！',
		// });
		load.close();
		return
	}
	try {
		const { USDTContract } = Contracts.value;
		const res = await USDTContract.methods
			.increaseAllowance(AbiAddressQK, addedValue)
			.send({
				from: userAddress.value,
			});
		console.log(res);
		load.close();
		return res.status ? res.status : false;
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
.broad {
	padding: 15px 20px;
	border-radius: 4px;
	// width: fit-content;
	& > *:not(:last-child) {
		margin-bottom:10px ;
	}
}
</style>
