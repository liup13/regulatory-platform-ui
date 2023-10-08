import service from "@/utils/service.js";

export const deptList = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/department/query",
		params: data
	});
};

export const deptAdd = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/department/add",
		data: data
	});
};

export const deptUpdate = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/department/update",
		data: data
	});
};

export const deptDelete = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/department/delete",
		params: data
	});
};
