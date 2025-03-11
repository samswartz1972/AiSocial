import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Bell,
  Settings,
  LogOut,
  Users,
  BookMarked,
  Heart,
  MessageCircle,
  Image,
  Calendar,
  ChevronRight,
} from "lucide-react";

interface ProfileSidebarProps {
  user?: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    joinDate: string;
  };
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
  recentActivity?: {
    type: "like" | "comment" | "follow" | "post";
    user: string;
    content: string;
    time: string;
  }[];
  completionPercentage?: number;
}

const ProfileSidebar = ({
  user = {
    name: "Jane Cooper",
    username: "@janecooper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    bio: "Digital artist and content creator. Passionate about AI-generated art and photography.",
    joinDate: "Joined March 2023",
  },
  stats = {
    posts: 42,
    followers: 1024,
    following: 256,
  },
  recentActivity = [
    {
      type: "like" as const,
      user: "Alex Johnson",
      content: "liked your post",
      time: "2 hours ago",
    },
    {
      type: "comment" as const,
      user: "Maria Garcia",
      content: "commented on your photo",
      time: "5 hours ago",
    },
    {
      type: "follow" as const,
      user: "Sam Wilson",
      content: "started following you",
      time: "1 day ago",
    },
  ],
  completionPercentage = 75,
}: ProfileSidebarProps) => {
  return (
    <div className="w-full max-w-[300px] h-full flex flex-col gap-4 bg-background">
      {/* User Profile Card */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-center">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-center mb-4">{user.bio}</p>
          <div className="flex justify-between text-center mb-2">
            <div className="flex flex-col">
              <span className="font-bold">{stats.posts}</span>
              <span className="text-xs text-muted-foreground">Posts</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{stats.followers}</span>
              <span className="text-xs text-muted-foreground">Followers</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{stats.following}</span>
              <span className="text-xs text-muted-foreground">Following</span>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            {user.joinDate}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
          <Button className="w-full" size="sm">
            Edit Profile
          </Button>
        </CardFooter>
      </Card>

      {/* Profile Completion */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Profile Completion</h3>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            Your profile is {completionPercentage}% complete. Add a bio to
            improve your profile.
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Recent Activity</h3>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start p-2 rounded-md hover:bg-muted/50"
              >
                <div className="mr-2 mt-0.5">
                  {activity.type === "like" && (
                    <Heart className="h-4 w-4 text-red-500" />
                  )}
                  {activity.type === "comment" && (
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                  )}
                  {activity.type === "follow" && (
                    <Users className="h-4 w-4 text-green-500" />
                  )}
                  {activity.type === "post" && (
                    <Image className="h-4 w-4 text-purple-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            View All Activity
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Links */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <nav className="flex flex-col">
            <Button
              variant="ghost"
              className="justify-start rounded-none h-10 px-4"
            >
              <BookMarked className="mr-2 h-4 w-4" />
              <span>Saved Posts</span>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
            <Separator />
            <Button
              variant="ghost"
              className="justify-start rounded-none h-10 px-4"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Your Events</span>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
            <Separator />
            <Button
              variant="ghost"
              className="justify-start rounded-none h-10 px-4"
            >
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <Badge variant="secondary" className="ml-auto">
                3
              </Badge>
            </Button>
            <Separator />
            <Button
              variant="ghost"
              className="justify-start rounded-none h-10 px-4"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
            <Separator />
            <Button
              variant="ghost"
              className="justify-start rounded-none h-10 px-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSidebar;
