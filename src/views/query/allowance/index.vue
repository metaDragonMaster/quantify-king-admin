<template>
	<search id="viewRef" ref="searchRef"></search>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { UseStoreContracts } from "@/stores/web3js";
import { storeToRefs } from "pinia";
import Decimal from "decimal.js";
import { AbiAddressQK } from "@/abis/index";
import { targetLoadHandler } from "@/utils/PlusElement";
import { getAllUsersListFilesName } from "@/common/fleekStorage.js";
import search from "./search.vue";
const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
const searchRef = ref();
onMounted(() => {
	init();
});

async function init() {
	const load = targetLoadHandler("#viewRef", "init loading...");
	try {
		const users = await getUsers();
		load.close();
		nextTick(() => searchRef.value.getBaseTableData(users));
	} catch (e) {
		load.close();
	}
}

async function getUsers() {
	try {
		const res = await getAllUsersListFilesName();
		// console.log("init ---->", res);
		const names = await Promise.all(
			res.map(async (item) => {
				const alled = await allowance(item);
				return alled ? "" : item;
			})
		);
		const filterNames = names.filter((_item) => "" + _item != "");
		// console.log("getAllowanceListFilesName---->", filterNames);
		return filterNames;
	} catch (e) {
		console.error(e);
		return [];
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
</script>

<style lang="scss" scoped>
.copy-text {
	margin-bottom: 10px;
}
:deep() .search-address {
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
:deep() .table-expand {
	color: #fff;
	padding: 0 20px 0 48px;

	.res-address {
		margin-bottom: 10px;
		align-items: center;
		.update-button {
			border: 1px solid #fff;
			margin-left: 10px;
			border-radius: 4px;
			padding: 2px 8px;
		}
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
:deep(.el-table) {
	.el-table__expand-icon .el-icon {
		font-size: 18px;
	}
}
:deep() .update-re-user {
	.footer {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}
}

:deep() .el-link:not(:last-child) {
	margin-right: 6px;
}
</style>
