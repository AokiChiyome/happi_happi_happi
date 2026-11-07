import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService";
import type { AuthState } from "../types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.clear();
        useChatStore.getState().reset();
      },
      signUp: async (username, password, email, firstName, lastName) => {
        try {
          set({ loading: true });
          // gọi api
          await authService.signUp(
            username,
            password,
            email,
            firstName,
            lastName,
          );

          toast.success(
            "Đăng kí thành công! Bạn sẽ được chuyển sang trang đăng nhập.",
          );
        } catch (error) {
          console.error(error);
          toast.error("Đăng kí không thành công");
        }
      },
      signIn: async (username, password) => {
        try {
          set({ loading: true });
          localStorage.clear();
          useChatStore.getState().reset();
          const { accessToken } = await authService.signIn(username, password);
          get().setAccessToken(accessToken);
          await get().fetchMe();
          useChatStore.getState().fectConversations();
          toast.success("Chào mừng bạn đã quay lại với Moji!");
        } catch (error) {
          console.error(error);
          toast.error("Đăng nhập không thành công");
        } finally {
          set({ loading: false });
        }
      },
      signOut: async () => {
        try {
          get().clearState();
          await authService.signOut();

          toast.success("Đăng xuất thành công");
        } catch (error) {
          console.error(error);
          toast.error("lỗi đăng xuất hãy thử lại");
        }
      },
      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
        } catch (error) {
          console.error(error);
          set({ user: null, accessToken: null });
          toast.error("lỗi xảy ra khi lấy dữ liệu người dùng, hãy thử lại");
        } finally {
          set({ loading: false });
        }
      },
      refresh: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe, setAccessToken } = get();
          const accessToken = await authService.refresh();

          setAccessToken(accessToken);
          if (!user) {
            await fetchMe();
          }
        } catch (error) {
          console.error(error);
          toast.error("Phiên đã hết hạn, vui lòng đăng nhập lại");
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
