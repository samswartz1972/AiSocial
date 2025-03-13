import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle } from "lucide-react";

interface MembershipPlansProps {
  onSelectPlan?: (plan: string) => void;
}

const MembershipPlans = ({ onSelectPlan = () => {} }: MembershipPlansProps) => {
  const handleSelectPlan = (planId: string) => {
    onSelectPlan(planId);
    // In a real app, this would redirect to a payment page
    alert(`You selected the ${planId} plan. Redirecting to payment...`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Membership Plan</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Unlock premium features and enhance your SocialAI experience with our
          membership plans. Choose the plan that best fits your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Free Plan</CardTitle>
            <CardDescription>Basic features for casual users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              $0
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Basic AI image generation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Limited content creation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Standard support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">5 AI generations per day</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSelectPlan("free")}
            >
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary">
          <CardHeader>
            <Badge className="mb-2 bg-primary">Most Popular</Badge>
            <CardTitle className="text-xl">Pro Plan</CardTitle>
            <CardDescription>Advanced features for creators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              $9.99
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Advanced AI image generation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Full video creation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">50 AI generations per day</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Ad-free experience</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleSelectPlan("pro")}>
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Premium Plan</CardTitle>
            <CardDescription>
              Ultimate features for professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              $24.99
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">All Pro features</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Unlimited AI generations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">VIP support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Early access to new features</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">Commercial usage rights</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSelectPlan("premium")}
            >
              Upgrade to Premium
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Need a custom plan?</h3>
        <p className="text-muted-foreground mb-6">
          Contact us for enterprise solutions and custom pricing options
          tailored to your specific needs.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>
    </div>
  );
};

export default MembershipPlans;
