import { create } from "zustand";
import { notificationSound } from "@/utils/soundHelper";

export interface MessageBubble {
  id: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  conversationId: string;
  timestamp: Date;
}

interface NotificationState {
  activeBubble: MessageBubble | null;
  isBubbleVisible: boolean;
  isChatHeadVisible: boolean;
  unreadCount: number;
  isMiniChatOpen: boolean;
  soundEnabled: boolean;
  bubbleTimeout: any;

  showBubble: (data: {
    senderName: string;
    senderAvatar?: string;
    content: string;
    conversationId: string;
  }) => void;
  dismissBubble: () => void;
  hideChatHead: () => void;
  setMiniChatOpen: (open: boolean) => void;
  toggleMiniChat: () => void;
  toggleSound: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  activeBubble: null,
  isBubbleVisible: false,
  isChatHeadVisible: false,
  unreadCount: 0,
  isMiniChatOpen: false,
  soundEnabled: true,
  bubbleTimeout: null,

  showBubble: (data) => {
    const { soundEnabled, bubbleTimeout, unreadCount } = get();

    if (soundEnabled) {
      notificationSound.playPop();
    }

    if (bubbleTimeout) {
      clearTimeout(bubbleTimeout);
    }

    const newBubble: MessageBubble = {
      id: Date.now().toString(),
      senderName: data.senderName,
      senderAvatar: data.senderAvatar,
      content: data.content,
      conversationId: data.conversationId,
      timestamp: new Date(),
    };

    // Auto dismiss speech bubble after 6.5s (Chat Head remains visible)
    const timeout = setTimeout(() => {
      set({ isBubbleVisible: false });
    }, 6500);

    set({
      activeBubble: newBubble,
      isBubbleVisible: true,
      isChatHeadVisible: true,
      unreadCount: unreadCount + 1,
      bubbleTimeout: timeout,
    });

    // Native browser push notification if permitted and tab hidden
    try {
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.hidden
      ) {
        new Notification(data.senderName, {
          body: data.content,
          icon: data.senderAvatar || "/logo.svg",
        });
      }
    } catch (e) {}
  },

  dismissBubble: () => {
    const { bubbleTimeout } = get();
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    set({ isBubbleVisible: false });
  },

  hideChatHead: () => {
    const { bubbleTimeout } = get();
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    set({
      isBubbleVisible: false,
      isChatHeadVisible: false,
      isMiniChatOpen: false,
      unreadCount: 0,
    });
  },

  setMiniChatOpen: (open) => {
    set({
      isMiniChatOpen: open,
      isBubbleVisible: false,
      unreadCount: open ? 0 : get().unreadCount,
    });
  },

  toggleMiniChat: () => {
    const nextState = !get().isMiniChatOpen;
    set({
      isMiniChatOpen: nextState,
      isBubbleVisible: false,
      unreadCount: nextState ? 0 : get().unreadCount,
    });
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },
}));
