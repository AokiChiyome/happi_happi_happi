import { create } from "zustand";
import { bookmarkService } from "@/services/bookmarkService";
import type { Bookmark, CreateBookmarkData } from "@/types/bookmark";
import { toast } from "sonner";

interface BookmarkState {
  bookmarks: Bookmark[];
  loading: boolean;
  isOpen: boolean;

  setOpen: (open: boolean) => void;
  fetchBookmarks: () => Promise<void>;
  addBookmark: (data: CreateBookmarkData) => Promise<boolean>;
  removeBookmark: (bookmarkId: string) => Promise<boolean>;
  isBookmarked: (targetId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  loading: false,
  isOpen: false,

  setOpen: (open: boolean) => set({ isOpen: open }),

  fetchBookmarks: async () => {
    try {
      set({ loading: true });
      const res = await bookmarkService.getBookmarks();
      set({ bookmarks: res.bookmarks || [], loading: false });
    } catch (error) {
      console.error("Lỗi khi tải sổ tay:", error);
      set({ loading: false });
    }
  },

  addBookmark: async (data: CreateBookmarkData) => {
    try {
      const res = await bookmarkService.createBookmark(data);
      if (res?.bookmark) {
        set((state) => {
          const exists = state.bookmarks.some((b) => b._id === res.bookmark._id);
          return {
            bookmarks: exists ? state.bookmarks : [res.bookmark, ...state.bookmarks],
          };
        });
        toast.success(res.message || "Đã lưu vào sổ tay yêu thích! ⭐");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể lưu vào sổ tay");
      return false;
    }
  },

  removeBookmark: async (bookmarkId: string) => {
    try {
      await bookmarkService.deleteBookmark(bookmarkId);
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b._id !== bookmarkId),
      }));
      toast.success("Đã xóa khỏi sổ tay!");
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể xóa");
      return false;
    }
  },

  isBookmarked: (targetId: string) => {
    return get().bookmarks.some((b) => b.targetId === targetId);
  },
}));
