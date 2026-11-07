import type { User } from "./user";
import type { Conversation, Message } from "./chat";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;
  clearState: () => void;
  signUp: (
    username: string,
    password: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    displayName?: string
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

export interface ChatState {
  conversations: Conversation[];
  messages: Record<
    string,
    {
      items: Message[];
      hasMore: boolean;
      nextCursor: string | null;
    }
  >;
  activeConversationId: string | null;
  friends: any[];
  friendRequests: { sent: any[]; received: any[] };
  isFoodRouletteOpen: boolean;
  loading: boolean;

  reset: () => void;
  setActiveConversation: (id: string | null) => void;
  setFoodRouletteOpen: (open: boolean) => void;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, recipientId?: string) => Promise<void>;
  sendFoodCard: (dish: {
    name: string;
    category: string;
    emoji: string;
    note?: string;
  }) => Promise<void>;
  fetchFriends: () => Promise<void>;
  fetchFriendRequests: () => Promise<void>;
  sendFriendRequest: (toUsername: string, message?: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  declineFriendRequest: (requestId: string) => Promise<void>;
  createGroupChat: (name: string, memberIds: string[]) => Promise<void>;
  initRealtimeStream: () => void;
}
