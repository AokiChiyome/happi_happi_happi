import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const getApiBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    const customUrl = localStorage.getItem("happi_custom_api_url");
    if (customUrl) return customUrl.replace(/\/$/, "");

    // Nếu đang chạy trong môi trường App Native APK (Capacitor)
    const isNative =
      (window as any).Capacitor !== undefined ||
      window.location.protocol === "capacitor:" ||
      window.location.hostname === "localhost" && !window.location.port;

    if (isNative) {
      return (
        import.meta.env.VITE_API_URL ||
        "http://192.168.101.133:5001/api"
      );
    }
  }

  return (
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api")
  );
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

// Luôn cập nhật baseURL động theo cấu hình môi trường
api.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Tự động refresh token khi token hết hạn
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      originalRequest.url?.includes("/auth/signin") ||
      originalRequest.url?.includes("/auth/signup") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }
    originalRequest._retryCount = originalRequest._retryCount || 0;
    const status = error.response?.status;
    if ((status === 403 || status === 401) && originalRequest._retryCount < 3) {
      originalRequest._retryCount += 1;
      try {
        const res = await api.post("/auth/refresh", {}, { withCredentials: true });
        const newAccessToken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearState();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
