
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Code, Download, Save, Copy, Play, Loader2 } from "lucide-react";

export function CodeAssistantTab() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        suggestions: [
          {
            type: "performance",
            title: "Optimize array iteration",
            description: "Consider using forEach() instead of for loop for better readability",
            line: 5,
            severity: "medium"
          },
          {
            type: "security",
            title: "Input validation needed",
            description: "Add validation for user input to prevent injection attacks",
            line: 12,
            severity: "high"
          },
          {
            type: "style",
            title: "Use const instead of let",
            description: "Variable is never reassigned, consider using const",
            line: 3,
            severity: "low"
          }
        ],
        optimizedCode: `// Optimized version with suggestions applied
const processUserData = (userData) => {
  // Input validation
  if (!userData || typeof userData !== 'object') {
    throw new Error('Invalid user data');
  }

  const results = [];
  
  // Use forEach for better readability
  userData.forEach((item, index) => {
    if (item.isValid) {
      results.push({
        id: index,
        processed: true,
        data: sanitizeInput(item.data)
      });
    }
  });
  
  return results;
};`,
        metrics: {
          complexity: 3,
          maintainability: 85,
          security: 78,
          performance: 92
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          Code Assistant
        </h2>
        <p className="text-muted-foreground">
          Get AI-powered code analysis, optimization suggestions, and documentation help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Code Input</CardTitle>
            <CardDescription>Paste your code for analysis and optimization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Programming Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="code-input">Your Code</Label>
              <Textarea
                id="code-input"
                placeholder="Paste your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Analysis Options</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="performance" defaultChecked />
                  <label htmlFor="performance" className="text-sm">Performance optimization</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="security" defaultChecked />
                  <label htmlFor="security" className="text-sm">Security analysis</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="style" defaultChecked />
                  <label htmlFor="style" className="text-sm">Code style suggestions</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="documentation" />
                  <label htmlFor="documentation" className="text-sm">Generate documentation</label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={!code.trim() || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Analyze Code
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-powered suggestions and optimizations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Analyzing your code...</p>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{analysis.metrics.maintainability}</div>
                    <div className="text-xs text-muted-foreground">Maintainability</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">{analysis.metrics.performance}</div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">{analysis.metrics.security}</div>
                    <div className="text-xs text-muted-foreground">Security</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-600">{analysis.metrics.complexity}</div>
                    <div className="text-xs text-muted-foreground">Complexity</div>
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="font-medium mb-3">Suggestions</h4>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={suggestion.severity === 'high' ? 'destructive' : 
                                   suggestion.severity === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {suggestion.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Line {suggestion.line}</span>
                        </div>
                        <h5 className="font-medium text-sm">{suggestion.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimized Code */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Optimized Code</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(analysis.optimizedCode)}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <pre className="text-xs overflow-x-auto">
                      <code>{analysis.optimizedCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save to Confluence
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Paste your code to get AI-powered analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
