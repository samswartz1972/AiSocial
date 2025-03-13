import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  Menu,
  Plus,
  LogOut,
  Settings,
  User,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar: string;
  };
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  onCreatePost?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  notificationCount?: number;
  messageCount?: number;
}

const Navbar = ({
  isAuthenticated = false,
  user = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  onThemeToggle = () => {},
  isDarkMode = false,
  onCreatePost = () => {},
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
  onProfileClick = () => {},
  notificationCount = 3,
  messageCount = 5,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full h-16 px-4 md:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between fixed top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <svg
            className="w-8 h-8 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span className="ml-2 text-xl font-bold hidden md:block">
            SocialAI
          </span>
        </a>
      </div>

      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input type="text" placeholder="Search..." className="w-full pl-10" />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onThemeToggle}
                    className="rounded-full"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Light mode" : "Dark mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                  >
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Messages */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full relative"
                  >
                    <MessageSquare className="h-5 w-5" />
                    {messageCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {messageCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Messages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Create Post Button */}
            <Button onClick={onCreatePost} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="rounded-full p-0 h-10 w-10 overflow-hidden"
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center p-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{user.name.toLowerCase().replace(" ", "_")}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onProfileClick}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/membership")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Membership</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/admin")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-2 flex items-center justify-between">
                  <span className="text-sm">Dark Mode</span>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={onThemeToggle}
                  />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {/* Theme Toggle for Non-Authenticated Users */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onThemeToggle}
                    className="rounded-full"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Light mode" : "Dark mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Login and Signup Buttons */}
            <Button variant="outline" onClick={onLogin}>
              Log in
            </Button>
            <Button onClick={onSignup}>Sign up</Button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            {/* Mobile Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pl-10"
              />
            </div>

            {isAuthenticated ? (
              <>
                {/* User Profile Info */}
                <div className="flex items-center p-2 border rounded-lg">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      @{user.name.toLowerCase().replace(" ", "_")}
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation Items */}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={onProfileClick}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start relative"
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                  {notificationCount > 0 && (
                    <span className="absolute right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start relative"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Messages
                  {messageCount > 0 && (
                    <span className="absolute right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {messageCount}
                    </span>
                  )}
                </Button>

                <Button onClick={onCreatePost} className="w-full">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Post
                </Button>

                <div className="flex items-center justify-between p-2">
                  <span>Dark Mode</span>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={onThemeToggle}
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 border-red-200"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between p-2">
                  <span>Dark Mode</span>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={onThemeToggle}
                  />
                </div>
                <Button variant="outline" onClick={onLogin} className="w-full">
                  Log in
                </Button>
                <Button onClick={onSignup} className="w-full">
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
