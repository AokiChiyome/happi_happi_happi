import React, { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import { FoodRouletteModal } from "../food/FoodRouletteModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Dices,
  Sparkles,
  MapPin,
  MoreVertical,
  Users,
  Search,
  Smile,
} from "lucide-react";
import StickerPicker from "./StickerPicker";
import type { Sticker } from "@/data/stickersData";

export const ChatWindowLayout: React.FC = () => {
  const { user } = useAuthStore();
  const {
    conversations,
    activeConversationId,
    messages,
    sendMessage,
    sendSticker,
    setFoodRouletteOpen,
  } = useChatStore();

  const [inputContent, setInputContent] = useState("");
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConvo = conversations.find(
    (c) => c._id === activeConversationId
  );

  const currentMessages = activeConversationId
    ? messages[activeConversationId]?.items || []
    : [];

  const otherUser =
    activeConvo?.type === "direct" && user
      ? activeConvo.participants.find((p) => p._id !== user._id)
      : null;

  const chatTitle =
    activeConvo?.type === "group"
      ? activeConvo.group?.name || "Nhóm Chat"
      : otherUser?.displayName || "Cuộc Trò Chuyện";

  const chatAvatar =
    activeConvo?.type === "group" ? undefined : otherUser?.avatarUrl || undefined;

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputContent.trim();
    if (!text || !activeConversationId) return;
    setInputContent("");
    sendMessage(text, otherUser?._id);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputContent((prev) => prev + emoji);
  };

  const handleSelectSticker = (sticker: Sticker) => {
    if (!activeConversationId) return;
    sendSticker(sticker.url, `[Nhãn dán: ${sticker.name}]`, otherUser?._id);
    setShowStickerPicker(false);
  };

  // If no active conversation, show Welcome Empty State
  if (!activeConversationId || !activeConvo) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-card/40 rounded-3xl border border-border/50">
        <div className="size-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-4xl shadow-lg mb-6 animate-bounce">
          💌
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mb-2">
          Chào mừng đến với Happi! ✨
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mb-8">
          Chọn một người bạn hoặc một nhóm từ danh sách bên trái để bắt đầu nhắn
          tin trò chuyện thời gian thực nhé.
        </p>

        {/* Feature Banner: Hôm nay ăn gì */}
        <div className="w-full max-w-md p-6 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 rounded-3xl shadow-sm text-left relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 bg-pink-500/10 px-2.5 py-0.5 rounded-full">
                Tiện ích cặp đôi
              </span>
              <h3 className="text-lg font-bold text-foreground mt-2">
                Hôm Nay Em Muốn Ăn Gì? 🍱
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Mở hòm CS:GO phiên bản ẩm thực với hơn 1,000 món ngon để giải cứu
                câu hỏi bất hủ của người yêu!
              </p>
            </div>
            <span className="text-4xl">🎲</span>
          </div>

          <Button
            onClick={() => setFoodRouletteOpen(true)}
            className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl gap-2 shadow-md"
          >
            <Sparkles className="size-4" /> Quay Món Ăn Ngay
          </Button>
        </div>

        <FoodRouletteModal />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-card rounded-3xl border border-border/60 shadow-lg overflow-hidden">
      {/* ================= CHAT HEADER ================= */}
      <header className="px-6 py-4 border-b border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <UserAvatar
              type="chat"
              name={chatTitle}
              avatarUrl={chatAvatar}
              classname="size-10 text-sm ring-2 ring-primary/20"
            />
            {activeConvo.type === "direct" && <StatusBadge status="online" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground leading-tight">
              {chatTitle}
            </h2>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {activeConvo.type === "group" ? (
                <>
                  <Users className="size-3" />
                  {activeConvo.participants.length} thành viên
                </>
              ) : (
                <>
                  <span className="size-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  Đang trực tuyến
                </>
              )}
            </span>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-2">
          {/* Quick Food Decider Trigger */}
          <Button
            size="sm"
            onClick={() => setFoodRouletteOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full gap-1.5 shadow-sm text-xs px-3.5 py-1.5"
          >
            <Dices className="size-3.5" />
            <span>Hôm Nay Ăn Gì?</span>
          </Button>

          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            <Search className="size-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            <MoreVertical className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </header>

      {/* ================= MESSAGE STREAM ================= */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
        {currentMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <span className="text-4xl mb-2">💬</span>
            <p className="text-sm font-semibold">Chưa có tin nhắn nào ở đây.</p>
            <p className="text-xs">Hãy gửi lời chào đầu tiên hoặc rủ nhau đi ăn nào! 🥰</p>
          </div>
        ) : (
          currentMessages.map((msg) => {
            const isMine = msg.senderId === user?._id;
            const isFoodCard =
              msg.content && msg.content.includes("🍽️ [Gợi ý món ăn]:");
            const stickerSrc = msg.imgURL || msg.imgUrl;
            const isSticker = Boolean(stickerSrc);

            const timeStr = msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <div
                key={msg._id}
                className={`flex flex-col ${
                  isMine ? "items-end" : "items-start"
                } animate-in fade-in-50 duration-200`}
              >
                {/* 1. Special Food Card Rendering */}
                {isFoodCard ? (
                  <div className="max-w-md w-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border-2 border-amber-300 dark:border-amber-700/60 rounded-3xl p-4 shadow-md text-foreground">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                      <span>🍽️</span> Gợi ý món ăn tình yêu
                    </div>

                    <div className="text-base font-black text-amber-900 dark:text-amber-200 mt-1">
                      {msg.content
                        ?.split("\n")[0]
                        .replace("🍽️ [Gợi ý món ăn]:", "")
                        .replace(/\*\*/g, "")
                        .trim()}
                    </div>

                    {msg.content?.includes("💌 Lời nhắn:") && (
                      <div className="text-xs text-amber-800 dark:text-amber-300/80 italic mt-2 p-2 bg-amber-100/60 dark:bg-amber-900/40 rounded-xl">
                        {msg.content.split("💌 Lời nhắn:")[1].trim()}
                      </div>
                    )}

                    <div className="mt-3 pt-2 border-t border-amber-200 dark:border-amber-800/50 flex items-center justify-between">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          (msg.content
                            ?.split("\n")[0]
                            .replace("🍽️ [Gợi ý món ăn]:", "")
                            .replace(/\*\*/g, "")
                            .trim() || "") + " gần đây"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400"
                      >
                        <MapPin className="size-3" /> Tìm quán gần đây
                      </a>
                      <span className="text-[10px] text-muted-foreground">
                        {timeStr}
                      </span>
                    </div>
                  </div>
                ) : isSticker ? (
                  /* 2. Messenger / Telegram Floating Sticker Rendering */
                  <div className="max-w-[78%] flex flex-col my-1 group">
                    <div className="p-1 rounded-3xl hover:bg-muted/40 transition-colors inline-block">
                      <img
                        src={stickerSrc || ""}
                        alt={msg.content || "Sticker"}
                        className="size-28 sm:size-36 object-contain hover:scale-115 active:scale-95 transition-transform duration-200 cursor-pointer drop-shadow-md select-none"
                        loading="lazy"
                      />
                    </div>
                    {msg.content &&
                      msg.content !== "[Nhãn dán]" &&
                      !msg.content.startsWith("[Nhãn dán:") && (
                        <div
                          className={`px-3 py-1.5 rounded-2xl text-xs mt-1 shadow-xs max-w-full break-words ${
                            isMine
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-xs"
                              : "bg-card text-foreground border border-border/80 rounded-bl-xs"
                          }`}
                        >
                          {msg.content}
                        </div>
                      )}
                    <span
                      className={`text-[10px] text-muted-foreground block px-1 mt-0.5 ${
                        isMine ? "text-right" : "text-left"
                      }`}
                    >
                      {timeStr}
                    </span>
                  </div>
                ) : (
                  /* 3. Standard Chat Bubble */
                  <div className="max-w-[78%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm ${
                        isMine
                          ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-xs"
                          : "bg-card text-foreground border border-border/80 rounded-bl-xs"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span
                      className={`text-[10px] text-muted-foreground block px-1 mt-0.5 ${
                        isMine ? "text-right" : "text-left"
                      }`}
                    >
                      {timeStr}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ================= CHAT INPUT TOOLBAR ================= */}
      <footer className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm space-y-2 relative">
        {/* Floating Sticker Picker Popover */}
        {showStickerPicker && (
          <div className="absolute bottom-20 left-4 z-40">
            <StickerPicker
              onSelectSticker={handleSelectSticker}
              onClose={() => setShowStickerPicker(false)}
            />
          </div>
        )}

        {/* Quick Emoji Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-base select-none no-scrollbar">
          {["🍗", "🍲", "🧋", "🍣", "🍕", "💖", "🤤", "🥺", "✨"].map(
            (emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmojiClick(emoji)}
                className="size-7 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-transform hover:scale-125"
              >
                {emoji}
              </button>
            )
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setFoodRouletteOpen(true)}
            className="h-7 text-xs px-2 gap-1 text-pink-500 hover:text-pink-600 hover:bg-pink-500/10 rounded-full font-bold ml-1"
          >
            <Dices className="size-3.5" /> Quay món
          </Button>
        </div>

        {/* Input Field */}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowStickerPicker(!showStickerPicker)}
            className={`size-10 rounded-2xl shrink-0 transition-colors ${
              showStickerPicker
                ? "bg-pink-500/15 text-pink-600 dark:text-pink-400"
                : "text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10"
            }`}
            title="Bộ sưu tập nhãn dán Sticker"
          >
            <Smile className="size-5" />
          </Button>

          <Input
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder={`Nhắn tin cho ${chatTitle}...`}
            className="flex-1 bg-muted/30 border-border/80 rounded-2xl px-4 py-2 text-sm focus-visible:ring-primary/40"
          />
          <Button
            type="submit"
            disabled={!inputContent.trim()}
            className="size-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </footer>

      <FoodRouletteModal />
    </div>
  );
};

export default ChatWindowLayout;
