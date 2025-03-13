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
  Grid3X3,
  LayoutList,
  ShoppingCart,
  Heart,
  Tag,
  ArrowUpDown,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: {
    name: string;
    rating: number;
    avatar: string;
  };
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
}

interface MarketplaceContainerProps {
  products?: Product[];
  categories?: string[];
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
}

const MarketplaceContainer = ({
  products = [
    {
      id: "1",
      title: "AI Portrait Generator Pro",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
      category: "software",
      seller: {
        name: "Digital Creations Inc.",
        rating: 4.8,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller1",
      },
      rating: 4.7,
      reviewCount: 128,
      isFavorite: false,
    },
    {
      id: "2",
      title: "Video Transformation Suite",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      category: "software",
      seller: {
        name: "AI Video Labs",
        rating: 4.6,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller2",
      },
      rating: 4.5,
      reviewCount: 94,
      isFavorite: true,
    },
    {
      id: "3",
      title: "Custom AI Avatar Creation",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1614102073832-030967418971?w=400&q=80",
      category: "service",
      seller: {
        name: "Avatar Designers",
        rating: 4.9,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller3",
      },
      rating: 4.8,
      reviewCount: 215,
      isFavorite: false,
    },
    {
      id: "4",
      title: "AI Content Pack - 100 Images",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80",
      category: "content",
      seller: {
        name: "Creative Assets",
        rating: 4.5,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller4",
      },
      rating: 4.3,
      reviewCount: 67,
      isFavorite: false,
    },
    {
      id: "5",
      title: "Premium AI Backgrounds",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400&q=80",
      category: "content",
      seller: {
        name: "Background Masters",
        rating: 4.7,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller5",
      },
      rating: 4.6,
      reviewCount: 103,
      isFavorite: true,
    },
    {
      id: "6",
      title: "AI Video Editing Course",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=400&q=80",
      category: "course",
      seller: {
        name: "Learn AI Academy",
        rating: 4.9,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller6",
      },
      rating: 4.9,
      reviewCount: 312,
      isFavorite: false,
    },
  ],
  categories = ["All", "Software", "Service", "Content", "Course"],
  onProductClick = () => {},
  onAddToCart = () => {},
  onToggleFavorite = () => {},
}: MarketplaceContainerProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // Featured - no specific sort
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Marketplace</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart (0)</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
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
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex justify-start mb-4 overflow-x-auto">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="deals">Special Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No products found</p>
                <Button variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full h-8 w-8"
                        onClick={() => onToggleFavorite(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-1">
                        {product.title}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {product.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="flex items-center text-sm">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-500 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {product.rating}
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex gap-2">
                      <Button
                        variant="default"
                        className="w-full"
                        size="sm"
                        onClick={() => onAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProductClick(product.id)}
                      >
                        Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <Card key={product.id}>
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {product.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className="flex items-center">
                                <svg
                                  className="w-4 h-4 text-yellow-500 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {product.rating}
                              </span>
                              <span className="text-muted-foreground text-xs ml-1">
                                ({product.reviewCount} reviews)
                              </span>
                              <Badge variant="outline" className="ml-2">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              ${product.price.toFixed(2)}
                            </div>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-muted-foreground mr-2">
                                Sold by: {product.seller.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => onAddToCart(product.id)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onProductClick(product.id)}
                            >
                              View Details
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onToggleFavorite(product.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Other tab contents would be similar but filtered by category */}
          <TabsContent value="software" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts
                .filter((p) => p.category.toLowerCase() === "software")
                .map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full h-8 w-8"
                        onClick={() => onToggleFavorite(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${product.isFavorite ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base line-clamp-1">
                        {product.title}
                      </CardTitle>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {product.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-2">
                      <div className="flex items-center text-sm">
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-500 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {product.rating}
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex gap-2">
                      <Button
                        variant="default"
                        className="w-full"
                        size="sm"
                        onClick={() => onAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProductClick(product.id)}
                      >
                        Details
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

export default MarketplaceContainer;
