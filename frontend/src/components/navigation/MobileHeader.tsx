import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { Download, MessageCircle } from "lucide-react";
import UserAvatar from "@/components/chat/UserAvatar";

interface MobileHeaderProps {
  onOpenInstallModal: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenInstallModal,
}) => {
  const { currentTab, activeConversationId, conversations } = useChatStore();
  const { user } = useAuthStore();
  const { isInstalled, isStandalone } = usePWAInstall();
  const { isChatHeadVisible, toggleChatHead } = useNotificationStore();

  const activeConvo = conversations.find((c) => c._id === activeConversationId);
  const otherUser =
    activeConvo?.type === "direct" && user
      ? activeConvo.participants.find((p) => p._id !== user._id)
      : null;

  return (
    <header className="md:hidden flex items-center justify-between px-3 py-2.5 bg-background/90 backdrop-blur-md border-b border-border/60 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="size-9 rounded-xl hover:bg-muted text-foreground" />
        <div className="flex items-center gap-1.5">
          <span className="text-base font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Happi 💕
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400">
            {currentTab === "feed" ? "Bảng Tin" : otherUser?.displayName || "Đoạn Chat"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Nút Bật/Tắt Bong Bóng Chat Nổi */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleChatHead}
          className={`size-8 rounded-full transition-colors ${
            isChatHeadVisible
              ? "bg-pink-500/20 text-pink-600 dark:text-pink-400"
              : "text-muted-foreground hover:text-foreground"
          }`}
          title={isChatHeadVisible ? "Bong bóng chat đang bật" : "Bật bong bóng chat"}
        >
          <MessageCircle className="size-4" />
        </Button>

        {/* Nút Cài đặt App PWA: CHỈ hiển thị nếu chưa cài đặt để không làm phiền người dùng */}
        {!isInstalled && !isStandalone && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenInstallModal}
            className="h-8 px-2.5 text-xs font-bold gap-1 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20"
          >
            <Download className="size-3.5" />
            <span>Tải App</span>
          </Button>
        )}

        {user && (
          <UserAvatar
            type="chat"
            name={user.displayName || user.username}
            avatarUrl={user.avatarUrl || undefined}
            classname="size-8"
          />
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
