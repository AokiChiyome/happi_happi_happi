import React, { useState } from "react";
import { useChatStore } from "@/stores/useChatStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, User } from "lucide-react";
import { toast } from "sonner";

export const CreateNewChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { friends, fetchFriends, conversations, setActiveConversation, sendMessage } =
    useChatStore();

  const handleOpen = () => {
    fetchFriends();
    setOpen(true);
  };

  const startChatWith = async (friendId: string) => {
    // Check if direct conversation already exists
    const existing = conversations.find(
      (c) =>
        c.type === "direct" &&
        c.participants.some((p) => p._id === friendId)
    );

    if (existing) {
      setActiveConversation(existing._id);
      setOpen(false);
      return;
    }

    // Otherwise, send a hello message to auto-create conversation
    try {
      await sendMessage("Chào bạn nhé! 👋", friendId);
      setOpen(false);
      toast.success("Đã mở cuộc trò chuyện mới!");
    } catch (e) {
      toast.error("Không thể bắt đầu cuộc trò chuyện");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpen}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl gap-2 shadow-sm text-sm"
        >
          <MessageSquarePlus className="size-4" />
          <span>Bắt Đầu Chat Mới</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border rounded-3xl p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <User className="size-5 text-primary" />
            <span>Chọn Bạn Bè Để Nhắn Tin</span>
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-60 overflow-y-auto space-y-2 pt-2">
          {friends.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-xs">
              <p>Bạn chưa có bạn bè nào trong danh sách.</p>
              <p className="mt-1">Hãy bấm vào biểu tượng ➕ ở mục Bạn Bè để kết bạn nhé!</p>
            </div>
          ) : (
            friends.map((friend: any) => (
              <div
                key={friend._id}
                onClick={() => startChatWith(friend._id)}
                className="flex items-center justify-between p-3 rounded-2xl border border-border/60 hover:bg-muted/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="size-9 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">
                    {friend.displayName?.[0] || "U"}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {friend.displayName || friend.username}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      @{friend.username}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-primary font-bold">
                  Nhắn tin 💬
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewChat;
