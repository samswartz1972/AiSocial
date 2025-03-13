import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    avatar: string;
  };
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  onCreatePost?: () => void;
}

const Layout = ({
  children,
  isAuthenticated = false,
  user = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  isDarkMode = false,
  onThemeToggle = () => {},
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
  onCreatePost = () => {},
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        onLogin={onLogin}
        onSignup={onSignup}
        onLogout={onLogout}
        onCreatePost={onCreatePost}
      />
      <main className="pt-20 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
