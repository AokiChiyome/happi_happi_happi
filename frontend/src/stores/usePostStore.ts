import { create } from "zustand";
import { postService, type CreatePostData } from "@/services/postService";
import type { Post, Comment, Reaction } from "@/types/post";
import { toast } from "sonner";

interface PostState {
  posts: Post[];
  partner: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  } | null;
  hasPartner: boolean;
  loading: boolean;
  submitting: boolean;
  postComments: Record<string, Comment[]>;
  loadingComments: Record<string, boolean>;

  fetchFeed: () => Promise<void>;
  createPost: (data: CreatePostData) => Promise<boolean>;
  toggleReaction: (
    postId: string,
    type: "love" | "heart" | "yummy" | "sad" | "like"
  ) => Promise<void>;
  deletePost: (postId: string) => Promise<boolean>;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<boolean>;
  handleSseEvent: (payload: any) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  partner: null,
  hasPartner: false,
  loading: false,
  submitting: false,
  postComments: {},
  loadingComments: {},

  fetchFeed: async () => {
    try {
      set({ loading: true });
      const res = await postService.fetchFeed();
      set({
        posts: res.posts || [],
        partner: res.partner || null,
        hasPartner: res.hasPartner,
        loading: false,
      });
    } catch (error: any) {
      console.error("Lỗi khi tải bảng tin:", error);
      set({ loading: false });
    }
  },

  createPost: async (data: CreatePostData) => {
    try {
      set({ submitting: true });
      const res = await postService.createPost(data);
      if (res?.post) {
        // Optimistic / direct addition if not already added by SSE
        set((state) => {
          const exists = state.posts.some((p) => p._id === res.post._id);
          return {
            posts: exists ? state.posts : [res.post, ...state.posts],
            submitting: false,
          };
        });
        toast.success(res.message || "Đã đăng khoảnh khắc mới! 💕");
        return true;
      }
      set({ submitting: false });
      return false;
    } catch (error: any) {
      console.error("Lỗi khi đăng bài:", error);
      set({ submitting: false });
      toast.error(error.response?.data?.message || "Không thể đăng bài");
      return false;
    }
  },

  toggleReaction: async (
    postId: string,
    type: "love" | "heart" | "yummy" | "sad" | "like"
  ) => {
    try {
      const res = await postService.toggleReaction(postId, type);
      if (res?.reactions) {
        set((state) => ({
          posts: state.posts.map((p) =>
            p._id === postId ? { ...p, reactions: res.reactions } : p
          ),
        }));
      }
    } catch (error: any) {
      console.error("Lỗi khi tương tác:", error);
      toast.error(error.response?.data?.message || "Lỗi khi thả cảm xúc");
    }
  },

  deletePost: async (postId: string) => {
    try {
      await postService.deletePost(postId);
      set((state) => ({
        posts: state.posts.filter((p) => p._id !== postId),
      }));
      toast.success("Đã xóa bài viết!");
      return true;
    } catch (error: any) {
      console.error("Lỗi khi xóa bài:", error);
      toast.error(error.response?.data?.message || "Không thể xóa bài");
      return false;
    }
  },

  fetchComments: async (postId: string) => {
    try {
      set((state) => ({
        loadingComments: { ...state.loadingComments, [postId]: true },
      }));
      const res = await postService.fetchComments(postId);
      set((state) => ({
        postComments: { ...state.postComments, [postId]: res.comments || [] },
        loadingComments: { ...state.loadingComments, [postId]: false },
      }));
    } catch (error: any) {
      console.error("Lỗi khi tải bình luận:", error);
      set((state) => ({
        loadingComments: { ...state.loadingComments, [postId]: false },
      }));
    }
  },

  addComment: async (postId: string, content: string) => {
    try {
      const res = await postService.createComment(postId, content);
      if (res?.comment) {
        set((state) => {
          const currentComments = state.postComments[postId] || [];
          const exists = currentComments.some((c) => c._id === res.comment._id);
          const updatedComments = exists
            ? currentComments
            : [...currentComments, res.comment];

          return {
            postComments: {
              ...state.postComments,
              [postId]: updatedComments,
            },
            posts: state.posts.map((p) =>
              p._id === postId
                ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
                : p
            ),
          };
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Lỗi khi bình luận:", error);
      toast.error(error.response?.data?.message || "Không thể gửi bình luận");
      return false;
    }
  },

  handleSseEvent: (payload: any) => {
    if (!payload || !payload.type) return;

    if (payload.type === "new_post" && payload.post) {
      const newPost: Post = payload.post;
      set((state) => {
        const exists = state.posts.some((p) => p._id === newPost._id);
        if (exists) return state;
        return {
          posts: [newPost, ...state.posts],
        };
      });
    }

    if (payload.type === "post_reaction" && payload.postId) {
      const { postId, reactions } = payload;
      set((state) => ({
        posts: state.posts.map((p) =>
          p._id === postId ? { ...p, reactions } : p
        ),
      }));
    }

    if (payload.type === "new_comment" && payload.postId && payload.comment) {
      const { postId, comment, commentsCount } = payload;
      set((state) => {
        const existingList = state.postComments[postId] || [];
        const exists = existingList.some((c) => c._id === comment._id);
        const updatedList = exists ? existingList : [...existingList, comment];

        return {
          postComments: {
            ...state.postComments,
            [postId]: updatedList,
          },
          posts: state.posts.map((p) =>
            p._id === postId
              ? {
                  ...p,
                  commentsCount:
                    typeof commentsCount === "number"
                      ? commentsCount
                      : (p.commentsCount || 0) + 1,
                }
              : p
          ),
        };
      });
    }

    if (payload.type === "delete_post" && payload.postId) {
      const { postId } = payload;
      set((state) => ({
        posts: state.posts.filter((p) => p._id !== postId),
      }));
    }
  },
}));
