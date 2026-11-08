import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/store";
import type { Message } from "@/types/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";

let sseConnection: EventSource | null = null;

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      friends: [],
      friendRequests: { sent: [], received: [] },
      isFoodRouletteOpen: false,
      loading: false,

      setActiveConversation: (id) => {
        set({ activeConversationId: id });
        if (id) {
          get().fetchMessages(id);
          get().markConversationAsSeen(id);
        }
      },

      setFoodRouletteOpen: (open) => set({ isFoodRouletteOpen: open }),

      reset: () => {
        if (sseConnection) {
          sseConnection.close();
          sseConnection = null;
        }
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          friends: [],
          friendRequests: { sent: [], received: [] },
          isFoodRouletteOpen: false,
          loading: false,
        });
      },

      fetchConversations: async () => {
        try {
          set({ loading: true });
          const { conversations } = await chatService.fetchConversations();
          set({ conversations, loading: false });
        } catch (error) {
          console.error("Lỗi khi tải danh sách cuộc trò chuyện", error);
          set({ loading: false });
        }
      },

      fetchMessages: async (conversationId: string) => {
        try {
          const { messages, nextCursor } =
            await chatService.fetchMessages(conversationId);
          set((state) => ({
            messages: {
              ...state.messages,
              [conversationId]: {
                items: messages,
                hasMore: Boolean(nextCursor),
                nextCursor,
              },
            },
          }));
        } catch (error) {
          console.error("Lỗi khi tải tin nhắn", error);
        }
      },

      sendMessage: async (content: string, recipientId?: string) => {
        const { activeConversationId, conversations } = get();
        if (!activeConversationId && !recipientId) return;

        const activeConvo = conversations.find(
          (c) => c._id === activeConversationId
        );

        try {
          let res: { message: Message };
          if (activeConvo?.type === "group" && activeConversationId) {
            res = await chatService.sendGroupMessage(
              activeConversationId,
              content
            );
          } else {
            res = await chatService.sendDirectMessage(
              recipientId,
              content,
              activeConversationId ?? undefined
            );
          }

          if (res?.message) {
            const msg = res.message;
            const targetConvoId = msg.conversationId;

            set((state) => {
              const prevItems = state.messages[targetConvoId]?.items || [];
              const exists = prevItems.some((m) => m._id === msg._id);
              const newItems = exists ? prevItems : [...prevItems, msg];

              const updatedConversations = state.conversations.map((c) =>
                c._id === targetConvoId
                  ? {
                      ...c,
                      lastMessage: {
                        _id: msg._id,
                        content: msg.content ?? "",
                        createdAt: msg.createdAt,
                      },
                      lastMessageAt: msg.createdAt,
                    }
                  : c
              );

              return {
                messages: {
                  ...state.messages,
                  [targetConvoId]: {
                    items: newItems,
                    hasMore: state.messages[targetConvoId]?.hasMore ?? false,
                    nextCursor:
                      state.messages[targetConvoId]?.nextCursor ?? null,
                  },
                },
                conversations: updatedConversations.sort(
                  (a, b) =>
                    new Date(b.lastMessageAt || b.createdAt || 0).getTime() -
                    new Date(a.lastMessageAt || a.createdAt || 0).getTime()
                ),
              };
            });
          }
        } catch (error) {
          console.error("Lỗi gửi tin nhắn", error);
          toast.error("Không thể gửi tin nhắn");
        }
      },

      sendFoodCard: async (dish: {
        name: string;
        category: string;
        emoji: string;
        note?: string;
      }) => {
        const { activeConversationId } = get();
        if (!activeConversationId) {
          toast.error("Vui lòng chọn một cuộc trò chuyện để gửi món ăn nhé!");
          return;
        }

        try {
          const res = await chatService.shareFoodDish(
            dish.name,
            dish.category,
            activeConversationId,
            dish.note || "Hôm nay chúng mình đi ăn món này nha! 🥰"
          );

          if (res?.message) {
            const msg: Message = res.message;
            set((state) => {
              const prevItems = state.messages[activeConversationId]?.items || [];
              return {
                messages: {
                  ...state.messages,
                  [activeConversationId]: {
                    items: [...prevItems, msg],
                    hasMore:
                      state.messages[activeConversationId]?.hasMore ?? false,
                    nextCursor:
                      state.messages[activeConversationId]?.nextCursor ?? null,
                  },
                },
              };
            });
            toast.success(`Đã rủ ăn "${dish.name}" vào đoạn chat! 💕`);
          }
        } catch (error) {
          console.error("Lỗi chia sẻ món ăn", error);
          toast.error("Không thể gửi gợi ý món ăn vào chat");
        }
      },

      markConversationAsSeen: async (conversationId: string) => {
        try {
          await chatService.markAsSeen(conversationId);
          const currentUserId = useAuthStore.getState().user?._id;
          if (!currentUserId) return;

          set((state) => ({
            conversations: state.conversations.map((c) =>
              c._id === conversationId
                ? {
                    ...c,
                    unreadCounts: {
                      ...c.unreadCounts,
                      [currentUserId]: 0,
                    },
                  }
                : c
            ),
          }));
        } catch (error) {
          console.error("Lỗi mark as seen", error);
        }
      },

      fetchFriends: async () => {
        try {
          const data = await chatService.fetchFriends();
          set({ friends: data.friends || [] });
        } catch (error) {
          console.error("Lỗi lấy danh sách bạn bè", error);
        }
      },

      fetchFriendRequests: async () => {
        try {
          const data = await chatService.fetchFriendRequests();
          set({
            friendRequests: {
              sent: data.sent || [],
              received: data.received || [],
            },
          });
        } catch (error) {
          console.error("Lỗi lấy danh sách lời mời kết bạn", error);
        }
      },

      sendFriendRequest: async (toUsername: string, message?: string) => {
        try {
          await chatService.sendFriendRequest(toUsername, message);
          toast.success("Đã gửi yêu cầu kết bạn!");
          get().fetchFriendRequests();
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Không thể gửi yêu cầu kết bạn"
          );
        }
      },

      acceptFriendRequest: async (requestId: string) => {
        try {
          await chatService.acceptFriendRequest(requestId);
          toast.success("Đã đồng ý kết bạn! Giờ có thể nhắn tin cho nhau 💕");
          get().fetchFriends();
          get().fetchFriendRequests();
          get().fetchConversations();
        } catch (error: any) {
          toast.error("Không thể đồng ý kết bạn");
        }
      },

      declineFriendRequest: async (requestId: string) => {
        try {
          await chatService.declineFriendRequest(requestId);
          toast.info("Đã từ chối lời mời kết bạn");
          get().fetchFriendRequests();
        } catch (error: any) {
          toast.error("Không thể từ chối lời mời");
        }
      },

      createGroupChat: async (name: string, memberIds: string[]) => {
        try {
          const data = await chatService.createConversation(
            "group",
            name,
            memberIds
          );
          if (data?.conversation) {
            toast.success(`Đã tạo nhóm "${name}" thành công!`);
            get().fetchConversations();
            get().setActiveConversation(data.conversation._id);
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Lỗi tạo nhóm");
        }
      },

      initRealtimeStream: () => {
        const { accessToken } = useAuthStore.getState();
        if (!accessToken) return;

        if (sseConnection) {
          sseConnection.close();
        }

        const baseUrl =
          import.meta.env.VITE_API_URL
            ? (import.meta.env.VITE_API_URL as string).replace(/\/api\/?$/, "")
            : import.meta.env.MODE === "development"
            ? "http://localhost:5001"
            : "";
        const streamUrl = `${baseUrl}/api/messages/stream?token=${accessToken}`;

        try {
          sseConnection = new EventSource(streamUrl);

          sseConnection.onmessage = (event) => {
            try {
              const payload = JSON.parse(event.data);
              if (payload.type === "message" && payload.message) {
                const msg: Message = payload.message;
                const convoId = msg.conversationId;
                const { activeConversationId, conversations } = get();
                const currentUserId = useAuthStore.getState().user?._id;

                set((state) => {
                  const prevItems = state.messages[convoId]?.items || [];
                  const exists = prevItems.some((m) => m._id === msg._id);
                  const updatedItems = exists ? prevItems : [...prevItems, msg];

                  const isCurrentActive = activeConversationId === convoId;
                  const isOwn = msg.senderId === currentUserId;

                  const updatedConvos = state.conversations.map((c) => {
                    if (c._id === convoId) {
                      const prevUnread = c.unreadCounts?.[currentUserId || ""] || 0;
                      return {
                        ...c,
                        lastMessage: {
                          _id: msg._id,
                          content: msg.content ?? "",
                          createdAt: msg.createdAt,
                        },
                        lastMessageAt: msg.createdAt,
                        unreadCounts: {
                          ...c.unreadCounts,
                          [currentUserId || ""]:
                            isCurrentActive || isOwn ? 0 : prevUnread + 1,
                        },
                      };
                    }
                    return c;
                  });

                  return {
                    messages: {
                      ...state.messages,
                      [convoId]: {
                        items: updatedItems,
                        hasMore: state.messages[convoId]?.hasMore ?? false,
                        nextCursor: state.messages[convoId]?.nextCursor ?? null,
                      },
                    },
                    conversations: updatedConvos.sort(
                      (a, b) =>
                        new Date(
                          b.lastMessageAt || b.createdAt || 0
                        ).getTime() -
                        new Date(
                          a.lastMessageAt || a.createdAt || 0
                        ).getTime()
                    ),
                  };
                });
              }
            } catch (err) {
              console.error("Lỗi phân tích cú pháp tin nhắn SSE:", err);
            }
          };

          sseConnection.onerror = () => {
            // Auto reconnects in browser
          };
        } catch (error) {
          console.error("Không thể khởi tạo SSE stream:", error);
        }
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ conversations: state.conversations }),
    }
  )
);
