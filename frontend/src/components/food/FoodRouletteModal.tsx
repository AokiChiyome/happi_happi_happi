import React, { useState, useEffect, useRef } from "react";
import {
  FOOD_CATEGORIES,
  ALL_FOOD_DISHES,
  type FoodDish,
} from "@/data/foodsData";
import { useChatStore } from "@/stores/useChatStore";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Dices,
  RotateCcw,
  MapPin,
  Send,
  ArrowRight,
  Camera,
  Bookmark,
} from "lucide-react";
import { usePostStore } from "@/stores/usePostStore";
import { useBookmarkStore } from "@/stores/useBookmarkStore";
import { triggerHaptic } from "@/utils/haptics";
import { toast } from "sonner";

// Web Audio API Sound Generator cho vòng quay ẩm thực
class SoundFX {
  private ctx: AudioContext | null = null;

  private init() {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch (e) {}
  }

  playTick() {
    try {
      triggerHaptic("selection");
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        180,
        this.ctx.currentTime + 0.035
      );
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.ctx.currentTime + 0.035
      );
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playWin() {
    try {
      triggerHaptic("success");
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0.14, this.ctx!.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          this.ctx!.currentTime + i * 0.09 + 0.28
        );
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.09);
        osc.stop(this.ctx!.currentTime + i * 0.09 + 0.3);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

// Cấu hình thông số thanh cuộn CS:GO
const TARGET_INDEX = 32; // Vị trí thẻ kết quả trúng thưởng
const TOTAL_TRACK_ITEMS = 65; // Tổng số thẻ được tạo trong dải cuộn
const CARD_WIDTH = 140; // Chiều rộng mỗi thẻ (px)
const CARD_GAP = 12; // Khoảng cách giữa các thẻ (gap-3 = 12px)
const STEP = CARD_WIDTH + CARD_GAP; // 152px mỗi bước thẻ

export const FoodRouletteModal: React.FC = () => {
  const {
    isFoodRouletteOpen,
    setFoodRouletteOpen,
    sendFoodCard,
    conversations,
    activeConversationId,
    setActiveConversation,
    setCurrentTab,
  } = useChatStore();

  const { addBookmark } = useBookmarkStore();

  const [stage, setStage] = useState<1 | 2>(1); // 1: Thể loại, 2: Món ăn
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winningDish, setWinningDish] = useState<FoodDish | null>(null);

  // Danh sách các thẻ được render trên thanh cuộn (Đảm bảo 100% không bao giờ undefined)
  const [categoryItems, setCategoryItems] = useState<string[]>([]);
  const [dishItems, setDishItems] = useState<FoodDish[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Tự động khởi tạo lại mỗi khi mở modal
  useEffect(() => {
    if (isFoodRouletteOpen) {
      setStage(1);
      setSelectedCategory("");
      setWinningDish(null);
      setIsSpinning(false);
      initCategoryTrack();
    }
  }, [isFoodRouletteOpen]);

  const initCategoryTrack = () => {
    const list: string[] = [];
    for (let i = 0; i < TOTAL_TRACK_ITEMS; i++) {
      list.push(
        FOOD_CATEGORIES[i % FOOD_CATEGORIES.length] || "Món Ăn Ngon"
      );
    }
    setCategoryItems(list);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";
    }
  };

  // ================= VÒNG 1: QUAY THỂ LOẠI =================
  const spinCategory = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const targetCatIndex = Math.floor(Math.random() * FOOD_CATEGORIES.length);
    const chosenCat = FOOD_CATEGORIES[targetCatIndex];

    // Tạo danh sách thẻ đầy đủ với chosenCat đặt chính xác tại TARGET_INDEX
    const fullList: string[] = [];
    for (let i = 0; i < TOTAL_TRACK_ITEMS; i++) {
      fullList.push(
        FOOD_CATEGORIES[Math.floor(Math.random() * FOOD_CATEGORIES.length)]
      );
    }
    fullList[TARGET_INDEX] = chosenCat;
    setCategoryItems(fullList);

