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
import { UserPlus, Check, X, Users } from "lucide-react";

export const AddFriendModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState<"add" | "requests">("add");

  const {
    sendFriendRequest,
    friendRequests,
    fetchFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
  } = useChatStore();

  useEffect(() => {
    if (open) {
      fetchFriendRequests();
    }
  }, [open, fetchFriendRequests]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    await sendFriendRequest(username.trim());
    setUsername("");
  };

  const received = friendRequests?.received || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="text-muted-foreground hover:text-foreground size-5 flex items-center justify-center rounded-md hover:bg-muted/50 transition-colors"
          title="Thêm bạn bè"
        >
          <UserPlus className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border rounded-3xl p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <span>Quản Lý Bạn Bè</span>
          </DialogTitle>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex border-b border-border/60 pb-2 gap-4 text-sm font-semibold">
          <button
            onClick={() => setTab("add")}
            className={`pb-1 transition-colors ${
              tab === "add"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Thêm Bạn Mới
          </button>
          <button
            onClick={() => setTab("requests")}
            className={`pb-1 transition-colors flex items-center gap-1.5 ${
              tab === "requests"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            <span>Lời Mời Đã Nhận</span>
            {received.length > 0 && (
              <span className="size-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                {received.length}
              </span>
            )}
          </button>
        </div>

        {tab === "add" ? (
          <form onSubmit={handleSend} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">
                Tên đăng nhập (Username) của bạn bè:
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ví dụ: bao_deptrai, be_meo..."
                className="rounded-2xl bg-muted/30"
              />
            </div>
            <Button
              type="submit"
              disabled={!username.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-2xl"
            >
              Gửi Yêu Cầu Kết Bạn 💌
            </Button>
          </form>
        ) : (
          <div className="space-y-3 pt-2 max-h-60 overflow-y-auto">
            {received.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-6">
                Chưa có lời mời kết bạn nào đang chờ.
              </p>
            ) : (
              received.map((req: any) => (
                <div
                  key={req._id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-2xl border"
                >
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {req.from?.displayName || req.from?.username}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      @{req.from?.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      onClick={() => acceptFriendRequest(req._id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white size-8 p-0 rounded-full"
                      title="Chấp nhận"
                    >
                      <Check className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => declineFriendRequest(req._id)}
                      className="size-8 p-0 rounded-full text-destructive hover:bg-destructive/10"
                      title="Từ chối"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
