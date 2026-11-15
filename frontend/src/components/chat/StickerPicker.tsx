import React, { useState } from "react";
import {
  STICKER_PACKS,
  ALL_STICKERS,
  type Sticker,
  type StickerPack,
} from "@/data/stickersData";
import { Input } from "@/components/ui/input";
import { Search, X, Sparkles } from "lucide-react";

interface StickerPickerProps {
  onSelectSticker: (sticker: Sticker) => void;
  onClose?: () => void;
  className?: string;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  onSelectSticker,
  onClose,
  className = "",
}) => {
  const [activePackId, setActivePackId] = useState<string>("love");
  const [searchQuery, setSearchQuery] = useState("");

  const activePack =
    STICKER_PACKS.find((p) => p.id === activePackId) || STICKER_PACKS[0];

  const displayedStickers: Sticker[] = searchQuery.trim()
    ? ALL_STICKERS.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.keywords.some((k) =>
            k.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : activePack.stickers;

  return (
    <div
      className={`w-[320px] sm:w-[350px] bg-card/95 backdrop-blur-xl border border-pink-500/30 shadow-2xl rounded-3xl overflow-hidden flex flex-col p-3 z-50 animate-in fade-in zoom-in-95 duration-200 select-none ${className}`}
    >
      {/* Search Header */}
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/60">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm nhãn dán (yêu, hôn, ăn, dỗi)..."
            className="h-8 pl-8 pr-3 text-xs rounded-xl bg-muted/40 border-border/60 focus-visible:ring-1 focus-visible:ring-pink-500"
          />
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="size-7 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Pack Tabs */}
      {!searchQuery.trim() && (
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-border/50 no-scrollbar">
          {STICKER_PACKS.map((pack: StickerPack) => {
            const isActive = pack.id === activePackId;
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setActivePackId(pack.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <span>{pack.icon}</span>
                <span>{pack.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Stickers Grid */}
      <div className="p-1 max-h-[260px] overflow-y-auto grid grid-cols-4 gap-2 custom-scrollbar my-1">
        {displayedStickers.length === 0 ? (
          <div className="col-span-4 py-8 text-center text-xs text-muted-foreground">
            Không tìm thấy nhãn dán phù hợp 😿
          </div>
        ) : (
          displayedStickers.map((sticker) => (
            <button
              key={sticker.id}
              type="button"
              onClick={() => onSelectSticker(sticker)}
              className="p-1 rounded-2xl hover:bg-pink-500/10 active:scale-90 hover:scale-115 transition-all duration-150 flex flex-col items-center justify-center group"
              title={sticker.name}
            >
              <img
                src={sticker.url}
                alt={sticker.name}
                className="size-14 object-contain drop-shadow-xs"
                loading="lazy"
              />
              <span className="text-[9px] font-medium text-muted-foreground truncate w-full text-center opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                {sticker.name}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground font-medium px-1">
        <span className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
          <Sparkles className="size-3" />
          {searchQuery.trim()
            ? `Tìm thấy ${displayedStickers.length} nhãn dán`
            : activePack.name}
        </span>
        <span>Phong cách FB & Telegram 💕</span>
      </div>
    </div>
  );
};

export default StickerPicker;
