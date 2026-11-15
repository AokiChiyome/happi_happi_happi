import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, PlusSquare, Smartphone, CheckCircle2, Sparkles } from "lucide-react";

interface InstallAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Kiểm tra nếu người dùng đã cài đặt và đang chạy ở chế độ standalone app
    const isApp =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isApp);

    // 2. Nhận biết thiết bị Apple iOS (iPhone/iPad)
    const isApple =
      /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isApple);

    // 3. Bắt sự kiện cài đặt PWA trên Android/Chrome
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setDeferredPrompt(null);
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-pink-500/20 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto size-16 rounded-3xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/25 mb-1 animate-pulse">
            <Smartphone className="size-8 text-white" />
          </div>
          <DialogTitle className="text-xl font-black text-foreground flex items-center justify-center gap-1.5">
            Cài Đặt Ứng Dụng Happi 💕
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Cài đặt trực tiếp vào màn hình chính điện thoại để nhắn tin và quay món ăn nhanh chóng như App thật!
          </DialogDescription>
        </DialogHeader>

        {isStandalone ? (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="size-8 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              Bạn đang sử dụng ứng dụng Happi trên máy! 🎉
            </p>
            <p className="text-xs text-muted-foreground">
              Mọi tính năng nhắn tin, âm thanh và giao diện toàn màn hình đã sẵn sàng.
            </p>
          </div>
        ) : isIOS ? (
          /* Hướng dẫn cài đặt trên iOS (iPhone/iPad) */
          <div className="space-y-3.5 py-1">
            <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-start gap-3">
              <div className="size-7 rounded-xl bg-pink-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-foreground flex items-center gap-1">
                  Nhấn nút Chia Sẻ <Share2 className="size-3.5 text-blue-500 inline" />
                </p>
                <p className="text-muted-foreground">
                  Trên thanh công cụ phía dưới cùng của trình duyệt Safari trên iPhone.
                </p>
              </div>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-start gap-3">
              <div className="size-7 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-foreground flex items-center gap-1">
                  Chọn "Thêm vào MH chính" <PlusSquare className="size-3.5 text-pink-500 inline" />
                </p>
                <p className="text-muted-foreground">
                  Cuộn menu lên và chạm vào mục <span className="font-semibold text-foreground">"Thêm vào Màn hình chính" (Add to Home Screen)</span>.
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
              <div className="size-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-foreground flex items-center gap-1">
                  Bấm "Thêm" (Add) ở góc trên <Sparkles className="size-3.5 text-amber-500 inline" />
                </p>
                <p className="text-muted-foreground">
                  Xong! Biểu tượng app Happi 💕 sẽ xuất hiện trên màn hình điện thoại của bạn.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Hướng dẫn và nút cài đặt trên Android / Chrome */
          <div className="space-y-4 py-2 text-center">
            <div className="p-4 bg-muted/60 border border-border/80 rounded-2xl space-y-2 text-left">
              <p className="text-xs text-foreground font-semibold flex items-center gap-1.5">
                <Sparkles className="size-4 text-pink-500" /> Lợi ích khi cài đặt app:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>Giao diện toàn màn hình không có thanh URL trình duyệt</li>
                <li>Nhận thông báo tin nhắn và bong bóng chat nhanh hơn</li>
                <li>Mở app trực tiếp từ icon ngoài màn hình khóa/màn hình chính</li>
              </ul>
            </div>

            {deferredPrompt ? (
              <Button
                onClick={handleInstallClick}
                className="w-full h-11 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
              >
                <Download className="size-4" /> Cài Đặt Ứng Dụng Ngay
              </Button>
            ) : (
              <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-2xl border border-border/60">
                💡 <span className="font-medium">Mẹo:</span> Bạn cũng có thể bấm vào dấu <span className="font-bold">3 chấm (⋮)</span> ở góc trên cùng của trình duyệt Chrome ➔ Chọn <span className="font-bold text-foreground">"Cài đặt ứng dụng"</span> hoặc <span className="font-bold text-foreground">"Thêm vào màn hình chính"</span>.
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-2xl text-xs h-9 px-4"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstallAppModal;
