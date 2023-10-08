import service from "@/utils/service.js";

export const userList = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/sUser/query",
		params: data
	});
};

export const userAdd = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/sUser/add",
		data: data
	});
};

export const userUpdate = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/sUser/update",
		data: data
	});
};

export const userDelete = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/sUser/delete",
		params: data
	});
};
