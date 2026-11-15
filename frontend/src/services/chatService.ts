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
    conversationId?: string,
    imgURL?: string,
    replyTo?: {
      messageId: string;
      senderName?: string;
      content?: string | null;
      imgURL?: string | null;
    },
    audioURL?: string,
    audioDuration?: number
  ): Promise<{ message: Message }> {
    const res = await api.post("/messages/direct", {
      recipientId,
      content,
      conversationId,
      imgURL,
      replyTo,
      audioURL,
      audioDuration,
    });
    return res.data;
  },

  async sendGroupMessage(
    conversationId: string,
    content?: string,
    imgURL?: string,
    replyTo?: {
      messageId: string;
      senderName?: string;
      content?: string | null;
      imgURL?: string | null;
    },
    audioURL?: string,
    audioDuration?: number
  ): Promise<{ message: Message }> {
    const res = await api.post("/messages/group", {
      conversationId,
      content,
      imgURL,
      replyTo,
      audioURL,
      audioDuration,
    });
    return res.data;
  },

  async pinMessage(conversationId: string, messageId: string) {
    const res = await api.post(`/conversations/${conversationId}/pin`, { messageId });
    return res.data;
  },

  async unpinMessage(conversationId: string) {
    const res = await api.delete(`/conversations/${conversationId}/pin`);
    return res.data;
  },

  async toggleMessageReaction(
    messageId: string,
    emoji: string
  ): Promise<{ messageId: string; reactions: any[] }> {
    const res = await api.post(`/messages/${messageId}/reaction`, { emoji });
    return res.data;
  },

  async recallMessage(
    messageId: string
  ): Promise<{ messageId: string; isRecalled: boolean; recalledAt: string }> {
    const res = await api.patch(`/messages/${messageId}/recall`);
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

  async setTyping(conversationId: string, isTyping: boolean) {
    try {
      await api.post("/messages/typing", { conversationId, isTyping });
    } catch (e) {}
  },
};
