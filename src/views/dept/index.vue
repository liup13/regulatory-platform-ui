<template>
	<div id="table">
		<div style="display: flex">
			<search @onSearch="onSearch" />
			<el-button type="primary" @click="onAdd">新增</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="department" label="部门" />
			<el-table-column prop="dDescrible" label="描述" />
			<el-table-column prop="parentDepartmentObject" label="上级部门">
				<template #default="scope">
					<span>{{ scope.row.parentDepartmentObject ? scope.row.parentDepartmentObject.department : "" }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="260" fixed="right">
				<template #default="scope">
					<el-button size="small" @click="openUpdate(scope.row)">修改</el-button>
					<el-button size="small" @click="onOpenMenu(scope.row)">权限维护</el-button>
					<el-popconfirm title="你确定要删除该部门吗?" @confirm="deleteRow(scope.row)">
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
				@size-change="querydept"
				@current-change="querydept"
			/>
		</div>

		<el-dialog
			:title="editPageType == 1 ? '新增部门' : '修改部门'"
			v-model="isShowEdit"
			:close-on-click-modal="false"
			width="700px"
			destroy-on-close
			@close="closedept"
		>
			<el-form ref="deptFormRef" :model="deptForm" :rules="deptRules" size="large">
				<el-form-item prop="department" label="部门名称">
					<el-input v-model="deptForm.department" placeholder="部门名称"></el-input>
				</el-form-item>
				<el-form-item prop="parentDepartment" label="上级部门">
					<el-tree-select
						v-model="deptForm.parentDepartment"
						:data="tableData"
						check-strictly
						:props="{ value: 'dId', label: 'department' }"
						:render-after-expand="false"
					/>
					<el-input v-model="deptForm.parentDepartment" placeholder="上级部门"></el-input>
				</el-form-item>
				<el-form-item prop="dDescrible" label="描述">
					<el-input v-model="deptForm.password" :rows="2" type="textarea" placeholder="描述"> </el-input>
				</el-form-item>
				<el-form-item prop="remarks" label="备注">
					<el-input v-model="deptForm.phone" :rows="2" type="textarea" placeholder="备注"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closedept">取消</el-button>
					<el-button type="primary" @click="deptConfirm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="dept">
import { reactive, ref, onMounted } from "vue";
import { deptList, deptAdd, deptUpdate, deptDelete } from "@/api/dept";
import Search from "@/views/dept/search.vue";

//页面加载完成
onMounted(async () => {
	querydept();
});

//搜索
const onSearch = p => {
	Object.assign(params, p);
	querydept();
};

//查询列表数据
const params = reactive({
	current: 1,
	size: 10
});
const tableData = ref([]);
const total = ref(0);
const querydept = async () => {
	const { data } = await deptList(params);
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
const deptFormRef = ref();
const deptRules = reactive({
	account: [{ required: true, message: "请输入账号", trigger: "blur" }],
	name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

let deptForm = reactive({ account: "", password: "" });

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
	deptForm = Object.assign(deptForm, row);
	isShowEdit.value = true;
	editPageType.value = 2;
};
//关闭修改页面
const closedept = () => {
	isShowEdit.value = false;
	deptFormRef.value.resetFields();

	Object.keys(deptForm).forEach(v => {
		delete deptForm[v];
	});
};

//新增
const deptConfirm = async () => {
	deptFormRef.value.validate(async valid => {
		if (!valid) return;
		const { data } = editPageType.value == 1 ? await deptAdd(deptForm) : await deptUpdate(deptForm);
		if (data.code == 1) {
			closedept();
			querydept();
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
	const { data } = await deptDelete({ uId: row.uId });
	if (data.code == 1) {
		ElMessage({
			message: data.message,
			type: "success"
		});
		querydept();
	} else {
		ElMessage({
			message: data.message,
			type: "warning"
		});
	}
};
</script>
