
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TestTube, Download, Save, Play, CheckCircle, XCircle, Loader2 } from "lucide-react";

export function TestSupportTab() {
  const [feature, setFeature] = useState("");
  const [testType, setTestType] = useState("unit");
  const [requirements, setRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [testPlan, setTestPlan] = useState<any>(null);

  const handleGenerate = async () => {
    if (!feature.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setTestPlan({
        testCases: [
          {
            id: "TC001",
            title: "Valid user login with correct credentials",
            priority: "High",
            type: "Positive",
            steps: [
              "Navigate to login page",
              "Enter valid username and password",
              "Click login button",
              "Verify successful login and redirect to dashboard"
            ],
            expectedResult: "User successfully logs in and is redirected to dashboard",
            status: "pending"
          },
          {
            id: "TC002", 
            title: "Invalid login with wrong password",
            priority: "High",
            type: "Negative",
            steps: [
              "Navigate to login page",
              "Enter valid username and invalid password",
              "Click login button",
              "Verify error message is displayed"
            ],
            expectedResult: "Error message 'Invalid credentials' is displayed",
            status: "pending"
          },
          {
            id: "TC003",
            title: "Login attempt with empty fields",
            priority: "Medium",
            type: "Negative", 
            steps: [
              "Navigate to login page",
              "Leave username and password fields empty",
              "Click login button",
              "Verify validation messages are shown"
            ],
            expectedResult: "Validation messages appear for required fields",
            status: "pending"
          },
          {
            id: "TC004",
            title: "Password visibility toggle functionality",
            priority: "Low",
            type: "Functional",
            steps: [
              "Navigate to login page",
              "Enter password in password field",
              "Click eye icon to toggle password visibility",
              "Verify password becomes visible/hidden"
            ],
            expectedResult: "Password visibility toggles correctly",
            status: "pending"
          }
        ],
        automation: {
          framework: "Jest + Testing Library",
          coverage: "85%",
          executionTime: "2.3 seconds",
          code: `describe('User Authentication', () => {
  test('should login successfully with valid credentials', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
  
  test('should show error for invalid credentials', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' }
    });
    
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});`
        },
        metrics: {
          totalTests: 4,
          passed: 0,
          failed: 0,
          pending: 4,
          coverage: 85
        }
      });
      setIsGenerating(false);
    }, 2500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <TestTube className="h-6 w-6 text-primary" />
          Test Support Tool
        </h2>
        <p className="text-muted-foreground">
          Generate comprehensive test plans, cases, and automation scripts for your features.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Test Generation</CardTitle>
            <CardDescription>Describe the feature you want to test</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="feature">Feature/Functionality</Label>
              <Input
                id="feature"
                placeholder="e.g., User Authentication System"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="test-type">Test Type</Label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit">Unit Tests</SelectItem>
                  <SelectItem value="integration">Integration Tests</SelectItem>
                  <SelectItem value="e2e">End-to-End Tests</SelectItem>
                  <SelectItem value="performance">Performance Tests</SelectItem>
                  <SelectItem value="security">Security Tests</SelectItem>
                  <SelectItem value="accessibility">Accessibility Tests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="requirements">Requirements/Acceptance Criteria</Label>
              <Textarea
                id="requirements"
                placeholder="List the requirements and acceptance criteria for this feature..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div>
              <Label>Generation Options</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="positive-tests" defaultChecked />
                  <label htmlFor="positive-tests" className="text-sm">Positive test cases</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="negative-tests" defaultChecked />
                  <label htmlFor="negative-tests" className="text-sm">Negative test cases</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="edge-cases" defaultChecked />
                  <label htmlFor="edge-cases" className="text-sm">Edge cases</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="automation-code" defaultChecked />
                  <label htmlFor="automation-code" className="text-sm">Automation code</label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!feature.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <TestTube className="mr-2 h-4 w-4" />
                  Generate Test Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Test Plan</CardTitle>
            <CardDescription>
              Comprehensive test cases and automation scripts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating test cases...</p>
                </div>
              </div>
            ) : testPlan ? (
              <div className="space-y-6">
                {/* Metrics Overview */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{testPlan.metrics.totalTests}</div>
                    <div className="text-xs text-muted-foreground">Total Tests</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{testPlan.metrics.passed}</div>
                    <div className="text-xs text-muted-foreground">Passed</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600">{testPlan.metrics.failed}</div>
                    <div className="text-xs text-muted-foreground">Failed</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-600">{testPlan.metrics.coverage}%</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                </div>

                {/* Test Cases */}
                <div>
                  <h4 className="font-medium mb-3">Test Cases</h4>
                  <div className="space-y-3">
                    {testPlan.testCases.map((testCase: any, index: number) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(testCase.status)}
                              <span className="font-medium text-sm">{testCase.id}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getPriorityColor(testCase.priority)} className="text-xs">
                                {testCase.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {testCase.type}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm font-medium">{testCase.title}</div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">Steps:</div>
                              <ol className="text-xs space-y-1 list-decimal list-inside">
                                {testCase.steps.map((step: string, stepIndex: number) => (
                                  <li key={stepIndex}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-muted-foreground mb-1">Expected Result:</div>
                              <div className="text-xs">{testCase.expectedResult}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Automation Code */}
                <div>
                  <h4 className="font-medium mb-3">Automation Code</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">
                        Framework: {testPlan.automation.framework}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Coverage: {testPlan.automation.coverage}</span>
                        <span>Execution: {testPlan.automation.executionTime}</span>
                      </div>
                    </div>
                    <pre className="text-xs overflow-x-auto">
                      <code>{testPlan.automation.code}</code>
                    </pre>
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Run Tests
                    </Button>
                    <Button size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save to Confluence
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <TestTube className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Describe a feature to generate comprehensive test cases</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
