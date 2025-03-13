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
import { Progress } from "../ui/progress";
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
  Gamepad2,
  Trophy,
  Users,
  Star,
  Clock,
  ArrowLeft,
} from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  players: {
    min: number;
    max: number;
  };
  duration: string;
  rating: number;
  playCount: number;
  createdBy: string;
  isNew: boolean;
  isFeatured: boolean;
}

interface GameCenterProps {
  games?: Game[];
  categories?: string[];
  onPlayGame?: (gameId: string) => void;
  onBack?: () => void;
}

const GameCenter = ({
  games = [
    {
      id: "1",
      title: "AI Image Guessing Challenge",
      description:
        "Guess what the AI was prompted to create in these images. Test your AI knowledge!",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
      category: "quiz",
      difficulty: "medium" as const,
      players: {
        min: 1,
        max: 4,
      },
      duration: "10 min",
      rating: 4.8,
      playCount: 12450,
      createdBy: "AI Games Studio",
      isNew: false,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Prompt Master",
      description:
        "Create the best prompts to match the target image. Compete with friends to see who's the prompt master!",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      category: "creativity",
      difficulty: "hard" as const,
      players: {
        min: 2,
        max: 8,
      },
      duration: "15 min",
      rating: 4.9,
      playCount: 8320,
      createdBy: "Prompt Games Inc.",
      isNew: true,
      isFeatured: true,
    },
    {
      id: "3",
      title: "AI Art Memory Match",
      description:
        "Classic memory game with AI-generated art. Match pairs of images to win!",
      image:
        "https://images.unsplash.com/photo-1614102073832-030967418971?w=600&q=80",
      category: "memory",
      difficulty: "easy" as const,
      players: {
        min: 1,
        max: 2,
      },
      duration: "5 min",
      rating: 4.5,
      playCount: 23670,
      createdBy: "Memory Games",
      isNew: false,
      isFeatured: false,
    },
    {
      id: "4",
      title: "AI Style Transfer Race",
      description:
        "Race against time to apply the right style transfers to images. Fast-paced fun!",
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80",
      category: "action",
      difficulty: "medium" as const,
      players: {
        min: 1,
        max: 1,
      },
      duration: "3 min",
      rating: 4.3,
      playCount: 15890,
      createdBy: "Speed Games",
      isNew: false,
      isFeatured: false,
    },
    {
      id: "5",
      title: "AI Trivia Challenge",
      description:
        "Test your knowledge about AI, machine learning, and technology with this fun trivia game.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
      category: "quiz",
      difficulty: "medium" as const,
      players: {
        min: 1,
        max: 10,
      },
      duration: "12 min",
      rating: 4.6,
      playCount: 9870,
      createdBy: "Trivia Masters",
      isNew: true,
      isFeatured: false,
    },
    {
      id: "6",
      title: "Pixel Art Creator",
      description:
        "Create pixel art with AI assistance and compete with others for the best creation.",
      image:
        "https://images.unsplash.com/photo-1633350954377-8c975ca91e46?w=600&q=80",
      category: "creativity",
      difficulty: "easy" as const,
      players: {
        min: 1,
        max: 1,
      },
      duration: "No limit",
      rating: 4.7,
      playCount: 7650,
      createdBy: "Pixel Studios",
      isNew: true,
      isFeatured: true,
    },
  ],
  categories = [
    "All",
    "Quiz",
    "Creativity",
    "Memory",
    "Action",
    "Strategy",
    "Puzzle",
  ],
  onPlayGame = () => {},
  onBack = () => {},
}: GameCenterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Filter games based on search, category, and difficulty
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      game.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDifficulty =
      selectedDifficulty === "all" || game.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort games based on selected sort option
  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.playCount - a.playCount;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default:
        return 0;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">Game Center</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboards</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              <span>Invite Friends</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
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

            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="new">New Games</TabsTrigger>
            <TabsTrigger value="multiplayer">Multiplayer</TabsTrigger>
            <TabsTrigger value="quick">Quick Play</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {sortedGames.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No games found</p>
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedGames.map((game) => (
                  <Card key={game.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover"
                      />
                      {game.isNew && (
                        <Badge className="absolute top-2 left-2 bg-blue-500">
                          NEW
                        </Badge>
                      )}
                      {game.isFeatured && (
                        <Badge className="absolute top-2 right-2 bg-purple-500">
                          FEATURED
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-1">
                        {game.title}
                      </CardTitle>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="capitalize">
                          {game.category}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">
                            {game.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {game.description}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{game.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {game.players.min}-{game.players.max} players
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge
                          className={`${getDifficultyColor(game.difficulty)} text-white text-xs`}
                        >
                          {game.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button
                        className="w-full"
                        onClick={() => onPlayGame(game.id)}
                      >
                        Play Game
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents would be similar but filtered differently */}
          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedGames
                .filter((game) => game.isFeatured)
                .map((game) => (
                  <Card key={game.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="relative">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover"
                      />
                      {game.isNew && (
                        <Badge className="absolute top-2 left-2 bg-blue-500">
                          NEW
                        </Badge>
                      )}
                      {game.isFeatured && (
                        <Badge className="absolute top-2 right-2 bg-purple-500">
                          FEATURED
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-1">
                        {game.title}
                      </CardTitle>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="capitalize">
                          {game.category}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">
                            {game.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {game.description}
                      </p>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{game.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {game.players.min}-{game.players.max} players
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge
                          className={`${getDifficultyColor(game.difficulty)} text-white text-xs`}
                        >
                          {game.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button
                        className="w-full"
                        onClick={() => onPlayGame(game.id)}
                      >
                        Play Game
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GameCenter;
