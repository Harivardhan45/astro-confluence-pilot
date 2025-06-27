
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, 
  Video, 
  Code, 
  BarChart, 
  TestTube, 
  Download, 
  Save, 
  Loader2,
  Mic,
  Play,
  FileText,
  Globe,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Bug,
  FileCode
} from "lucide-react";

export function AccordionEmbedPage() {
  // AI Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Video Summarizer state
  const [videoUrl, setVideoUrl] = useState("");
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [videoSummary, setVideoSummary] = useState<any>(null);

  // Code Assistant state
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState<any>(null);

  // Impact Analyzer state
  const [diffContent, setDiffContent] = useState("");
  const [isAnalyzingImpact, setIsAnalyzingImpact] = useState(false);
  const [impactAnalysis, setImpactAnalysis] = useState<any>(null);

  // Test Support state
  const [testCode, setTestCode] = useState("");
  const [testType, setTestType] = useState("unit");
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);
  const [testSuite, setTestSuite] = useState<any>(null);

  // Handlers
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults([
        { title: "User Authentication Best Practices", content: "Learn about implementing secure authentication systems...", type: "Documentation", relevance: 95, space: "Engineering" },
        { title: "API Gateway Configuration Guide", content: "Step-by-step guide for setting up API gateways...", type: "Guide", relevance: 88, space: "DevOps" }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const handleVideoProcess = async () => {
    if (!videoUrl.trim()) return;
    setIsProcessingVideo(true);
    setTimeout(() => {
      setVideoSummary({
        title: "Introduction to React Hooks",
        duration: "15:30",
        keyPoints: ["useState for state management", "useEffect for side effects", "Custom hooks for reusability"],
        transcript: "In this video, we explore the fundamentals of React Hooks..."
      });
      setIsProcessingVideo(false);
    }, 3000);
  };

  const handleCodeAnalyze = async () => {
    if (!code.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setCodeAnalysis({
        suggestions: [
          { type: "optimization", line: 5, message: "Consider using const instead of let", code: "const result = calculateValue();" }
        ],
        complexity: "Medium",
        maintainability: "Good"
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleImpactAnalyze = async () => {
    if (!diffContent.trim()) return;
    setIsAnalyzingImpact(true);
    setTimeout(() => {
      setImpactAnalysis({
        affectedFiles: 5,
        riskLevel: "Medium",
        suggestions: ["Review authentication changes", "Update unit tests"]
      });
      setIsAnalyzingImpact(false);
    }, 2000);
  };

  const handleGenerateTests = async () => {
    if (!testCode.trim()) return;
    setIsGeneratingTests(true);
    setTimeout(() => {
      setTestSuite({
        framework: "Jest",
        testCases: [
          { name: "should calculate total correctly", type: "positive" }
        ],
        coverage: 85
      });
      setIsGeneratingTests(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Confluence AI Assistant</h1>
        <p className="text-slate-600">AI-powered tools to enhance your Confluence experience</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {/* AI Search */}
        <AccordionItem value="search" className="border rounded-lg shadow-sm bg-white">
          <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-blue-600" />
              <span className="font-medium">AI Search</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for documentation, guides, or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border rounded p-3 bg-slate-50">
                      <h4 className="font-medium">{result.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{result.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Video Summarizer */}
        <AccordionItem value="video" className="border rounded-lg shadow-sm bg-white">
          <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-green-600" />
              <span className="font-medium">Video Summarizer</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter video URL or upload video file..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleVideoProcess} disabled={!videoUrl.trim() || isProcessingVideo}>
                  {isProcessingVideo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
              
              {videoSummary && (
                <div className="border rounded p-4 bg-slate-50">
                  <h4 className="font-medium mb-2">{videoSummary.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">Duration: {videoSummary.duration}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Key Points:</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {videoSummary.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Code Assistant */}
        <AccordionItem value="code" className="border rounded-lg shadow-sm bg-white">
          <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Code className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Code Assistant</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
              
              <Textarea
                placeholder="Paste your code here for analysis..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
              
              <Button onClick={handleCodeAnalyze} disabled={!code.trim() || isAnalyzing} className="w-full">
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
              
              {codeAnalysis && (
                <div className="border rounded p-4 bg-slate-50">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-slate-600">Complexity:</span>
                      <span className="font-medium ml-2">{codeAnalysis.complexity}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600">Maintainability:</span>
                      <span className="font-medium ml-2">{codeAnalysis.maintainability}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Suggestions:</h5>
                    {codeAnalysis.suggestions.map((suggestion: any, index: number) => (
                      <div key={index} className="text-sm p-2 bg-white rounded border">
                        <p className="mb-1">{suggestion.message}</p>
                        <code className="text-xs bg-slate-100 p-1 rounded">{suggestion.code}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Impact Analyzer */}
        <AccordionItem value="impact" className="border rounded-lg shadow-sm bg-white">
          <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <BarChart className="h-5 w-5 text-orange-600" />
              <span className="font-medium">Impact Analyzer</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your git diff or change summary here..."
                value={diffContent}
                onChange={(e) => setDiffContent(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
              
              <Button onClick={handleImpactAnalyze} disabled={!diffContent.trim() || isAnalyzingImpact} className="w-full">
                {isAnalyzingImpact ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Impact...
                  </>
                ) : (
                  <>
                    <BarChart className="mr-2 h-4 w-4" />
                    Analyze Impact
                  </>
                )}
              </Button>
              
              {impactAnalysis && (
                <div className="border rounded p-4 bg-slate-50">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-slate-600">Affected Files:</span>
                      <span className="font-medium ml-2">{impactAnalysis.affectedFiles}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600">Risk Level:</span>
                      <span className="font-medium ml-2">{impactAnalysis.riskLevel}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Recommendations:</h5>
                    <ul className="text-sm space-y-1">
                      {impactAnalysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Test Support */}
        <AccordionItem value="testing" className="border rounded-lg shadow-sm bg-white">
          <AccordionTrigger className="px-6 py-4 hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <TestTube className="h-5 w-5 text-red-600" />
              <span className="font-medium">Test Support Tool</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit">Unit Tests</SelectItem>
                  <SelectItem value="integration">Integration Tests</SelectItem>
                  <SelectItem value="e2e">End-to-End Tests</SelectItem>
                </SelectContent>
              </Select>
              
              <Textarea
                placeholder="Paste your code here to generate tests..."
                value={testCode}
                onChange={(e) => setTestCode(e.target.value)}
                className="min-h-[120px] font-mono text-sm"
              />
              
              <Button onClick={handleGenerateTests} disabled={!testCode.trim() || isGeneratingTests} className="w-full">
                {isGeneratingTests ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Tests...
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-4 w-4" />
                    Generate Tests
                  </>
                )}
              </Button>
              
              {testSuite && (
                <div className="border rounded p-4 bg-slate-50">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-slate-600">Framework:</span>
                      <span className="font-medium ml-2">{testSuite.framework}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600">Coverage:</span>
                      <span className="font-medium ml-2">{testSuite.coverage}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Generated Tests:</h5>
                    {testSuite.testCases.map((testCase: any, index: number) => (
                      <div key={index} className="text-sm p-2 bg-white rounded border">
                        <span className="font-medium">{testCase.name}</span>
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{testCase.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
