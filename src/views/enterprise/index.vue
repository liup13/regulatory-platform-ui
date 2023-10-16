<template>
	<div id="table">
		<div style="display: flex">
			<search @onSearch="onSearch" />
			<el-button type="primary" @click="onAdd">新增</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="enterpriseName" label="企业名" />
			<el-table-column prop="enTypeName" label="类型名称" />
			<el-table-column prop="address" label="地址" />
			<el-table-column prop="remarks" label="备注" />
			<el-table-column label="操作" width="260" fixed="right">
				<template #default="scope">
					<el-button size="small" @click="openUpdate(scope.row)">修改</el-button>
					<el-popconfirm title="你确定要删除该企业吗?" @confirm="deleteRow(scope.row)">
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
				@size-change="queryenterprise"
				@current-change="queryenterprise"
			/>
		</div>

		<el-dialog
			:title="editPageType == 1 ? '新增企业' : '修改企业'"
			v-model="isShowEdit"
			:close-on-click-modal="false"
			width="700px"
			destroy-on-close
			@close="closeenterprise"
		>
			<el-form ref="enterpriseFormRef" :model="enterpriseForm" :rules="enterpriseRules" size="large">
				<el-form-item prop="enterpriseName" label="企业名称">
					<el-input v-model="enterpriseForm.enterpriseName" placeholder="企业名称"></el-input>
				</el-form-item>
				<el-form-item prop="eyId" label="企业类型">
					<el-select v-model="enterpriseForm.eyId">
						<el-option v-for="e in enterpriseType" :value="e.eyId" :label="e.enTypeName" :key="e.eyId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="address" label="地址">
					<el-input v-model="enterpriseForm.address" placeholder="描述"> </el-input>
				</el-form-item>
				<el-form-item prop="remarks" label="备注">
					<el-input v-model="enterpriseForm.remarks" :rows="2" type="textarea" placeholder="描述"> </el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeenterprise">取消</el-button>
					<el-button type="primary" @click="enterpriseConfirm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="enterprise">
import { reactive, ref, onMounted } from "vue";
import { enterpriseList, enterpriseAdd, enterpriseUpdate, enterpriseDelete } from "@/api/enterprise";
import { enterpriseTypeList } from "@/api/enterpriseType";
import Search from "@/views/enterprise/search.vue";

//页面加载完成
onMounted(async () => {
	queryenterprise();
	queryenterpriseType();
});

//搜索
const onSearch = p => {
	Object.assign(params, p);
	queryenterprise();
};

//查询列表数据
const params = reactive({
	current: 1,
	size: 10
});
const tableData = ref([]);
const total = ref(0);
const queryenterprise = async () => {
	const { data } = await enterpriseList(params);
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

const enterpriseType = ref([]);
const queryenterpriseType = async () => {
	const { data } = await enterpriseTypeList({
		current: 1,
		size: 100
	});
	enterpriseType.value = data.data.records;
};
// 定义 formRef（校验规则）
const enterpriseFormRef = ref();
const enterpriseRules = reactive({
	enterpriseName: [{ required: true, message: "请输入企业名", trigger: "blur" }],
	eyId: [{ required: true, message: "请选择企业类型", trigger: "change" }]
});

let enterpriseForm = reactive({ account: "", eyId: "" });

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
	enterpriseForm = Object.assign(enterpriseForm, row);
	isShowEdit.value = true;
	editPageType.value = 2;
};
//关闭修改页面
const closeenterprise = () => {
	isShowEdit.value = false;
	enterpriseFormRef.value.resetFields();

	Object.keys(enterpriseForm).forEach(v => {
		delete enterpriseForm[v];
	});
};

//新增
const enterpriseConfirm = async () => {
	enterpriseFormRef.value.validate(async valid => {
		if (!valid) return;
		const { data } = editPageType.value == 1 ? await enterpriseAdd(enterpriseForm) : await enterpriseUpdate(enterpriseForm);
		if (data.code == 1) {
			closeenterprise();
			queryenterprise();
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
	const { data } = await enterpriseDelete({ eId: row.eId });
	if (data.code == 1) {
		ElMessage({
			message: data.message,
			type: "success"
		});
		queryenterprise();
	} else {
		ElMessage({
			message: data.message,
			type: "warning"
		});
	}
};
</script>
