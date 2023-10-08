import { defineStore } from "pinia";
import { getFlatArr } from "@/utils/util";
// import { getAuthButton } from "@/api/login";
import { getShowMenuList, getAllBreadcrumbList } from "@/utils/util";
// import { routerList } from "@/api/login.js";

// AuthStore
export const AuthStore = defineStore({
	id: "AuthState",
	state: () => ({
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: "",
		// 按钮权限列表
		authButtonList: {},
		// 菜单权限列表
		authMenuList: []
	}),
	getters: {
		// 按钮权限列表
		authButtonListGet: state => state.authButtonList,
		// 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: state => state.authMenuList,
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.authMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
	},
	actions: {
		// getAuthButtonList
		async getAuthButtonList() {
			// const { data } = await getAuthButton();
			const list = {
				authButton: ["create", "remove"]
			};
			// console.log(data);
			this.authButtonList = list;
		},
		// getAuthMenuList
		getAuthMenuList: function () {
			// const { data } = await routerList();

			const data = {
				code: 200,
				list: [
					{
						path: "/home/index",
						name: "home",
						component: "/home/index",
						id: "a",
						parentId: null,
						title: "首页",
						disabled: true,
						parentCheck: true,
						meta: {
							icon: "HomeFilled",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: true,
							isKeepAlive: true
						}
					},
					{
						path: "/user",
						name: "user",
						component: "/user/index",
						id: "b11",
						parentId: null,
						title: "用户管理",
						parentCheck: true,
						meta: {
							icon: "MessageBox",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						}
					},
					{
						path: "/dept",
						name: "dept",
						component: "/dept/index",
						id: "b11",
						parentId: null,
						title: "部门管理",
						parentCheck: true,
						meta: {
							icon: "MessageBox",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						}
					},
					{
						path: "/role",
						name: "role",
						component: "/role/index",
						id: "b11",
						parentId: null,
						title: "角色管理",
						parentCheck: true,
						meta: {
							icon: "MessageBox",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						}
					},
					{
						path: "/panel",
						name: "panel",
						component: "/panel/index",
						id: "b",
						parentId: null,
						title: "面板",
						parentCheck: true,
						meta: {
							icon: "MessageBox",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						}
					},
					{
						path: "/auth",
						name: "auth",
						redirect: "/auth/button",
						id: "c",
						parentId: null,
						title: "权限控制",
						parentCheck: true,
						meta: {
							icon: "User",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false
						},
						children: [
							{
								path: "/auth/button",
								name: "authButton",
								component: "/auth/authButton",
								id: "c1",
								parentId: "c",
								title: "控制按钮",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/auth/authMenu",
								name: "authMenu",
								component: "/auth/authMenu",
								id: "c2",
								parentId: "c",
								title: "控制菜单",
								disabled: true,
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							}
						]
					},
					{
						path: "/assembly",
						name: "assembly",
						redirect: "/assembly/message",
						id: "d",
						parentId: null,
						title: "常用组件",
						parentCheck: true,
						meta: {
							icon: "Briefcase",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						},
						children: [
							{
								path: "/assembly/message",
								name: "message",
								component: "/assembly/message",
								id: "d1",
								parentId: "d",
								title: "消息框",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/assembly/wangEditor",
								name: "wangEditor",
								component: "/assembly/wangEditor",
								id: "d2",
								parentId: "d",
								title: "富文本",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/assembly/count",
								name: "count",
								component: "/assembly/count",
								id: "d3",
								parentId: "d",
								title: "数字滚动",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/assembly/guide",
								name: "guide",
								component: "/assembly/guide",
								id: "d4",
								parentId: "d",
								title: "引导页",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/assembly/drag",
								name: "drag",
								component: "/assembly/drag",
								id: "d5",
								parentId: "d",
								title: "拖拽",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/assembly/webpage",
								name: "webpage",
								component: "/assembly/webpage",
								id: "d6",
								parentId: "d",
								title: "内嵌网页",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							}
						]
					},
					{
						path: "/directives",
						name: "directives",
						redirect: "/directives/copy",
						id: "e",
						parentId: null,
						title: "自定义指令",
						parentCheck: true,
						meta: {
							icon: "Pointer",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						},
						children: [
							{
								path: "/directives/copy",
								name: "copy",
								component: "/directives/copy",
								id: "e1",
								parentId: "e",
								title: "复制",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/directives/watermark",
								name: "watermark",
								component: "/directives/watermark",
								id: "e2",
								parentId: "e",
								title: "水印",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/directives/debounce",
								name: "debounce",
								component: "/directives/debounce",
								id: "e3",
								parentId: "e",
								title: "防抖",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/directives/throttle",
								name: "throttle",
								component: "/directives/throttle",
								id: "e4",
								parentId: "e",
								title: "节流",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							}
						]
					},
					{
						path: "/work",
						name: "work",
						redirect: "/work/print",
						id: "f",
						parentId: null,
						title: "办公",
						meta: {
							icon: "Printer",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						},
						children: [
							{
								path: "/work/print",
								name: "print",
								component: "/work/print",
								id: "f1",
								parentId: "f",
								title: "打印",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/work/excel",
								name: "excel",
								component: "/work/excel",
								id: "f2",
								parentId: "f",
								title: "Excel",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/work/flowChart",
								name: "flowChart",
								component: "/work/flowChart",
								id: "f3",
								parentId: "f",
								title: "流程图",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: false
								}
							}
						]
					},
					{
						path: "/menu",
						name: "menu",
						redirect: "/menu/menu1",
						id: "g",
						parentId: null,
						title: "菜单嵌套",
						parentCheck: true,
						meta: {
							icon: "Menu",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						},
						children: [
							{
								path: "/menu/menu1",
								name: "menu1",
								component: "/menu/menu1/index",
								id: "g1",
								parentId: "g",
								title: "菜单1",
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								}
							},
							{
								path: "/menu/menu2",
								name: "menu2",
								redirect: "/menu/menu2/menu21",
								id: "g2",
								parentId: "g",
								title: "菜单2",
								parentCheck: true,
								meta: {
									isLink: "",
									isHide: false,
									isFull: false,
									isAffix: false,
									isKeepAlive: true
								},
								children: [
									{
										path: "/menu/menu2/menu21",
										name: "menu21",
										component: "/menu/menu2/menu2-1/index",
										id: "g21",
										parentId: "g2",
										title: "菜单2-1",
										meta: {
											isLink: "",
											isHide: false,
											isFull: false,
											isAffix: false,
											isKeepAlive: true
										}
									},
									{
										path: "/menu/menu2/menu22",
										name: "menu22",
										redirect: "/menu/menu2/menu2-2/menu2-2-1",
										id: "g22",
										parentId: "g2",
										title: "菜单2-2",
										parentCheck: true,
										meta: {
											isLink: "",
											isHide: false,
											isFull: false,
											isAffix: false,
											isKeepAlive: true
										},
										children: [
											{
												path: "/menu/menu2/menu22/menu221",
												name: "menu221",
												component: "/menu/menu2/menu2-2/menu2-2-1/index",
												id: "g221",
												parentId: "g22",
												title: "菜单2-2-1",
												meta: {
													isLink: "",
													isHide: false,
													isFull: false,
													isAffix: false,
													isKeepAlive: true
												}
											},
											{
												path: "/menu/menu2/menu22/menu222",
												name: "menu222",
												component: "/menu/menu2/menu2-2/menu2-2-2/index",
												id: "g222",
												parentId: "g22",
												title: "菜单2-2-2",
												meta: {
													isLink: "",
													isHide: false,
													isFull: false,
													isAffix: false,
													isKeepAlive: true
												}
											}
										]
									}
								]
							}
						]
					},
					{
						path: "/language/index",
						name: "language",
						component: "/language/index",
						id: "h",
						parentId: null,
						title: "i18n多语言",
						parentCheck: true,
						meta: {
							icon: "SetUp",
							isLink: "",
							isHide: false,
							isFull: false,
							isAffix: false,
							isKeepAlive: true
						}
					},
					{
						path: "/dataView",
						name: "dataView",
						component: "/dataView/index",
						id: "i",
						parentId: null,
						title: "大屏数据",
						parentCheck: true,
						meta: {
							icon: "Monitor",
							isLink: "",
							isHide: false,
							isFull: true,
							isAffix: false,
							isKeepAlive: true
						}
					}
				],
				msg: "成功"
			};

			this.authMenuList = data.list;
		},
		// setRouteName
		async setRouteName(name) {
			this.routeName = name;
		}
	}
});
