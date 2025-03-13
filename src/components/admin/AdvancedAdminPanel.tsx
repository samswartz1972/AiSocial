import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  Users,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Plus,
  Trash,
  Edit,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Shield,
  Bell,
  DollarSign,
  CreditCard,
  UserCog,
  Lock,
  Globe,
  MessageSquare,
  Calendar,
  HelpCircle,
  FileCode,
  Database,
  Server,
  Activity,
  Zap,
  Layers,
} from "lucide-react";

interface AdvancedAdminPanelProps {
  activeTab?: string;
  userData?: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "suspended" | "pending";
    joinDate: string;
    subscription?: string;
    lastLogin?: string;
    twoFactorEnabled?: boolean;
  }>;
  contentData?: Array<{
    id: string;
    title: string;
    author: string;
    type: "image" | "video" | "text" | "audio";
    status: "approved" | "flagged" | "removed" | "pending";
    reportCount: number;
    createdAt: string;
    views?: number;
    likes?: number;
    category?: string;
  }>;
  analyticsData?: {
    userGrowth: number;
    totalUsers: number;
    totalContent: number;
    contentEngagement: number;
    dailyActiveUsers: number;
    revenue: number;
    conversionRate: number;
    averageSessionTime: number;
    topPlatforms: { name: string; percentage: number }[];
    userRetention: number;
  };
  systemData?: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    activeConnections: number;
    responseTime: number;
    errorRate: number;
    lastBackup: string;
    serverStatus: "operational" | "degraded" | "maintenance" | "down";
  };
}

