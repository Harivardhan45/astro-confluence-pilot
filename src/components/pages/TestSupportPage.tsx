
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TestTube, Download, Save, Target, Shield, Zap } from "lucide-react";

export function TestSupportPage() {
  const [codePage, setCodePage] = useState("");
  const [testPage, setTestPage] = useState("");
  const [testStrategy, setTestStrategy] = useState<string[]>([]);
  const [sensitivity, setSensitivity] = useState("");
  const [testPlan, setTestPlan] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const codePages = [
    "Payment Processing Module",
    "User Authentication System",
    "Data Validation Components",
    "API Gateway Configuration", 
    "Database Connection Layer",
    "File Upload Handler"
  ];

  const testPages = [
    "Unit Test Suite",
    "Integration Tests",
    "End-to-End Tests",
    "Performance Tests",
    "Security Tests"
  ];

  const strategyOptions = [
    { id: "unit", label: "Unit Testing", description: "Test individual components" },
    { id: "integration", label: "Integration Testing", description: "Test component interactions" },
    { id: "e2e", label: "End-to-End Testing", description: "Test complete user workflows" },
    { id: "performance", label: "Performance Testing", description: "Test system performance" },
    { id: "security", label: "Security Testing", description: "Test security vulnerabilities" },
    { id: "accessibility", label: "Accessibility Testing", description: "Test accessibility compliance" },
    { id: "usability", label: "Usability Testing", description: "Test user experience" },
    { id: "compatibility", label: "Compatibility Testing", description: "Test cross-platform compatibility" }
  ];

  const sensitivityLevels = [
    { value: "low", label: "Low", description: "Basic functionality, minimal risk" },
    { value: "medium", label: "Medium", description: "Important features, moderate risk" },
    { value: "high", label: "High", description: "Critical systems, high risk" },
    { value: "critical", label: "Critical", description: "Mission-critical, maximum risk" }
  ];

  const handleStrategyChange = (strategyId: string, checked: boolean) => {
    if (checked) {
      setTestStrategy([...testStrategy, strategyId]);
    } else {
      setTestStrategy(testStrategy.filter(id => id !== strategyId));
    }
  };

  const handleGenerateTestPlan = () => {
    if (!codePage || testStrategy.length === 0) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setTestPlan(`# Comprehensive Test Plan
## Target: ${codePage}
## Sensitivity Level: ${sensitivity.toUpperCase()}
## Test Strategies: ${testStrategy.join(', ')}

---

## Test Strategy Overview

### 1. Test Scope
- **Primary Component**: ${codePage}
- **Risk Level**: ${sensitivity}
- **Testing Approaches**: ${testStrategy.length} selected strategies

### 2. Test Categories

#### Unit Testing
- Test individual functions and methods
- Mock external dependencies
- Validate input/output contracts
- **Coverage Target**: 90%

#### Integration Testing  
- Test component interactions
- Validate data flow between modules
- Test API endpoints and database connections
- **Focus Areas**: Authentication, data persistence, external services

#### End-to-End Testing
- Complete user workflow validation
- Cross-browser compatibility
- Mobile responsiveness testing
- **Scenarios**: Happy path, error handling, edge cases

#### Performance Testing
- Load testing under normal conditions
- Stress testing at peak capacity
- Memory leak detection
- **Metrics**: Response time < 2s, Memory usage < 100MB

#### Security Testing
- Input validation and sanitization
- Authentication and authorization
- SQL injection and XSS prevention
- **Standards**: OWASP Top 10 compliance

### 3. Test Cases

#### Critical Path Tests
1. **Authentication Flow**
   - Valid login credentials
   - Invalid credentials handling
   - Session timeout behavior
   - Multi-factor authentication

2. **Data Processing**
   - Valid input processing
   - Invalid input rejection
   - Boundary value testing
   - Error state handling

3. **API Integration**
   - Successful API calls
   - API error handling
   - Rate limiting behavior
   - Timeout scenarios

### 4. Test Environment Setup
- **Development**: Local testing with mock data
- **Staging**: Production-like environment
- **Production**: Smoke tests only

### 5. Success Criteria
- All critical tests passing
- Performance benchmarks met
- Security vulnerabilities resolved
- ${sensitivity === 'critical' ? '100%' : sensitivity === 'high' ? '95%' : '90%'} test coverage achieved

### 6. Risk Mitigation
- Automated test execution
- Continuous integration pipeline
- Regular test data refresh
- Rollback procedures documented`);
      setIsGenerating(false);
    }, 3000);
  };

  const handleFollowUpQuestion = () => {
    if (!followUpQuestion.trim() || !testPlan) return;
    
    setTimeout(() => {
      setFollowUpAnswer(`Regarding your question: "${followUpQuestion}"

Based on the generated test plan, here's a detailed response:

The test strategy should be adjusted based on your specific requirements. For ${codePage}, I recommend focusing on the areas that pose the highest risk to your system.

Key considerations:
• If this is a payment processing module, prioritize security and data integrity tests
• For user-facing components, emphasize usability and accessibility testing  
• For backend services, focus on performance and reliability testing

Would you like me to elaborate on any specific testing approach or provide more detailed test cases for particular scenarios?`);
    }, 1500);
  };

  const getSensitivityColor = (level: string) => {
    switch (level) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getSensitivityIcon = (level: string) => {
    switch (level) {
      case "critical": return <Shield className="h-4 w-4" />;
      case "high": return <Target className="h-4 w-4" />;
      case "medium": return <Zap className="h-4 w-4" />;
      case "low": return <TestTube className="h-4 w-4" />;
      default: return <TestTube className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Test Support Tool</h1>
        <p className="text-slate-600">Generate comprehensive test strategies and plans for your code.</p>
      </div>

      {/* Code and Test Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Test Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Code to Test</Label>
              <Select value={codePage} onValueChange={setCodePage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select code component" />
                </SelectTrigger>
                <SelectContent>
                  {codePages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Existing Test Suite (Optional)</Label>
              <Select value={testPage} onValueChange={setTestPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select existing tests" />
                </SelectTrigger>
                <SelectContent>
                  {testPages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Test Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategyOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50">
                <Checkbox
                  id={option.id}
                  checked={testStrategy.includes(option.id)}
                  onCheckedChange={(checked) => handleStrategyChange(option.id, checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor={option.id} className="cursor-pointer font-medium">
                    {option.label}
                  </Label>
                  <p className="text-sm text-slate-600">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sensitivity Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Sensitivity Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {sensitivityLevels.map((level) => (
              <div 
                key={level.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  sensitivity === level.value ? 'ring-2 ring-blue-500 border-blue-300' : ''
                }`}
                onClick={() => setSensitivity(level.value)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getSensitivityIcon(level.value)}
                  <Badge variant={getSensitivityColor(level.value)}>
                    {level.label}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{level.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Test Plan */}
      <Card>
        <CardContent className="pt-6">
          <Button 
            onClick={handleGenerateTestPlan}
            disabled={!codePage || testStrategy.length === 0 || isGenerating}
            className="w-full md:w-auto"
            size="lg"
          >
            {isGenerating ? "Generating Test Plan..." : "Generate Comprehensive Test Plan"}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Test Plan */}
      {testPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Test Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-800 font-mono leading-relaxed">
                {testPlan}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Q&A Follow-up */}
      {testPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Q&A Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask questions about the test plan..."
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleFollowUpQuestion} disabled={!followUpQuestion.trim()}>
                Ask
              </Button>
            </div>

            {followUpAnswer && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="whitespace-pre-wrap text-slate-800">
                  {followUpAnswer}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      {testPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Export & Save</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Test Plan (PDF)
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Test Cases (CSV)
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Save to Confluence</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Test plan document title"
                    className="flex-1"
                  />
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
