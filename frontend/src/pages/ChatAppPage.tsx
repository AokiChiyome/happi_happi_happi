import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

export const ChatAppPage = () => {
  const { fetchConversations, fetchFriends, initRealtimeStream } =
    useChatStore();

  useEffect(() => {
    fetchConversations();
    fetchFriends();
    initRealtimeStream();
  }, [fetchConversations, fetchFriends, initRealtimeStream]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 p-6 h-screen overflow-hidden">
        <ChatWindowLayout />
      </div>
    </SidebarProvider>
  );
};

export default ChatAppPage;
