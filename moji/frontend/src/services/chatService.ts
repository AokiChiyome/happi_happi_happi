import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";

export const chatService = {
  async fetchConversations(): Promise<ConversationResponse> {
    const res = await api.get("/conversations");
    return res.data;
  },

  async fetchMessages(
    conversationId: string,
    limit = 50,
    cursor?: string
  ): Promise<{ messages: Message[]; nextCursor: string | null }> {
    const params: Record<string, any> = { limit };
    if (cursor) params.cursor = cursor;
    const res = await api.get(`/conversations/${conversationId}/messages`, {
      params,
    });
    return res.data;
  },

  async sendDirectMessage(
    recipientId?: string,
    content?: string,
    conversationId?: string
  ): Promise<{ message: Message }> {
    const res = await api.post("/messages/direct", {
      recipientId,
      content,
      conversationId,
    });
    return res.data;
  },

  async sendGroupMessage(
    conversationId: string,
    content: string
  ): Promise<{ message: Message }> {
    const res = await api.post("/messages/group", {
      conversationId,
      content,
    });
    return res.data;
  },

  async createConversation(
    type: "direct" | "group",
    name?: string,
    memberIds?: string[]
  ) {
    const res = await api.post("/conversations", {
      type,
      name,
      memberIds,
    });
    return res.data;
  },

  async markAsSeen(conversationId: string) {
    const res = await api.patch(`/conversations/${conversationId}/seen`);
    return res.data;
  },

  async fetchFriends() {
    const res = await api.get("/friends");
    return res.data;
  },

  async fetchFriendRequests() {
    const res = await api.get("/friends/requests");
    return res.data;
  },

  async sendFriendRequest(to: string, message?: string) {
    const res = await api.post("/friends/requests", { to, message });
    return res.data;
  },

  async acceptFriendRequest(requestId: string) {
    const res = await api.post(`/friends/requests/${requestId}/accept`);
    return res.data;
  },

  async declineFriendRequest(requestId: string) {
    const res = await api.post(`/friends/requests/${requestId}/decline`);
    return res.data;
  },

  async shareFoodDish(
    dishName: string,
    categoryName: string,
    conversationId: string,
    note?: string
  ) {
    const res = await api.post("/couple/share-dish", {
      dishName,
      categoryName,
      conversationId,
      note,
    });
    return res.data;
  },
};
