import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Bookmark,
} from "lucide-react";

interface PostProps {
  id?: string;
  user?: {
    name: string;
    username: string;
    avatar: string;
  };
  content?: {
    text: string;
    media?: {
      type: "image" | "video";
      url: string;
    };
    createdAt: string;
  };
  interactions?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const Post = ({
  id = "1",
  user = {
    name: "Jane Cooper",
    username: "@janecooper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  content = {
    text: "Just created this amazing AI-generated image! What do you think?",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
    },
    createdAt: "2 hours ago",
  },
  interactions = {
    likes: 42,
    comments: 12,
    shares: 5,
  },
}: PostProps) => {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(interactions.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <Card className="w-full max-w-[650px] mb-4 bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {user.username} · {content.createdAt}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report post</DropdownMenuItem>
              <DropdownMenuItem>Mute user</DropdownMenuItem>
              <DropdownMenuItem>Block user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3">{content.text}</p>
        {content.media && (
          <div className="rounded-lg overflow-hidden mb-3">
            {content.media.type === "image" ? (
              <img
                src={content.media.url}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            ) : (
              <video
                src={content.media.url}
                controls
                className="w-full h-auto"
              />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${liked ? "fill-current text-red-500" : ""}`}
            />
            <span>{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{interactions.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>{interactions.shares}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={saved ? "text-blue-500" : ""}
          onClick={handleSave}
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
