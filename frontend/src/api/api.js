import axios from "axios";

const apiBaseUrl =
  import.meta.env.MODE === "mock"
    ? "" // ✅ mock 模式下用相對路徑，讓 msw 攔截
    : import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_PROD_API_URL;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false, // 如果之後需要 cookie 攜帶可改 true
});

// ✅ Request Interceptor （可加入 token）
api.interceptors.request.use(
  (config) => {
    // Example: 加入 JWT Token
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor （統一錯誤訊息格式）
api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(
      err.response?.data?.detail || err.response?.data || err.message
    );
  }
);
