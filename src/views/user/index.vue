<template>
	<div id="table">
		<div style="display: flex">
			<search @onSearch="onSearch" />
			<el-button type="primary" @click="onAdd">新增</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="姓名" />
			<el-table-column prop="phone" label="电话" />
			<el-table-column prop="email" label="邮箱" />
			<el-table-column prop="department" label="部门" />
			<el-table-column label="操作" width="260" fixed="right">
				<template #default="scope">
					<el-button size="small" @click="openUpdate(scope.row)">修改</el-button>
					<el-button size="small" @click="onOpenMenu(scope.row)">权限维护</el-button>
					<el-popconfirm title="你确定要删除该用户吗?" @confirm="deleteRow(scope.row)">
						<template #reference>
							<el-button size="small">删除</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<div style="float: right">
			<el-pagination
				v-model:current-page="params.current"
				:page-size="params.size"
				:small="true"
				layout="total, prev, pager, next"
				:total="total"
				@size-change="queryUser"
				@current-change="queryUser"
			/>
		</div>

		<el-dialog
			:title="editPageType == 1 ? '新增用户' : '修改用户'"
			v-model="isShowEdit"
			:close-on-click-modal="false"
			width="700px"
			destroy-on-close
			@close="closeUser"
		>
			<el-form ref="userFormRef" :model="userForm" :rules="userRules" size="large">
				<el-form-item prop="account" label="账号">
					<el-input v-model="userForm.account" placeholder="账号"></el-input>
				</el-form-item>
				<el-form-item prop="name" label="姓名">
					<el-input v-model="userForm.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input
						type="password"
						v-model="userForm.password"
						placeholder="8位以上的数字/字母组成"
						show-password
						autocomplete="new-password"
					>
					</el-input>
				</el-form-item>
				<el-form-item prop="phone" label="电话">
					<el-input v-model="userForm.phone" placeholder="电话"></el-input>
				</el-form-item>
				<el-form-item prop="email" label="电子邮箱">
					<el-input v-model="userForm.email" placeholder="电子邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="dId" label="部门">
					<el-input v-model="userForm.dId"></el-input>
				</el-form-item>
				<el-form-item prop="rId" label="角色">
					<el-input v-model="userForm.rId"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeUser">取消</el-button>
					<el-button type="primary" @click="userConfirm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="user">
import { reactive, ref, onMounted } from "vue";
import { userList, userAdd, userUpdate, userDelete } from "@/api/user";
import Search from "@/views/user/search.vue";

//页面加载完成
onMounted(async () => {
	queryUser();
});

//搜索
const onSearch = p => {
	Object.assign(params, p);
	queryUser();
};

//查询列表数据
const params = reactive({
	current: 1,
	size: 10
});
const tableData = ref([]);
const total = ref(0);
const queryUser = async () => {
	const { data } = await userList(params);
	if (data.code == 1) {
		total.value = data.data.total;
		tableData.value = data.data.records;
	} else {
		ElMessage({
			message: data.message,
			type: "warning"
		});
	}
};

//打开权限配置
const onOpenMenu = () => {
	console.log("===");
};

// 定义 formRef（校验规则）
const userFormRef = ref();
const userRules = reactive({
	account: [{ required: true, message: "请输入账号", trigger: "blur" }],
	name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

let userForm = reactive({ account: "", password: "" });

//编辑页面类型
const editPageType = ref(1); //1 新增  2修改
//打开新增页面
const onAdd = () => {
	isShowEdit.value = true;
	editPageType.value = 1;
};

//打开修改页面
const isShowEdit = ref(false);
const openUpdate = row => {
	userForm = Object.assign(userForm, row);
	isShowEdit.value = true;
	editPageType.value = 2;
};
//关闭修改页面
const closeUser = () => {
	isShowEdit.value = false;
	userFormRef.value.resetFields();

	Object.keys(userForm).forEach(v => {
		delete userForm[v];
	});
};

//新增
const userConfirm = async () => {
	userFormRef.value.validate(async valid => {
		if (!valid) return;
		const { data } = editPageType.value == 1 ? await userAdd(userForm) : await userUpdate(userForm);
		if (data.code == 1) {
			closeUser();
			queryUser();
		} else {
			ElMessage({
				message: data.message,
				type: "warning"
			});
		}
	});
};

//删除
const deleteRow = async row => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data } = await userDelete({ uId: row.uId });
	if (data.code == 1) {
		ElMessage({
			message: data.message,
			type: "success"
		});
		queryUser();
	} else {
		ElMessage({
			message: data.message,
			type: "warning"
		});
	}
};
</script>
