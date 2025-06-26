
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Video, Code, Diff, TestTube, TrendingUp, Clock, Users } from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Pages Analyzed",
      value: "1,247",
      change: "+12%",
      icon: TrendingUp,
    },
    {
      title: "Videos Processed",
      value: "89",
      change: "+23%",
      icon: Video,
    },
    {
      title: "Code Reviews",
      value: "156",
      change: "+8%",
      icon: Code,
    },
    {
      title: "Active Users",
      value: "24",
      change: "+5%",
      icon: Users,
    },
  ];

  const recentActivity = [
    {
      action: "Analyzed code impact for API changes",
      time: "2 minutes ago",
      type: "code",
    },
    {
      action: "Generated test strategies for login flow",
      time: "15 minutes ago",
      type: "testing",
    },
    {
      action: "Summarized product demo video",
      time: "1 hour ago",
      type: "video",
    },
    {
      action: "Searched for authentication documentation",
      time: "2 hours ago",
      type: "search",
    },
  ];

  const quickActions = [
    {
      title: "Smart Search",
      description: "Find information across your Confluence spaces",
      icon: Search,
      action: "search",
    },
    {
      title: "Analyze Video",
      description: "Upload and get AI-powered summaries",
      icon: Video,
      action: "video",
    },
    {
      title: "Review Code",
      description: "Get assistance with code modifications",
      icon: Code,
      action: "code",
    },
    {
      title: "Test Strategy",
      description: "Generate comprehensive testing plans",
      icon: TestTube,
      action: "testing",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Confluence AI Assistant. Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump into your most used AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                  >
                    <Icon className="h-8 w-8 mb-2 text-primary" />
                    <h4 className="font-medium text-sm text-center">{action.title}</h4>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      {action.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest AI assistant interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
