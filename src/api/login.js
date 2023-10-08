import service from "@/utils/service.js";

export const routerList = () => {
	return service({
		method: "GET",
		url: "/router/list"
	});
};

export const pageLogin = data => {
	return service({
		method: "POST",
		url: "/zhongxun/api/sUser/login",
		data: data
	});
};

export const getAuthButton = () => {
	return service({
		method: "GET",
		url: "/auth/button"
	});
};
