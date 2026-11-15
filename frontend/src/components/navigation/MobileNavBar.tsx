import React from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useSidebar } from "@/components/ui/sidebar";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useThemeStore } from "@/stores/useThemeStore";
import { MessageSquare, Camera, Dices, Users, Download, Moon, Sun } from "lucide-react";
import { triggerHaptic } from "@/utils/haptics";

interface MobileNavBarProps {
  onOpenInstallModal: () => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  onOpenInstallModal,
}) => {
  const { currentTab, setCurrentTab, setFoodRouletteOpen } = useChatStore();
  const { toggleSidebar } = useSidebar();
  const { isInstalled, isStandalone } = usePWAInstall();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border/70 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-lg select-none">
      {/* 1. Nút Chat */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic("selection");
          setCurrentTab("chat");
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
          currentTab === "chat"
            ? "text-pink-600 dark:text-pink-400 font-bold scale-105"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <MessageSquare className="size-5" />
        <span className="text-[10px] mt-0.5">Trò chuyện</span>
      </button>

      {/* 2. Nút Bảng Tin */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic("selection");
          setCurrentTab("feed");
        }}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
          currentTab === "feed"
            ? "text-pink-600 dark:text-pink-400 font-bold scale-105"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Camera className="size-5" />
        <span className="text-[10px] mt-0.5">Bảng tin 💕</span>
      </button>

      {/* 3. Nút Trung tâm: Vòng quay ăn gì hôm nay */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic("medium");
          setFoodRouletteOpen(true);
        }}
        className="flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95 group"
      >
        <div className="size-12 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/40 ring-4 ring-background group-hover:scale-110 transition-transform animate-pulse">
          <Dices className="size-6" />
        </div>
        <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 mt-0.5">
          Ăn gì?
        </span>
      </button>

      {/* 4. Nút Danh bạ / Mở danh sách chat */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-muted-foreground hover:text-foreground transition-all"
      >
        <Users className="size-5" />
        <span className="text-[10px] mt-0.5">Hội thoại</span>
      </button>

      {/* 5. Nút Tải App hoặc Nút Đổi Giao Diện khi đã cài đặt */}
      {!isInstalled && !isStandalone ? (
        <button
          type="button"
          onClick={onOpenInstallModal}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-muted-foreground hover:text-pink-500 transition-all"
        >
          <Download className="size-5 text-pink-500" />
          <span className="text-[10px] mt-0.5 font-bold text-pink-600 dark:text-pink-400">
            Tải App
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-muted-foreground hover:text-foreground transition-all"
          title="Chuyển chế độ Sáng / Tối"
        >
          {isDark ? (
            <Sun className="size-5 text-amber-400 animate-spin-slow" />
          ) : (
            <Moon className="size-5 text-purple-500" />
          )}
          <span className="text-[10px] mt-0.5">
            {isDark ? "Giao diện" : "Ban đêm"}
          </span>
        </button>
      )}
    </nav>
  );
};

export default MobileNavBar;
