import React, { useState, useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Users } from "lucide-react";
import { toast } from "sonner";

export const NewGroupChatModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const { friends, fetchFriends, createGroupChat } = useChatStore();

  useEffect(() => {
    if (open) {
      fetchFriends();
      setGroupName("");
      setSelectedFriends([]);
    }
  }, [open, fetchFriends]);

  const toggleFriend = (id: string) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      toast.error("Vui lòng nhập tên nhóm chat!");
      return;
    }
    if (selectedFriends.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 bạn bè vào nhóm!");
      return;
    }
    await createGroupChat(groupName.trim(), selectedFriends);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="text-muted-foreground hover:text-foreground size-5 flex items-center justify-center rounded-md hover:bg-muted/50 transition-colors"
          title="Tạo nhóm mới"
        >
          <Plus className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border rounded-3xl p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <span>Tạo Nhóm Trò Chuyện Mới</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              Tên Nhóm:
            </label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Ví dụ: Team Ăn Vặt Hà Nội 🍕..."
              className="rounded-2xl bg-muted/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground">
              Chọn Thành Viên ({selectedFriends.length} đã chọn):
            </label>
            <div className="max-h-52 overflow-y-auto space-y-2 border border-border/60 rounded-2xl p-2 bg-muted/10">
              {friends.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Bạn chưa có bạn bè trong danh sách. Hãy kết bạn trước nhé!
                </p>
              ) : (
                friends.map((friend: any) => {
                  const isChecked = selectedFriends.includes(friend._id);
                  return (
                    <label
                      key={friend._id}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-colors ${
                        isChecked
                          ? "bg-primary/10 border-primary/40"
                          : "hover:bg-muted/40 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="size-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center">
                          {friend.displayName?.[0] || "U"}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-foreground">
                            {friend.displayName || friend.username}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            @{friend.username}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFriend(friend._id)}
                        className="rounded text-primary focus:ring-primary size-4"
                      />
                    </label>
                  );
                })
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!groupName.trim() || selectedFriends.length === 0}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl"
          >
            Tạo Nhóm Ngay ✨
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupChatModal;
