import api from "@/lib/axios";
import type { Bookmark, CreateBookmarkData } from "@/types/bookmark";

export const bookmarkService = {
  async getBookmarks(): Promise<{ bookmarks: Bookmark[] }> {
    const res = await api.get("/bookmarks");
    return res.data;
  },

  async createBookmark(
    data: CreateBookmarkData
  ): Promise<{ message: string; bookmark: Bookmark; alreadySaved?: boolean }> {
    const res = await api.post("/bookmarks", data);
    return res.data;
  },

  async deleteBookmark(bookmarkId: string): Promise<{ message: string }> {
    const res = await api.delete(`/bookmarks/${bookmarkId}`);
    return res.data;
  },
};
