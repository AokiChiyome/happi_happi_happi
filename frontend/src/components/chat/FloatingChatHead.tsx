import React, { useState, useEffect, useRef } from "react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  X,
  Maximize2,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Smile,
} from "lucide-react";
import StickerPicker from "./StickerPicker";
import type { Sticker } from "@/data/stickersData";
import type { Message } from "@/types/chat";

export const FloatingChatHead: React.FC = () => {
  const { user } = useAuthStore();
  const {
    activeBubble,
    isBubbleVisible,
    isChatHeadVisible,
    unreadCount,
    isMiniChatOpen,
    soundEnabled,
    dismissBubble,
    hideChatHead,
    setMiniChatOpen,
    toggleMiniChat,
    toggleSound,
  } = useNotificationStore();

  const {
    conversations,
    messages,
    activeConversationId,
    setActiveConversation,
    setCurrentTab,
    sendMessage,
    sendSticker,
    fetchMessages,
  } = useChatStore();

  const [miniInput, setMiniInput] = useState("");
  const [showMiniStickers, setShowMiniStickers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active target conversation for the mini chat
  const targetConvoId = activeBubble?.conversationId || activeConversationId || conversations[0]?._id;
  const targetConvo = conversations.find((c) => c._id === targetConvoId);
  const currentMessages: Message[] = targetConvoId ? messages[targetConvoId]?.items || [] : [];

  // Partner display information
  const partnerUser = targetConvo?.participants?.find(
    (p) => p._id !== user?._id
  );
  const partnerName =
    activeBubble?.senderName ||
    partnerUser?.displayName ||
    "Người yêu 💕";
  const partnerAvatar =
    activeBubble?.senderAvatar || partnerUser?.avatarUrl || undefined;

  // Auto scroll to bottom in mini chat
  useEffect(() => {
    if (isMiniChatOpen && targetConvoId) {
      fetchMessages(targetConvoId);
    }
  }, [isMiniChatOpen, targetConvoId, fetchMessages]);

  useEffect(() => {
    if (isMiniChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages, isMiniChatOpen]);

  // Request browser notification permission on first user interaction
  const requestNotificationPermission = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  };

  const handleOpenFullChat = () => {
    if (targetConvoId) {
      setActiveConversation(targetConvoId);
    }
    setCurrentTab("chat");
    setMiniChatOpen(false);
    dismissBubble();
  };

  const handleSendMiniMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = miniInput.trim();
    if (!text || !targetConvoId) return;

    // Send direct message
    const partnerId = partnerUser?._id;
    await sendMessage(text, partnerId);
    setMiniInput("");
  };

  const handleSelectMiniSticker = async (sticker: Sticker) => {
    if (!targetConvoId) return;
    const partnerId = partnerUser?._id;
    await sendSticker(sticker.url, `[Nhãn dán: ${sticker.name}]`, partnerId);
    setShowMiniStickers(false);
  };

  if (!isChatHeadVisible && !isBubbleVisible && !isMiniChatOpen) {
    return null;
  }

  return (
    <div
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end pointer-events-none select-none"
      onClick={requestNotificationPermission}
    >
      {/* ================= 1. FLOATING MINI CHAT WINDOW ================= */}
      {isMiniChatOpen && (
        <div className="pointer-events-auto mb-3 w-[330px] sm:w-[360px] max-w-[calc(100vw-1.5rem)] h-[460px] max-h-[70vh] bg-card/95 backdrop-blur-xl border border-pink-500/30 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-rose-500/15 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Avatar className="size-9 border-2 border-pink-400 shadow-xs">
                  <AvatarImage src={partnerAvatar} />
                  <AvatarFallback className="bg-pink-100 dark:bg-pink-950 text-pink-600 font-bold text-xs">
                    {partnerName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
              </div>

              <div>
                <h4 className="text-xs font-black text-foreground truncate max-w-[150px]">
                  {partnerName}
                </h4>
                <p className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-1">
                  <Sparkles className="size-2.5" /> Đang hoạt động 💕
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="size-7 rounded-full text-muted-foreground hover:text-foreground"
                title={soundEnabled ? "Tắt âm thanh thông báo" : "Bật âm thanh"}
              >
                {soundEnabled ? (
                  <Volume2 className="size-3.5" />
                ) : (
                  <VolumeX className="size-3.5 text-muted-foreground/50" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenFullChat}
                className="size-7 rounded-full text-muted-foreground hover:text-foreground"
                title="Mở toàn màn hình"
              >
                <Maximize2 className="size-3.5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMiniChatOpen(false)}
                className="size-7 rounded-full text-muted-foreground hover:text-foreground"
                title="Thu nhỏ"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs custom-scrollbar bg-background/40">
            {currentMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground space-y-2">
                <span className="text-3xl">💌</span>
                <p className="font-semibold text-xs">Chưa có tin nhắn nào</p>
                <p className="text-[11px]">Hãy gửi lời yêu thương đầu tiên cho người ấy nhé!</p>
              </div>
            ) : (
              currentMessages.map((msg) => {
                const isMe = msg.senderId === user?._id;
                return (
                  <div
                    key={msg._id}
                    className={`flex items-end gap-1.5 ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!isMe && (
                      <Avatar className="size-6 border mb-0.5">
                        <AvatarImage src={partnerAvatar} />
                        <AvatarFallback className="text-[9px] font-bold">
                          {partnerName.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {msg.isRecalled ? (
                      <div className="max-w-[78%] px-3 py-1.5 rounded-2xl break-words leading-relaxed shadow-xs text-[11px] italic text-muted-foreground bg-muted/40 border border-border/40 flex items-center gap-1">
                        <span>🚫</span>
                        <span>Tin nhắn đã được thu hồi</span>
                      </div>
                    ) : msg.imgURL || msg.imgUrl ? (
                      <div className="p-0.5 rounded-2xl hover:scale-110 active:scale-95 transition-transform">
                        <img
                          src={msg.imgURL || msg.imgUrl || ""}
                          alt={msg.content || "Sticker"}
                          className="size-24 sm:size-28 object-contain drop-shadow-xs select-none"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        className={`max-w-[78%] px-3 py-2 rounded-2xl break-words leading-relaxed shadow-xs ${
                          isMe
                            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-xs font-medium"
                            : "bg-muted/80 text-foreground rounded-bl-xs border border-border/60"
                        }`}
                      >
                        {msg.content}
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Floating Mini Sticker Picker */}
          {showMiniStickers && (
            <div className="absolute bottom-14 right-2 z-50">
              <StickerPicker
                onSelectSticker={handleSelectMiniSticker}
                onClose={() => setShowMiniStickers(false)}
              />
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={handleSendMiniMessage}
            className="p-2.5 bg-background border-t border-border/60 flex items-center gap-1.5 relative"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowMiniStickers(!showMiniStickers)}
              className={`size-8 rounded-full shrink-0 transition-colors ${
                showMiniStickers
                  ? "bg-pink-500/15 text-pink-600 dark:text-pink-400"
                  : "text-muted-foreground hover:text-pink-500"
              }`}
              title="Nhãn dán Sticker"
            >
              <Smile className="size-4" />
            </Button>

            <Input
              value={miniInput}
              onChange={(e) => setMiniInput(e.target.value)}
              placeholder="Nhắn tin cho người yêu..."
              className="rounded-full text-xs h-9 bg-muted/30 border-border/80 focus-visible:ring-1 focus-visible:ring-pink-500"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!miniInput.trim()}
              className="size-9 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shrink-0 shadow-xs"
            >
              <Send className="size-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* ================= 2. SPEECH PREVIEW BUBBLE (Bong bóng xem trước) ================= */}
      {isBubbleVisible && activeBubble && !isMiniChatOpen && (
        <div className="pointer-events-auto mb-2.5 mr-1 max-w-[280px] sm:max-w-[320px] bg-card/95 backdrop-blur-md border border-pink-500/40 shadow-2xl rounded-3xl p-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-250">
          <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-7 border border-pink-400">
                <AvatarImage src={activeBubble.senderAvatar} />
                <AvatarFallback className="bg-pink-100 dark:bg-pink-950 text-pink-600 font-bold text-[10px]">
                  {activeBubble.senderName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <h5 className="font-extrabold text-xs text-foreground truncate max-w-[150px]">
                  {activeBubble.senderName}
                </h5>
                <span className="text-[10px] text-pink-500 font-semibold">
                  Vừa nhắn cho bạn 💕
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={dismissBubble}
              className="size-5 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-3" />
            </button>
          </div>

          <p className="text-xs text-foreground line-clamp-3 leading-relaxed px-1">
            {activeBubble.content}
          </p>

          <div className="flex items-center justify-end gap-1.5 pt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={dismissBubble}
              className="h-7 text-[11px] rounded-xl px-2.5"
            >
              Đóng
            </Button>
            <Button
              size="sm"
              onClick={handleOpenFullChat}
              className="h-7 text-[11px] font-bold rounded-xl px-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs gap-1"
            >
              <MessageCircle className="size-3" /> Trả lời ngay
            </Button>
          </div>
        </div>
      )}

      {/* ================= 3. FLOATING CHAT HEAD (Bong bóng tròn Facebook) ================= */}
      {isChatHeadVisible && (
        <div className="pointer-events-auto relative group">
          {/* Pulse aura when there are unread messages */}
          {unreadCount > 0 && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-75 blur-sm animate-ping duration-1000 pointer-events-none"></span>
          )}

          {/* Dismiss Chat Head 'X' button on hover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              hideChatHead();
            }}
            className="absolute -top-1.5 -left-1.5 size-5 rounded-full bg-zinc-800 text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
            title="Tắt bong bóng chat"
          >
            <X className="size-3" />
          </button>

          {/* Unread badge count */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 z-20 min-w-5 h-5 px-1.5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-background shadow-md animate-bounce">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

          {/* Main Round Chat Head Button */}
          <button
            type="button"
            onClick={toggleMiniChat}
            className="relative size-14 sm:size-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-purple-500 to-rose-500 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden ring-2 ring-background"
            title={`Trò chuyện với ${partnerName}`}
          >
            <Avatar className="size-full">
              <AvatarImage src={partnerAvatar} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-tr from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 text-pink-600 dark:text-pink-300 font-extrabold text-sm sm:text-base">
                {partnerName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Glowing inner overlay */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingChatHead;
