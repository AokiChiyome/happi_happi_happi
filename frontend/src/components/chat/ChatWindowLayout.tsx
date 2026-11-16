import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
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
  CornerUpLeft,
  Undo2,
  X,
  Ban,
  Mic,
  Play,
  Pause,
  Pin,
  Trash2,
  Volume2,
  Bookmark,
  Bell,
  BellRing,
  MessageCircle,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNotificationStore } from "@/stores/useNotificationStore";
import StickerPicker from "./StickerPicker";
import type { Sticker } from "@/data/stickersData";
import type { Message } from "@/types/chat";
import { toast } from "sonner";
import { useBookmarkStore } from "@/stores/useBookmarkStore";
import { useLightboxStore } from "@/stores/useLightboxStore";
import { triggerHaptic } from "@/utils/haptics";

const QUICK_EMOJIS = ["❤️", "😂", "😮", "😢", "👍", "🔥"];

export const ChatWindowLayout: React.FC = () => {
  const { user } = useAuthStore();
  const {
    conversations,
    activeConversationId,
    messages,
    sendMessage,
    sendSticker,
    sendVoiceMessage,
    pinMessage,
    unpinMessage,
    setFoodRouletteOpen,
    typingStatus,
    sendTyping,
    replyingToMessage,
    setReplyingToMessage,
    toggleMessageReaction,
    recallMessage,
  } = useChatStore();

  const { setOpen: setBookmarkModalOpen, addBookmark } = useBookmarkStore();
  const { openLightbox } = useLightboxStore();
  const {
    isChatHeadVisible,
    toggleChatHead,
    triggerSampleNotification,
    requestPermission,
  } = useNotificationStore();

  const [inputContent, setInputContent] = useState("");
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [activeReactionPickerId, setActiveReactionPickerId] = useState<string | null>(null);

  // Ghi âm tin nhắn thoại (Voice Note)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  // Phát lại âm thanh tin nhắn thoại
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Tìm kiếm tin nhắn nhanh trong hội thoại (Telegram style)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Thao tác Tin Nhắn Trên Điện Thoại khi Ấn Giữ (Mobile Long-Press & Context Menu)
  const [activeActionMessage, setActiveActionMessage] = useState<Message | null>(null);
  const longPressTimerRef = useRef<any>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent, msg: Message) => {
    if (msg.isRecalled || msg._id.startsWith("temp-")) return;
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // 400ms ấn giữ ngón tay để kích hoạt menu thao tác di động
    longPressTimerRef.current = setTimeout(() => {
      triggerHaptic("heavy");
      setActiveActionMessage(msg);
      longPressTimerRef.current = null;
    }, 400);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPosRef.current || !longPressTimerRef.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);

    // Nếu người dùng cuộn màn hình chat (>10px), hủy ngay sự kiện ấn giữ
    if (dx > 10 || dy > 10) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    touchStartPosRef.current = null;
  };

  const handleContextMenu = (e: React.MouseEvent, msg: Message) => {
    if (msg.isRecalled || msg._id.startsWith("temp-")) return;
    e.preventDefault();
    triggerHaptic("medium");
    setActiveActionMessage(msg);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<any>(null);

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

  const currentTyping = activeConversationId
    ? typingStatus[activeConversationId]
    : null;

  const chatTitle =
    activeConvo?.type === "group"
      ? activeConvo.group?.name || "Nhóm Chat"
      : otherUser?.displayName || "Cuộc Trò Chuyện";

  const chatAvatar =
    activeConvo?.type === "group" ? undefined : otherUser?.avatarUrl || undefined;

  // Lọc tin nhắn khi người dùng tìm kiếm
  const displayedMessages = searchQuery.trim()
    ? currentMessages.filter((m) =>
        m.content?.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : currentMessages;

  // Tự động cuộn xuống cuối khi có tin nhắn mới hoặc đối phương đang gõ
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length, currentTyping?.isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputContent(val);

    if (!activeConversationId) return;
    sendTyping(activeConversationId, true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (activeConversationId) {
        sendTyping(activeConversationId, false);
      }
    }, 2000);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputContent.trim();
    if (!text || !activeConversationId) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    sendTyping(activeConversationId, false);

    triggerHaptic("success");
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

  // Cuộn tới tin nhắn được trích dẫn (Reply hoặc Pin)
  const scrollToMessage = (messageId?: string) => {
    if (!messageId) return;
    const el = document.getElementById(`msg-${messageId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-pink-500", "rounded-2xl");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-pink-500", "rounded-2xl");
      }, 1500);
    }
  };

  // Bắt đầu ghi âm tin nhắn thoại
  const startRecording = async () => {
    try {
      triggerHaptic("medium");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Lỗi micro:", err);
      toast.error("Không thể truy cập Microphone. Vui lòng cho phép quyền ghi âm trên trình duyệt nhé!");
    }
  };

  // Dừng và gửi tin nhắn thoại
  const stopAndSendRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    const duration = recordingSeconds;

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Audio = reader.result as string;
        sendVoiceMessage(base64Audio, duration, otherUser?._id);
      };
      reader.readAsDataURL(audioBlob);

      mediaRecorderRef.current?.stream?.getTracks().forEach((track) => track.stop());
    };

    mediaRecorderRef.current.stop();
    setIsRecording(false);
    clearInterval(recordingTimerRef.current);
  };

  // Hủy ghi âm
  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream?.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    clearInterval(recordingTimerRef.current);
    audioChunksRef.current = [];
  };

  // Phát / Dừng âm thanh tin nhắn thoại
  const togglePlayAudio = (msgId: string, audioSrc?: string) => {
    if (!audioSrc) return;
    if (playingAudioId === msgId) {
      currentAudioRef.current?.pause();
      setPlayingAudioId(null);
    } else {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      const audio = new Audio(audioSrc);
      currentAudioRef.current = audio;
      audio.play();
      setPlayingAudioId(msgId);
      audio.onended = () => setPlayingAudioId(null);
    }
  };

  // Nhóm các reaction theo emoji để hiển thị số lượng
  const getGroupedReactions = (reactions?: Message["reactions"]) => {
    if (!reactions || reactions.length === 0) return [];
    const map: Record<string, { count: number; reactedByMe: boolean }> = {};
    reactions.forEach((r) => {
      const emoji = r.emoji;
      const isMine =
        (typeof r.userId === "string" ? r.userId : r.userId?._id) === user?._id;
      if (!map[emoji]) {
        map[emoji] = { count: 0, reactedByMe: false };
      }
      map[emoji].count++;
      if (isMine) map[emoji].reactedByMe = true;
    });
    return Object.entries(map);
  };

  // Format giây thành 00:00
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Nếu chưa chọn hội thoại, hiển thị màn hình chào mừng
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
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-card rounded-3xl border border-border/60 shadow-lg overflow-hidden relative">
      {/* ================= CHAT HEADER ================= */}
      <header className="px-4 sm:px-6 py-3 border-b border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-between">
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            onClick={() => setFoodRouletteOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full gap-1.5 shadow-sm text-xs px-3 py-1.5"
          >
            <Dices className="size-3.5" />
            <span className="hidden sm:inline">Hôm Nay Ăn Gì?</span>
            <span className="sm:hidden">Ăn gì?</span>
          </Button>

          {/* Nút Tìm kiếm tin nhắn nhanh */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`size-8 rounded-full ${
              isSearchOpen ? "bg-primary/20 text-primary" : "text-muted-foreground"
            }`}
            title="Tìm kiếm tin nhắn"
          >
            <Search className="size-4" />
          </Button>

          {/* Nút Mở Sổ Tay Ẩm Thực & Yêu Thích */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBookmarkModalOpen(true)}
            className="size-8 rounded-full text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10"
            title="Sổ tay ẩm thực & Yêu thích ⭐"
          >
            <Bookmark className="size-4" />
          </Button>

          {/* Menu Tùy Chọn Nâng Cao: Cấp quyền thông báo, Thử bong bóng chat */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 rounded-full" title="Tùy chọn khác">
                <MoreVertical className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-1.5 shadow-xl border-border/80">
              <DropdownMenuLabel className="text-xs font-bold text-muted-foreground px-2 py-1">
                Tiện ích & Thông báo
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={toggleChatHead}
                className="cursor-pointer rounded-xl flex items-center justify-between text-xs py-2"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="size-4 text-pink-500" />
                  <span>Bong bóng chat nổi</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isChatHeadVisible
                      ? "bg-pink-500/20 text-pink-600 dark:text-pink-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isChatHeadVisible ? "Đang bật" : "Tắt"}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={async () => {
                  const granted = await requestPermission();
                  if (granted) {
                    toast.success("Đã bật quyền thông báo trình duyệt! 🔔");
                  } else {
                    toast.info("Vui lòng cho phép quyền thông báo trong trình duyệt của bạn.");
                  }
                }}
                className="cursor-pointer rounded-xl flex items-center gap-2 text-xs py-2"
              >
                <Bell className="size-4 text-purple-500" />
                <span>Bật thông báo đẩy</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  triggerSampleNotification(
                    otherUser?.displayName || "Người Yêu 💕",
                    "Em nhớ anh quá nè! Tối nay mình đi ăn gì nha? 🥰"
                  );
                  toast.success("Đã phát chuông ding và hiện bong bóng chat mẫu! 💕");
                }}
                className="cursor-pointer rounded-xl flex items-center gap-2 text-xs py-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 font-semibold"
              >
                <BellRing className="size-4 text-pink-500" />
                <span>Thử thông báo & Bong bóng</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1" />

              <DropdownMenuItem
                onClick={() => setBookmarkModalOpen(true)}
                className="cursor-pointer rounded-xl flex items-center gap-2 text-xs py-2 text-amber-600 dark:text-amber-400"
              >
                <Bookmark className="size-4" />
                <span>Sổ tay ẩm thực & Yêu thích ⭐</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* ================= THANH TÌM KIẾM TIN NHẮN INLINE (TELEGRAM STYLE) ================= */}
      {isSearchOpen && (
        <div className="px-4 py-2 bg-muted/60 border-b border-border/60 flex items-center gap-2 animate-in slide-in-from-top-2 duration-150">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm nội dung tin nhắn..."
            className="h-8 text-xs bg-background/80 rounded-xl"
            autoFocus
          />
          {searchQuery && (
            <span className="text-[11px] text-muted-foreground shrink-0 font-medium">
              {displayedMessages.length} kết quả
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
            className="size-7 rounded-full text-muted-foreground hover:text-foreground shrink-0"
          >
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      {/* ================= THANH GHIM TIN NHẮN (PINNED MESSAGE BANNER) ================= */}
      {activeConvo?.pinnedMessage && (
        <div className="px-4 py-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border-b border-pink-500/20 flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-150">
          <div
            onClick={() => scrollToMessage(activeConvo.pinnedMessage?.messageId)}
            className="flex items-center gap-2 overflow-hidden cursor-pointer flex-1 mr-2 hover:opacity-90 transition-opacity"
            title="Bấm để cuộn đến tin nhắn này"
          >
            <Pin className="size-3.5 text-pink-500 shrink-0 fill-pink-500" />
            <div className="truncate">
              <span className="font-bold text-foreground mr-1.5">
                {activeConvo.pinnedMessage.senderName || "Tin nhắn ghim"}:
              </span>
              <span className="text-muted-foreground">
                "{activeConvo.pinnedMessage.content}"
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => unpinMessage(activeConvo._id)}
            className="size-6 rounded-full hover:bg-pink-500/20 text-muted-foreground hover:text-pink-600 shrink-0"
            title="Bỏ ghim tin nhắn"
          >
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      {/* ================= MESSAGE STREAM ================= */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-3 bg-muted/10 scroll-touch custom-scrollbar">
        {displayedMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <span className="text-4xl mb-2">💬</span>
            <p className="text-sm font-semibold">
              {searchQuery ? "Không tìm thấy tin nhắn phù hợp" : "Chưa có tin nhắn nào ở đây."}
            </p>
            <p className="text-xs">
              {searchQuery ? "Hãy thử tìm bằng từ khóa khác nhé!" : "Hãy gửi lời chào đầu tiên hoặc rủ nhau đi ăn nào! 🥰"}
            </p>
          </div>
        ) : (
          displayedMessages.map((msg) => {
            const isMine = msg.senderId === user?._id;
            const isFoodCard =
              msg.content && msg.content.includes("🍽️ [Gợi ý món ăn]:");
            const stickerSrc = msg.imgURL || msg.imgUrl;
            const isSticker = Boolean(stickerSrc);
            const isAudio = Boolean(msg.audioURL);
            const isRecalled = Boolean(msg.isRecalled);
            const groupedReactions = getGroupedReactions(msg.reactions);

            const timeStr = msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <div
                key={msg._id}
                id={`msg-${msg._id}`}
                className={`w-full flex my-1 group/msg transition-all duration-150 ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 max-w-[85%] sm:max-w-[75%] ${
                    isMine ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* BONG BÓNG TIN NHẮN (Ấn giữ trên điện thoại hoặc click chuột phải trên máy tính để mở menu) */}
                  <div
                    className={`flex flex-col min-w-0 no-callout ${
                      isMine ? "items-end" : "items-start"
                    }`}
                    onTouchStart={(e) => handleTouchStart(e, msg)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onContextMenu={(e) => handleContextMenu(e, msg)}
                  >
                    {/* 1. TIN NHẮN ĐÃ ĐƯỢC THU HỒI */}
                    {isRecalled ? (
                      <div className="max-w-full">
                        <div className="px-3.5 py-2 rounded-2xl text-xs italic text-muted-foreground flex items-center gap-2 bg-muted/30 border border-border/40 select-none">
                          <Ban className="size-3.5 text-muted-foreground/60" />
                          <span>Tin nhắn đã được thu hồi</span>
                        </div>
                        <span
                          className={`text-[10px] text-muted-foreground block px-1 mt-0.5 ${
                            isMine ? "text-right" : "text-left"
                          }`}
                        >
                          {timeStr}
                        </span>
                      </div>
                    ) : isAudio ? (
                      /* 2. TIN NHẮN THOẠI (VOICE NOTE AUDIO PLAYER - TELEGRAM STYLE) */
                      <div className="max-w-full">
                        <div
                          className={`p-3 rounded-2xl flex items-center gap-3 shadow-sm ${
                            isMine
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-xs"
                              : "bg-card text-foreground border border-border/80 rounded-bl-xs"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => togglePlayAudio(msg._id, msg.audioURL || undefined)}
                            className={`size-10 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 ${
                              isMine
                                ? "bg-white text-pink-600"
                                : "bg-pink-500 text-white"
                            }`}
                          >
                            {playingAudioId === msg._id ? (
                              <Pause className="size-5 fill-current" />
                            ) : (
                              <Play className="size-5 fill-current ml-0.5" />
                            )}
                          </button>

                          {/* Thanh hiển thị sóng âm / tiến trình */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Volume2 className="size-3.5 opacity-80" />
                              <span className="text-xs font-bold">
                                Tin nhắn thoại ({msg.audioDuration ? `${msg.audioDuration}s` : "Ghi âm"})
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 h-3">
                              {[3, 7, 12, 6, 14, 9, 5, 11, 4, 8, 13, 6, 10, 4].map((h, i) => (
                                <span
                                  key={i}
                                  style={{ height: `${h}px` }}
                                  className={`w-1 rounded-full ${
                                    playingAudioId === msg._id
                                      ? "bg-amber-300 animate-pulse"
                                      : isMine
                                      ? "bg-white/60"
                                      : "bg-pink-500/60"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] text-muted-foreground block px-1 mt-0.5 ${
                            isMine ? "text-right" : "text-left"
                          }`}
                        >
                          {timeStr}
                        </span>
                      </div>
                    ) : isFoodCard ? (
                      /* 3. THẺ GỢI Ý MÓN ĂN */
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
                      /* 4. NHÃN DÁN STICKER */
                      <div className="max-w-full flex flex-col my-1 group">
                        {msg.replyTo && (
                          <div
                            onClick={() => scrollToMessage(msg.replyTo?.messageId)}
                            className={`mb-1 px-2.5 py-1 rounded-xl text-xs flex flex-col cursor-pointer transition-opacity hover:opacity-100 ${
                              isMine
                                ? "bg-muted/80 text-foreground border-l-2 border-primary/80 self-end"
                                : "bg-muted/80 text-foreground border-l-2 border-primary/80 self-start"
                            }`}
                          >
                            <span className="font-bold text-[10px] flex items-center gap-1 opacity-90">
                              <CornerUpLeft className="size-2.5 inline" />
                              {msg.replyTo.senderName || "Người dùng"}
                            </span>
                            <span className="truncate text-[10px] opacity-80 max-w-xs">
                              {msg.replyTo.content || "[Hình ảnh/Nhãn dán]"}
                            </span>
                          </div>
                        )}

                        <div className="p-1 rounded-3xl hover:bg-muted/40 transition-colors inline-block">
                          <img
                            src={stickerSrc || ""}
                            alt={msg.content || "Sticker"}
                            onClick={() => stickerSrc && openLightbox(stickerSrc, "Nhãn dán")}
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
                      /* 5. BONG BÓNG TIN NHẮN VĂN BẢN TIÊU CHUẨN */
                      <div className="max-w-full">
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-sm ${
                            isMine
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-br-xs"
                              : "bg-card text-foreground border border-border/80 rounded-bl-xs"
                          }`}
                        >
                          {msg.replyTo && (
                            <div
                              onClick={() => scrollToMessage(msg.replyTo?.messageId)}
                              className={`mb-2 px-2.5 py-1 rounded-xl text-xs flex flex-col cursor-pointer transition-opacity hover:opacity-100 ${
                                isMine
                                  ? "bg-white/20 text-white/95 border-l-2 border-white/80"
                                  : "bg-muted/80 text-foreground border-l-2 border-primary/80"
                              }`}
                            >
                              <span className="font-bold text-[10px] flex items-center gap-1 opacity-90">
                                <CornerUpLeft className="size-2.5 inline" />
                                {msg.replyTo.senderName || "Người dùng"}
                              </span>
                              <span className="truncate text-[10px] opacity-80 max-w-xs">
                                {msg.replyTo.content || "[Hình ảnh/Nhãn dán]"}
                              </span>
                            </div>
                          )}

                          {msg.content}
                        </div>

                        <span
                          className={`text-[10px] text-muted-foreground block px-1 mt-0.5 ${
                            isMine ? "text-right" : "text-left"
                          }`}
                        >
                          {msg._id.startsWith("temp-") ? "Đang gửi... ✨" : timeStr}
                        </span>
                      </div>
                    )}

                    {/* DANH SÁCH BIỂU TƯỢNG CẢM XÚC (REACTIONS BADGE) */}
                    {groupedReactions.length > 0 && !isRecalled && (
                      <div
                        className={`flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-full text-[11px] bg-background/90 dark:bg-zinc-800/90 border border-border/70 shadow-xs select-none ${
                          isMine ? "self-end" : "self-start"
                        }`}
                      >
                        {groupedReactions.map(([emoji, info]) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => toggleMessageReaction(msg._id, emoji)}
                            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full transition-transform hover:scale-115 ${
                              info.reactedByMe
                                ? "bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold border border-pink-500/30"
                                : "hover:bg-muted text-foreground"
                            }`}
                            title={
                              info.reactedByMe
                                ? "Bạn đã thả cảm xúc này (Bấm để gỡ)"
                                : "Bấm để thả cảm xúc"
                            }
                          >
                            <span>{emoji}</span>
                            {info.count > 1 && (
                              <span className="text-[10px]">{info.count}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* THANH CÔNG CỤ HOVER: NẰM NGAY CẠNH BONG BÓNG TIN NHẮN (KHÔNG BỊ LỆCH HOẶC TRÀN THANH TRƯỢT) */}
                  {!isRecalled && !msg._id.startsWith("temp-") && (
                    <div
                      className="opacity-0 group-hover/msg:opacity-100 focus-within:opacity-100 transition-opacity duration-150 flex items-center gap-0.5 bg-background/95 dark:bg-zinc-900/95 border border-border/80 rounded-full px-1.5 py-0.5 shadow-md backdrop-blur-xs shrink-0 self-center"
                    >
                      {/* Nút Thả Cảm Xúc */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveReactionPickerId(
                              activeReactionPickerId === msg._id ? null : msg._id
                            )
                          }
                          className="size-6 rounded-full hover:bg-muted flex items-center justify-center text-xs text-muted-foreground hover:text-pink-500 transition-colors"
                          title="Bày tỏ cảm xúc"
                        >
                          <Smile className="size-3.5" />
                        </button>

                        {/* Bảng emoji thả nhanh */}
                        {activeReactionPickerId === msg._id && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setActiveReactionPickerId(null)}
                            />
                            <div
                              className={`absolute bottom-full mb-1.5 ${
                                isMine ? "right-0" : "left-0"
                              } flex items-center gap-1 bg-card/95 backdrop-blur-md border border-border/90 rounded-full p-1.5 shadow-xl z-40 animate-in zoom-in-90 duration-150`}
                            >
                              {QUICK_EMOJIS.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => {
                                    triggerHaptic("light");
                                    toggleMessageReaction(msg._id, emoji);
                                    setActiveReactionPickerId(null);
                                  }}
                                  className="size-7 rounded-full hover:bg-muted flex items-center justify-center text-base transition-transform hover:scale-135 active:scale-95"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Nút Trả Lời (Reply) */}
                      <button
                        type="button"
                        onClick={() => setReplyingToMessage(msg)}
                        className="size-6 rounded-full hover:bg-muted flex items-center justify-center text-xs text-muted-foreground hover:text-primary transition-colors"
                        title="Trả lời tin nhắn này"
                      >
                        <CornerUpLeft className="size-3.5" />
                      </button>

                      {/* Nút Ghim tin nhắn (Pin) */}
                      <button
                        type="button"
                        onClick={() => pinMessage(activeConvo._id, msg._id)}
                        className="size-6 rounded-full hover:bg-muted flex items-center justify-center text-xs text-muted-foreground hover:text-amber-500 transition-colors"
                        title="Ghim tin nhắn này lên đầu"
                      >
                        <Pin className="size-3.5" />
                      </button>

                      {/* Nút Lưu vào Sổ tay ẩm thực & Yêu thích (Bookmark) */}
                      <button
                        type="button"
                        onClick={() => {
                          addBookmark({
                            type: "message",
                            targetId: msg._id,
                            title: `Tin nhắn từ ${msg.sender?.displayName || "Bạn"}`,
                            content: msg.content || "",
                            emoji: "⭐",
                          });
                        }}
                        className="size-6 rounded-full hover:bg-amber-500/10 flex items-center justify-center text-xs text-muted-foreground hover:text-amber-500 transition-colors"
                        title="Lưu vào Sổ tay yêu thích"
                      >
                        <Bookmark className="size-3.5" />
                      </button>

                      {/* Nút Thu hồi tin nhắn */}
                      {isMine && (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Bạn có chắc chắn muốn thu hồi tin nhắn này không?"
                              )
                            ) {
                              recallMessage(msg._id);
                            }
                          }}
                          className="size-6 rounded-full hover:bg-red-500/10 flex items-center justify-center text-xs text-muted-foreground hover:text-red-500 transition-colors"
                          title="Thu hồi tin nhắn"
                        >
                          <Undo2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator bubble */}
        {currentTyping?.isTyping && currentTyping.userId !== user?._id && (
          <div className="flex items-end gap-2.5 my-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="size-8 rounded-full bg-pink-100 dark:bg-pink-950/40 text-pink-500 flex items-center justify-center text-xs font-bold border border-pink-200">
              💕
            </div>
            <div className="bg-muted/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl rounded-bl-sm border border-border/50 flex items-center gap-1.5 shadow-xs">
              <span className="text-xs text-muted-foreground font-medium mr-1">
                {currentTyping.displayName || "Người yêu"} đang soạn tin
              </span>
              <span className="size-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="size-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="size-1.5 bg-pink-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ================= CHAT INPUT TOOLBAR ================= */}
      <footer className="p-3 sm:p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm space-y-2 relative safe-area-bottom">
        {/* THANH XEM TRƯỚC TIN NHẮN ĐANG TRẢ LỜI */}
        {replyingToMessage && (
          <div className="px-4 py-2 bg-pink-500/10 dark:bg-pink-950/30 border border-pink-500/20 rounded-2xl flex items-center justify-between text-xs animate-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center gap-2 overflow-hidden">
              <CornerUpLeft className="size-4 text-pink-500 shrink-0" />
              <div className="truncate">
                <span className="font-bold text-foreground mr-1">
                  Đang trả lời{" "}
                  {replyingToMessage.sender?.displayName || "Người dùng"}:
                </span>
                <span className="text-muted-foreground italic">
                  "{replyingToMessage.content || (replyingToMessage.imgURL ? "[Nhãn dán]" : "")}"
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setReplyingToMessage(null)}
              className="size-6 rounded-full hover:bg-pink-500/20 text-muted-foreground hover:text-pink-600 shrink-0"
              title="Hủy trả lời"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        )}

        {/* Floating Sticker Picker Popover */}
        {showStickerPicker && (
          <div className="absolute bottom-20 left-4 z-40">
            <StickerPicker
              onSelectSticker={handleSelectSticker}
              onClose={() => setShowStickerPicker(false)}
            />
          </div>
        )}

        {/* THANH GHI ÂM TIN NHẮN THOẠI (KHI ĐANG GHI ÂM) */}
        {isRecording ? (
          <div className="flex items-center justify-between p-2 px-4 bg-red-500/10 border border-red-500/30 rounded-2xl animate-pulse">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                Đang ghi âm... {formatTime(recordingSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={cancelRecording}
                className="h-8 text-xs text-muted-foreground hover:text-red-500 gap-1 rounded-xl"
              >
                <Trash2 className="size-3.5" /> Hủy
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={stopAndSendRecording}
                className="h-8 text-xs font-bold bg-pink-500 hover:bg-pink-600 text-white rounded-xl gap-1"
              >
                <Send className="size-3.5" /> Gửi
              </Button>
            </div>
          </div>
        ) : (
          <>
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

            {/* Input Field & Action Buttons */}
            <form onSubmit={handleSend} className="flex items-center gap-1.5 sm:gap-2">
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
                onChange={handleInputChange}
                placeholder={
                  replyingToMessage
                    ? `Nhập câu trả lời cho ${replyingToMessage.sender?.displayName || "tin nhắn"}...`
                    : `Nhắn tin cho ${chatTitle}...`
                }
                className="flex-1 bg-muted/30 border-border/80 rounded-2xl px-4 py-2 text-sm focus-visible:ring-primary/40"
              />

              {/* Nút Ghi Âm Voice Note (Hiện khi ô nhập liệu trống - như Telegram/Messenger) */}
              {!inputContent.trim() ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startRecording}
                  className="size-10 rounded-2xl text-muted-foreground hover:text-pink-600 hover:bg-pink-500/10 shrink-0 transition-transform active:scale-95"
                  title="Nhấn để ghi âm tin nhắn thoại"
                >
                  <Mic className="size-5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="size-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 shrink-0"
                >
                  <Send className="size-4" />
                </Button>
              )}
            </form>
          </>
        )}
      </footer>

      {/* ================= MODAL THAO TÁC TIN NHẮN KHI ẤN GIỮ TRÊN MOBILE (TELEGRAM / MESSENGER STYLE) ================= */}
      {activeActionMessage && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-end sm:justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] animate-in fade-in duration-150 select-none"
          onClick={() => setActiveActionMessage(null)}
        >
          <div
            className="w-full max-w-sm flex flex-col items-center gap-3 animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. THANH THẢ CẢM XÚC NHANH (QUICK REACTIONS) */}
            <div className="flex items-center justify-around w-full bg-card/95 backdrop-blur-xl border border-border/80 rounded-full px-4 py-2.5 shadow-2xl">
              {QUICK_EMOJIS.map((emoji) => {
                const hasReacted = activeActionMessage.reactions?.some(
                  (r) => r.userId === user?._id && r.emoji === emoji
                );
                return (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      triggerHaptic("light");
                      toggleMessageReaction(activeActionMessage._id, emoji);
                      setActiveActionMessage(null);
                    }}
                    className={`text-2xl sm:text-3xl p-1 rounded-full transition-transform hover:scale-130 active:scale-90 ${
                      hasReacted
                        ? "bg-pink-500/20 scale-110 ring-2 ring-pink-500/50"
                        : "hover:bg-muted"
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>

            {/* 2. BẢN XEM TRƯỚC TIN NHẮN ĐANG CHỌN (MINI PREVIEW) */}
            <div className="w-full px-4 py-2.5 bg-card/90 backdrop-blur-md rounded-2xl border border-border/60 text-xs text-muted-foreground shadow-sm flex items-center justify-between">
              <span className="font-bold text-foreground truncate mr-2 shrink-0">
                {activeActionMessage.senderId === user?._id
                  ? "Tin nhắn của bạn"
                  : otherUser?.displayName || "Người yêu"}
              </span>
              <span className="truncate max-w-[200px] italic">
                "{activeActionMessage.content || "[Hình ảnh/Nhãn dán]"}"
              </span>
            </div>

            {/* 3. MENU HÀNH ĐỘNG DẠNG THẺ (CARD ACTIONS) */}
            <div className="w-full bg-card/95 backdrop-blur-xl border border-border/80 rounded-3xl p-1.5 shadow-2xl divide-y divide-border/40 text-xs font-semibold">
              {/* Trả lời */}
              <button
                type="button"
                onClick={() => {
                  setReplyingToMessage(activeActionMessage);
                  setActiveActionMessage(null);
                  triggerHaptic("selection");
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted active:bg-muted/80 text-foreground transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CornerUpLeft className="size-4 text-pink-500" />
                  <span>Trả lời tin nhắn này</span>
                </div>
              </button>

              {/* Sao chép văn bản (nếu có nội dung) */}
              {activeActionMessage.content && (
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(activeActionMessage.content || "");
                    toast.success("Đã sao chép nội dung tin nhắn! 📋");
                    triggerHaptic("selection");
                    setActiveActionMessage(null);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted active:bg-muted/80 text-foreground transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Copy className="size-4 text-sky-500" />
                    <span>Sao chép nội dung</span>
                  </div>
                </button>
              )}

              {/* Ghim tin nhắn */}
              <button
                type="button"
                onClick={() => {
                  pinMessage(activeConvo._id, activeActionMessage._id);
                  toast.success("Đã ghim tin nhắn lên đầu đoạn chat! 📌");
                  triggerHaptic("selection");
                  setActiveActionMessage(null);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted active:bg-muted/80 text-foreground transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Pin className="size-4 text-amber-500" />
                  <span>Ghim lên đầu đoạn chat</span>
                </div>
              </button>

              {/* Lưu vào Sổ tay ẩm thực */}
              <button
                type="button"
                onClick={() => {
                  addBookmark({
                    type: "message",
                    targetId: activeActionMessage._id,
                    title: `Tin nhắn từ ${
                      activeActionMessage.sender?.displayName || "Bạn"
                    }`,
                    content: activeActionMessage.content || "",
                    emoji: "⭐",
                  });
                  toast.success("Đã lưu vào Sổ tay ẩm thực & Yêu thích! ⭐");
                  triggerHaptic("selection");
                  setActiveActionMessage(null);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-muted active:bg-muted/80 text-foreground transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="size-4 text-amber-500" />
                  <span>Lưu vào Sổ tay yêu thích</span>
                </div>
              </button>

              {/* Thu hồi tin nhắn (Nếu là của người dùng và chưa thu hồi) */}
              {activeActionMessage.senderId === user?._id &&
                !activeActionMessage.isRecalled && (
                  <button
                    type="button"
                    onClick={() => {
                      recallMessage(activeActionMessage._id);
                      toast.success("Đã thu hồi tin nhắn thành công! 🚫");
                      triggerHaptic("warning");
                      setActiveActionMessage(null);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-rose-500/10 active:bg-rose-500/20 text-rose-500 transition-colors"
                  >
                    <div className="flex items-center gap-3 font-bold">
                      <Undo2 className="size-4 text-rose-500" />
                      <span>Thu hồi tin nhắn</span>
                    </div>
                  </button>
                )}
            </div>

            {/* Nút Đóng / Hủy */}
            <Button
              variant="outline"
              onClick={() => setActiveActionMessage(null)}
              className="w-full h-11 rounded-2xl font-bold text-xs bg-card/90"
            >
              Đóng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindowLayout;
