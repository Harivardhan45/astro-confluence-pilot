
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search, Download, Save, FileText, File, Globe } from "lucide-react";

export function AISearchPage() {
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confluencePage, setConfluencePage] = useState("");

  const confluenceSpaces = [
    "Engineering Team",
    "Product Documentation", 
    "HR Policies",
    "Marketing Resources",
    "Support Knowledge Base"
  ];

  const availablePages = [
    "API Documentation",
    "User Guide",
    "Technical Specifications",
    "Meeting Notes",
    "Project Requirements",
    "Best Practices"
  ];

  const exportFormats = [
    { value: "txt", label: "Text File (.txt)", icon: FileText },
    { value: "pdf", label: "PDF Document (.pdf)", icon: File },
    { value: "html", label: "HTML Page (.html)", icon: Globe }
  ];

  const handlePageSelection = (pageId: string, checked: boolean) => {
    setSelectedPages(prev => 
      checked 
        ? [...prev, pageId]
        : prev.filter(id => id !== pageId)
    );
  };

  const handleGenerateAnswer = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(`Based on your search across ${selectedSpace || 'all spaces'} for "${question}", here's what I found:\n\nThis is a comprehensive AI-generated response that would typically include relevant information from the selected Confluence pages. The response would be contextual and helpful, drawing from the knowledge base you've specified.\n\nKey insights:\n• Relevant documentation found\n• Best practices identified\n• Related resources discovered`);
      setIsLoading(false);
    }, 2000);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    // Export functionality would be implemented here
  };

  const handleSaveToConfluence = () => {
    if (!confluencePage.trim()) return;
    console.log(`Saving to Confluence page: ${confluencePage}`);
    // Save functionality would be implemented here
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Search className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Powered Search</h1>
            <p className="text-sm text-slate-600">Search and analyze content across Confluence spaces</p>
          </div>
        </div>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="space-select">Confluence Space</Label>
                <Select value={selectedSpace} onValueChange={setSelectedSpace}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                  <SelectContent>
                    {confluenceSpaces.map((space) => (
                      <SelectItem key={space} value={space}>
                        {space}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pages to Include</Label>
                <div className="border rounded-lg p-3 max-h-32 overflow-y-auto">
                  {availablePages.map((page) => (
                    <div key={page} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={page}
                        checked={selectedPages.includes(page)}
                        onCheckedChange={(checked) => handlePageSelection(page, checked as boolean)}
                      />
                      <Label htmlFor={page} className="text-sm font-normal">
                        {page}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">What would you like to know?</Label>
              <Textarea
                id="question"
                placeholder="Enter your question or search query..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              onClick={handleGenerateAnswer}
              disabled={!question.trim() || isLoading}
              className="w-full"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Generating Answer..." : "Generate Answer"}
            </Button>
          </CardContent>
        </Card>

        {/* Response */}
        {response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 border rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
                  {response}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export and Save Options */}
        {response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export & Save Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Export Format</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {exportFormats.map((format) => {
                    const Icon = format.icon;
                    return (
                      <Button
                        key={format.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleExport(format.value)}
                        className="justify-start"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {format.label.split('(')[0]}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="confluence-page">Save to Confluence</Label>
                <div className="flex gap-2">
                  <Input
                    id="confluence-page"
                    placeholder="Enter page name"
                    value={confluencePage}
                    onChange={(e) => setConfluencePage(e.target.value)}
                  />
                  <Button onClick={handleSaveToConfluence} disabled={!confluencePage.trim()}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
