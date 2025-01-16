import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axiosInstance.post("/auth/signup", { name, email, password });
			set({ user: res.data, loading: false });
            console.log("respone data check",res.data)
		} catch (error) {
			set({ loading: false });
			toast.error(error.message || "An error occurred");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axiosInstance.post("/auth/login", { email, password });

			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error?.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axiosInstance.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axiosInstance.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));


// Axios interceptor for token refresh
let refreshPromise = null;

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axiosInstance(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);