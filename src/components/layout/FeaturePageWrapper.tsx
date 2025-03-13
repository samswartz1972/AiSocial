import React, { ReactNode } from "react";
import Layout from "./Layout";
import FeatureNavigation from "../navigation/FeatureNavigation";

interface FeaturePageWrapperProps {
  children: ReactNode;
  title: string;
  currentFeature: string;
  isAuthenticated?: boolean;
  isDarkMode?: boolean;
}

const FeaturePageWrapper = ({
  children,
  title,
  currentFeature,
  isAuthenticated = true,
  isDarkMode = false,
}: FeaturePageWrapperProps) => {
  // These would typically come from a global state or context
  const handleThemeToggle = () => {};
  const handleLogin = () => {};
  const handleSignup = () => {};
  const handleLogout = () => {};
  const handleCreatePost = () => {};

  return (
    <Layout
      isAuthenticated={isAuthenticated}
      isDarkMode={isDarkMode}
      onThemeToggle={handleThemeToggle}
      onLogin={handleLogin}
      onSignup={handleSignup}
      onLogout={handleLogout}
      onCreatePost={handleCreatePost}
      user={{
        name: "Jane Cooper",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <FeatureNavigation currentFeature={currentFeature} />
        {children}
      </div>
    </Layout>
  );
};

export default FeaturePageWrapper;
