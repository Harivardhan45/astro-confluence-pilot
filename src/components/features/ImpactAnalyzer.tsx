
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, AlertTriangle, CheckCircle, ArrowRight, FileText, Clock, Users } from "lucide-react";

export function ImpactAnalyzer() {
  const [selectedChange, setSelectedChange] = useState("auth-update");

  const codeChanges = [
    {
      id: "auth-update",
      title: "Authentication Service Update",
      description: "Updated JWT token expiration and added refresh token logic",
      files: ["auth.js", "middleware.js", "user.controller.js"],
      risk: "medium",
      affectedAreas: 5,
      timestamp: "2 hours ago",
      author: "John Doe"
    },
    {
      id: "api-refactor",
      title: "API Endpoint Refactoring",
      description: "Consolidated user management endpoints and updated response format",
      files: ["api-routes.js", "user.service.js", "validation.js"],
      risk: "high",
      affectedAreas: 12,
      timestamp: "1 day ago",
      author: "Sarah Wilson"
    },
    {
      id: "db-schema",
      title: "Database Schema Changes",
      description: "Added new fields for user preferences and activity tracking",
      files: ["migrations/001-user-prefs.sql", "models/user.js"],
      risk: "low",
      affectedAreas: 3,
      timestamp: "3 days ago",
      author: "Mike Chen"
    }
  ];

  const impactAnalysis = {
    "auth-update": {
      overview: {
        riskLevel: "medium",
        confidence: 87,
        affectedComponents: [
          "User Login Flow",
          "API Authentication Middleware", 
          "Session Management",
          "Password Reset Process",
          "Admin Dashboard Access"
        ],
        estimatedEffort: "4-6 hours",
        recommendedActions: [
          "Update API documentation",
          "Test all authentication flows",
          "Verify session timeout behavior",
          "Update mobile app SDK"
        ]
      },
      sideBySide: {
        before: `// Previous implementation
const generateToken = (payload) => {
  return jwt.sign(payload, secret, { 
    expiresIn: '1h' 
  });
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  // Basic token verification
  const decoded = jwt.verify(token, secret);
  req.user = decoded;
  next();
};`,
        after: `// Updated implementation  
const generateToken = (payload) => {
  return jwt.sign(payload, secret, { 
    expiresIn: '24h' 
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshSecret, {
    expiresIn: '7d'
  });
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};`
      }
    }
  };

  const currentAnalysis = impactAnalysis[selectedChange];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Code Impact Analyzer</h1>
        <p className="text-muted-foreground">
          Analyze the potential impact of code changes across your Confluence documentation.
        </p>
      </div>

      {/* Change Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Code Changes</CardTitle>
          <CardDescription>
            Select a change to analyze its impact on your documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {codeChanges.map((change) => (
              <div
                key={change.id}
                onClick={() => setSelectedChange(change.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                  selectedChange === change.id ? 'bg-accent border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{change.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {change.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        change.risk === 'high' ? 'destructive' :
                        change.risk === 'medium' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {change.risk} risk
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {change.affectedAreas} areas
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{change.author}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{change.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Analysis */}
      {currentAnalysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impact Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Risk Level</span>
                  <Badge 
                    variant={
                      currentAnalysis.overview.riskLevel === 'high' ? 'destructive' :
                      currentAnalysis.overview.riskLevel === 'medium' ? 'default' : 'secondary'
                    }
                  >
                    {currentAnalysis.overview.riskLevel}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confidence</span>
                  <span className="text-sm">{currentAnalysis.overview.confidence}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Estimated Effort</span>
                  <span className="text-sm">{currentAnalysis.overview.estimatedEffort}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-sm">Affected Components</h4>
                <div className="space-y-1">
                  {currentAnalysis.overview.affectedComponents.map((component, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-3 w-3 text-yellow-500" />
                      <span>{component}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-sm">Recommended Actions</h4>
                <div className="space-y-1">
                  {currentAnalysis.overview.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side-by-Side Diff */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Code Changes</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Changes
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diff" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="diff">Side-by-Side</TabsTrigger>
                  <TabsTrigger value="unified">Unified View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="diff" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Before */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive" className="text-xs">Before</Badge>
                        <span className="text-sm text-muted-foreground">Original code</span>
                      </div>
                      <pre className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-3 rounded text-xs overflow-x-auto">
                        <code>{currentAnalysis.sideBySide.before}</code>
                      </pre>
                    </div>
                    
                    {/* After */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="text-xs bg-green-500">After</Badge>
                        <span className="text-sm text-muted-foreground">Updated code</span>
                      </div>
                      <pre className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 rounded text-xs overflow-x-auto">
                        <code>{currentAnalysis.sideBySide.after}</code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="unified" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Key Changes Detected</span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      <li className="text-sm">• Extended token expiration from 1h to 24h</li>
                      <li className="text-sm">• Added refresh token generation function</li>
                      <li className="text-sm">• Enhanced error handling with specific error codes</li>
                      <li className="text-sm">• Improved authorization header parsing</li>
                      <li className="text-sm">• Added token expiration detection</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
