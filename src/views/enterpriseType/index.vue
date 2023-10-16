<template>
	<div id="table">
		<div style="display: flex">
			<search @onSearch="onSearch" />
			<el-button type="primary" @click="onAdd">新增</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="enTypeName" label="企业类型名" />
			<el-table-column prop="code" label="编码" />
			<el-table-column prop="remarks" label="备注" />
			<el-table-column label="操作" width="260" fixed="right">
				<template #default="scope">
					<el-button size="small" @click="openUpdate(scope.row)">修改</el-button>
					<el-popconfirm title="你确定要删除该企业类型吗?" @confirm="deleteRow(scope.row)">
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
				@size-change="queryEnterpriseType"
				@current-change="queryEnterpriseType"
			/>
		</div>

		<el-dialog
			:title="editPageType == 1 ? '新增企业类型' : '修改企业类型'"
			v-model="isShowEdit"
			:close-on-click-modal="false"
			width="700px"
			destroy-on-close
			@close="closerole"
		>
			<el-form ref="enterpriseTypeFormRef" :model="roleForm" :rules="enterpriseTypeRules" size="large">
				<el-form-item prop="enTypeName" label="企业类型名称">
					<el-input v-model="roleForm.enTypeName" placeholder="企业类型名称"></el-input>
				</el-form-item>
				<el-form-item prop="code" label="编码">
					<el-input v-model="roleForm.code" placeholder="编码"></el-input>
				</el-form-item>
				<el-form-item prop="remarks" label="备注">
					<el-input v-model="roleForm.remarks" :rows="2" type="textarea" placeholder="描述"> </el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closerole">取消</el-button>
					<el-button type="primary" @click="roleConfirm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="enterpriseType">
import { reactive, ref, onMounted } from "vue";
import { enterpriseTypeList, enterpriseTypeAdd, enterpriseTypeUpdate, enterpriseTypeDelete } from "@/api/enterpriseType";
import Search from "@/views/enterpriseType/search.vue";

//页面加载完成
onMounted(async () => {
	queryEnterpriseType();
});

//搜索
const onSearch = p => {
	Object.assign(params, p);
	queryEnterpriseType();
};

//查询列表数据
const params = reactive({
	current: 1,
	size: 10
});
const tableData = ref([]);
const total = ref(0);
const queryEnterpriseType = async () => {
	const { data } = await enterpriseTypeList(params);
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

// 定义 formRef（校验规则）
const enterpriseTypeFormRef = ref();
const enterpriseTypeRules = reactive({
	enTypeName: [{ required: true, message: "请输入企业类型", trigger: "blur" }]
});

let roleForm = reactive({});

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
	roleForm = Object.assign(roleForm, row);
	isShowEdit.value = true;
	editPageType.value = 2;
};
//关闭修改页面
const closerole = () => {
	isShowEdit.value = false;
	enterpriseTypeFormRef.value.resetFields();

	Object.keys(roleForm).forEach(v => {
		delete roleForm[v];
	});
};

//新增
const roleConfirm = async () => {
	enterpriseTypeFormRef.value.validate(async valid => {
		if (!valid) return;
		const { data } = editPageType.value == 1 ? await enterpriseTypeAdd(roleForm) : await enterpriseTypeUpdate(roleForm);
		if (data.code == 1) {
			closerole();
			queryEnterpriseType();
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
	const { data } = await enterpriseTypeDelete({ eyId: row.eyId });
	if (data.code == 1) {
		ElMessage({
			message: data.message,
			type: "success"
		});
		queryEnterpriseType();
	} else {
		ElMessage({
			message: data.message,
			type: "warning"
		});
	}
};
</script>
