import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ShoppingCart,
  Gavel,
  Video,
  Gamepad2,
  Heart,
  LayoutDashboard,
  Home as HomeIcon,
  CreditCard,
} from "lucide-react";

interface FeatureNavigationProps {
  currentFeature?: string;
}

const FeatureNavigation = ({
  currentFeature = "home",
}: FeatureNavigationProps) => {
  const navigate = useNavigate();
  const features = [
    {
      id: "home",
      name: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      path: "/",
    },
    {
      id: "marketplace",
      name: "Marketplace",
      icon: <ShoppingCart className="h-5 w-5" />,
      path: "/marketplace",
    },
    {
      id: "auctions",
      name: "Auctions",
      icon: <Gavel className="h-5 w-5" />,
      path: "/auctions",
    },
    {
      id: "videos",
      name: "Videos",
      icon: <Video className="h-5 w-5" />,
      path: "/videos",
    },
    {
      id: "games",
      name: "Games",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/games",
    },
    {
      id: "dating",
      name: "Dating",
      icon: <Heart className="h-5 w-5" />,
      path: "/dating",
    },
    {
      id: "membership",
      name: "Membership",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/membership",
    },
    {
      id: "admin",
      name: "Admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {features.map((feature) => (
        <Button
          key={feature.id}
          variant={currentFeature === feature.id ? "default" : "outline"}
          onClick={() => navigate(feature.path)}
          className="flex items-center gap-2"
        >
          {feature.icon}
          <span>{feature.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default FeatureNavigation;
