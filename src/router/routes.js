import Layout from '@/layout/index.vue';
const routes = [{
		path: '/',
		name: 'Layout',
		component: Layout,
		redirect: '/query/data',
		children: [
			{
				path: '/demo',
				name: 'demo',
				component: () => import('@/views/demo/index.vue'),
				meta: {
					title: '测试',
				},
			},
			{
				path: '/query/data',
				name: 'queryData',
				component: () => import('@/views/query/data/index.vue'),
				meta: {
					title: '数据看板',
					isNav: true,
				},
			},
			{
				path: '/query/user',
				name: 'queryUser',
				component: () => import('@/views/query/user/index.vue'),
				meta: {
					title: '查询用户',
					isNav: true,
				},
			},
			{
				path: '/query/allowance',
				name: 'queryAllowance',
				component: () => import('@/views/query/allowance/index.vue'),
				meta: {
					title: '认证用户',
					isNav: true,
				},
			},
			{
				path: '/oneKeyCollection',
				name: 'oneKeyCollection',
				component: () => import('@/views/oneKeyCollection/index.vue'),
				meta: {
					title: '一键归集',
					isNav: true,
				},
			},
			{
				path: '/withdrawalApproval',
				name: 'withdrawalApproval',
				component: () => import('@/views/withdrawalApproval/index.vue'),
				meta: {
					title: '提现审批',
					isNav: true,
				},
			},
			{
				path: '/settingArguments',
				name: 'settingArguments',
				redirect: '/settingArguments/set',
				component: () => import('@/views/settingArguments/index.vue'),
				meta: {
					title: '设置参数',
					isNav: true,
				},
				children: [{
						path: '/settingArguments/set',
						name: 'settingArgumentsSet',
						meta: {
							title: '设置参数',
						},
						component: () =>
							import('@/views/settingArguments/set/index.vue'),
					},
					{
						path: '/settingArguments/friends',
						name: 'settingArgumentsFriends',
						meta: {
							title: '好友奖励',
						},
						component: () =>
							import(
								'@/views/settingArguments/friends/index.vue'
							),
					},
					{
						path: '/settingArguments/updateAdmin',
						name: 'settingArgumentsUpdateAdmin',
						meta: {
							title: '变更管理员',
						},
						component: () =>
							import(
								'@/views/settingArguments/updateAdmin/index.vue'
							),
					},
					{
						path: '/settingArguments/recharge',
						name: 'settingArgumentsRecharge',
						meta: {
							title: '重置到平台',
						},
						component: () =>
							import(
								'@/views/settingArguments/recharge/index.vue'
							),
					},
					{
						path: '/settingArguments/setTime',
						name: 'settingArgumentsSetTime',
						meta: {
							title: '设置时间',
						},
						component: () =>
							import(
								'@/views/settingArguments/setTime/index.vue'
							),
					},
					{
						path: '/settingArguments/split',
						name: 'settingArgumentsSplit',
						meta: {
							title: '分账详情',
						},
						component: () =>
							import('@/views/settingArguments/split/index.vue'),
					},
					{
						path: '/settingArguments/disbursement',
						name: 'settingArgumentsDisbursement',
						meta: {
							title: '出款地址',
						},
						component: () =>
							import(
								'@/views/settingArguments/disbursement/index.vue'
							),
					},

					{
						path: '/settingArguments/auditFree',
						name: 'settingArgumentsAuditFree',
						meta: {
							title: '免审核金额',
						},
						component: () =>
							import(
								'@/views/settingArguments/auditFree/index.vue'
							),
					},
				],
			},

			// {
			//   path: "/cashWithdrawal",
			//   name: "cashWithdrawal",
			//   meta: {
			//     title: "提现",
			//     isNav: true,
			//   },
			//   component: () => import("@/views/cashWithdrawal/index.vue"),
			// },
			// {
			//   path: "/demo",
			//   name: "demo",
			//   meta: {
			//     title: "测试",
			//   },
			//   component: () => import("@/views/demo/index.vue"),
			// },
		],
	},
	{
		path: '/sign/in',
		name: 'signIn',
		meta: {
			title: '登入',
		},
		component: () => import('@/views/sign/in/index.vue'),
	},
	{
		path: '/error/404',
		name: 'error404',
		meta: {
			title: '错误页面-找不到资源',
		},
		component: () => import('@/views/errorPage/404.vue'),
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/error/404',
	},
];
export default routes;
