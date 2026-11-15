import React, { useState, useEffect } from "react";
import { useLightboxStore } from "@/stores/useLightboxStore";
import { X, ZoomIn, ZoomOut, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LightboxModal: React.FC = () => {
  const { isOpen, imageUrl, caption, closeLightbox } = useLightboxStore();
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      setIsZoomed(false);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox]);

  if (!isOpen || !imageUrl) return null;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `happi-image-${Date.now()}.png`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Swipe down to dismiss on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchEndY - touchStartY;
    if (diff > 120) {
      // Swiped down significantly
      closeLightbox();
    }
    setTouchStartY(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-150"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Toolbar */}
      <div className="p-3 sm:p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/80 font-medium px-2 py-1 rounded-md bg-white/10">
            Xem ảnh phóng to
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsZoomed(!isZoomed)}
            className="size-9 rounded-full text-white/80 hover:text-white hover:bg-white/15"
            title={isZoomed ? "Thu nhỏ" : "Phóng to"}
          >
            {isZoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleDownload}
            className="size-9 rounded-full text-white/80 hover:text-white hover:bg-white/15"
            title="Tải ảnh về máy"
          >
            <Download className="size-4" />
          </Button>

          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-9 rounded-full text-white/80 hover:text-white hover:bg-white/15 items-center justify-center transition-colors"
            title="Mở ảnh gốc trong tab mới"
          >
            <ExternalLink className="size-4" />
          </a>

          <Button
            size="icon"
            variant="ghost"
            onClick={closeLightbox}
            className="size-9 rounded-full text-white/80 hover:text-white hover:bg-white/20 ml-2"
            title="Đóng (Esc hoặc vuốt xuống)"
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          src={imageUrl}
          alt="preview"
          className={`max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl transition-transform duration-200 will-change-transform ${
            isZoomed ? "scale-150 cursor-zoom-out" : "scale-100"
          }`}
        />
      </div>

      {/* Bottom Caption Bar */}
      {caption ? (
        <div className="p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-center z-10">
          <p className="text-sm text-white/95 font-medium max-w-xl mx-auto break-words">
            {caption}
          </p>
        </div>
      ) : (
        <div className="p-2 text-center text-[11px] text-white/40">
          Chạm vào ảnh để phóng to/thu nhỏ • Vuốt xuống để đóng
        </div>
      )}
    </div>
  );
};

export default LightboxModal;
