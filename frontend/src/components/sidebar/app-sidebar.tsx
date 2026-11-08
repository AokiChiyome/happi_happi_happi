import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon, Sun, Dices } from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import CreateNewChat from "../chat/CreateNewChat";
import NewGroupChatModal from "../chat/NewGroupChatModal";
import GroupChatList from "../chat/GroupChatList";
import AddFriendModal from "../chat/AddFriendModal";
import DirectMessageList from "../chat/DirectMessageList";
import { NavUser } from "./nav-user";
import { useThemeStore } from "@/stores/useThemeStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  const { setFoodRouletteOpen } = useChatStore();

  const currentUserData = {
    name: user?.displayName || user?.username || "Người dùng",
    email: user?.email || (user?.username ? `@${user.username}` : ""),
    avatar: user?.avatarUrl || "",
  };

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="bg-gradient-primary">
              <a href="#">
                <div className="flex w-full items-center px-2 justify-between">
                  <h1 className="text-xl font-black text-white tracking-wide">
                    Happi 💕
                  </h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-background/80"
                    />
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* New Chat & Food Decider */}
        <SidebarGroup>
          <SidebarGroupContent className="space-y-2">
            <CreateNewChat />
            <Button
              variant="outline"
              onClick={() => setFoodRouletteOpen(true)}
              className="w-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border-pink-500/30 hover:bg-pink-500/20 text-foreground font-bold rounded-2xl gap-2 shadow-xs text-xs py-2.5"
            >
              <Dices className="size-4 text-pink-500" />
              <span>🎲 Hôm Nay Em Muốn Ăn Gì?</span>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group Chats */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs font-bold text-muted-foreground">
            Nhóm Chat
          </SidebarGroupLabel>
          <SidebarGroupAction title="Tạo Nhóm" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Direct Messages & Friends */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs font-bold text-muted-foreground">
            Bạn bè & Người yêu
          </SidebarGroupLabel>
          <SidebarGroupAction title="Kết bạn" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer User Profile */}
      <SidebarFooter>
        <NavUser user={currentUserData} />
      </SidebarFooter>
    </Sidebar>
  );
}
