
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, Download, Save, FileText, MessageSquare, Plus, Minus, AlertTriangle, CheckCircle } from "lucide-react";

export function ImpactAnalyzer() {
  const [selectedPageA, setSelectedPageA] = useState("");
  const [selectedPageB, setSelectedPageB] = useState("");
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const availablePages = [
    {
      id: "auth-v1",
      title: "Authentication Service v1.2",
      description: "Original authentication implementation",
      lastUpdated: "1 week ago",
      author: "John Doe"
    },
    {
      id: "auth-v2",
      title: "Authentication Service v2.0",
      description: "Updated authentication with OAuth",
      lastUpdated: "2 days ago",
      author: "Sarah Wilson"
    },
    {
      id: "api-old",
      title: "API Routes - Legacy",
      description: "Previous API structure",
      lastUpdated: "2 weeks ago",
      author: "Mike Chen"
    },
    {
      id: "api-new",
      title: "API Routes - Refactored",
      description: "New RESTful API design",
      lastUpdated: "3 days ago",
      author: "Sarah Wilson"
    }
  ];

  const handleAnalyze = () => {
    if (!selectedPageA || !selectedPageB) return;
    
    setAnalysis({
      summary: {
        linesAdded: 45,
        linesRemoved: 23,
        filesChanged: 3,
        riskLevel: "medium",
        confidence: 89
      },
      diffPreview: {
        added: [
          "+ async generateRefreshToken(userId) {",
          "+   return jwt.sign({ userId }, refreshSecret, {",
          "+     expiresIn: '7d'",
          "+   });",
          "+ }",
          "+ ",
          "+ async revokeToken(token) {",
          "+   // Add token to blacklist",
          "+   await TokenBlacklist.create({ token });",
          "+ }"
        ],
        removed: [
          "- const generateToken = (payload) => {",
          "-   return jwt.sign(payload, secret);",
          "- };",
          "- ",
          "- // Basic token verification",
          "- const verifyToken = (token) => {",
          "-   return jwt.verify(token, secret);",
          "- };"
        ]
      },
      aiRecommendations: [
        {
          type: "security",
          title: "Enhanced Token Security",
          description: "The addition of refresh tokens and token revocation significantly improves security",
          priority: "high",
          impact: "positive"
        },
        {
          type: "performance",
          title: "Database Impact",
          description: "Token blacklist may impact performance with high traffic - consider Redis caching",
          priority: "medium",
          impact: "neutral"
        },
        {
          type: "compatibility",
          title: "Breaking Changes",
          description: "API changes require frontend updates for token refresh handling",
          priority: "high",
          impact: "breaking"
        }
      ],
      risks: [
        "Breaking changes in authentication API may affect existing clients",
        "Token blacklist requires additional database maintenance",
        "Refresh token rotation needs careful implementation to avoid security gaps"
      ]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Code Impact Analyzer</h1>
        <p className="text-muted-foreground">
          Compare code versions and analyze the impact of changes with AI-powered insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Compare Pages</CardTitle>
            <CardDescription>Select two code versions to compare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="page-a">Original Version</Label>
              <Select value={selectedPageA} onValueChange={setSelectedPageA}>
                <SelectTrigger>
                  <SelectValue placeholder="Select original page" />
                </SelectTrigger>
                <SelectContent>
                  {availablePages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPageA && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  {availablePages.find(p => p.id === selectedPageA)?.description}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="page-b">Updated Version</Label>
              <Select value={selectedPageB} onValueChange={setSelectedPageB}>
                <SelectTrigger>
                  <SelectValue placeholder="Select updated page" />
                </SelectTrigger>
                <SelectContent>
                  {availablePages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPageB && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  {availablePages.find(p => p.id === selectedPageB)?.description}
                </div>
              )}
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={!selectedPageA || !selectedPageB}
              className="w-full"
            >
              <GitBranch className="mr-2 h-4 w-4" />
              Analyze Changes
            </Button>

            {analysis && (
              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium text-sm">Quick Stats</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Lines Added:</span>
                    <Badge variant="secondary" className="text-xs">+{analysis.summary.linesAdded}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Lines Removed:</span>
                    <Badge variant="outline" className="text-xs">-{analysis.summary.linesRemoved}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Level:</span>
                    <Badge 
                      variant={analysis.summary.riskLevel === 'high' ? 'destructive' : 'default'}
                      className="text-xs"
                    >
                      {analysis.summary.riskLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Change Analysis & Recommendations</CardTitle>
            <CardDescription>
              Detailed comparison with AI-generated insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <Tabs defaultValue="diff" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="diff">Diff View</TabsTrigger>
                  <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
                  <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                </TabsList>
                
                <TabsContent value="diff" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Lines Removed */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Minus className="h-4 w-4 text-red-500" />
                        <span className="font-medium text-sm">Lines Removed</span>
                        <Badge variant="outline" className="text-xs">-{analysis.summary.linesRemoved}</Badge>
                      </div>
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded p-3">
                        {analysis.diffPreview.removed.map((line: string, index: number) => (
                          <div key={index} className="text-xs font-mono text-red-700 dark:text-red-300">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Lines Added */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-sm">Lines Added</span>
                        <Badge variant="secondary" className="text-xs">+{analysis.summary.linesAdded}</Badge>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded p-3">
                        {analysis.diffPreview.added.map((line: string, index: number) => (
                          <div key={index} className="text-xs font-mono text-green-700 dark:text-green-300">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  {analysis.aiRecommendations.map((rec: any, index: number) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge 
                              variant={
                                rec.priority === 'high' ? 'destructive' :
                                rec.priority === 'medium' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {rec.priority}
                            </Badge>
                            <Badge 
                              variant={
                                rec.impact === 'positive' ? 'default' :
                                rec.impact === 'breaking' ? 'destructive' : 'outline'
                              }
                              className="text-xs"
                            >
                              {rec.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="risks" className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-medium">Identified Risks</h4>
                    </div>
                    <div className="space-y-2">
                      {analysis.risks.map((risk: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">•</span>
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium">Mitigation Strategies</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>• Implement gradual rollout with feature flags</div>
                      <div>• Set up monitoring for token refresh performance</div>
                      <div>• Create migration guide for API consumers</div>
                      <div>• Add comprehensive test coverage for new flows</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="qa" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about the code changes..."
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
                        <p className="text-sm">The changes introduce refresh token functionality which significantly improves security by allowing token rotation. However, this requires careful implementation to handle edge cases like concurrent refresh attempts and proper token invalidation.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select two code pages to compare and analyze changes</p>
              </div>
            )}
            
            {analysis && (
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Analysis Complete</Badge>
                  <span className="text-xs text-muted-foreground">
                    {analysis.summary.confidence}% confidence
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Analysis
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
