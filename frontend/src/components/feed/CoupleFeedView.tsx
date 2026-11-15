import React, { useState, useEffect } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { ALL_FOOD_DISHES, type FoodDish } from "@/data/foodsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Lock,
  Image as ImageIcon,
  UtensilsCrossed,
  Trash2,
  Send,
  Smile,
  Sparkles,
  MapPin,
  X,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import type { Post } from "@/types/post";

const FEELINGS = [
  { label: "🥰 Đang hạnh phúc", value: "🥰 Đang hạnh phúc" },
  { label: "🤤 Đang thèm ăn", value: "🤤 Đang thèm ăn" },
  { label: "💖 Yêu bạn nhiều", value: "💖 Yêu bạn nhiều" },
  { label: "☕ Đang hẹn hò", value: "☕ Đang hẹn hò" },
  { label: "🥺 Nhớ bạn quá", value: "🥺 Nhớ bạn quá" },
  { label: "🍳 Vào bếp nấu ăn", value: "🍳 Vào bếp nấu ăn" },
  { label: "🥳 Kỷ niệm vui", value: "🥳 Kỷ niệm vui" },
];

const REACTION_TYPES = [
  { type: "love" as const, emoji: "❤️", label: "Yêu thích" },
  { type: "heart" as const, emoji: "🥰", label: "Thương thương" },
  { type: "yummy" as const, emoji: "🤤", label: "Thèm ăn" },
  { type: "sad" as const, emoji: "🥺", label: "Dỗi nha" },
  { type: "like" as const, emoji: "👍", label: "Thích" },
];

const formatRelativeTime = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return "Vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return `Hôm qua lúc ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    return "";
  }
};

