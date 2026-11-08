import type { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import ChatCard from "./ChatCard";
import UnreadCountBadge from "./UnreadCountBadge";
import { Users } from "lucide-react";

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation } = useChatStore();

  if (!user) return null;
  const unreadCount = convo.unreadCounts?.[user._id] ?? 0;
  const name = convo.group?.name || "Nhóm Chat";

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
  };

  return (
    <ChatCard
      convoId={convo._id}
      name={name}
      timestamp={
        convo.lastMessage?.createdAt
          ? new Date(convo.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === convo._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={
        <div className="relative">
          <div className="size-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
            <Users className="size-5" />
          </div>
          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
        </div>
      }
      subtitle={
        <p className="text-sm truncate text-muted-foreground">
          {convo.lastMessage?.content || `${convo.participants.length} thành viên`}
        </p>
      }
    />
  );
};

export default GroupChatCard;
