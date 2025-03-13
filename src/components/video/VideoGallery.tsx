import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Search,
  Filter,
  Play,
  Clock,
  Heart,
  Share2,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import ReactPlayer from "react-player";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  creator: {
    name: string;
    avatar: string;
    subscribers: number;
  };
  category: string;
  tags: string[];
  createdAt: string;
  isLiked: boolean;
}

interface VideoGalleryProps {
  videos?: Video[];
  categories?: string[];
  onVideoClick?: (videoId: string) => void;
  onLike?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
  onComment?: (videoId: string) => void;
  onBack?: () => void;
}

const VideoGallery = ({
  videos = [
    {
      id: "1",
      title: "Creating Stunning AI Portraits - Tutorial",
      description:
        "Learn how to create beautiful AI-generated portraits using the latest techniques and tools.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
      duration: "12:34",
      views: 15420,
      likes: 1245,
      comments: 86,
      creator: {
        name: "AI Creative Studio",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator1",
        subscribers: 45600,
      },
      category: "tutorial",
      tags: ["AI", "portrait", "digital art", "tutorial"],
      createdAt: "2023-05-15",
      isLiked: true,
    },
    {
      id: "2",
      title: "AI Video Generation: The Future of Content Creation",
      description:
        "Exploring how AI is revolutionizing video creation and what it means for content creators.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
      duration: "18:22",
      views: 28750,
      likes: 3421,
      comments: 245,
      creator: {
        name: "Future Tech Today",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator2",
        subscribers: 128000,
      },
      category: "technology",
      tags: ["AI", "video generation", "future tech", "content creation"],
      createdAt: "2023-05-10",
      isLiked: false,
    },
    {
      id: "3",
      title: "How to Use AI to Enhance Your Social Media Presence",
      description:
        "Practical tips for leveraging AI tools to create better content for your social media channels.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
      duration: "15:45",
      views: 9870,
      likes: 876,
      comments: 124,
      creator: {
        name: "Social Media Mastery",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator3",
        subscribers: 67500,
      },
      category: "social media",
      tags: ["social media", "AI tools", "content strategy"],
      createdAt: "2023-05-08",
      isLiked: false,
    },
    {
      id: "4",
      title: "AI Art Showcase: Best Creations of the Month",
      description:
        "A curated collection of the most impressive AI-generated artwork from the past month.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1614102073832-030967418971?w=600&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
      duration: "10:18",
      views: 42300,
      likes: 5678,
      comments: 321,
      creator: {
        name: "Digital Art Channel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator4",
        subscribers: 230000,
      },
      category: "showcase",
      tags: ["AI art", "showcase", "digital art", "monthly roundup"],
      createdAt: "2023-05-01",
      isLiked: true,
    },
    {
      id: "5",
      title: "The Ethics of AI-Generated Content: A Discussion",
      description:
        "Exploring the ethical implications of using AI to create content in various industries.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
      duration: "25:10",
      views: 18650,
      likes: 2134,
      comments: 432,
      creator: {
        name: "Tech Ethics",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator5",
        subscribers: 89700,
      },
      category: "discussion",
      tags: ["ethics", "AI content", "discussion", "technology ethics"],
      createdAt: "2023-04-28",
      isLiked: false,
    },
    {
      id: "6",
      title: "Behind the Scenes: How We Created an AI Short Film",
      description:
        "A look at the process of creating a short film using AI-generated visuals and scripts.",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
      duration: "22:45",
      views: 31240,
      likes: 4321,
      comments: 198,
      creator: {
        name: "Indie Film Collective",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator6",
        subscribers: 112000,
      },
      category: "filmmaking",
      tags: ["filmmaking", "AI film", "behind the scenes", "short film"],
      createdAt: "2023-04-22",
      isLiked: true,
    },
  ],
  categories = [
    "All",
    "Tutorial",
    "Technology",
    "Social Media",
    "Showcase",
    "Discussion",
    "Filmmaking",
  ],
  onVideoClick = () => {},
  onLike = () => {},
  onShare = () => {},
  onComment = () => {},
  onBack = () => {},
}: VideoGalleryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Filter videos based on search and category
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      video.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort videos based on selected sort option
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "popular":
        return b.views - a.views;
      case "likes":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
    onVideoClick(video.id);
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">Videos</h2>
          </div>
          <Button variant="outline" size="sm">
            Upload Video
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="showcases">Showcases</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {sortedVideos.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No videos found</p>
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                        onClick={() => handleVideoClick(video)}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full h-12 w-12"
                          onClick={() => handleVideoClick(video)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-md flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-2">
                        {video.title}
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={video.creator.avatar} />
                          <AvatarFallback>
                            {video.creator.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">
                            {video.creator.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatViewCount(video.views)} views •{" "}
                            {video.createdAt}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="flex gap-1 flex-wrap">
                        {video.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {video.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{video.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${video.isLiked ? "text-red-500" : ""}`}
                        onClick={() => onLike(video.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${video.isLiked ? "fill-current" : ""}`}
                        />
                        <span>{formatViewCount(video.likes)}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onComment(video.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{video.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onShare(video.id)}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents would be similar but filtered differently */}
          <TabsContent value="trending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedVideos
                .sort((a, b) => b.views - a.views)
                .slice(0, 6)
                .map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="relative">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                        onClick={() => handleVideoClick(video)}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full h-12 w-12"
                          onClick={() => handleVideoClick(video)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-md flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-2">
                        {video.title}
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={video.creator.avatar} />
                          <AvatarFallback>
                            {video.creator.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">
                            {video.creator.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatViewCount(video.views)} views •{" "}
                            {video.createdAt}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="flex gap-1 flex-wrap">
                        {video.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {video.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{video.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${video.isLiked ? "text-red-500" : ""}`}
                        onClick={() => onLike(video.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${video.isLiked ? "fill-current" : ""}`}
                        />
                        <span>{formatViewCount(video.likes)}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onComment(video.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{video.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onShare(video.id)}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="sm:max-w-[900px] p-0">
          {selectedVideo && (
            <>
              <div className="aspect-video w-full">
                <ReactPlayer
                  url={selectedVideo.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </div>
              <div className="p-4">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    {selectedVideo.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex justify-between items-start mt-4">
                  <div className="flex items-start">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedVideo.creator.avatar} />
                      <AvatarFallback>
                        {selectedVideo.creator.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {selectedVideo.creator.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatViewCount(selectedVideo.creator.subscribers)}{" "}
                        subscribers
                      </p>
                    </div>
                  </div>
                  <Button>Subscribe</Button>
                </div>
                <div className="mt-4 bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {formatViewCount(selectedVideo.views)} views
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {selectedVideo.createdAt}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${selectedVideo.isLiked ? "text-red-500" : ""}`}
                        onClick={() => onLike(selectedVideo.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${selectedVideo.isLiked ? "fill-current" : ""}`}
                        />
                        <span>{formatViewCount(selectedVideo.likes)}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onShare(selectedVideo.id)}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm">{selectedVideo.description}</p>
                  <div className="flex gap-1 flex-wrap mt-2">
                    {selectedVideo.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">
                    Comments ({selectedVideo.comments})
                  </h3>
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Input placeholder="Add a comment..." className="flex-1" />
                    <Button size="sm">Comment</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideoGallery;
