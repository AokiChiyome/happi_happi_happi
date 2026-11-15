import React, { useEffect, useState, Suspense, lazy } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import MobileHeader from "@/components/navigation/MobileHeader";
import MobileNavBar from "@/components/navigation/MobileNavBar";
import { useChatStore } from "@/stores/useChatStore";

// Tối ưu hóa Code Splitting & Lazy Loading cho máy cấu hình tầm trung/yếu (iPhone X, Redmi Note 10)
const CoupleFeedView = lazy(() => import("@/components/feed/CoupleFeedView"));
const FloatingChatHead = lazy(() => import("@/components/chat/FloatingChatHead"));
const InstallAppModal = lazy(() => import("@/components/pwa/InstallAppModal"));
const BookmarksModal = lazy(() => import("@/components/bookmarks/BookmarksModal"));
const LightboxModal = lazy(() => import("@/components/media/LightboxModal"));
const FoodRouletteModal = lazy(() => import("@/components/food/FoodRouletteModal"));

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
          <Suspense fallback={<div className="flex-1 flex items-center justify-center text-xs text-muted-foreground animate-pulse">Đang tải... 💕</div>}>
            {currentTab === "feed" ? <CoupleFeedView /> : <ChatWindowLayout />}
          </Suspense>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar: Chat, Bảng Tin, Quay Món, Danh Bạ */}
      <MobileNavBar onOpenInstallModal={() => setIsInstallModalOpen(true)} />

      {/* Floating Facebook Messenger Chat Head & Preview Bubble (Lazy Loaded) */}
      <Suspense fallback={null}>
        <FloatingChatHead />
      </Suspense>

      {/* Modal Hướng dẫn & Cài đặt App PWA trực tiếp lên màn hình điện thoại (Lazy Loaded) */}
      <Suspense fallback={null}>
        <InstallAppModal
          open={isInstallModalOpen}
          onOpenChange={setIsInstallModalOpen}
        />
      </Suspense>

      {/* Sổ tay ẩm thực & Yêu thích (Telegram / Facebook Bookmarks) */}
      <Suspense fallback={null}>
        <BookmarksModal />
      </Suspense>

      {/* Trình xem ảnh Lightbox mượt mà (Tap-to-Zoom & Fullscreen) */}
      <Suspense fallback={null}>
        <LightboxModal />
      </Suspense>

      {/* Vòng quay mở hòm ẩm thực CS:GO (Hôm Nay Em Muốn Ăn Gì) */}
      <Suspense fallback={null}>
        <FoodRouletteModal />
      </Suspense>
    </SidebarProvider>
  );
};

export default ChatAppPage;
