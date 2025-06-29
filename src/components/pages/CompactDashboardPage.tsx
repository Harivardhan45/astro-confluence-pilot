
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Video, 
  Code, 
  BarChart3, 
  TestTube, 
  Download, 
  Save, 
  Loader2,
  Play,
  FileText,
  Mic
} from "lucide-react";

type FeatureTab = "search" | "video" | "code" | "impact" | "testing";

export function CompactDashboardPage() {
  const [activeTab, setActiveTab] = useState<FeatureTab>("search");
  
  // AI Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Video Summarizer state
  const [selectedVideoPage, setSelectedVideoPage] = useState("");
  const [isProcessingVideo, setIsProcessingVideo] = useState(false);
  const [videoSummary, setVideoSummary] = useState<any>(null);

  // Code Assistant state
  const [selectedCodePage, setSelectedCodePage] = useState("");
  const [codeChanges, setCodeChanges] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isProcessingCode, setIsProcessingCode] = useState(false);

  // Impact Analyzer state
  const [oldVersionPage, setOldVersionPage] = useState("");
  const [newVersionPage, setNewVersionPage] = useState("");
  const [isAnalyzingImpact, setIsAnalyzingImpact] = useState(false);
  const [impactResults, setImpactResults] = useState<any>(null);

  // Test Support state
  const [testCodePage, setTestCodePage] = useState("");
  const [testInputPage, setTestInputPage] = useState("");
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const tabs = [
    { id: "search", label: "AI Search", icon: Search, color: "text-blue-600" },
    { id: "video", label: "Video Summarizer", icon: Video, color: "text-green-600" },
    { id: "code", label: "Code Assistant", icon: Code, color: "text-purple-600" },
    { id: "impact", label: "Impact Analyzer", icon: BarChart3, color: "text-orange-600" },
    { id: "testing", label: "Test Support", icon: TestTube, color: "text-red-600" }
  ];

  const mockPages = [
    "Engineering Docs",
    "API Documentation",
    "User Guides",
    "Architecture Notes",
    "Meeting Minutes"
  ];

  const mockSpaces = [
    "Engineering",
    "Product",
    "Design",
    "DevOps",
    "QA"
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults([
        { title: "Authentication Best Practices", content: "Learn about secure authentication...", relevance: 95 },
        { title: "API Gateway Guide", content: "Setup and configuration guide...", relevance: 88 }
      ]);
      setIsSearching(false);
    }, 1500);
  };

  const handleVideoProcess = () => {
    if (!selectedVideoPage) return;
    setIsProcessingVideo(true);
    setTimeout(() => {
      setVideoSummary({
        title: "Team Meeting Summary",
        keyPoints: ["Authentication improvements", "Performance optimizations"],
        transcript: "Meeting discussion about recent improvements..."
      });
      setIsProcessingVideo(false);
    }, 2000);
  };

  const handleCodeProcess = () => {
    if (!selectedCodePage || !codeChanges) return;
    setIsProcessingCode(true);
    setTimeout(() => {
      setIsProcessingCode(false);
    }, 1500);
  };

  const handleImpactAnalysis = () => {
    if (!oldVersionPage || !newVersionPage) return;
    setIsAnalyzingImpact(true);
    setTimeout(() => {
      setImpactResults({
        changedFiles: 8,
        riskLevel: "Medium",
        recommendations: ["Update unit tests", "Review authentication flow"]
      });
      setIsAnalyzingImpact(false);
    }, 2000);
  };

  const handleTestGeneration = () => {
    if (!testCodePage) return;
    setIsGeneratingTests(true);
    setTimeout(() => {
      setTestResults({
        strategy: "Unit and Integration Testing",
        coverage: 85,
        recommendations: ["Add edge case tests", "Mock external dependencies"]
      });
      setIsGeneratingTests(false);
    }, 1800);
  };

  const ExportSaveButtons = () => (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>PDF</DropdownMenuItem>
          <DropdownMenuItem>TXT</DropdownMenuItem>
          <DropdownMenuItem>DOCX</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="sm">
        <Save className="h-4 w-4 mr-1" />
        Save to Confluence
      </Button>
    </div>
  );

  return (
    <div className="w-full h-full max-w-[1600px] max-h-[700px] bg-white border rounded-lg shadow-sm overflow-hidden">
      {/* Header with Tabs */}
      <div className="border-b bg-slate-50">
        <div className="px-6 py-3">
          <h1 className="text-xl font-semibold text-slate-900 mb-3">Confluence AI Assistant</h1>
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FeatureTab)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white shadow-sm border text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 ${activeTab === tab.id ? tab.color : ''}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(700px-120px)] overflow-y-auto">
        <div className="p-6">
          {/* AI Search */}
          {activeTab === "search" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <Select value={selectedSpace} onValueChange={setSelectedSpace}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Space" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSpaces.map(space => (
                      <SelectItem key={space} value={space}>{space}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="col-span-2">
                  <Input
                    placeholder="Ask a question or search for content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                  Generate Answer
                </Button>
              </div>

              {searchResults.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                          <h4 className="font-medium">{result.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{result.content}</p>
                          <Badge variant="secondary" className="mt-2">{result.relevance}% match</Badge>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <ExportSaveButtons />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Video Summarizer */}
          {activeTab === "video" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Select value={selectedVideoPage} onValueChange={setSelectedVideoPage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Page with Video" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleVideoProcess} disabled={isProcessingVideo || !selectedVideoPage} className="col-span-2">
                  {isProcessingVideo ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  Download & Transcribe Video
                </Button>
              </div>

              {videoSummary && (
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Summary & Key Points</h4>
                      <div className="space-y-2">
                        {videoSummary.keyPoints.map((point: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Q&A</h4>
                      <div className="flex gap-2 mb-3">
                        <Input placeholder="Ask about the video content..." className="flex-1" />
                        <Button size="sm">
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-sm text-slate-600">
                        {videoSummary.transcript}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {videoSummary && (
                <div className="flex justify-end">
                  <ExportSaveButtons />
                </div>
              )}
            </div>
          )}

          {/* Code Assistant */}
          {activeTab === "code" && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <Select value={selectedCodePage} onValueChange={setSelectedCodePage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Code Page" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-span-2">
                  <Button onClick={handleCodeProcess} disabled={isProcessingCode || !selectedCodePage} className="w-full">
                    {isProcessingCode ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Code className="h-4 w-4 mr-2" />}
                    Extract & Process Code
                  </Button>
                </div>
              </div>

              <Textarea
                placeholder="Describe the code changes you want to make..."
                value={codeChanges}
                onChange={(e) => setCodeChanges(e.target.value)}
                className="min-h-[120px]"
              />

              <div className="flex justify-end">
                <ExportSaveButtons />
              </div>
            </div>
          )}

          {/* Impact Analyzer */}
          {activeTab === "impact" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Select value={oldVersionPage} onValueChange={setOldVersionPage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Old Version Page" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newVersionPage} onValueChange={setNewVersionPage}>
                  <SelectTrigger>
                    <SelectValue placeholder="New Version Page" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleImpactAnalysis} disabled={isAnalyzingImpact || !oldVersionPage || !newVersionPage}>
                  {isAnalyzingImpact ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <BarChart3 className="h-4 w-4 mr-2" />}
                  Analyze Impact
                </Button>
              </div>

              {impactResults && (
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Impact Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div>Changed Files: <Badge variant="secondary">{impactResults.changedFiles}</Badge></div>
                        <div>Risk Level: <Badge variant={impactResults.riskLevel === 'High' ? 'destructive' : 'secondary'}>{impactResults.riskLevel}</Badge></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Recommendations</h4>
                      <div className="space-y-1">
                        {impactResults.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-600 mt-1">•</span>
                            {rec}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {impactResults && (
                <div className="flex justify-end">
                  <ExportSaveButtons />
                </div>
              )}
            </div>
          )}

          {/* Test Support */}
          {activeTab === "testing" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Select value={testCodePage} onValueChange={setTestCodePage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Code Page to Test" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={testInputPage} onValueChange={setTestInputPage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Test Input Page" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPages.map(page => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleTestGeneration} disabled={isGeneratingTests || !testCodePage}>
                  {isGeneratingTests ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <TestTube className="h-4 w-4 mr-2" />}
                  Generate Test Strategy
                </Button>
              </div>

              {testResults && (
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Test Strategy</h4>
                      <div className="space-y-2 text-sm">
                        <div>Strategy: <Badge variant="secondary">{testResults.strategy}</Badge></div>
                        <div>Expected Coverage: <Badge variant="secondary">{testResults.coverage}%</Badge></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Recommendations</h4>
                      <div className="space-y-1">
                        {testResults.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-red-600 mt-1">•</span>
                            {rec}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {testResults && (
                <div className="flex justify-end">
                  <ExportSaveButtons />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
