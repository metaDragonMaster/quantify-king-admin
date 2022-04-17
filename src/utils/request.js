import axios from 'axios'
const service = axios.create({
	// baseURL: 'http://18.138.34.209:8301/',
	timeout: 5000, // request timeout
	headers:{
		"Content-Type":"application/json"
	},
})
// request interceptor
service.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)

// response interceptor
service.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return error.response.data
	}
)

export default service
