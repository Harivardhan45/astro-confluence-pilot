
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search, Download, Save, FileText, File, Globe } from "lucide-react";

export function AISearchPage() {
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const spaces = [
    "Engineering Documentation",
    "Product Requirements", 
    "Marketing Resources",
    "HR Policies",
    "Project Specifications"
  ];

  const pages = [
    "Getting Started Guide",
    "API Documentation", 
    "System Architecture",
    "User Manual",
    "Troubleshooting Guide",
    "Release Notes",
    "Security Policies"
  ];

  const handlePageSelection = (pageId: string, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageId]);
    } else {
      setSelectedPages(selectedPages.filter(id => id !== pageId));
    }
  };

  const handleGenerateAnswer = async () => {
    if (!query.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setAnswer(`Based on your search query "${query}" across ${selectedPages.length || 'all'} pages in ${selectedSpace || 'selected spaces'}, here's what I found:\n\nThis is a comprehensive AI-generated response that would typically include relevant information from the selected Confluence pages. The answer would be contextual, well-structured, and directly address the user's natural language query.\n\nKey findings:\n• Relevant point 1 from the documentation\n• Important detail from page 2\n• Cross-reference to related topics\n\nWould you like me to dive deeper into any specific aspect?`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">AI-Powered Search</h1>
        <p className="text-slate-600">Search across Confluence spaces with natural language queries and get AI-generated answers.</p>
      </div>

      {/* Search Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Space Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="space-select">Select Space</Label>
              <Select value={selectedSpace} onValueChange={setSelectedSpace}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Confluence space" />
                </SelectTrigger>
                <SelectContent>
                  {spaces.map((space) => (
                    <SelectItem key={space} value={space}>
                      {space}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Page Selection */}
          <div className="space-y-3">
            <Label>Select Pages (Optional - leave empty to search all pages)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-32 overflow-y-auto p-2 border rounded-md bg-slate-50">
              {pages.map((page) => (
                <div key={page} className="flex items-center space-x-2">
                  <Checkbox
                    id={page}
                    checked={selectedPages.includes(page)}
                    onCheckedChange={(checked) => handlePageSelection(page, checked as boolean)}
                  />
                  <Label htmlFor={page} className="text-sm cursor-pointer">
                    {page}
                  </Label>
                </div>
              ))}
            </div>
            {selectedPages.length > 0 && (
              <p className="text-sm text-slate-600">
                {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          {/* Query Input */}
          <div className="space-y-2">
            <Label htmlFor="query">Natural Language Query</Label>
            <Textarea
              id="query"
              placeholder="Ask anything about your documentation... e.g., 'How do I configure authentication?', 'What are the system requirements?', 'Show me the latest API changes'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <Button 
            onClick={handleGenerateAnswer}
            disabled={!query.trim() || isGenerating}
            className="w-full md:w-auto"
          >
            {isGenerating ? "Generating Answer..." : "Generate Answer"}
          </Button>
        </CardContent>
      </Card>

      {/* AI Response */}
      {answer && (
        <Card>
          <CardHeader>
            <CardTitle>AI Generated Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                {answer}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export and Save Options */}
      {answer && (
        <Card>
          <CardHeader>
            <CardTitle>Export & Save</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as TXT
                </Button>
                <Button variant="outline" size="sm">
                  <File className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Export as HTML
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Save to Confluence</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Page title for saved results"
                    className="flex-1"
                  />
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Page
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
