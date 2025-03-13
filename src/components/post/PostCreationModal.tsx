import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import AIGenerationTool from "./AIGenerationTool";
import {
  Image,
  Video,
  FileText,
  Link,
  MapPin,
  Smile,
  X,
  Users,
  Globe,
  Lock,
  ChevronDown,
} from "lucide-react";

interface PostCreationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPost?: (postData: PostData) => void;
  user?: {
    name: string;
    username: string;
    avatar: string;
  };
}

interface PostData {
  text: string;
  media?: {
    type: "image" | "video" | "text";
    url?: string;
    content?: string;
  };
  visibility?: "public" | "friends" | "private";
  location?: string;
  tags?: string[];
}

const PostCreationModal = ({
  isOpen = true,
  onClose = () => {},
  onPost = () => {},
  user = {
    name: "Jane Cooper",
    username: "@janecooper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
}: PostCreationModalProps) => {
  const [activeTab, setActiveTab] = useState<string>("text");
  const [postText, setPostText] = useState<string>("");
  const [mediaContent, setMediaContent] = useState<{
    type: "image" | "video" | "text";
    url?: string;
    content?: string;
  } | null>(null);
  const [visibility, setVisibility] = useState<
    "public" | "friends" | "private"
  >("public");
  const [location, setLocation] = useState<string>("");
  const [showAITool, setShowAITool] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value !== "ai") {
      setShowAITool(false);
    }
  };

  const handleAIGenerate = () => {
    setShowAITool(true);
  };

  const handleAIContentGenerated = (content: {
    type: string;
    url: string;
    prompt: string;
  }) => {
    setMediaContent({
      type: content.type as "image" | "video",
      url: content.url,
    });
    if (!postText) {
      setPostText(content.prompt);
    }
    setShowAITool(false);
  };

  const handlePost = () => {
    const postData: PostData = {
      text: postText,
      visibility,
      location: location || undefined,
    };

    if (mediaContent) {
      postData.media = mediaContent;
    }

    // Create a new post object
    const newPost = {
      id: `user-${Date.now()}`,
      user: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
      },
      content: {
        text: postText,
        media: mediaContent,
        createdAt: "Just now",
      },
      interactions: {
        likes: 0,
        comments: 0,
        shares: 0,
      },
    };

    // Save to localStorage
    try {
      const existingPosts = localStorage.getItem("userPosts");
      let userPosts = [];

      if (existingPosts) {
        userPosts = JSON.parse(existingPosts);
      }

      userPosts.unshift(newPost); // Add new post at the beginning
      localStorage.setItem("userPosts", JSON.stringify(userPosts));

      onPost(postData);
      resetForm();
      onClose();

      // Show success message without using alert
      const event = new CustomEvent("post-created", { detail: newPost });
      document.dispatchEvent(event);

      // Redirect to home page to see the new post
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  const resetForm = () => {
    setPostText("");
    setMediaContent(null);
    setVisibility("public");
    setLocation("");
    setActiveTab("text");
    setShowAITool(false);
  };

  const handleUploadMedia = (type: "image" | "video") => {
    // In a real app, this would open a file picker
    // For now, we'll just set a placeholder URL
    const placeholderUrl =
      type === "image"
        ? "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
        : "https://example.com/placeholder-video.mp4";

    setMediaContent({
      type,
      url: placeholderUrl,
    });
  };

  const getVisibilityIcon = () => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4" />;
      case "friends":
        return <Users className="h-4 w-4" />;
      case "private":
        return <Lock className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-white dark:bg-gray-900">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-bold">Create Post</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {showAITool ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">AI Content Generator</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAITool(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <AIGenerationTool
                onGenerate={handleAIContentGenerated}
                onCancel={() => setShowAITool(false)}
                mediaType={activeTab === "video" ? "video" : "image"}
              />
            </div>
          ) : (
            <>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-1 h-7 gap-1"
                      onClick={() => {}}
                    >
                      {getVisibilityIcon()}
                      <span className="capitalize">{visibility}</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-[120px] text-base resize-none mb-3"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                />

                {mediaContent && (
                  <Card className="mb-4">
                    <CardContent className="p-3">
                      <div className="relative">
                        {mediaContent.type === "image" && mediaContent.url && (
                          <img
                            src={mediaContent.url}
                            alt="Uploaded content"
                            className="w-full h-auto rounded-md object-cover"
                          />
                        )}
                        {mediaContent.type === "video" && mediaContent.url && (
                          <div className="w-full h-64 bg-muted rounded-md flex items-center justify-center">
                            <Video className="h-12 w-12 text-muted-foreground" />
                            <span className="ml-2 text-muted-foreground">
                              Video Preview
                            </span>
                          </div>
                        )}
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={() => setMediaContent(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() =>
                      setLocation(location ? "" : "San Francisco, CA")
                    }
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    {location ? location : "Add location"}
                  </Button>
                </div>
              </div>

              <div className="border-t p-2">
                <Tabs
                  defaultValue={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-5 h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="text"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                    >
                      <FileText className="h-5 w-5" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="image"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                      onClick={() => handleUploadMedia("image")}
                    >
                      <Image className="h-5 w-5" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                      onClick={() => handleUploadMedia("video")}
                    >
                      <Video className="h-5 w-5" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="ai"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                      onClick={handleAIGenerate}
                    >
                      <span className="font-bold text-primary">AI</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="emoji"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2"
                    >
                      <Smile className="h-5 w-5" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="p-4 border-t">
          <Button variant="outline" onClick={onClose} className="mr-2 sm:mr-0">
            Cancel
          </Button>
          <Button
            onClick={handlePost}
            disabled={!postText.trim() && !mediaContent}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreationModal;
