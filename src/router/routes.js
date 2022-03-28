import Layout from "@/layout/index.vue";
const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/query/data",
    children: [
      // {
      //   path: "/homepage",
      //   name: "homepage",
      //   meta: {
      //     title: "首页",
      //     isNav: true,
      //   },
      //   component: () => import("@/views/homepage/index.vue"),
      // },
      {
        path: "/demo",
        name: "demo",
        meta: {
          title: "测试",
          isNav: true,
        },
        component: () => import("@/views/demo/index.vue"),
      },
      {
        path: "/query/data",
        name: "queryData",
        meta: {
          title: "数据看板",
          isNav: true,
        },
        component: () => import("@/views/query/data/index.vue"),
      },
      {
        path: "/query/user",
        name: "queryUser",
        meta: {
          title: "查询用户",
          isNav: true,
        },
        component: () => import("@/views/query/user/index.vue"),
      },
      {
        path: "/oneKeyCollection",
        name: "oneKeyCollection",
        meta: {
          title: "一键归集",
          isNav: true,
        },
        component: () => import("@/views/oneKeyCollection/index.vue"),
      },
      {
        path: "/settingArguments",
        name: "settingArguments",
        redirect: '/settingArguments/set',
        meta: {
          title: "设置参数",
          isNav: true,
        },
        component: () => import("@/views/settingArguments/index.vue"),
        children:[
          {
            path: "/settingArguments/set",
            name: "settingArgumentsSet",
            meta: {
              title: "设置参数",
            },
            component: () => import("@/views/settingArguments/set/index.vue"),
          },
          {
            path: "/settingArguments/friends",
            name: "settingArgumentsFriends",
            meta: {
              title: "好友奖励",
            },
            component: () => import("@/views/settingArguments/friends/index.vue"),
          },
          {
            path: "/settingArguments/updateAdmin",
            name: "settingArgumentsUpdateAdmin",
            meta: {
              title: "变更管理员",
            },
            component: () => import("@/views/settingArguments/updateAdmin/index.vue"),
          },
          {
            path: "/settingArguments/recharge",
            name: "settingArgumentsRecharge",
            meta: {
              title: "重置到平台",
            },
            component: () => import("@/views/settingArguments/recharge/index.vue"),
          },
          {
            path: "/settingArguments/setTime",
            name: "settingArgumentsSetTime",
            meta: {
              title: "设置时间",
            },
            component: () => import("@/views/settingArguments/setTime/index.vue"),
          },
          {
            path: "/settingArguments/split",
            name: "settingArgumentsSplit",
            meta: {
              title: "分账详情",
            },
            component: () => import("@/views/settingArguments/split/index.vue"),
          },
        ]
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
    path: "/sign/in",
    name: "signIn",
    meta: {
      title: "登入",
    },
    component: () => import("@/views/sign/in/index.vue"),
  },
  {
    path: "/error/404",
    name: "error404",
    meta: {
      title: "错误页面-找不到资源",
    },
    component: () => import("@/views/errorPage/404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/error/404",
  },
];
export default routes;
