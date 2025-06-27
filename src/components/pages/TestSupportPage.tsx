
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TestTube, Download, Save, Loader2, CheckCircle, AlertTriangle, Play } from "lucide-react";

export function TestSupportPage() {
  const [testCode, setTestCode] = useState("");
  const [testType, setTestType] = useState("unit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [testSuite, setTestSuite] = useState<any>(null);

  const handleGenerateTests = async () => {
    if (!testCode.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setTestSuite({
        framework: "Jest",
        testCases: [
          {
            name: "should calculate total correctly",
            code: `test('should calculate total correctly', () => {\n  const result = calculateTotal([1, 2, 3]);\n  expect(result).toBe(6);\n});`,
            type: "positive"
          },
          {
            name: "should handle empty array",
            code: `test('should handle empty array', () => {\n  const result = calculateTotal([]);\n  expect(result).toBe(0);\n});`,
            type: "edge-case"
          },
          {
            name: "should throw error for invalid input",
            code: `test('should throw error for invalid input', () => {\n  expect(() => calculateTotal(null)).toThrow('Invalid input');\n});`,
            type: "error"
          }
        ],
        coverage: 85,
        suggestions: [
          "Add tests for negative numbers",
          "Test with very large arrays for performance",
          "Add integration tests for API endpoints"
        ]
      });
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <TestTube className="h-8 w-8 text-primary" />
          Test Support
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Generate comprehensive test suites with AI assistance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Code to Test</CardTitle>
            <CardDescription>Provide the code you want to generate tests for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={testType} onValueChange={setTestType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unit">Unit Tests</SelectItem>
                <SelectItem value="integration">Integration Tests</SelectItem>
                <SelectItem value="e2e">End-to-End Tests</SelectItem>
                <SelectItem value="performance">Performance Tests</SelectItem>
              </SelectContent>
            </Select>
            
            <Textarea
              placeholder="Paste your code here to generate tests..."
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
            
            <Button onClick={handleGenerateTests} disabled={!testCode.trim() || isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Tests...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generate Test Suite
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Tests</CardTitle>
              <CardDescription>AI-generated test cases and coverage analysis</CardDescription>
            </div>
            {testSuite && (
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
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating test suite...</p>
                </div>
              </div>
            ) : testSuite ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">Test Framework: {testSuite.framework}</div>
                    <div className="text-sm text-muted-foreground">Coverage: {testSuite.coverage}%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{testSuite.testCases.length} Test Cases</div>
                    <div className="text-sm text-muted-foreground">Generated</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Test Cases</h4>
                  <div className="space-y-3">
                    {testSuite.testCases.map((testCase: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {testCase.type === 'positive' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {testCase.type === 'edge-case' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          {testCase.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                          <span className="font-medium text-sm">{testCase.name}</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded capitalize">{testCase.type}</span>
                        </div>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                          <code>{testCase.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Suggestions</h4>
                  <ul className="space-y-2">
                    {testSuite.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Provide code to generate comprehensive test suites</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
