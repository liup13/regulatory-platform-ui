import axios from "axios";
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();

const service = axios.create({
	baseURL: process.env.NODE_ENV === "development" ? "/api" : process.env.VUE_APP_BASE_API,
	timeout: 5000,
	headers: {
		accessToken: globalStore.token
	}
});
service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
	res => {
		return res;
	},
	error => {
		return Promise.reject(error);
	}
);

export default service;
