import service from "@/utils/service.js";

export const enterpriseList = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/enterprise/query",
		params: data
	});
};

export const enterpriseAdd = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/enterprise/add",
		data: data
	});
};

export const enterpriseUpdate = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/enterprise/update",
		data: data
	});
};

export const enterpriseDelete = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/enterprise/delete",
		params: data
	});
};
