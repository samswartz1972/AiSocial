import React, { useState, useEffect } from "react";
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
  Clock,
  Gavel,
  ArrowUpDown,
  Heart,
  ArrowLeft,
} from "lucide-react";

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  currentBid: number;
  startingBid: number;
  bidCount: number;
  endTime: Date;
  seller: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  isFavorite: boolean;
  topBidder?: string;
}

interface AuctionContainerProps {
  auctionItems?: AuctionItem[];
  categories?: string[];
  onPlaceBid?: (itemId: string, amount: number) => void;
  onViewItem?: (itemId: string) => void;
  onToggleFavorite?: (itemId: string) => void;
  onBack?: () => void;
}

const AuctionContainer = ({
  auctionItems = [
    {
      id: "1",
      title: "Exclusive AI-Generated Artwork Collection",
      description:
        "A collection of 5 unique AI-generated artworks with certificate of authenticity.",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
      currentBid: 299.99,
      startingBid: 99.99,
      bidCount: 15,
      endTime: new Date(Date.now() + 86400000), // 24 hours from now
      seller: {
        name: "Digital Art Studios",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=artist1",
        rating: 4.9,
      },
      category: "art",
      isFavorite: true,
      topBidder: "alex89",
    },
    {
      id: "2",
      title: "Premium AI Video Generation License",
      description:
        "Lifetime license for professional AI video generation software with commercial rights.",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      currentBid: 499.99,
      startingBid: 299.99,
      bidCount: 8,
      endTime: new Date(Date.now() + 172800000), // 48 hours from now
      seller: {
        name: "Software Solutions",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller2",
        rating: 4.7,
      },
      category: "software",
      isFavorite: false,
    },
    {
      id: "3",
      title: "Custom AI Avatar Creation Package",
      description:
        "Professional service to create a personalized set of AI avatars for your brand.",
      image:
        "https://images.unsplash.com/photo-1614102073832-030967418971?w=600&q=80",
      currentBid: 149.99,
      startingBid: 49.99,
      bidCount: 23,
      endTime: new Date(Date.now() + 43200000), // 12 hours from now
      seller: {
        name: "Creative Avatars",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller3",
        rating: 4.8,
      },
      category: "service",
      isFavorite: true,
      topBidder: "maria_design",
    },
    {
      id: "4",
      title: "Exclusive AI Training Dataset",
      description:
        "Curated dataset for training AI models, includes 10,000 labeled images.",
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80",
      currentBid: 799.99,
      startingBid: 499.99,
      bidCount: 5,
      endTime: new Date(Date.now() + 259200000), // 3 days from now
      seller: {
        name: "Data Experts Inc.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller4",
        rating: 4.6,
      },
      category: "data",
      isFavorite: false,
    },
    {
      id: "5",
      title: "AI Content Creation Consultation",
      description:
        "5-hour consultation with an AI content expert to optimize your creation workflow.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
      currentBid: 349.99,
      startingBid: 199.99,
      bidCount: 12,
      endTime: new Date(Date.now() + 129600000), // 36 hours from now
      seller: {
        name: "AI Consultants",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller5",
        rating: 4.9,
      },
      category: "service",
      isFavorite: false,
      topBidder: "tech_company",
    },
    {
      id: "6",
      title: "Limited Edition AI-Generated Music Album",
      description:
        "Collection of 10 tracks created using cutting-edge AI music generation.",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80",
      currentBid: 89.99,
      startingBid: 29.99,
      bidCount: 31,
      endTime: new Date(Date.now() + 64800000), // 18 hours from now
      seller: {
        name: "Future Sounds",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller6",
        rating: 4.7,
      },
      category: "audio",
      isFavorite: true,
    },
  ],
  categories = ["All", "Art", "Software", "Service", "Data", "Audio"],
  onPlaceBid = () => {},
  onViewItem = () => {},
  onToggleFavorite = () => {},
  onBack = () => {},
}: AuctionContainerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [bidAmounts, setBidAmounts] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});

  // Initialize bid amounts
  useEffect(() => {
    const initialBids: Record<string, number> = {};
    auctionItems.forEach((item) => {
      initialBids[item.id] = item.currentBid + 10; // Default bid is current + 10
    });
    setBidAmounts(initialBids);
  }, [auctionItems]);

  // Update time left for each auction
  useEffect(() => {
    const calculateTimeLeft = () => {
      const times: Record<string, string> = {};

      auctionItems.forEach((item) => {
        const difference = item.endTime.getTime() - new Date().getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);

          if (days > 0) {
            times[item.id] = `${days}d ${hours}h`;
          } else if (hours > 0) {
            times[item.id] = `${hours}h ${minutes}m`;
          } else {
            times[item.id] = `${minutes}m`;
          }
        } else {
          times[item.id] = "Ended";
        }
      });

      setTimeLeft(times);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [auctionItems]);

  // Filter items based on search and category
  const filteredItems = auctionItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "ending-soon":
        return a.endTime.getTime() - b.endTime.getTime();
      case "price-low":
        return a.currentBid - b.currentBid;
      case "price-high":
        return b.currentBid - a.currentBid;
      case "most-bids":
        return b.bidCount - a.bidCount;
      default:
        return 0;
    }
  });

  const handleBidChange = (itemId: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setBidAmounts({ ...bidAmounts, [itemId]: numValue });
    }
  };

  const handlePlaceBid = (itemId: string) => {
    const bidAmount = bidAmounts[itemId];
    const item = auctionItems.find((i) => i.id === itemId);

    if (item && bidAmount > item.currentBid) {
      onPlaceBid(itemId, bidAmount);
      // In a real app, this would update the item's current bid after API call
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
            <h2 className="text-xl font-bold">Auctions</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Gavel className="h-4 w-4" />
            <span>My Bids</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
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
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="most-bids">Most Bids</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="all">All Auctions</TabsTrigger>
            <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
            <TabsTrigger value="new">Newly Listed</TabsTrigger>
            <TabsTrigger value="hot">Hot Items</TabsTrigger>
            <TabsTrigger value="watched">Watched Items</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {sortedItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No auctions found</p>
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onClick={() => onViewItem(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full h-8 w-8"
                        onClick={() => onToggleFavorite(item.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${item.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-3 py-1 flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">{timeLeft[item.id]}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.bidCount} bids
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-1">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline">{item.category}</Badge>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarImage src={item.seller.avatar} />
                            <AvatarFallback>
                              {item.seller.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{item.seller.name}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="text-sm mb-1">
                        <span className="font-medium">Current Bid: </span>
                        <span className="font-bold">
                          ${item.currentBid.toFixed(2)}
                        </span>
                      </div>
                      {item.topBidder && (
                        <div className="text-xs text-muted-foreground mb-2">
                          Top Bidder: {item.topBidder}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="number"
                          value={bidAmounts[item.id]}
                          onChange={(e) =>
                            handleBidChange(item.id, e.target.value)
                          }
                          className="h-8"
                          min={item.currentBid + 0.01}
                          step="0.01"
                        />
                        <Button
                          size="sm"
                          onClick={() => handlePlaceBid(item.id)}
                          disabled={
                            !bidAmounts[item.id] ||
                            bidAmounts[item.id] <= item.currentBid
                          }
                        >
                          Bid
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button
                        variant="outline"
                        className="w-full"
                        size="sm"
                        onClick={() => onViewItem(item.id)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents would be similar but filtered differently */}
          <TabsContent value="ending-soon" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedItems
                .filter((item) => {
                  const timeRemaining =
                    item.endTime.getTime() - new Date().getTime();
                  return timeRemaining > 0 && timeRemaining < 86400000; // Less than 24 hours
                })
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                        onClick={() => onViewItem(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full h-8 w-8"
                        onClick={() => onToggleFavorite(item.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${item.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-3 py-1 flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">{timeLeft[item.id]}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.bidCount} bids
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-1">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline">{item.category}</Badge>
                        <div className="flex items-center">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarImage src={item.seller.avatar} />
                            <AvatarFallback>
                              {item.seller.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{item.seller.name}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="text-sm mb-1">
                        <span className="font-medium">Current Bid: </span>
                        <span className="font-bold">
                          ${item.currentBid.toFixed(2)}
                        </span>
                      </div>
                      {item.topBidder && (
                        <div className="text-xs text-muted-foreground mb-2">
                          Top Bidder: {item.topBidder}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          type="number"
                          value={bidAmounts[item.id]}
                          onChange={(e) =>
                            handleBidChange(item.id, e.target.value)
                          }
                          className="h-8"
                          min={item.currentBid + 0.01}
                          step="0.01"
                        />
                        <Button
                          size="sm"
                          onClick={() => handlePlaceBid(item.id)}
                          disabled={
                            !bidAmounts[item.id] ||
                            bidAmounts[item.id] <= item.currentBid
                          }
                        >
                          Bid
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0">
                      <Button
                        variant="outline"
                        className="w-full"
                        size="sm"
                        onClick={() => onViewItem(item.id)}
                      >
                        View Details
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

export default AuctionContainer;
