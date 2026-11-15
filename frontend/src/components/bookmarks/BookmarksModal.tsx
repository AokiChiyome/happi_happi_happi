import React, { useEffect, useState } from "react";
import { useBookmarkStore } from "@/stores/useBookmarkStore";
import { useChatStore } from "@/stores/useChatStore";
import {
  Bookmark as BookmarkIcon,
  X,
  Search,
  Trash2,
  Copy,
  UtensilsCrossed,
  MessageSquare,
  Sparkles,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const BookmarksModal: React.FC = () => {
  const { bookmarks, isOpen, setOpen, fetchBookmarks, removeBookmark } = useBookmarkStore();
  const { activeConversationId, sendMessage } = useChatStore();

  const [filterType, setFilterType] = useState<"all" | "dish" | "message">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchBookmarks();
    }
  }, [isOpen, fetchBookmarks]);

  if (!isOpen) return null;

  const filtered = bookmarks.filter((b) => {
    if (filterType !== "all" && b.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.content?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã sao chép vào bộ nhớ tạm! 📋");
  };

  const handleShareToChat = async (item: typeof bookmarks[0]) => {
    if (!activeConversationId) {
      toast.info("Hãy mở một cuộc trò chuyện để chia sẻ món này nhé!");
      return;
    }
    const text = item.type === "dish"
      ? `Em/Anh muốn rủ đi ăn món này nè: ${item.emoji} ${item.title}! 🍽️`
      : `Xem lại kỷ niệm này: "${item.content || item.title}" 💕`;

    await sendMessage(text);
    toast.success("Đã gửi vào cuộc trò chuyện! 💬");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-card w-full max-w-lg rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border/80 flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <BookmarkIcon className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-foreground leading-tight">
                Sổ Tay Ẩm Thực & Yêu Thích ⭐
              </h3>
              <p className="text-xs text-muted-foreground">
                Lưu giữ món ăn ngon và tin nhắn quan trọng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="size-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-3 sm:p-4 border-b border-border/60 space-y-2.5 bg-background">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm món ăn, tin nhắn đã lưu..."
              className="pl-9 h-9 rounded-xl text-xs bg-muted/40 border-border"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                filterType === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả ({bookmarks.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("dish")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 flex items-center gap-1 ${
                filterType === "dish"
                  ? "bg-amber-500 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <UtensilsCrossed className="size-3" /> Món ăn ({bookmarks.filter((b) => b.type === "dish").length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType("message")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 flex items-center gap-1 ${
                filterType === "message"
                  ? "bg-purple-600 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="size-3" /> Tin nhắn ({bookmarks.filter((b) => b.type === "message").length})
            </button>
          </div>
        </div>

        {/* List of bookmarks */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 custom-scrollbar">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <div className="text-4xl">📖✨</div>
              <h4 className="font-semibold text-sm text-foreground">
                {searchQuery ? "Không tìm thấy kết quả phù hợp" : "Sổ tay đang trống"}
              </h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Bấm vào biểu tượng ngôi sao ⭐ trên tin nhắn hoặc lưu món từ Vòng quay để đưa vào đây nhé!
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item._id}
                className="group p-3 rounded-2xl bg-card border border-border/70 hover:border-border transition-all flex items-start justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="size-10 rounded-xl bg-muted/60 text-lg flex items-center justify-center shrink-0 border border-border/50">
                    {item.emoji || (item.type === "dish" ? "🍱" : "💬")}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-foreground truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
                        {item.type === "dish" ? "Món ăn" : "Tin nhắn"}
                      </span>
                    </div>
                    {item.content && (
                      <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.content || item.title)}
                    title="Sao chép"
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  {activeConversationId && (
                    <button
                      type="button"
                      onClick={() => handleShareToChat(item)}
                      title="Gửi vào chat"
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Share2 className="size-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeBookmark(item._id)}
                    title="Xóa khỏi sổ tay"
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksModal;
