import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
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
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
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
} from "lucide-react";

interface AdminPanelProps {
  activeTab?: string;
  userData?: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: "active" | "suspended" | "pending";
    joinDate: string;
  }>;
  contentData?: Array<{
    id: string;
    title: string;
    author: string;
    type: "image" | "video" | "text";
    status: "approved" | "flagged" | "removed";
    reportCount: number;
    createdAt: string;
  }>;
  analyticsData?: {
    userGrowth: number;
    totalUsers: number;
    totalContent: number;
    contentEngagement: number;
    dailyActiveUsers: number;
  };
}

const AdminPanel = ({
  activeTab = "content",
  userData = [
    {
      id: "1",
      name: "Jane Cooper",
      email: "jane@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Robert Fox",
      email: "robert@example.com",
      role: "admin",
      status: "active",
      joinDate: "2022-11-03",
    },
    {
      id: "3",
      name: "Esther Howard",
      email: "esther@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2023-03-22",
    },
    {
      id: "4",
      name: "Cameron Williamson",
      email: "cameron@example.com",
      role: "user",
      status: "pending",
      joinDate: "2023-05-10",
    },
    {
      id: "5",
      name: "Brooklyn Simmons",
      email: "brooklyn@example.com",
      role: "moderator",
      status: "active",
      joinDate: "2023-02-08",
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
    },
    {
      id: "2",
      title: "AI-generated cityscape",
      author: "Robert Fox",
      type: "image",
      status: "flagged",
      reportCount: 3,
      createdAt: "2023-05-12",
    },
    {
      id: "3",
      title: "My first AI video",
      author: "Esther Howard",
      type: "video",
      status: "approved",
      reportCount: 1,
      createdAt: "2023-05-10",
    },
    {
      id: "4",
      title: "Inappropriate content",
      author: "Cameron Williamson",
      type: "text",
      status: "removed",
      reportCount: 8,
      createdAt: "2023-05-08",
    },
    {
      id: "5",
      title: "Abstract art creation",
      author: "Brooklyn Simmons",
      type: "image",
      status: "approved",
      reportCount: 0,
      createdAt: "2023-05-05",
    },
  ],
  analyticsData = {
    userGrowth: 12.5,
    totalUsers: 1250,
    totalContent: 3450,
    contentEngagement: 68.2,
    dailyActiveUsers: 450,
  },
}: AdminPanelProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);

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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, content, and view platform analytics
          </p>
        </header>

        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content Moderation
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Platform Analytics
            </TabsTrigger>
          </TabsList>

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
                      <TableHead>Status</TableHead>
                      <TableHead>Reports</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContent.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
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
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
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
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Platform Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Total Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {analyticsData.totalContent.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analyticsData.contentEngagement}% engagement rate
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Analytics visualization would appear here</p>
                    <p className="text-sm">
                      Showing content distribution by type and engagement
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add User Dialog */}
        <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="Enter user's full name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select defaultValue="user">
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="active" className="text-sm font-medium">
                  Active Account
                </label>
                <Switch id="active" defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowUserDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowUserDialog(false)}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Review Content Dialog */}
        <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Review Flagged Content</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-lg overflow-hidden border mb-4">
                <img
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                  alt="Flagged content preview"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">AI-generated cityscape</h3>
                  <p className="text-sm text-muted-foreground">
                    By Robert Fox • May 12, 2023
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Report Reasons (3):
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          Potentially copyrighted material
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reported by user123 • 2 days ago
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm">Misleading content</p>
                        <p className="text-xs text-muted-foreground">
                          Reported by moderator • 1 day ago
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          AI-generated without proper disclosure
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reported by user456 • 12 hours ago
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <div className="flex gap-2">
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Remove Content
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowContentDialog(false)}
                >
                  Dismiss Reports
                </Button>
                <Button onClick={() => setShowContentDialog(false)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Content
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;
