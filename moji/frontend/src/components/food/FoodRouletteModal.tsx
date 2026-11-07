import React, { useState, useEffect, useRef } from "react";
import {
  FOOD_CATEGORIES,
  ALL_FOOD_DISHES,
  type FoodDish,
} from "@/data/foodsData";
import { useChatStore } from "@/stores/useChatStore";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Dices, RotateCcw, MapPin, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Web Audio API Sound Generator
class SoundFX {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playWin() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.15, this.ctx!.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          this.ctx!.currentTime + i * 0.1 + 0.3
        );
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.1);
        osc.stop(this.ctx!.currentTime + i * 0.1 + 0.35);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

export const FoodRouletteModal: React.FC = () => {
  const { isFoodRouletteOpen, setFoodRouletteOpen, sendFoodCard, activeConversationId } =
    useChatStore();

  const [stage, setStage] = useState<1 | 2>(1); // 1: Category, 2: Dish
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winningDish, setWinningDish] = useState<FoodDish | null>(null);

  // Track cards for animation
  const [categoryItems, setCategoryItems] = useState<string[]>([]);
  const [dishItems, setDishItems] = useState<FoodDish[]>([]);

  const trackRef = useRef<HTMLDivElement>(null);

  // Reset when dialog opens
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
    for (let i = 0; i < 4; i++) {
      list.push(...FOOD_CATEGORIES);
    }
    setCategoryItems(list);
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";
    }
  };

  const spinCategory = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const targetIndex = Math.floor(Math.random() * FOOD_CATEGORIES.length);
    const chosenCat = FOOD_CATEGORIES[targetIndex];

    const cardWidth = 160;
    const offset = 40 * cardWidth + targetIndex * cardWidth + cardWidth / 2 - 250;

    // Build repeated array
    const fullList: string[] = [];
    for (let i = 0; i < 60; i++) {
      fullList.push(
        FOOD_CATEGORIES[Math.floor(Math.random() * FOOD_CATEGORIES.length)]
      );
    }
    fullList[40 + targetIndex] = chosenCat;
    setCategoryItems(fullList);

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";

      // Trigger tick sound loop
      let lastTick = 0;
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed > 4000) {
          clearInterval(interval);
          return;
        }
        if (elapsed - lastTick > Math.min(300, 30 + elapsed * 0.08)) {
          sfx.playTick();
          lastTick = elapsed;
        }
      }, 25);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition =
            "transform 4.5s cubic-bezier(0.12, 0.8, 0.2, 1)";
          trackRef.current.style.transform = `translateX(-${offset}px)`;
        }
      }, 50);

      setTimeout(() => {
        setIsSpinning(false);
        setSelectedCategory(chosenCat);
        sfx.playWin();
        toast.success(`Đã chọn được: "${chosenCat}"! Tiếp tục mở món ăn nào! 🔥`);
        setTimeout(() => {
          setupDishStage(chosenCat);
        }, 1200);
      }, 4800);
    }
  };

  const setupDishStage = (cat: string) => {
    setStage(2);
    const filtered = ALL_FOOD_DISHES.filter((d) => d.category === cat);
    const available = filtered.length > 0 ? filtered : ALL_FOOD_DISHES;

    const initialList: FoodDish[] = [];
    for (let i = 0; i < 4; i++) {
      initialList.push(...available);
    }
    setDishItems(initialList);

    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = "translateX(0px)";
    }
  };

  const spinDish = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const filtered = ALL_FOOD_DISHES.filter(
      (d) => d.category === selectedCategory
    );
    const available = filtered.length > 0 ? filtered : ALL_FOOD_DISHES;
    const targetIdx = Math.floor(Math.random() * available.length);
    const chosenDish = available[targetIdx];

    const cardWidth = 160;
    const offset = 40 * cardWidth + targetIdx * cardWidth + cardWidth / 2 - 250;

    const fullList: FoodDish[] = [];
    for (let i = 0; i < 60; i++) {
      fullList.push(available[Math.floor(Math.random() * available.length)]);
    }
    fullList[40 + targetIdx] = chosenDish;
    setDishItems(fullList);

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
        if (elapsed - lastTick > Math.min(320, 30 + elapsed * 0.08)) {
          sfx.playTick();
          lastTick = elapsed;
        }
      }, 25);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition =
            "transform 4.6s cubic-bezier(0.12, 0.8, 0.2, 1)";
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

  const handleSendToChat = () => {
    if (!winningDish) return;
    if (!activeConversationId) {
      toast.info("Bạn chưa chọn cuộc trò chuyện nào để gửi món ăn!");
      setFoodRouletteOpen(false);
      return;
    }
    sendFoodCard({
      name: winningDish.name,
      category: winningDish.category,
      emoji: winningDish.emoji,
      note: "Món ăn định mệnh hôm nay đây rồi! Cùng đi ăn nha! 🥰",
    });
    setFoodRouletteOpen(false);
  };

  return (
    <Dialog open={isFoodRouletteOpen} onOpenChange={setFoodRouletteOpen}>
      <DialogContent className="max-w-2xl bg-card border-border shadow-2xl p-6 rounded-3xl">
        <DialogTitle className="text-xl font-extrabold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍱</span>
            <span>Hôm Nay Em Muốn Ăn Gì?</span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
            {stage === 1 ? "Vòng 1: Chọn Thể Loại" : `Vòng 2: Món ${selectedCategory}`}
          </span>
        </DialogTitle>

        {/* Stepper info */}
        <div className="flex items-center justify-center gap-3 py-2 text-sm font-semibold">
          <div
            className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${
              stage === 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <span>1</span> <span>Thể Loại</span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
          <div
            className={`px-4 py-1.5 rounded-full flex items-center gap-2 ${
              stage === 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            <span>2</span> <span>Món Cụ Thể</span>
          </div>
        </div>

        {/* ================= RESULT CELEBRATION ================= */}
        {winningDish ? (
          <div className="py-6 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="size-24 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-300 flex items-center justify-center text-5xl shadow-lg">
              {winningDish.emoji}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                {winningDish.category}
              </span>
              <h2 className="text-2xl font-black mt-2 text-foreground">
                {winningDish.name}
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
                {winningDish.description}
              </p>
            </div>

            <div className="p-3 bg-muted/40 rounded-2xl border text-xs text-muted-foreground italic">
              "Kèo này chốt hạ! Không được bảo ăn gì cũng được nữa nhé!" 💌
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {activeConversationId && (
                <Button
                  onClick={handleSendToChat}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold gap-2 rounded-xl"
                >
                  <Send className="size-4" /> Gửi Vào Chat Này 💌
                </Button>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  winningDish.name + " gần đây"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 rounded-xl">
                  <MapPin className="size-4 text-emerald-500" /> Tìm Quán Quanh Đây
                </Button>
              </a>
              <Button
                variant="ghost"
                onClick={() => {
                  setWinningDish(null);
                  setStage(1);
                  initCategoryTrack();
                }}
                className="gap-2 rounded-xl"
              >
                <RotateCcw className="size-4" /> Quay Lại Từ Đầu
              </Button>
            </div>
          </div>
        ) : (
          /* ================= ROULETTE TRACK ================= */
          <div className="space-y-6 py-4">
            <div className="relative w-full h-[180px] bg-slate-900 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-inner flex items-center">
              {/* CS:GO Pointer Marker Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-pink-500 drop-shadow"></div>
                <div className="w-[3px] h-32 bg-pink-500/80 shadow-[0_0_8px_#ff5e8e]"></div>
              </div>

              {/* Moving Track */}
              <div
                ref={trackRef}
                className="flex items-center gap-3 pl-[180px] select-none will-change-transform"
              >
                {stage === 1
                  ? categoryItems.map((cat, idx) => (
                      <div
                        key={idx}
                        className="w-[150px] h-[140px] flex-shrink-0 bg-slate-800 border-2 border-slate-700/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-lg transition-transform"
                      >
                        <span className="text-3xl mb-2">🍽️</span>
                        <span className="text-sm font-bold text-slate-100 line-clamp-2">
                          {cat}
                        </span>
                      </div>
                    ))
                  : dishItems.map((dish, idx) => (
                      <div
                        key={idx}
                        className="w-[150px] h-[140px] flex-shrink-0 bg-slate-800 border-2 border-slate-700/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-lg"
                      >
                        <span className="text-3xl mb-1">{dish.emoji || "🥘"}</span>
                        <span className="text-xs font-bold text-slate-100 line-clamp-2">
                          {dish.name}
                        </span>
                        <span className="text-[10px] text-pink-400 mt-1 font-semibold truncate max-w-full">
                          {dish.tag || dish.category}
                        </span>
                      </div>
                    ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-center gap-4">
              {stage === 1 ? (
                <Button
                  size="lg"
                  disabled={isSpinning}
                  onClick={spinCategory}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-base px-8 py-6 rounded-2xl shadow-lg gap-2"
                >
                  <Dices className="size-5" />
                  {isSpinning ? "Đang mở hòm..." : "Quay Thể Loại Ngay!"}
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    disabled={isSpinning}
                    onClick={spinDish}
                    className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base px-8 py-6 rounded-2xl shadow-lg gap-2"
                  >
                    <Sparkles className="size-5" />
                    {isSpinning ? "Đang chọn món..." : `Mở Hòm Món ${selectedCategory}!`}
                  </Button>
                  <Button
                    variant="outline"
                    disabled={isSpinning}
                    onClick={() => {
                      setStage(1);
                      initCategoryTrack();
                    }}
                    className="rounded-xl"
                  >
                    Đổi Thể Loại
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FoodRouletteModal;