    // Tính toán độ lệch trục X để đưa thẻ TARGET_INDEX về chính giữa kim chỉ
    const containerWidth = containerRef.current?.clientWidth || 500;
    const centerPoint = containerWidth / 2;
    const cardCenter = TARGET_INDEX * STEP + CARD_WIDTH / 2;
    // Thêm một chút dao động ngẫu nhiên nhỏ bên trong thẻ (±18px) tạo cảm giác sòng bạc chân thực
    const jitter = (Math.random() - 0.5) * 36;
    const offset = cardCenter - centerPoint + jitter;

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";

      // Hiệu ứng âm thanh tick giảm tốc
      let lastTick = 0;
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed > 4000) {
          clearInterval(interval);
          return;
        }
        if (elapsed - lastTick > Math.min(300, 25 + elapsed * 0.075)) {
          sfx.playTick();
          lastTick = elapsed;
        }
      }, 25);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition =
            "transform 4.5s cubic-bezier(0.12, 0.85, 0.2, 1)";
          trackRef.current.style.transform = `translateX(-${offset}px)`;
        }
      }, 50);

      setTimeout(() => {
        setIsSpinning(false);
        setSelectedCategory(chosenCat);
        sfx.playWin();
        toast.success(
          `Đã chọn: "${chosenCat}"! Chuẩn bị mở hòm món ăn cụ thể nha! 🔥`
        );
        setTimeout(() => {
          setupDishStage(chosenCat);
        }, 1200);
      }, 4800);
    }
  };

  // Chuẩn bị cho Vòng 2
  const setupDishStage = (cat: string) => {
    setStage(2);
    const filtered = ALL_FOOD_DISHES.filter((d) => d.category === cat);
    const available = filtered.length > 0 ? filtered : ALL_FOOD_DISHES;

    const initialList: FoodDish[] = [];
    for (let i = 0; i < TOTAL_TRACK_ITEMS; i++) {
      initialList.push(available[i % available.length]);
    }
    setDishItems(initialList);

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";
    }
  };

  // ================= VÒNG 2: QUAY MÓN ĂN CỤ THỂ =================
  const spinDish = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const filtered = ALL_FOOD_DISHES.filter(
      (d) => d.category === selectedCategory
    );
    const available = filtered.length > 0 ? filtered : ALL_FOOD_DISHES;
    const targetIdx = Math.floor(Math.random() * available.length);
    const chosenDish = available[targetIdx];

    // Tạo danh sách thẻ đầy đủ với chosenDish đặt chính xác tại TARGET_INDEX (không bao giờ vượt mảng)
    const fullList: FoodDish[] = [];
    for (let i = 0; i < TOTAL_TRACK_ITEMS; i++) {
      fullList.push(available[Math.floor(Math.random() * available.length)]);
    }
    fullList[TARGET_INDEX] = chosenDish;
    setDishItems(fullList);

    const containerWidth = containerRef.current?.clientWidth || 500;
    const centerPoint = containerWidth / 2;
    const cardCenter = TARGET_INDEX * STEP + CARD_WIDTH / 2;
    const jitter = (Math.random() - 0.5) * 36;
    const offset = cardCenter - centerPoint + jitter;

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";

      let lastTick = 0;
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed > 4200) {
          clearInterval(interval);
          return;
        }
        if (elapsed - lastTick > Math.min(320, 25 + elapsed * 0.08)) {
          sfx.playTick();
          lastTick = elapsed;
        }
      }, 25);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition =
            "transform 4.6s cubic-bezier(0.12, 0.85, 0.2, 1)";
          trackRef.current.style.transform = `translateX(-${offset}px)`;
        }
      }, 50);

      setTimeout(() => {
        setIsSpinning(false);
        setWinningDish(chosenDish);
        sfx.playWin();
      }, 4900);
    }
  };

  // Chia sẻ vào cuộc trò chuyện
  const handleSendToChat = () => {
    if (!winningDish) return;
    const targetConvoId = activeConversationId || conversations[0]?._id;
    if (!targetConvoId) {
      toast.info("Chưa có cuộc trò chuyện nào để gửi món ăn!");
      setFoodRouletteOpen(false);
      return;
    }

    if (!activeConversationId) {
      setActiveConversation(targetConvoId);
    }

    sendFoodCard({
      name: winningDish.name,
      category: winningDish.category,
      emoji: winningDish.emoji,
      note: "Món ăn định mệnh hôm nay đây rồi! Cùng đi ăn nha! 🥰",
    });
    toast.success(`Đã gửi gợi ý "${winningDish.name}" vào đoạn chat! 💕`);
    setFoodRouletteOpen(false);
    setCurrentTab("chat");
  };

  // Đăng lên Bảng tin Cặp Đôi
  const handlePostToFeed = async () => {
    if (!winningDish) return;
    const ok = await usePostStore.getState().createPost({
      content: `Hôm nay chúng mình ăn món "${winningDish.name}" nhé! Kèo này chốt hạ không đổi nha người yêu ơi! 🍽️😋`,
      foodDish: {
        name: winningDish.name,
        category: winningDish.category,
        emoji: winningDish.emoji,
      },
      feeling: "🤤 Đang thèm ăn",
    });
    if (ok) {
      toast.success("Đã đăng gợi ý món ăn lên Bảng tin Cặp đôi! 💕");
      setFoodRouletteOpen(false);
      setCurrentTab("feed");
    }
  };

  return (
    <Dialog open={isFoodRouletteOpen} onOpenChange={setFoodRouletteOpen}>
      <DialogContent className="max-w-xl w-[94vw] sm:w-full bg-card/95 backdrop-blur-xl border-border shadow-2xl p-4 sm:p-6 rounded-3xl max-h-[92vh] overflow-y-auto">
        <DialogTitle className="text-lg sm:text-xl font-black flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍱</span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Hôm Nay Em Muốn Ăn Gì?
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full">
            {stage === 1
              ? "Vòng 1: Chọn Thể Loại"
              : `Vòng 2: Món ${selectedCategory || "Ngon"}`}
          </span>
        </DialogTitle>

        {/* Thanh tiến trình Stepper */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-1 text-xs font-bold select-none">
          <div
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors ${
              stage === 1
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <span className="size-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Thể Loại</span>
          </div>
          <ArrowRight className="size-3.5 text-muted-foreground" />
          <div
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors ${
              stage === 2
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <span className="size-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Món Cụ Thể</span>
          </div>
        </div>

        {/* ================= MÀN HÌNH KẾT QUẢ TRÚNG MÓN ĂN ================= */}
        {winningDish ? (
          <div className="py-4 px-2 text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-250">
            <div className="size-20 sm:size-24 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 flex items-center justify-center text-4xl sm:text-5xl shadow-lg animate-bounce duration-1000">
              {winningDish.emoji || "🥘"}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 px-3 py-1 bg-pink-500/10 rounded-full">
                {winningDish.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-2 text-foreground">
                {winningDish.name}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-1 leading-relaxed">
                {winningDish.description || "Món ăn thơm ngon tuyệt hảo cho ngày hẹn hò ngọt ngào."}
              </p>
            </div>

            <div className="p-2.5 bg-muted/40 rounded-2xl border border-border/60 text-xs text-muted-foreground italic">
              "Kèo này chốt hạ! Không được bảo ăn gì cũng được nữa nhé!" 💌
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <Button
                onClick={handleSendToChat}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold gap-1.5 rounded-xl shadow-xs text-xs h-9 px-3.5"
              >
                <Send className="size-3.5" /> Gửi Vào Chat Này 💌
              </Button>

              <Button
                onClick={handlePostToFeed}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold gap-1.5 rounded-xl shadow-xs text-xs h-9 px-3.5"
              >
                <Camera className="size-3.5" /> Đăng Lên Bảng Tin 💕
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  addBookmark({
                    type: "dish",
                    targetId: `dish-${winningDish.name}`,
                    title: winningDish.name,
                    content: `Món ăn thuộc thể loại: ${winningDish.category}`,
                    emoji: winningDish.emoji || "🥘",
                    metadata: { category: winningDish.category },
                  });
                }}
                className="gap-1.5 rounded-xl border-amber-300 dark:border-amber-700/60 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs h-9 px-3"
              >
                <Bookmark className="size-3.5" /> Lưu Vào Sổ Tay ⭐
              </Button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  winningDish.name + " gần đây"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-1.5 rounded-xl text-xs h-9 px-3">
                  <MapPin className="size-3.5 text-emerald-500" /> Tìm Quán Quanh Đây
                </Button>
              </a>

              <Button
                variant="ghost"
                onClick={() => {
                  setWinningDish(null);
                  setStage(1);
                  initCategoryTrack();
                }}
                className="gap-1.5 rounded-xl text-xs h-9 px-3 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" /> Quay Lại Từ Đầu
              </Button>
            </div>
          </div>
        ) : (
          /* ================= KHUNG THANH CUỘN CS:GO ROULETTE ================= */
          <div className="space-y-4 py-2">
            <div
              ref={containerRef}
              className="relative w-full h-[155px] sm:h-[165px] bg-slate-900 rounded-2xl overflow-hidden border-2 sm:border-3 border-pink-500/30 shadow-inner flex items-center"
            >
              {/* Kim chỉ định vị trung tâm CS:GO (Đúng 50% tâm điểm khung nhìn) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-pink-500 drop-shadow-[0_2px_4px_rgba(244,63,94,0.8)]"></div>
                <div className="w-[2px] h-28 bg-gradient-to-b from-pink-500 via-rose-400 to-transparent shadow-[0_0_8px_#f43f5e]"></div>
              </div>

              {/* Dải thẻ di chuyển mượt mà */}
              <div
                ref={trackRef}
                className="flex items-center gap-3 select-none will-change-transform"
                style={{ paddingLeft: 0 }}
              >
                {stage === 1
                  ? categoryItems.map((cat, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${CARD_WIDTH}px` }}
                        className="h-[125px] sm:h-[135px] flex-shrink-0 bg-slate-800/90 border border-slate-700/80 rounded-2xl flex flex-col items-center justify-center p-2.5 text-center shadow-md select-none"
                      >
                        <span className="text-2xl sm:text-3xl mb-1.5">🍽️</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-2 px-1">
                          {cat}
                        </span>
                      </div>
                    ))
                  : dishItems.map((dish, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${CARD_WIDTH}px` }}
                        className="h-[125px] sm:h-[135px] flex-shrink-0 bg-slate-800/90 border border-slate-700/80 rounded-2xl flex flex-col items-center justify-center p-2.5 text-center shadow-md select-none"
                      >
                        <span className="text-2xl sm:text-3xl mb-1">
                          {dish?.emoji || "🥘"}
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold text-slate-100 line-clamp-2 px-1 leading-tight">
                          {dish?.name || "Món Ngon"}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-pink-400 mt-1 font-semibold truncate max-w-full px-1">
                          {dish?.tag || dish?.category || "Hấp dẫn"}
                        </span>
                      </div>
                    ))}
              </div>
            </div>

            {/* Thanh điều khiển nút Quay */}
            <div className="flex items-center justify-center gap-3 pt-1">
              {stage === 1 ? (
                <Button
                  size="lg"
                  disabled={isSpinning}
                  onClick={spinCategory}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-2xl shadow-lg gap-2 active:scale-95 transition-transform"
                >
                  <Dices className="size-4 sm:size-5" />
                  {isSpinning ? "Đang mở hòm..." : "🎲 Quay Thể Loại Ngay!"}
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    size="lg"
                    disabled={isSpinning}
                    onClick={spinDish}
                    className="bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base px-5 sm:px-7 py-5 sm:py-6 rounded-2xl shadow-lg gap-2 active:scale-95 transition-transform"
                  >
                    <Sparkles className="size-4 sm:size-5" />
                    {isSpinning
                      ? "Đang chọn món..."
                      : `Mở Món ${selectedCategory || "Ngon"}!`}
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isSpinning}
                    onClick={() => {
                      setStage(1);
                      initCategoryTrack();
                    }}
                    className="rounded-2xl h-11 text-xs"
                  >
                    Đổi Thể Loại
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FoodRouletteModal;