export const CoupleFeedView: React.FC = () => {
  const { user } = useAuthStore();
  const { setFoodRouletteOpen } = useChatStore();
  const {
    posts,
    partner,
    hasPartner,
    loading,
    submitting,
    postComments,
    loadingComments,
    fetchFeed,
    createPost,
    toggleReaction,
    deletePost,
    fetchComments,
    addComment,
  } = usePostStore();

  // Create post states
  const [content, setContent] = useState("");
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [showFoodPicker, setShowFoodPicker] = useState(false);
  const [foodSearch, setFoodSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState<FoodDish | null>(null);

  // Active expanded comments
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [hoveredReactionPostId, setHoveredReactionPostId] = useState<string | null>(null);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    setAttachedImages([...attachedImages, imageUrl.trim()]);
    setImageUrl("");
    setShowImageInput(false);
  };

  const handleRemoveImage = (index: number) => {
    setAttachedImages(attachedImages.filter((_, i) => i !== index));
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && attachedImages.length === 0 && !selectedFood) return;

    const success = await createPost({
      content: content.trim() || (selectedFood ? `Hôm nay chúng mình ăn ${selectedFood.name} nhé! 🍽️` : "Khoảnh khắc mới 💕"),
      images: attachedImages,
      foodDish: selectedFood
        ? {
            name: selectedFood.name,
            category: selectedFood.category,
            emoji: selectedFood.emoji,
          }
        : undefined,
      feeling: selectedFeeling || undefined,
    });

    if (success) {
      setContent("");
      setSelectedFeeling("");
      setShowFeelingPicker(false);
      setAttachedImages([]);
      setSelectedFood(null);
      setShowFoodPicker(false);
    }
  };

  const toggleCommentsSection = (postId: string) => {
    const isOpen = !openComments[postId];
    setOpenComments({ ...openComments, [postId]: isOpen });
    if (isOpen && !postComments[postId]) {
      fetchComments(postId);
    }
  };

  const handleSendComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const ok = await addComment(postId, text);
    if (ok) {
      setCommentInputs({ ...commentInputs, [postId]: "" });
    }
  };

  const filteredDishes = foodSearch.trim()
    ? ALL_FOOD_DISHES.filter(
        (d) =>
          d.name.toLowerCase().includes(foodSearch.toLowerCase()) ||
          d.category.toLowerCase().includes(foodSearch.toLowerCase())
      ).slice(0, 8)
    : ALL_FOOD_DISHES.slice(0, 8);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background/50 custom-scrollbar">
      {/* ================= TOP HERO BANNER ================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-rose-500/15 border-b border-border/60 py-6 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="relative flex items-center">
              <Avatar className="size-14 border-2 border-pink-400 shadow-md ring-2 ring-background">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="bg-pink-100 dark:bg-pink-950 font-bold text-pink-600">
                  {user?.displayName?.slice(0, 2).toUpperCase() || "ME"}
                </AvatarFallback>
              </Avatar>
              {partner ? (
                <Avatar className="size-14 -ml-4 border-2 border-purple-400 shadow-md ring-2 ring-background">
                  <AvatarImage src={partner.avatarUrl} />
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-950 font-bold text-purple-600">
                    {partner.displayName?.slice(0, 2).toUpperCase() || "YOU"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="size-14 -ml-4 rounded-full border-2 border-dashed border-pink-300 dark:border-pink-800 bg-background/80 flex items-center justify-center text-xs font-semibold text-muted-foreground shadow-sm">
                  +1 💕
                </div>
              )}
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                Nhật Ký Cặp Đôi <span className="text-pink-500">💕</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5 font-medium">
                <Lock className="size-3.5 text-emerald-500" />
                Mạng xã hội riêng tư chỉ 2 người • Mã hóa AES-256-GCM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchFeed()}
              disabled={loading}
              className="rounded-xl border-border/80 gap-1.5 shadow-xs"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              Làm mới
            </Button>
            <Button
              size="sm"
              onClick={() => setFoodRouletteOpen(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl gap-1.5 shadow-sm"
            >
              <Sparkles className="size-3.5" />
              Quay món ăn
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* ================= NO PARTNER WARNING ================= */}
        {!hasPartner && (
          <div className="p-6 rounded-3xl bg-pink-50/80 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/40 text-center space-y-3">
            <div className="size-12 rounded-2xl bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 mx-auto flex items-center justify-center text-2xl">
              💌
            </div>
            <h3 className="font-bold text-lg text-foreground">
              Bắt đầu dòng thời gian tình yêu của bạn
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Hãy kết bạn với người ấy ở mục <b>"Bạn bè & Người yêu"</b> bên thanh bên trái để cùng nhau chia sẻ bài viết, lưu giữ kỷ niệm và bình luận nhé!
            </p>
          </div>
        )}

        {/* ================= FACEBOOK-STYLE POST COMPOSER ================= */}
        {hasPartner && (
          <div className="bg-card rounded-3xl border border-border/80 shadow-md p-4 sm:p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="size-10 border border-border shadow-xs">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="bg-primary/10 font-bold text-primary">
                  {user?.displayName?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-foreground">
                    {user?.displayName || user?.username}
                  </span>
                  {selectedFeeling && (
                    <span className="text-xs bg-pink-500/10 text-pink-600 dark:text-pink-400 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      {selectedFeeling}
                      <button
                        type="button"
                        onClick={() => setSelectedFeeling("")}
                        className="hover:opacity-75 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedFood && (
                    <span className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      {selectedFood.emoji} {selectedFood.name}
                      <button
                        type="button"
                        onClick={() => setSelectedFood(null)}
                        className="hover:opacity-75 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>

                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`Hôm nay bạn muốn nhắn gửi điều gì với ${partner?.displayName || "người ấy"}? 💕`}
                  className="w-full resize-none border-0 focus-visible:ring-0 p-0 text-base sm:text-lg placeholder:text-muted-foreground/60 min-h-[70px] bg-transparent"
                />
              </div>
            </div>

            {/* Attached Images preview */}
            {attachedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {attachedImages.map((img, i) => (
                  <div key={i} className="relative group rounded-2xl overflow-hidden border border-border shadow-xs">
                    <img src={img} alt="attached" className="w-24 h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Image input panel */}
            {showImageInput && (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-2xl border border-dashed border-border animate-in fade-in duration-200">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Dán đường dẫn ảnh (URL ảnh kỷ niệm, ảnh món ăn)..."
                  className="rounded-xl text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImage();
                    }
                  }}
                />
                <Button size="sm" onClick={handleAddImage} className="rounded-xl font-bold">
                  Thêm
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowImageInput(false)}
                  className="rounded-xl"
                >
                  <X className="size-4" />
                </Button>
              </div>
            )}

            {/* Food picker panel */}
            {showFoodPicker && (
              <div className="p-3 bg-muted/30 rounded-2xl border border-border space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <UtensilsCrossed className="size-3.5 text-amber-500" /> Chọn món ăn kèm bài viết
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFoodPicker(false)}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    Đóng
                  </button>
                </div>
                <Input
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="Tìm món ăn yêu thích..."
                  className="rounded-xl text-xs h-8"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-36 overflow-y-auto">
                  {filteredDishes.map((dish, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedFood(dish);
                        setShowFoodPicker(false);
                      }}
                      className="flex items-center gap-1.5 p-2 rounded-xl text-left bg-background border hover:border-primary/50 text-xs transition-colors"
                    >
                      <span>{dish.emoji}</span>
                      <span className="truncate font-medium">{dish.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feeling picker panel */}
            {showFeelingPicker && (
              <div className="p-3 bg-muted/30 rounded-2xl border border-border space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Smile className="size-3.5 text-pink-500" /> Chọn cảm xúc hôm nay
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFeelingPicker(false)}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    Đóng
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FEELINGS.map((f, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedFeeling(f.value);
                        setShowFeelingPicker(false);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border hover:border-pink-500 hover:text-pink-500 transition-colors"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Composer Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="rounded-xl gap-1.5 text-xs text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10"
                >
                  <ImageIcon className="size-4 text-emerald-500" />
                  <span className="hidden sm:inline">Ảnh</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFoodPicker(!showFoodPicker)}
                  className="rounded-xl gap-1.5 text-xs text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10"
                >
                  <UtensilsCrossed className="size-4 text-amber-500" />
                  <span className="hidden sm:inline">Món ăn</span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeelingPicker(!showFeelingPicker)}
                  className="rounded-xl gap-1.5 text-xs text-muted-foreground hover:text-purple-500 hover:bg-purple-500/10"
                >
                  <Smile className="size-4 text-purple-500" />
                  <span className="hidden sm:inline">Cảm xúc</span>
                </Button>
              </div>

              <Button
                onClick={handleSubmitPost}
                disabled={submitting || (!content.trim() && attachedImages.length === 0 && !selectedFood)}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl px-5 shadow-sm"
              >
                {submitting ? "Đang lưu..." : "Đăng bài 💕"}
              </Button>
            </div>
          </div>
        )}

        {/* ================= POSTS LIST ================= */}
        {posts.length === 0 && !loading && hasPartner && (
          <div className="text-center py-12 space-y-3 bg-card rounded-3xl border border-dashed border-border/80 p-8">
            <div className="text-4xl">📸✨</div>
            <h3 className="font-bold text-foreground text-base">Chưa có bài viết nào</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Hãy là người đầu tiên chia sẻ món ăn, hình ảnh hoặc một lời nhắn ngọt ngào cho người yêu nào!
            </p>
          </div>
        )}

        <div className="space-y-5">
          {posts.map((post: Post) => {
            const isOwnPost = post.authorId?._id === user?._id;
            const comments = postComments[post._id] || [];
            const isCommentsOpen = !!openComments[post._id];
            const myReaction = post.reactions?.find((r) => r.userId?._id === user?._id);

            // Group reactions by type for counters
            const reactionCounts = post.reactions?.reduce((acc, curr) => {
              acc[curr.type] = (acc[curr.type] || 0) + 1;
              return acc;
            }, {} as Record<string, number>) || {};

            return (
              <div
                key={post._id}
                className="bg-card rounded-3xl border border-border/80 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-4 sm:p-5 pb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11 border border-border shadow-xs">
                      <AvatarImage src={post.authorId?.avatarUrl} />
                      <AvatarFallback className="bg-primary/10 font-bold text-primary">
                        {post.authorId?.displayName?.slice(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-foreground">
                          {post.authorId?.displayName || post.authorId?.username}
                        </span>
                        {post.feeling && (
                          <span className="text-xs text-muted-foreground">
                            đang cảm thấy <span className="font-semibold text-foreground">{post.feeling}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground font-medium">
                        <span>{formatRelativeTime(post.createdAt)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[11px] bg-muted/60 px-2 py-0.5 rounded-full">
                          <Lock className="size-2.5 text-emerald-500" /> Chỉ 2 bạn thấy
                        </span>
                      </div>
                    </div>
                  </div>

                  {isOwnPost && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Bạn có chắc muốn xóa bài viết này không?")) {
                          deletePost(post._id);
                        }
                      }}
                      className="size-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="Xóa bài viết"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>

                {/* Post Content */}
                <div className="px-4 sm:px-5 py-2 space-y-3">
                  <p className="text-foreground text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </p>

                  {/* Attached Food Dish Card */}
                  {post.foodDish && (
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/20">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 flex items-center justify-center text-2xl shadow-xs">
                          {post.foodDish.emoji || "🥘"}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            {post.foodDish.category}
                          </div>
                          <div className="font-extrabold text-sm text-foreground">
                            {post.foodDish.name}
                          </div>
                        </div>
                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          post.foodDish.name + " gần đây"
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl text-xs gap-1.5 border-amber-500/30 hover:bg-amber-500/15"
                        >
                          <MapPin className="size-3 text-emerald-500" /> Tìm quán
                        </Button>
                      </a>
                    </div>
                  )}

                  {/* Attached Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-2xl overflow-hidden pt-1">
                      {post.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-video sm:aspect-square bg-muted/40 overflow-hidden rounded-xl border border-border/60">
                          <img
                            src={img}
                            alt="post attachment"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reactions Summary Bar */}
                <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between text-xs text-muted-foreground border-b border-border/50">
                  <div className="flex items-center gap-1.5">
                    {post.reactions && post.reactions.length > 0 ? (
                      <>
                        <div className="flex -space-x-1 items-center">
                          {Object.keys(reactionCounts).map((type) => {
                            const found = REACTION_TYPES.find((r) => r.type === type);
                            return (
                              <span
                                key={type}
                                className="size-5 rounded-full bg-background border flex items-center justify-center text-xs shadow-xs"
                              >
                                {found?.emoji || "❤️"}
                              </span>
                            );
                          })}
                        </div>
                        <span className="font-medium ml-1">
                          {post.reactions.length} lượt bày tỏ cảm xúc
                        </span>
                      </>
                    ) : (
                      <span>Hãy là người đầu tiên thả tim 💕</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCommentsSection(post._id)}
                    className="hover:underline font-medium"
                  >
                    {post.commentsCount || 0} bình luận
                  </button>
                </div>

                {/* Post Actions (Like & Comment) */}
                <div className="px-3 py-1 flex items-center justify-around relative">
                  {/* Floating Facebook Reaction Bar on Hover / Long Press */}
                  {hoveredReactionPostId === post._id && (
                    <div
                      onMouseEnter={() => setHoveredReactionPostId(post._id)}
                      onMouseLeave={() => setHoveredReactionPostId(null)}
                      className="absolute -top-12 left-4 bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-full px-3 py-1.5 flex items-center gap-2 z-30 animate-in fade-in zoom-in-90 duration-200"
                    >
                      {REACTION_TYPES.map((r) => (
                        <button
                          key={r.type}
                          type="button"
                          onClick={() => {
                            toggleReaction(post._id, r.type);
                            setHoveredReactionPostId(null);
                          }}
                          className="hover:scale-135 transition-transform duration-150 p-1 text-xl"
                          title={r.label}
                        >
                          {r.emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Reaction Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onMouseEnter={() => setHoveredReactionPostId(post._id)}
                    onClick={() => {
                      // Quick tap: toggle default "love" reaction
                      toggleReaction(post._id, myReaction ? myReaction.type : "love");
                    }}
                    className={`flex-1 rounded-2xl gap-2 font-bold text-xs py-2 ${
                      myReaction
                        ? "text-pink-600 dark:text-pink-400 bg-pink-500/10"
                        : "text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10"
                    }`}
                  >
                    <span className="text-base">
                      {myReaction
                        ? REACTION_TYPES.find((r) => r.type === myReaction.type)?.emoji || "❤️"
                        : "🤍"}
                    </span>
                    <span>
                      {myReaction
                        ? REACTION_TYPES.find((r) => r.type === myReaction.type)?.label || "Đã thả tim"
                        : "Thả cảm xúc"}
                    </span>
                  </Button>

                  {/* Comment Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCommentsSection(post._id)}
                    className="flex-1 rounded-2xl gap-2 font-bold text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 py-2"
                  >
                    <MessageCircle className="size-4" />
                    <span>Bình luận</span>
                  </Button>
                </div>

                {/* Comments Section */}
                {isCommentsOpen && (
                  <div className="p-4 sm:p-5 pt-3 bg-muted/20 border-t border-border/60 space-y-4 animate-in fade-in duration-200">
                    {/* Comments List */}
                    {loadingComments[post._id] ? (
                      <div className="text-center py-3 text-xs text-muted-foreground">
                        Đang tải bình luận...
                      </div>
                    ) : comments.length === 0 ? (
                      <div className="text-center py-2 text-xs text-muted-foreground italic">
                        Chưa có bình luận nào. Hãy gửi lời ngọt ngào đầu tiên nhé! 💕
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {comments.map((comment) => (
                          <div key={comment._id} className="flex items-start gap-2.5">
                            <Avatar className="size-8 border border-border mt-0.5">
                              <AvatarImage src={comment.authorId?.avatarUrl} />
                              <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                                {comment.authorId?.displayName?.slice(0, 2).toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 bg-background/80 border border-border/80 rounded-2xl p-3 shadow-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-xs text-foreground">
                                  {comment.authorId?.displayName || comment.authorId?.username}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {formatRelativeTime(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Comment Input */}
                    <div className="flex items-center gap-2 pt-2">
                      <Avatar className="size-8 border border-border">
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                          {user?.displayName?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 relative">
                        <Input
                          value={commentInputs[post._id] || ""}
                          onChange={(e) =>
                            setCommentInputs({
                              ...commentInputs,
                              [post._id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendComment(post._id);
                            }
                          }}
                          placeholder="Viết bình luận cho người yêu (Enter để gửi)..."
                          className="rounded-full text-xs pr-10 bg-background border-border/80"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendComment(post._id)}
                          disabled={!commentInputs[post._id]?.trim()}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:opacity-80 disabled:opacity-30 transition-opacity p-1"
                        >
                          <Send className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoupleFeedView;
