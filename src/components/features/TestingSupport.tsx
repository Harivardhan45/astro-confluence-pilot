
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TestTube, Target, AlertTriangle, CheckCircle, Play, Download, FileText } from "lucide-react";

export function TestingSupport() {
  const [selectedFeature, setSelectedFeature] = useState("user-auth");

  const testFeatures = [
    {
      id: "user-auth",
      name: "User Authentication",
      description: "Login, registration, and password reset flows",
      complexity: "medium",
      coverage: 78,
      lastUpdated: "2 days ago"
    },
    {
      id: "payment-flow",
      name: "Payment Processing",
      description: "Checkout, billing, and subscription management", 
      complexity: "high",
      coverage: 45,
      lastUpdated: "1 week ago"
    },
    {
      id: "data-export",
      name: "Data Export",
      description: "CSV, PDF, and API data export functionality",
      complexity: "low",
      coverage: 92,
      lastUpdated: "3 days ago"
    }
  ];

  const testStrategies = {
    "user-auth": {
      overview: {
        totalTests: 24,
        passRate: 87.5,
        criticalPaths: 5,
        riskAreas: [
          "Password validation edge cases",
          "Concurrent login attempts", 
          "Session timeout handling",
          "OAuth integration flows"
        ]
      },
      testCases: [
        {
          category: "Unit Tests",
          priority: "high",
          count: 12,
          tests: [
            "Password hashing validation",
            "Token generation and verification",
            "Email format validation",
            "User input sanitization"
          ]
        },
        {
          category: "Integration Tests", 
          priority: "high",
          count: 8,
          tests: [
            "Login flow end-to-end",
            "Registration with email verification",
            "Password reset workflow",
            "OAuth provider integration"
          ]
        },
        {
          category: "Security Tests",
          priority: "critical",
          count: 4,
          tests: [
            "SQL injection prevention",
            "Cross-site scripting (XSS) protection", 
            "Brute force attack mitigation",
            "Session hijacking prevention"
          ]
        }
      ],
      sensitivityAnalysis: [
        {
          component: "Password Validation",
          sensitivity: "high",
          impact: "Critical user experience impact if validation is too strict or lenient",
          recommendation: "Test with 50+ real password combinations including edge cases"
        },
        {
          component: "Session Management",
          sensitivity: "medium", 
          impact: "Users may be logged out unexpectedly if timeout is too aggressive",
          recommendation: "Test across different user behavior patterns and connection types"
        },
        {
          component: "Email Verification",
          sensitivity: "low",
          impact: "Delayed verification doesn't block core functionality",
          recommendation: "Test email delivery across major providers and spam filters"
        }
      ]
    }
  };

  const currentStrategy = testStrategies[selectedFeature];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Testing Support Tool</h1>
        <p className="text-muted-foreground">
          Generate comprehensive test strategies and analyze system sensitivity for your features.
        </p>
      </div>

      {/* Feature Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Feature to Test</CardTitle>
          <CardDescription>
            Choose a feature to generate test strategies and sensitivity analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testFeatures.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                  selectedFeature === feature.id ? 'bg-accent border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TestTube className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{feature.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        feature.complexity === 'high' ? 'destructive' :
                        feature.complexity === 'medium' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {feature.complexity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {feature.coverage}% coverage
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {feature.lastUpdated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Strategy Generation */}
      {currentStrategy && (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Total Tests</span>
                </div>
                <div className="text-2xl font-bold mt-1">
                  {currentStrategy.overview.totalTests}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Pass Rate</span>
                </div>
                <div className="text-2xl font-bold mt-1">
                  {currentStrategy.overview.passRate}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Critical Paths</span>
                </div>
                <div className="text-2xl font-bold mt-1">
                  {currentStrategy.overview.criticalPaths}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Risk Areas</span>
                </div>
                <div className="text-2xl font-bold mt-1">
                  {currentStrategy.overview.riskAreas.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Strategy */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Test Strategy & Sensitivity Analysis</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Strategy
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Run Tests
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="strategy" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="strategy">Test Strategy</TabsTrigger>
                  <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
                  <TabsTrigger value="generator">Generate New</TabsTrigger>
                </TabsList>
                
                <TabsContent value="strategy" className="space-y-6">
                  {currentStrategy.testCases.map((category, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{category.category}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                category.priority === 'critical' ? 'destructive' :
                                category.priority === 'high' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {category.priority} priority
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {category.count} tests
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {category.tests.map((test, testIndex) => (
                            <div key={testIndex} className="flex items-center gap-2 p-2 border rounded">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{test}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="sensitivity" className="space-y-4">
                  {currentStrategy.sensitivityAnalysis.map((analysis, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{analysis.component}</CardTitle>
                          <Badge 
                            variant={
                              analysis.sensitivity === 'high' ? 'destructive' :
                              analysis.sensitivity === 'medium' ? 'default' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {analysis.sensitivity} sensitivity
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Impact Assessment</h4>
                          <p className="text-sm text-muted-foreground">{analysis.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Recommendation</h4>
                          <p className="text-sm text-muted-foreground">{analysis.recommendation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="generator" className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="feature-name">Feature Name</Label>
                        <Input id="feature-name" placeholder="e.g., Shopping Cart" />
                      </div>
                      <div>
                        <Label htmlFor="complexity">Complexity Level</Label>
                        <Input id="complexity" placeholder="Low, Medium, High" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Feature Description</Label>
                      <Input id="description" placeholder="Describe the feature functionality..." />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Test Strategy
                      </Button>
                      <Button variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Analyze Sensitivity
                      </Button>
                    </div>
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