const AdvancedAdminPanel = ({
  activeTab = "dashboard",
  userData = [
    {
      id: "1",
      name: "Jane Cooper",
      email: "jane@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-01-15",
      subscription: "Pro",
      lastLogin: "2023-05-18 14:32",
      twoFactorEnabled: true,
    },
    {
      id: "2",
      name: "Robert Fox",
      email: "robert@example.com",
      role: "admin",
      status: "active",
      joinDate: "2022-11-03",
      subscription: "Lifetime",
      lastLogin: "2023-05-19 09:15",
      twoFactorEnabled: true,
    },
    {
      id: "3",
      name: "Esther Howard",
      email: "esther@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2023-03-22",
      subscription: "Standard",
      lastLogin: "2023-05-10 18:45",
      twoFactorEnabled: false,
    },
    {
      id: "4",
      name: "Cameron Williamson",
      email: "cameron@example.com",
      role: "user",
      status: "pending",
      joinDate: "2023-05-10",
      subscription: "None",
      lastLogin: "Never",
      twoFactorEnabled: false,
    },
    {
      id: "5",
      name: "Brooklyn Simmons",
      email: "brooklyn@example.com",
      role: "moderator",
      status: "active",
      joinDate: "2023-02-08",
      subscription: "Pro",
      lastLogin: "2023-05-19 11:22",
      twoFactorEnabled: true,
    },
  ],
  contentData = [
    {
      id: "1",
      title: "Sunset over mountains",
      author: "Jane Cooper",
      type: "image",
      status: "approved",
      reportCount: 0,
      createdAt: "2023-05-15",
      views: 1245,
      likes: 89,
      category: "Nature",
    },
    {
      id: "2",
      title: "AI-generated cityscape",
      author: "Robert Fox",
      type: "image",
      status: "flagged",
      reportCount: 3,
      createdAt: "2023-05-12",
      views: 876,
      likes: 45,
      category: "Urban",
    },
    {
      id: "3",
      title: "My first AI video",
      author: "Esther Howard",
      type: "video",
      status: "approved",
      reportCount: 1,
      createdAt: "2023-05-10",
      views: 2341,
      likes: 156,
      category: "Tutorial",
    },
    {
      id: "4",
      title: "Inappropriate content",
      author: "Cameron Williamson",
      type: "text",
      status: "removed",
      reportCount: 8,
      createdAt: "2023-05-08",
      views: 432,
      likes: 12,
      category: "Other",
    },
    {
      id: "5",
      title: "Abstract art creation",
      author: "Brooklyn Simmons",
      type: "image",
      status: "approved",
      reportCount: 0,
      createdAt: "2023-05-05",
      views: 1876,
      likes: 134,
      category: "Art",
    },
    {
      id: "6",
      title: "AI-generated music track",
      author: "Jane Cooper",
      type: "audio",
      status: "pending",
      reportCount: 0,
      createdAt: "2023-05-18",
      views: 543,
      likes: 32,
      category: "Music",
    },
  ],
  analyticsData = {
    userGrowth: 12.5,
    totalUsers: 1250,
    totalContent: 3450,
    contentEngagement: 68.2,
    dailyActiveUsers: 450,
    revenue: 15750.25,
    conversionRate: 3.8,
    averageSessionTime: 8.5,
    topPlatforms: [
      { name: "Web", percentage: 45 },
      { name: "iOS", percentage: 30 },
      { name: "Android", percentage: 25 },
    ],
    userRetention: 72.4,
  },
  systemData = {
    cpuUsage: 42.5,
    memoryUsage: 68.3,
    diskUsage: 57.2,
    activeConnections: 234,
    responseTime: 187,
    errorRate: 0.8,
    lastBackup: "2023-05-18 03:00",
    serverStatus: "operational",
  },
}: AdvancedAdminPanelProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [showSystemSettingsDialog, setShowSystemSettingsDialog] =
    useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);

  // Filter users based on search query and status filter
  const filteredUsers = userData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter content based on search query and status filter
  const filteredContent = contentData.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || content.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="bg-green-500">
            Approved
          </Badge>
        );
      case "flagged":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Flagged
          </Badge>
        );
      case "removed":
        return <Badge variant="destructive">Removed</Badge>;
      case "operational":
        return (
          <Badge variant="default" className="bg-green-500">
            Operational
          </Badge>
        );
      case "degraded":
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            Degraded
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-blue-500">
            Maintenance
          </Badge>
        );
      case "down":
        return <Badge variant="destructive">Down</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case "Pro":
        return (
          <Badge variant="default" className="bg-purple-500">
            Pro
          </Badge>
        );
      case "Lifetime":
        return (
          <Badge variant="default" className="bg-blue-500">
            Lifetime
          </Badge>
        );
      case "Standard":
        return (
          <Badge variant="default" className="bg-green-500">
            Standard
          </Badge>
        );
      case "None":
        return <Badge variant="outline">None</Badge>;
      default:
        return <Badge variant="outline">{subscription}</Badge>;
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Advanced Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive management and analytics for your platform
          </p>
        </header>

        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="subscriptions"
              className="flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {analyticsData.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <span
                      className={`inline-block mr-1 ${analyticsData.userGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {analyticsData.userGrowth >= 0 ? "↑" : "↓"}{" "}
                      {Math.abs(analyticsData.userGrowth)}%
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Daily Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {analyticsData.dailyActiveUsers.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(
                      (analyticsData.dailyActiveUsers /
                        analyticsData.totalUsers) *
                      100
                    ).toFixed(1)}
                    % of total users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${analyticsData.revenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analyticsData.conversionRate}% conversion rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    User Retention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {analyticsData.userRetention}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analyticsData.averageSessionTime} min avg. session
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPlatforms.map((platform) => (
                      <div key={platform.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{platform.name}</span>
                          <span className="text-sm font-medium">
                            {platform.percentage}%
                          </span>
                        </div>
                        <Progress value={platform.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Server Status</h3>
                        <p className="text-sm text-muted-foreground">
                          Current operational status
                        </p>
                      </div>
                      {getStatusBadge(systemData.serverStatus)}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">CPU Usage</span>
                        <span className="text-sm font-medium">
                          {systemData.cpuUsage}%
                        </span>
                      </div>
                      <Progress value={systemData.cpuUsage} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Memory Usage</span>
                        <span className="text-sm font-medium">
                          {systemData.memoryUsage}%
                        </span>
                      </div>
                      <Progress
                        value={systemData.memoryUsage}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Disk Usage</span>
                        <span className="text-sm font-medium">
                          {systemData.diskUsage}%
                        </span>
                      </div>
                      <Progress value={systemData.diskUsage} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowSystemSettingsDialog(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">User Login</TableCell>
                      <TableCell>Robert Fox</TableCell>
                      <TableCell>2 minutes ago</TableCell>
                      <TableCell>IP: 192.168.1.1, Browser: Chrome</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Content Flagged
                      </TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>15 minutes ago</TableCell>
                      <TableCell>
                        Content ID: 2, Reason: Inappropriate
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        New Subscription
                      </TableCell>
                      <TableCell>Jane Cooper</TableCell>
                      <TableCell>1 hour ago</TableCell>
                      <TableCell>Plan: Pro, Amount: $49.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        User Registered
                      </TableCell>
                      <TableCell>Cameron Williamson</TableCell>
                      <TableCell>3 hours ago</TableCell>
                      <TableCell>Source: Direct</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        System Backup
                      </TableCell>
                      <TableCell>Automated</TableCell>
                      <TableCell>6 hours ago</TableCell>
                      <TableCell>Size: 2.3GB, Duration: 8 minutes</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">View All Activity</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Content Moderation Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Content Moderation</h2>
              <Button onClick={() => setShowContentDialog(true)}>
                <Eye className="h-4 w-4 mr-2" />
                Review Flagged Content
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="removed">Removed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6">
                          No content found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredContent.map((content) => (
                        <TableRow key={content.id}>
                          <TableCell className="font-medium">
                            {content.title}
                          </TableCell>
                          <TableCell>{content.author}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{content.type}</Badge>
                          </TableCell>
                          <TableCell>{content.category}</TableCell>
                          <TableCell>
                            {getStatusBadge(content.status)}
                          </TableCell>
                          <TableCell>
                            {content.reportCount > 0 ? (
                              <Badge
                                variant="secondary"
                                className="bg-red-100 text-red-800"
                              >
                                {content.reportCount} reports
                              </Badge>
                            ) : (
                              "None"
                            )}
                          </TableCell>
                          <TableCell>
                            {content.views?.toLocaleString() || "N/A"}
                          </TableCell>
                          <TableCell>{content.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {content.status !== "removed" && (
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                              {content.status === "flagged" && (
                                <Button variant="ghost" size="icon">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              {content.status === "pending" && (
                                <Button variant="ghost" size="icon">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Images</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Videos</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Text</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Audio</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Approved</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Flagged</span>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                      <Progress value={8} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Removed</span>
                        <span className="text-sm font-medium">7%</span>
                      </div>
                      <Progress value={7} className="h-2 bg-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moderation Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Content Reviewed Today</span>
                      <span className="text-sm font-medium">42</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Content Approved Today</span>
                      <span className="text-sm font-medium">35</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Content Flagged Today</span>
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Content Removed Today</span>
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Review Time</span>
                      <span className="text-sm font-medium">3.5 minutes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Moderation Logs
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">User Management</h2>
              <Button onClick={() => setShowUserDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>2FA</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6">
                          No users found matching your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>
                            {getSubscriptionBadge(user.subscription || "None")}
                          </TableCell>
                          <TableCell>
                            {user.twoFactorEnabled ? (
                              <Badge variant="default" className="bg-green-500">
                                Enabled
                              </Badge>
                            ) : (
                              <Badge variant="outline">Disabled</Badge>
                            )}
                          </TableCell>
                          <TableCell>{user.lastLogin || "Never"}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {user.status === "active" ? (
                                <Button variant="ghost" size="icon">
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              ) : user.status === "suspended" ? (
                                <Button variant="ghost" size="icon">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              ) : null}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Admin</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Moderator</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active</span>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                      <Progress value={82} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Suspended</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <Progress value={5} className="h-2 bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <span className="text-sm font-medium">13%</span>
                      </div>
                      <Progress value={13} className="h-2 bg-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Users with 2FA Enabled</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        Users with Strong Passwords
                      </span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Users with Verified Email</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                Subscription Management
              </h2>
              <Button onClick={() => setShowSubscriptionDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Subscription Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Plan</CardTitle>
                  <CardDescription>
                    Basic features for casual users
                  </CardDescription>
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
                      <span className="text-sm">Basic AI image generation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Limited video creation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Standard support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">100 credits per month</span>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Subscribers</span>
                      <span className="font-medium">458</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Revenue</span>
                      <span className="font-medium">$4,575.42</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Retention</span>
                      <span className="font-medium">4.2 months</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <Badge className="mb-2 bg-primary">Most Popular</Badge>
                  <CardTitle>Pro Plan</CardTitle>
                  <CardDescription>
                    Advanced features for creators
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
                      <span className="text-sm">
                        Advanced AI image generation
                      </span>
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
                      <span className="text-sm">500 credits per month</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Commercial usage rights</span>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Subscribers</span>
                      <span className="font-medium">752</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Monthly Revenue</span>
                      <span className="font-medium">$18,792.48</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Retention</span>
                      <span className="font-medium">7.8 months</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Edit Plan</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lifetime Plan</CardTitle>
                  <CardDescription>
                    One-time payment for unlimited access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-4">
                    $299.99
                    <span className="text-sm font-normal text-muted-foreground">
                      /lifetime
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
                      <span className="text-sm">1000 credits per month</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">
                        Early access to new features
                      </span>
                    </li>
                  </ul>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Purchases</span>
                      <span className="font-medium">124</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Revenue</span>
                      <span className="font-medium">$37,198.76</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span className="font-medium">2.3%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Subscription Distribution
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Standard</span>
                          <span className="text-sm font-medium">34%</span>
                        </div>
                        <Progress value={34} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pro</span>
                          <span className="text-sm font-medium">56%</span>
                        </div>
                        <Progress value={56} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lifetime</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Monthly Recurring Revenue
                    </h3>
                    <div className="text-3xl font-bold mb-2">$23,367.90</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <span className="text-green-500 mr-1">↑ 8.3%</span>
                      from last month
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Churn Rate</span>
                        <span className="font-medium">3.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg. Revenue Per User</span>
                        <span className="font-medium">$19.45</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Subscription Growth
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          New Subscriptions (This Month)
                        </span>
                        <span className="text-sm font-medium">124</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Cancellations (This Month)
                        </span>
                        <span className="text-sm font-medium">42</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Net Growth</span>
                        <span className="text-sm font-medium text-green-500">
                          +82
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Projected Annual Revenue
                        </span>
                        <span className="text-sm font-medium">$280,414.80</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Security Settings</h2>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Security Audit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password Requirements</h3>
                      <p className="text-sm text-muted-foreground">
                        Minimum 12 characters with special characters
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Session Timeout</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after inactivity
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Login Attempts</h3>
                      <p className="text-sm text-muted-foreground">
                        Maximum failed login attempts before lockout
                      </p>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select attempts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Save Authentication Settings
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Admin Login
                          </span>
                          <span className="text-xs text-muted-foreground">
                            2 minutes ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          User: robert@example.com | IP: 192.168.1.1 | Success
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-red-500">
                            Failed Login Attempt
                          </span>
                          <span className="text-xs text-muted-foreground">
                            15 minutes ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          User: unknown@example.com | IP: 203.0.113.1 | Failed
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Password Changed
                          </span>
                          <span className="text-xs text-muted-foreground">
                            1 hour ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          User: jane@example.com | IP: 192.168.1.5
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            2FA Enabled
                          </span>
                          <span className="text-xs text-muted-foreground">
                            3 hours ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          User: brooklyn@example.com | IP: 192.168.1.8
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-red-500">
                            Multiple Failed Login Attempts
                          </span>
                          <span className="text-xs text-muted-foreground">
                            5 hours ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          User: esther@example.com | IP: 203.0.113.7 | Account
                          Locked
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Account Unlocked
                          </span>
                          <span className="text-xs text-muted-foreground">
                            5 hours ago
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          User: esther@example.com | By: robert@example.com
                          (Admin)
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Security Logs
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Rate Limiting</h3>
                      <p className="text-sm text-muted-foreground">
                        Limit API requests per minute
                      </p>
                    </div>
                    <Select defaultValue="100">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 req/min</SelectItem>
                        <SelectItem value="100">100 req/min</SelectItem>
                        <SelectItem value="200">200 req/min</SelectItem>
                        <SelectItem value="500">500 req/min</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API Key Rotation</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically rotate API keys
                      </p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">CORS Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Control cross-origin resource sharing
                      </p>
                    </div>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Active API Keys</h3>
                      <p className="text-sm text-muted-foreground">
                        Currently active API keys
                      </p>
                    </div>
                    <Badge>12 Active</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage API Keys
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">System Settings</h2>
              <Button>
                <Server className="h-4 w-4 mr-2" />
                Server Controls
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Server Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Server Status</h3>
                      <p className="text-sm text-muted-foreground">
                        Current operational status
                      </p>
                    </div>
                    {getStatusBadge(systemData.serverStatus)}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">
                        {systemData.cpuUsage}%
                      </span>
                    </div>
                    <Progress value={systemData.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">
                        {systemData.memoryUsage}%
                      </span>
                    </div>
                    <Progress value={systemData.memoryUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Disk Usage</span>
                      <span className="text-sm font-medium">
                        {systemData.diskUsage}%
                      </span>
                    </div>
                    <Progress value={systemData.diskUsage} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowSystemSettingsDialog(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Scheduled Maintenance</h3>
                      <p className="text-sm text-muted-foreground">
                        Next maintenance window
                      </p>
                    </div>
                    <Badge variant="outline">None Scheduled</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Last Backup</h3>
                      <p className="text-sm text-muted-foreground">
                        Database and file backup
                      </p>
                    </div>
                    <span className="text-sm">{systemData.lastBackup}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Error Rate</h3>
                      <p className="text-sm text-muted-foreground">
                        System errors per minute
                      </p>
                    </div>
                    <span className="text-sm">{systemData.errorRate}%</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Run Backup</Button>
                  <Button variant="outline">View Logs</Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Environment</h3>
                      <Select defaultValue="production">
                        <SelectTrigger>
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Cache Settings
                      </h3>
                      <Select defaultValue="normal">
                        <SelectTrigger>
                          <SelectValue placeholder="Select cache level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">System Limits</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Max File Upload Size</span>
                        <Select defaultValue="10">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 MB</SelectItem>
                            <SelectItem value="10">10 MB</SelectItem>
                            <SelectItem value="20">20 MB</SelectItem>
                            <SelectItem value="50">50 MB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Max Concurrent Users</span>
                        <Select defaultValue="1000">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select limit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500">500</SelectItem>
                            <SelectItem value="1000">1,000</SelectItem>
                            <SelectItem value="5000">5,000</SelectItem>
                            <SelectItem value="10000">10,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Request Timeout</span>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 sec</SelectItem>
                            <SelectItem value="30">30 sec</SelectItem>
                            <SelectItem value="60">60 sec</SelectItem>
                            <SelectItem value="120">120 sec</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  Reset to Defaults
                </Button>
                <Button>Save Configuration</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedAdminPanel;
