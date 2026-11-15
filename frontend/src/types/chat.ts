export interface Participant {
  _id: string;
  displayName: string;
  avatarUrl?: string | null;
  joinedAt?: string;
}

export interface SeenUser {
  _id: string;
  displayName?: string;
  avatarUrl?: string | null;
}

export interface Group {
  name: string;
  createdBy?: string;
}

export interface LastMessage {
  _id: string;
  content: string;
  createdAt: string;
  senderId?: string;
  sender?: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

export interface PinnedMessage {
  messageId: string;
  senderName?: string;
  content?: string;
  pinnedBy?: string;
  pinnedAt?: string;
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  group?: Group;
  participants: Participant[];
  lastMessageAt?: string;
  seenBy?: SeenUser[];
  lastMessage?: LastMessage | null;
  pinnedMessage?: PinnedMessage | null;
  unreadCounts: Record<string, number>; // key = userId, value = unread count
  createdAt?: string;
  updatedAt?: string;
}

export interface ConversationResponse {
  conversations: Conversation[];
}

export interface MessageReaction {
  userId:
    | string
    | {
        _id: string;
        displayName?: string;
        avatarUrl?: string | null;
        username?: string;
      };
  emoji: string;
  createdAt?: string;
}

export interface MessageReplyTo {
  messageId: string;
  senderName?: string;
  content?: string | null;
  imgURL?: string | null;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string | null;
  imgUrl?: string | null;
  imgURL?: string | null;
  audioURL?: string | null;
  audioDuration?: number | null;
  updatedAt?: string | null;
  createdAt: string;
  isRecalled?: boolean;
  recalledAt?: string;
  reactions?: MessageReaction[];
  replyTo?: MessageReplyTo;
  sender?: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}
