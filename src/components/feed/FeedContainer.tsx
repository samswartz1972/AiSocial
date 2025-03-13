import React, { useState, useEffect, useCallback } from "react";
import Post from "./Post";
import CreatePostButton from "./CreatePostButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Compass, Home, TrendingUp, Users } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface FeedContainerProps {
  posts?: Array<{
    id: string;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
    content: {
      text: string;
      media?: {
        type: "image" | "video";
        url: string;
      };
      createdAt: string;
    };
    interactions: {
      likes: number;
      comments: number;
      shares: number;
    };
  }>;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const FeedContainer = ({
  posts = [
    {
      id: "1",
      user: {
        name: "Jane Cooper",
        username: "@janecooper",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      content: {
        text: "Just created this amazing AI-generated image! What do you think?",
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
        },
        createdAt: "2 hours ago",
      },
      interactions: {
        likes: 42,
        comments: 12,
        shares: 5,
      },
    },
    {
      id: "2",
      user: {
        name: "Alex Morgan",
        username: "@alexmorgan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      content: {
        text: "Check out this AI video I made for my new project!",
        media: {
          type: "image" as const, // Using image as placeholder for video
          url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
        },
        createdAt: "5 hours ago",
      },
      interactions: {
        likes: 78,
        comments: 23,
        shares: 15,
      },
    },
    {
      id: "3",
      user: {
        name: "Taylor Swift",
        username: "@taylorswift",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
      },
      content: {
        text: "Working on a new AI-generated music video. Here's a sneak peek!",
        media: {
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1614102073832-030967418971?w=600&q=80",
        },
        createdAt: "1 day ago",
      },
      interactions: {
        likes: 1204,
        comments: 342,
        shares: 156,
      },
    },
  ],
  activeTab = "for-you",
  onTabChange = () => {},
}: FeedContainerProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [userPosts, setUserPosts] = useState<typeof posts>([]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  const refreshFeed = () => {
    setFilteredPosts(posts);
  };

  return (
    <div className="w-full max-w-[700px] h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Feed</h2>
          <CreatePostButton
            size="sm"
            onClick={() =>
              document.getElementById("create-post-button")?.click()
            }
          />
        </div>
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="for-you" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              For You
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Following
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Discover
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 p-4">
            <TabsContent value="for-you" className="mt-0 space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <Post key={post.id} {...post} />)
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No posts found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={refreshFeed}
                  >
                    Refresh Feed
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="following" className="mt-0">
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-2">
                  Follow creators to see their posts here
                </p>
                <Button variant="outline" className="mt-2">
                  Find People to Follow
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-0">
              <div className="space-y-4">
                {filteredPosts
                  .sort((a, b) => b.interactions.likes - a.interactions.likes)
                  .slice(0, 2)
                  .map((post) => (
                    <Post key={post.id} {...post} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="discover" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Suggested for you</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${1570000000000 + i * 1000}?w=300&q=80`}
                          alt="Discover content"
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">
                            Discover new AI art #{i}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Popular creators</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=creator${i}`}
                            alt={`Creator ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm mt-1 font-medium">Creator {i}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1 text-xs h-7 px-2"
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-center">
        <CreatePostButton
          variant="secondary"
          label="Create New Post"
          className="w-full max-w-sm"
        />
      </div>
    </div>
  );
};

export default FeedContainer;
