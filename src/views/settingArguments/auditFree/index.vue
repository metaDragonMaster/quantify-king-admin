<template>
	<div>
		<div class="broad theme-box-shadow">
			<p>当前免审金额</p>
			<p>{{ oldAmount }}</p>
		</div>
		<el-form :model="FormData" label-width="120px" label-position="top">
			<el-form-item label="金额">
				<el-input v-model.number="FormData.amount" />
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

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js();
const { Contracts } = storeToRefs(storeContracts);
const { userAddress,web3 } = storeToRefs(storeWeb3js);

function textFromWei(str) {
	return web3.value.utils.fromWei(str) || str;
}
function textToWei(str) {
    return web3.value.utils.toWei(str.toString()) || str
}

onMounted(() => {
	getUnderAmount();
});

const FormData = reactive({
	amount: "",
});
async function submit() {
	const load = lockLoadHandler("setting loading...");
	try {
		const res = await setUnderAmount();
		if (res) {
			PlusElMessage({
				type: "success",
				message: "success: setUnderAmount",
			});
			await getUnderAmount();
		} else {
			// PlusElMessage({
			// 	type: "error",
			// 	message: "failed: setUnderAmount",
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

async function setUnderAmount() {
	try {
		const { QKContract } = Contracts.value;
		const { amount } = FormData;
		const res = await QKContract.methods.set_under_amount(textToWei(amount)).send({
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

const oldAmount = ref("");
async function getUnderAmount() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_under_amount().call();
		oldAmount.value = textFromWei(res);
	} catch (e) {
		console.error(e);
		return false;
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
