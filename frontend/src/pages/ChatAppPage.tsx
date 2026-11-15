import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import CoupleFeedView from "@/components/feed/CoupleFeedView";
import FloatingChatHead from "@/components/chat/FloatingChatHead";
import MobileHeader from "@/components/navigation/MobileHeader";
import MobileNavBar from "@/components/navigation/MobileNavBar";
import InstallAppModal from "@/components/pwa/InstallAppModal";
import { useEffect, useState } from "react";
import { useChatStore } from "@/stores/useChatStore";

export const ChatAppPage = () => {
  const {
    currentTab,
    fetchConversations,
    fetchFriends,
    initRealtimeStream,
    conversations,
    activeConversationId,
    setActiveConversation,
  } = useChatStore();

  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    fetchConversations();
    fetchFriends();
    initRealtimeStream();
  }, [fetchConversations, fetchFriends, initRealtimeStream]);

  // Tự động mở cuộc trò chuyện cặp đôi chính trên điện thoại nếu chưa có cuộc trò chuyện nào được chọn
  useEffect(() => {
    if (conversations.length > 0 && !activeConversationId) {
      setActiveConversation(conversations[0]._id);
    }
  }, [conversations, activeConversationId, setActiveConversation]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 h-screen overflow-hidden flex flex-col relative pb-16 md:pb-0">
        {/* Mobile Header: Logo, Menu toggle, Nút Tải App & Avatar */}
        <MobileHeader onOpenInstallModal={() => setIsInstallModalOpen(true)} />

        {/* Khung nội dung chính */}
        <div className="flex-1 overflow-hidden p-2 sm:p-6 flex flex-col">
          {currentTab === "feed" ? <CoupleFeedView /> : <ChatWindowLayout />}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar: Chat, Bảng Tin, Quay Món, Danh Bạ, Tải App */}
      <MobileNavBar onOpenInstallModal={() => setIsInstallModalOpen(true)} />

      {/* Floating Facebook Messenger Chat Head & Preview Bubble */}
      <FloatingChatHead />

      {/* Modal Hướng dẫn & Cài đặt App PWA trực tiếp lên màn hình điện thoại */}
      <InstallAppModal
        open={isInstallModalOpen}
        onOpenChange={setIsInstallModalOpen}
      />
    </SidebarProvider>
  );
};

export default ChatAppPage;
