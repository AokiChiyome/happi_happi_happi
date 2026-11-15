import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import CoupleFeedView from "@/components/feed/CoupleFeedView";
import FloatingChatHead from "@/components/chat/FloatingChatHead";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

export const ChatAppPage = () => {
  const { currentTab, fetchConversations, fetchFriends, initRealtimeStream } =
    useChatStore();

  useEffect(() => {
    fetchConversations();
    fetchFriends();
    initRealtimeStream();
  }, [fetchConversations, fetchFriends, initRealtimeStream]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 h-screen overflow-hidden p-3 sm:p-6 flex flex-col relative">
        {currentTab === "feed" ? <CoupleFeedView /> : <ChatWindowLayout />}
      </div>
      {/* Floating Facebook Messenger Chat Head & Preview Bubble */}
      <FloatingChatHead />
    </SidebarProvider>
  );
};

export default ChatAppPage;
