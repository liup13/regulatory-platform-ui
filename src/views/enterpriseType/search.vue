<template>
	<el-form :inline="true" :model="params" class="demo-form-inline">
		<el-form-item label="账号">
			<el-input v-model="params.account" placeholder="账号" clearable />
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="params.name" placeholder="姓名" clearable />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">查询</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { reactive, defineEmits } from "vue";
const params = reactive({});
const emits = defineEmits(["onSearch"]);
const onSubmit = () => {
	emits("onSearch", params);
};
</script>
