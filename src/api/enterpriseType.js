import service from "@/utils/service.js";

export const enterpriseTypeList = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/enterpriseType/query",
		params: data
	});
};

export const enterpriseTypeAdd = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/enterpriseType/add",
		data: data
	});
};

export const enterpriseTypeUpdate = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/enterpriseType/update",
		data: data
	});
};

export const enterpriseTypeDelete = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/enterpriseType/delete",
		params: data
	});
};
