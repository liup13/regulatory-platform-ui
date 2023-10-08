import service from "@/utils/service.js";

export const roleList = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/sRole/query",
		params: data
	});
};

export const roleAdd = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/sRole/add",
		data: data
	});
};

export const roleUpdate = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/sRole/update",
		data: data
	});
};

export const roleDelete = data => {
	return service({
		method: "GET",
		url: "/zhongxun/api/sRole/delete",
		params: data
	});
};
