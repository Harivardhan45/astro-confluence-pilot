
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, Download, Save, FileText, MessageSquare, Target, AlertTriangle, CheckCircle } from "lucide-react";

export function TestingSupport() {
  const [selectedCodePage, setSelectedCodePage] = useState("");
  const [selectedTestInputPage, setSelectedTestInputPage] = useState("");
  const [question, setQuestion] = useState("");
  const [testStrategy, setTestStrategy] = useState<any>(null);

  const codePages = [
    {
      id: "payment-service",
      title: "Payment Processing Service",
      description: "Handles payment transactions and billing",
      complexity: "high",
      lastUpdated: "1 day ago"
    },
    {
      id: "user-auth",
      title: "User Authentication Module",
      description: "Login, registration, and session management",
      complexity: "medium",
      lastUpdated: "3 days ago"
    },
    {
      id: "data-validator",
      title: "Data Validation Utils",
      description: "Input validation and sanitization functions",
      complexity: "low",
      lastUpdated: "1 week ago"
    }
  ];

  const testInputPages = [
    {
      id: "payment-requirements",
      title: "Payment System Requirements",
      description: "Business rules and edge cases for payments",
      lastUpdated: "2 days ago"
    },
    {
      id: "auth-scenarios",
      title: "Authentication Test Scenarios",
      description: "User stories and security requirements",
      lastUpdated: "1 week ago"
    },
    {
      id: "validation-rules",
      title: "Data Validation Requirements",
      description: "Input formats and validation criteria",
      lastUpdated: "5 days ago"
    }
  ];

  const handleGenerateStrategy = () => {
    if (!selectedCodePage || !selectedTestInputPage) return;
    
    setTestStrategy({
      overview: {
        totalTestCases: 34,
        coverage: 87,
        criticalPaths: 6,
        riskScore: 42
      },
      testCategories: [
        {
          category: "Unit Tests",
          count: 18,
          priority: "high",
          tests: [
            "Payment amount validation",
            "Currency conversion accuracy",
            "Transaction fee calculations",
            "Error handling for invalid inputs"
          ]
        },
        {
          category: "Integration Tests",
          count: 12,
          priority: "high",
          tests: [
            "Payment gateway integration",
            "Database transaction rollback",
            "Email notification triggers",
            "Webhook delivery confirmation"
          ]
        },
        {
          category: "Security Tests",
          count: 4,
          priority: "critical",
          tests: [
            "Credit card data encryption",
            "PCI compliance validation",
            "SQL injection prevention",
            "Authentication bypass attempts"
          ]
        }
      ],
      sensitivityAnalysis: [
        {
          component: "Payment Amount Processing",
          sensitivity: "high",
          impact: "Critical financial impact if amounts are processed incorrectly",
          testStrategy: "Test with boundary values, floating point precision, and currency conversion edge cases",
          riskLevel: "critical"
        },
        {
          component: "Authentication Flow",
          sensitivity: "medium",
          impact: "User experience degradation if authentication fails",
          testStrategy: "Test concurrent logins, session timeouts, and password reset flows",
          riskLevel: "medium"
        },
        {
          component: "Error Handling",
          sensitivity: "low",
          impact: "User confusion but no data loss",
          testStrategy: "Test various error scenarios and message clarity",
          riskLevel: "low"
        }
      ],
      recommendations: [
        "Implement automated regression testing for payment calculations",
        "Add load testing for concurrent payment processing",
        "Set up security scanning for PCI compliance",
        "Create end-to-end test scenarios covering full user journeys"
      ]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Testing Support Tool</h1>
        <p className="text-muted-foreground">
          Generate comprehensive test strategies and sensitivity analysis for your code components.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Input Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Select code and test input pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="code-page">Code Page to Test</Label>
              <Select value={selectedCodePage} onValueChange={setSelectedCodePage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select code page" />
                </SelectTrigger>
                <SelectContent>
                  {codePages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCodePage && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  <div>{codePages.find(p => p.id === selectedCodePage)?.description}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant={
                        codePages.find(p => p.id === selectedCodePage)?.complexity === 'high' ? 'destructive' :
                        codePages.find(p => p.id === selectedCodePage)?.complexity === 'medium' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {codePages.find(p => p.id === selectedCodePage)?.complexity} complexity
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="test-input-page">Test Input Page</Label>
              <Select value={selectedTestInputPage} onValueChange={setSelectedTestInputPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select test inputs" />
                </SelectTrigger>
                <SelectContent>
                  {testInputPages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTestInputPage && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  {testInputPages.find(p => p.id === selectedTestInputPage)?.description}
                </div>
              )}
            </div>

            <Button 
              onClick={handleGenerateStrategy} 
              disabled={!selectedCodePage || !selectedTestInputPage}
              className="w-full"
            >
              <TestTube className="mr-2 h-4 w-4" />
              Generate Test Strategy
            </Button>

            {testStrategy && (
              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium text-sm">Strategy Overview</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Test Cases:</span>
                    <Badge variant="secondary" className="text-xs">{testStrategy.overview.totalTestCases}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage:</span>
                    <Badge variant="outline" className="text-xs">{testStrategy.overview.coverage}%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical Paths:</span>
                    <Badge variant="default" className="text-xs">{testStrategy.overview.criticalPaths}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <Badge variant="destructive" className="text-xs">{testStrategy.overview.riskScore}</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Strategy Results */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Generated Test Strategy & Analysis</CardTitle>
            <CardDescription>
              Comprehensive testing approach with sensitivity analysis and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testStrategy ? (
              <Tabs defaultValue="strategy" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="strategy">Test Strategy</TabsTrigger>
                  <TabsTrigger value="sensitivity">Sensitivity Analysis</TabsTrigger>
                  <TabsTrigger value="report">Combined Report</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                </TabsList>
                
                <TabsContent value="strategy" className="space-y-4">
                  {testStrategy.testCategories.map((category: any, index: number) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{category.category}</CardTitle>
                          <div className="flex gap-2">
                            <Badge 
                              variant={
                                category.priority === 'critical' ? 'destructive' :
                                category.priority === 'high' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {category.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {category.count} tests
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {category.tests.map((test: string, testIndex: number) => (
                            <div key={testIndex} className="flex items-center gap-2 p-2 border rounded text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {test}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="sensitivity" className="space-y-4">
                  {testStrategy.sensitivityAnalysis.map((analysis: any, index: number) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{analysis.component}</CardTitle>
                          <div className="flex gap-2">
                            <Badge 
                              variant={
                                analysis.sensitivity === 'high' ? 'destructive' :
                                analysis.sensitivity === 'medium' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {analysis.sensitivity} sensitivity
                            </Badge>
                            <Badge 
                              variant={
                                analysis.riskLevel === 'critical' ? 'destructive' :
                                analysis.riskLevel === 'medium' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {analysis.riskLevel} risk
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Impact Assessment</h4>
                          <p className="text-sm text-muted-foreground">{analysis.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Testing Strategy</h4>
                          <p className="text-sm text-muted-foreground">{analysis.testStrategy}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="report" className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Executive Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{testStrategy.overview.totalTestCases}</div>
                        <div className="text-xs text-muted-foreground">Total Tests</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{testStrategy.overview.coverage}%</div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{testStrategy.overview.criticalPaths}</div>
                        <div className="text-xs text-muted-foreground">Critical Paths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{testStrategy.overview.riskScore}</div>
                        <div className="text-xs text-muted-foreground">Risk Score</div>
                      </div>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Key Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {testStrategy.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="qa" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about the test strategy or sensitivity analysis..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {question && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Your Question:</h4>
                        <p className="text-sm mb-3">{question}</p>
                        <h4 className="font-medium mb-2">AI Answer:</h4>
                        <p className="text-sm">Based on the generated test strategy, the payment processing component requires the highest attention due to its critical financial impact. The recommended approach includes boundary value testing, concurrent transaction handling, and comprehensive error scenario coverage to ensure system reliability.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select code and test input pages to generate a comprehensive test strategy</p>
              </div>
            )}
            
            {testStrategy && (
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Strategy Generated</Badge>
                  <span className="text-xs text-muted-foreground">
                    Ready for implementation
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Strategy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
