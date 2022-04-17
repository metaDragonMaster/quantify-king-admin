<template>
	<div>
		<div class="broad theme-box-shadow">
			<p>提取利息间隔时间（秒）</p>
			<p>{{ oldTimeTamp }}</p>
        <p>相当于  {{ oldTimeTamp / 60 / 60}} 小时</p>
		</div>
		<el-form :model="FormData" label-width="120px" label-position="top">
			<el-form-item label="时间:秒数">
				<el-input v-model.number="FormData.timeTamp" />
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
const { userAddress } = storeToRefs(storeWeb3js);

onMounted(() => {
	getTimeTamp();
});

const FormData = reactive({
	timeTamp: "",
});
async function submit() {
	const load = lockLoadHandler("setting loading...");
	try {
		const res = await setTimeTamp();
		if (res) {
			PlusElMessage({
				type: "success",
				message: "success: setTimeTamp",
			});
			await getTimeTamp()
		} else {
			// PlusElMessage({
			// 	type: "error",
			// 	message: "failed: setTimeTamp",
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

async function setTimeTamp() {
	try {
		const { QKContract } = Contracts.value;
		const { timeTamp } = FormData;
		const res = await QKContract.methods.set_time_tamp(timeTamp).send({
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

const oldTimeTamp = ref("");
async function getTimeTamp() {
	try {
		const { QKContract } = Contracts.value;
		const res = await QKContract.methods.get_time_tamp().call();
		console.log(res);
		oldTimeTamp.value = res;
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
		margin-bottom: 10px;
	}
}
</style>
