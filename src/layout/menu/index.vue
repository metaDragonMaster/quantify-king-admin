<template>
	<div class="menu">
		<el-menu
			:collapse="isCollapse"
			:default-active="defaultMenuActive"
			text-color="#fff"
			:router="true"
		>
			<!-- <el-menu-item index="/query/data">
				<img class="icon" src="@/assets/icons/icon-menu-1.png" alt="" />
				<span>数据看板</span>
			</el-menu-item>
			<el-menu-item index="/query/user">
				<img class="icon" src="@/assets/icons/icon-menu-2.png" alt="" />
				<span>查询用户</span>
			</el-menu-item>
			<el-menu-item index="/oneKeyCollection">
				<img class="icon" src="@/assets/icons/icon-menu-3.png" alt="" />
				<span>一键归集</span>
			</el-menu-item>
			<el-menu-item index="/withdrawalApproval">
				<img class="icon" src="@/assets/icons/icon-menu-3.png" alt="" />
				<span>提现审批</span>
			</el-menu-item>
			<el-menu-item index="/settingArguments">
				<img class="icon" src="@/assets/icons/icon-menu-3.png" alt="" />
				<span>参数设置</span>
			</el-menu-item> -->
			<el-menu-item
				v-for="item in menuData"
				:key="item.path"
				:index="item.path"
			>
				<!-- <img class="icon" :src="item.icon" alt="errorImage" /> -->
				<img class="icon" src="@/assets/icons/icon-menu-1.png" alt="errorImage" />
				<span>{{ item.title }}</span>
			</el-menu-item>
			<!-- <el-menu-item index="/cashWithdrawal">
				<img class="icon" src="@/assets/icons/icon-menu-4.png" alt="" />
				<span>提现</span>
			</el-menu-item> -->
		</el-menu>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { toRefs, computed, defineProps, onMounted } from "vue";
const props = defineProps({
	isCollapse: {
		type: Boolean,
		default: false,
	},
});
const { isCollapse } = toRefs(props);
const Route = useRoute();
const defaultMenuActive = computed(() => Route.path);

const Router = useRouter();
const menuData = computed(() =>
	Router.getRoutes()
		.filter((item) => item.meta && item.meta.isNav)
		.map((item) => {
			return {
				path: item.path,
				title: item.meta && item.meta.title ? item.meta.title : "",
				// icon: require(item.meta && item.meta.icon
				// 	? `@/assets/icons/${item.meta.icon}.png`
				// 	: "../../assets/icons/icon-menu-1.png"),
			};
		})
);
onMounted(() => {

});
</script>
<style lang="scss" scoped>
:deep(.el-menu) {
	background-color: transparent;
	border-right: none;
	.el-menu-item {
		.icon {
			margin-right: 10px;
		}
		&:hover {
			background-color: rgba($color: #bdbdbd, $alpha: 0.5);
		}
		&.is-active {
			color: inherit;
			background-image: linear-gradient(87deg, #333333 0%, #3d3d3d 100%);
			background-color: transparent;
			border-right: 4px solid #47a663;
		}
		&.el-menu--collapse {
			span {
				display: none;
				@media screen and (min-width: 769px) {
					display: inline-block;
				}
			}
		}
	}
}
</style>
