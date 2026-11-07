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
      signUp: async (username, password, email, firstName, lastName, displayName) => {
        try {
          set({ loading: true });
          await authService.signUp(
            username,
            password,
            email || `${username}@happi.chat`,
            firstName || "",
            lastName || "",
            displayName || username
          );

          toast.success(
            "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ 💕"
          );
        } catch (error: any) {
          console.error(error);
          toast.error(error.response?.data?.message || "Đăng ký không thành công");
        } finally {
          set({ loading: false });
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
          await useChatStore.getState().fetchConversations();
          await useChatStore.getState().fetchFriends();
          useChatStore.getState().initRealtimeStream();
          toast.success("Chào mừng bạn đã quay lại với Moji! 💖");
        } catch (error: any) {
          console.error(error);
          toast.error(error.response?.data?.message || "Đăng nhập không thành công");
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
          toast.error("Lỗi đăng xuất hãy thử lại");
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
          useChatStore.getState().initRealtimeStream();
        } catch (error) {
          console.error(error);
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
