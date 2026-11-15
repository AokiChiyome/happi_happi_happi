import { create } from "zustand";
import { notificationSound } from "@/utils/soundHelper";
import { triggerHaptic } from "@/utils/haptics";

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
  showChatHead: () => void;
  hideChatHead: () => void;
  toggleChatHead: () => void;
  setMiniChatOpen: (open: boolean) => void;
  toggleMiniChat: () => void;
  toggleSound: () => void;
  requestPermission: () => Promise<boolean>;
  triggerSampleNotification: (sampleSender?: string, sampleContent?: string) => Promise<void>;
}

// Lưu trạng thái bật/tắt bong bóng chat của người dùng vào localStorage
const getSavedChatHeadState = (): boolean => {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("happi_chat_head_enabled");
  return saved === null ? true : saved === "true";
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  activeBubble: null,
  isBubbleVisible: false,
  isChatHeadVisible: getSavedChatHeadState(),
  unreadCount: 0,
  isMiniChatOpen: false,
  soundEnabled: true,
  bubbleTimeout: null,

  showBubble: (data) => {
    const { soundEnabled, bubbleTimeout, unreadCount } = get();

    if (soundEnabled) {
      notificationSound.playPop();
    }
    triggerHaptic("light");

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

    // Tự động thu gọn thẻ xem trước sau 6.5s (Bong bóng tròn vẫn tồn tại)
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

    // Thông báo trình duyệt (Browser Push Notification)
    try {
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
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

  showChatHead: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("happi_chat_head_enabled", "true");
    }
    set({ isChatHeadVisible: true });
  },

  hideChatHead: () => {
    const { bubbleTimeout } = get();
    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    if (typeof window !== "undefined") {
      localStorage.setItem("happi_chat_head_enabled", "false");
    }
    set({
      isBubbleVisible: false,
      isChatHeadVisible: false,
      isMiniChatOpen: false,
      unreadCount: 0,
    });
  },

  toggleChatHead: () => {
    const nextState = !get().isChatHeadVisible;
    if (typeof window !== "undefined") {
      localStorage.setItem("happi_chat_head_enabled", String(nextState));
    }
    set({
      isChatHeadVisible: nextState,
      isBubbleVisible: nextState ? get().isBubbleVisible : false,
      isMiniChatOpen: nextState ? get().isMiniChatOpen : false,
    });
    triggerHaptic("selection");
  },

  setMiniChatOpen: (open) => {
    triggerHaptic("selection");
    set({
      isMiniChatOpen: open,
      isBubbleVisible: false,
      unreadCount: open ? 0 : get().unreadCount,
    });
  },

  toggleMiniChat: () => {
    triggerHaptic("medium");
    const nextState = !get().isMiniChatOpen;
    set({
      isMiniChatOpen: nextState,
      isBubbleVisible: false,
      unreadCount: nextState ? 0 : get().unreadCount,
    });
  },

  toggleSound: () => {
    triggerHaptic("selection");
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  requestPermission: async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    try {
      const perm = await Notification.requestPermission();
      return perm === "granted";
    } catch (e) {
      return false;
    }
  },

  triggerSampleNotification: async (sampleSender = "Người Ấy 💕", sampleContent = "Em nhớ anh quá nè! Tối nay mình đi ăn gì nha? 🥰") => {
    // 1. Âm thanh chuông Ding Pop
    notificationSound.playPop();
    triggerHaptic("success");

    // 2. Cấp quyền nếu chưa có
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        try {
          await Notification.requestPermission();
        } catch (e) {}
      }

      if (Notification.permission === "granted") {
        try {
          new Notification(`Happi 💕 - ${sampleSender}`, {
            body: sampleContent,
            icon: "/logo.svg",
          });
        } catch (e) {}
      }
    }

    // 3. Hiển thị Bong bóng chat trực tiếp trên màn hình
    get().showBubble({
      senderName: sampleSender,
      content: sampleContent,
      conversationId: "",
    });
  },
}));
