import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import AuthForm from "./auth/AuthForm";
import FeedContainer from "./feed/FeedContainer";
import ProfileSidebar from "./profile/ProfileSidebar";
import PostCreationModal from "./post/PostCreationModal";
import { useMediaQuery } from "../lib/utils";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPostModal, setShowPostModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Effect to check for dark mode preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.getItem("darkMode") === "true" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  // Toggle dark mode
  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", String(newDarkMode));
  };

  // Handle authentication
  const handleLogin = () => {
    setAuthMode("login");
    setShowAuthForm(true);
  };

  const handleSignup = () => {
    setAuthMode("signup");
    setShowAuthForm(true);
  };

  const handleAuthSubmit = (data: any) => {
    console.log("Auth data submitted:", data);
    // In a real app, this would call an authentication API
    setIsAuthenticated(true);
    setShowAuthForm(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Handle post creation
  const handleCreatePost = () => {
    setShowPostModal(true);
  };

  const handlePostSubmit = (postData: any) => {
    console.log("Post submitted:", postData);
    // In a real app, this would call an API to create the post
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <Navbar
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
      />

      {/* Main Content */}
      <main className="pt-20 pb-10 px-4 md:px-6 max-w-7xl mx-auto">
        {!isAuthenticated ? (
          // Non-authenticated view
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to SocialAI</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                Create, share, and discover amazing AI-generated content. Join
                our community today!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                  alt="AI Generated Art"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white dark:bg-gray-800">
                  <h3 className="text-xl font-semibold mb-2">Create AI Art</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Generate stunning images with our AI tools. No design skills
                    required.
                  </p>
                  <button
                    onClick={handleSignup}
                    className="text-primary font-medium flex items-center"
                  >
                    Get started
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                  alt="AI Generated Video"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white dark:bg-gray-800">
                  <h3 className="text-xl font-semibold mb-2">
                    Create AI Videos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Transform your ideas into engaging videos with our AI video
                    generator.
                  </p>
                  <button
                    onClick={handleSignup}
                    className="text-primary font-medium flex items-center"
                  >
                    Learn more
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <button
                onClick={handleSignup}
                className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Join SocialAI Today
              </button>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={handleLogin}
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        ) : (
          // Authenticated view - Feed and Sidebar
          <div className="flex flex-col md:flex-row gap-6">
            {!isMobile && (
              <div className="hidden md:block">
                <ProfileSidebar />
              </div>
            )}
            <div className="flex-1 flex justify-center">
              <FeedContainer />
            </div>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={() => setShowAuthForm(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <AuthForm
              mode={authMode}
              onSubmit={handleAuthSubmit}
              onToggleMode={() =>
                setAuthMode(authMode === "login" ? "signup" : "login")
              }
            />
          </div>
        </div>
      )}

      {/* Post Creation Modal */}
      {showPostModal && (
        <PostCreationModal
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
          onPost={handlePostSubmit}
        />
      )}
    </div>
  );
};

export default Home;
