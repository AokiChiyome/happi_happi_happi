import {
  ChevronsUpDown,
  LogOut,
  MessageCircle,
  Bell,
} from "lucide-react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { signOut } = useAuthStore();
  const { isChatHeadVisible, toggleChatHead, triggerSampleNotification } =
    useNotificationStore();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary/20 text-primary font-bold">
                  {user.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-primary/20 text-primary font-bold">
                    {user.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
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
                {isChatHeadVisible ? "Bật" : "Tắt"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                triggerSampleNotification();
                toast.success("Đã phát thông báo mẫu! 💕");
              }}
              className="cursor-pointer rounded-xl flex items-center gap-2 text-xs py-2"
            >
              <Bell className="size-4 text-purple-500" />
              <span>Thử thông báo & Bong bóng</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 rounded-xl"
            >
              <LogOut className="size-4 mr-2" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
