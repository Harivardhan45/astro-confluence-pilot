
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Code, Download, Save, Loader2, Lightbulb, Bug, FileCode } from "lucide-react";

export function CodeAssistantPage() {
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
            type: "optimization",
            line: 5,
            message: "Consider using const instead of let for variables that don't change",
            code: "const result = calculateValue();"
          },
          {
            type: "best-practice",
            line: 12,
            message: "Add error handling for async operations",
            code: "try { await apiCall(); } catch (error) { handleError(error); }"
          },
          {
            type: "security",
            line: 18,
            message: "Validate input parameters to prevent injection attacks",
            code: "if (!isValidInput(userInput)) { throw new Error('Invalid input'); }"
          }
        ],
        documentation: "This code implements a data processing function with API integration. Consider adding proper error handling, input validation, and using more descriptive variable names for better maintainability.",
        complexity: "Medium",
        maintainability: "Good"
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          Code Assistant
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Get AI-powered code analysis, suggestions, and documentation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Code Input</CardTitle>
            <CardDescription>Paste your code for analysis and suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              </SelectContent>
            </Select>
            
            <Textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
            
            <Button onClick={handleAnalyze} disabled={!code.trim() || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  Analyze Code
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>AI-powered suggestions and insights</CardDescription>
            </div>
            {analysis && (
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                    <DropdownMenuItem>Export as TXT</DropdownMenuItem>
                    <DropdownMenuItem>Export as HTML</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Analyzing your code...</p>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Complexity</div>
                    <div className="font-semibold">{analysis.complexity}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Maintainability</div>
                    <div className="font-semibold">{analysis.maintainability}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Suggestions
                  </h4>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {suggestion.type === 'optimization' && <Code className="h-4 w-4 text-blue-500" />}
                          {suggestion.type === 'best-practice' && <Lightbulb className="h-4 w-4 text-yellow-500" />}
                          {suggestion.type === 'security' && <Bug className="h-4 w-4 text-red-500" />}
                          <span className="text-sm font-medium capitalize">{suggestion.type}</span>
                          <span className="text-xs text-muted-foreground">Line {suggestion.line}</span>
                        </div>
                        <p className="text-sm mb-2">{suggestion.message}</p>
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                          <code>{suggestion.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-green-500" />
                    Documentation
                  </h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {analysis.documentation}
                  </p>
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
