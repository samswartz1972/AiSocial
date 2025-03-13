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
import { Separator } from "../ui/separator";
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
  Heart,
  MessageCircle,
  X,
  ArrowLeft,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  photos: string[];
  compatibility: number;
  lastActive: string;
  verified: boolean;
  liked: boolean;
}

interface DatingContainerProps {
  profiles?: Profile[];
  onLike?: (profileId: string) => void;
  onDislike?: (profileId: string) => void;
  onMessage?: (profileId: string) => void;
  onViewProfile?: (profileId: string) => void;
  onBack?: () => void;
}

const DatingContainer = ({
  profiles = [
    {
      id: "1",
      name: "Emma Wilson",
      age: 28,
      location: "San Francisco, CA",
      bio: "Creative designer who loves AI art and hiking on weekends. Looking for someone to share adventures with.",
      interests: ["Art", "Hiking", "Photography", "AI", "Travel"],
      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      ],
      compatibility: 92,
      lastActive: "Just now",
      verified: true,
      liked: false,
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 31,
      location: "New York, NY",
      bio: "Software engineer by day, musician by night. Love discussing AI ethics and playing jazz.",
      interests: ["Music", "Technology", "AI Ethics", "Cooking", "Reading"],
      photos: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      ],
      compatibility: 85,
      lastActive: "2 hours ago",
      verified: true,
      liked: true,
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      age: 26,
      location: "Los Angeles, CA",
      bio: "Film producer interested in AI-generated content. Looking for creative minds to connect with.",
      interests: ["Film", "AI Art", "Storytelling", "Beach", "Yoga"],
      photos: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80",
      ],
      compatibility: 78,
      lastActive: "Yesterday",
      verified: true,
      liked: false,
    },
    {
      id: "4",
      name: "James Taylor",
      age: 33,
      location: "Chicago, IL",
      bio: "AI researcher and amateur chef. Looking for someone to share meals and meaningful conversations with.",
      interests: ["AI Research", "Cooking", "Philosophy", "Running", "Travel"],
      photos: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      ],
      compatibility: 88,
      lastActive: "3 hours ago",
      verified: false,
      liked: false,
    },
    {
      id: "5",
      name: "Olivia Kim",
      age: 29,
      location: "Seattle, WA",
      bio: "Tech product manager who loves exploring AI applications. Seeking someone who enjoys deep conversations and outdoor activities.",
      interests: ["Technology", "Hiking", "AI", "Books", "Kayaking"],
      photos: [
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
        "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=400&q=80",
      ],
      compatibility: 94,
      lastActive: "Online",
      verified: true,
      liked: true,
    },
    {
      id: "6",
      name: "Daniel Johnson",
      age: 30,
      location: "Austin, TX",
      bio: "AI startup founder with a passion for sustainable technology. Looking for a partner who shares my values and ambitions.",
      interests: ["Startups", "Sustainability", "AI", "Cycling", "Meditation"],
      photos: [
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      ],
      compatibility: 82,
      lastActive: "1 day ago",
      verified: true,
      liked: false,
    },
  ],
  onLike = () => {},
  onDislike = () => {},
  onMessage = () => {},
  onViewProfile = () => {},
  onBack = () => {},
}: DatingContainerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 50]);
  const [distance, setDistance] = useState<number>(50);
  const [activeTab, setActiveTab] = useState("discover");
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"swipe" | "browse">("browse");

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.interests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesAge = profile.age >= ageRange[0] && profile.age <= ageRange[1];
    return matchesSearch && matchesAge;
  });

  const handleLike = (profileId: string) => {
    onLike(profileId);
    if (
      viewMode === "swipe" &&
      currentProfileIndex < filteredProfiles.length - 1
    ) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const handleDislike = (profileId: string) => {
    onDislike(profileId);
    if (
      viewMode === "swipe" &&
      currentProfileIndex < filteredProfiles.length - 1
    ) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const currentProfile = filteredProfiles[currentProfileIndex];

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">SocialAI Dating</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              <span>Upgrade</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, bio, or interests..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "swipe" | "browse")
              }
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="View Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="browse">Browse Profiles</SelectItem>
                <SelectItem value="swipe">Swipe Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="liked">Liked You</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-0">
            {viewMode === "swipe" ? (
              <div className="flex flex-col items-center">
                {filteredProfiles.length > 0 ? (
                  <div className="w-full max-w-md">
                    <Card className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={currentProfile.photos[0]}
                          alt={currentProfile.name}
                          className="w-full h-[400px] object-cover"
                        />
                        {currentProfile.verified && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            Verified
                          </Badge>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-white text-xl font-bold">
                            {currentProfile.name}, {currentProfile.age}
                          </h3>
                          <div className="flex items-center text-white/90 text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {currentProfile.location}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {currentProfile.compatibility}% Match
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              {currentProfile.lastActive}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm mb-3">{currentProfile.bio}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {currentProfile.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between p-4 pt-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full"
                          onClick={() => handleDislike(currentProfile.id)}
                        >
                          <X className="h-6 w-6 text-red-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full"
                          onClick={() => onViewProfile(currentProfile.id)}
                        >
                          <Search className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full"
                          onClick={() => handleLike(currentProfile.id)}
                        >
                          <Heart className="h-6 w-6 text-pink-500" />
                        </Button>
                      </CardFooter>
                    </Card>
                    <div className="text-center mt-4 text-sm text-muted-foreground">
                      Profile {currentProfileIndex + 1} of{" "}
                      {filteredProfiles.length}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No profiles match your criteria
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map((profile) => (
                    <Card key={profile.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={profile.photos[0]}
                          alt={profile.name}
                          className="w-full h-48 object-cover"
                          onClick={() => onViewProfile(profile.id)}
                          style={{ cursor: "pointer" }}
                        />
                        {profile.verified && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            Verified
                          </Badge>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <h3 className="text-white font-bold">
                            {profile.name}, {profile.age}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {profile.location}
                            </span>
                          </div>
                          <Badge variant="outline">
                            {profile.compatibility}% Match
                          </Badge>
                        </div>
                        <p className="text-sm line-clamp-2 mb-2">
                          {profile.bio}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {profile.interests
                            .slice(0, 3)
                            .map((interest, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {interest}
                              </Badge>
                            ))}
                          {profile.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.interests.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className={profile.liked ? "text-pink-500" : ""}
                          onClick={() => onLike(profile.id)}
                        >
                          <Heart
                            className={`h-4 w-4 mr-1 ${profile.liked ? "fill-pink-500" : ""}`}
                          />
                          {profile.liked ? "Liked" : "Like"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onMessage(profile.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-muted-foreground">
                      No profiles match your criteria
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="matches" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProfiles
                .filter((profile) => profile.liked)
                .map((profile) => (
                  <Card key={profile.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="relative">
                      <img
                        src={profile.photos[0]}
                        alt={profile.name}
                        className="w-full h-48 object-cover"
                        onClick={() => onViewProfile(profile.id)}
                        style={{ cursor: "pointer" }}
                      />
                      {profile.verified && (
                        <Badge className="absolute top-2 right-2 bg-blue-500">
                          Verified
                        </Badge>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <h3 className="text-white font-bold">
                          {profile.name}, {profile.age}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {profile.location}
                          </span>
                        </div>
                        <Badge variant="outline">
                          {profile.compatibility}% Match
                        </Badge>
                      </div>
                      <p className="text-sm line-clamp-2 mb-2">{profile.bio}</p>
                      <div className="flex flex-wrap gap-1">
                        {profile.interests
                          .slice(0, 3)
                          .map((interest, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {interest}
                            </Badge>
                          ))}
                        {profile.interests.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{profile.interests.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-500"
                        onClick={() => onLike(profile.id)}
                      >
                        <Heart className="h-4 w-4 mr-1 fill-pink-500" />
                        Matched
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMessage(profile.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              {filteredProfiles.filter((profile) => profile.liked).length ===
                0 && (
                <div className="col-span-3 text-center py-10">
                  <p className="text-muted-foreground">No matches yet</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab("discover")}
                  >
                    Discover Profiles
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DatingContainer;
