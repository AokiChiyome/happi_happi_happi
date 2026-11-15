import api from "@/lib/axios";
import type { Post, Comment, Reaction } from "@/types/post";

export interface FeedResponse {
  hasPartner: boolean;
  partner?: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  stories?: Post[];
  posts: Post[];
  message?: string;
}

export interface CreatePostData {
  content: string;
  images?: string[];
  foodDish?: {
    name: string;
    category: string;
    emoji: string;
  };
  feeling?: string;
  isStory?: boolean;
}

export const postService = {
  async fetchFeed(): Promise<FeedResponse> {
    const res = await api.get("/posts/feed");
    return res.data;
  },

  async createPost(data: CreatePostData): Promise<{ message: string; post: Post }> {
    const res = await api.post("/posts", data);
    return res.data;
  },

  async toggleReaction(
    postId: string,
    type: "love" | "heart" | "yummy" | "sad" | "like"
  ): Promise<{ message: string; reactions: Reaction[] }> {
    const res = await api.post(`/posts/${postId}/reactions`, { type });
    return res.data;
  },

  async fetchComments(postId: string): Promise<{ comments: Comment[] }> {
    const res = await api.get(`/posts/${postId}/comments`);
    return res.data;
  },

  async createComment(
    postId: string,
    content: string
  ): Promise<{ message: string; comment: Comment }> {
    const res = await api.post(`/posts/${postId}/comments`, { content });
    return res.data;
  },

  async deletePost(postId: string): Promise<{ message: string }> {
    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  },
};
