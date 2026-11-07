import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

export const ChatAppPage = () => {
  const { fectConversations } = useChatStore();
  useEffect(() => {
    fectConversations();
  }, [fectConversations]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 p-6">
        <ChatWindowLayout />
      </div>
    </SidebarProvider>
  );
};
export default ChatAppPage;
