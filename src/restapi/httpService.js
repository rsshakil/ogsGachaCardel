import axios from "axios";

//Create axios instance
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL??'https://rmam9v5a55.execute-api.ap-northeast-1.amazonaws.com'}/${process.env.REACT_APP_ENVIRONMENT??'develop'}`,
    timeout: 120000, // 120 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : ''; 
    return config;
});

// eslint-disable-next-line
export default {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
};