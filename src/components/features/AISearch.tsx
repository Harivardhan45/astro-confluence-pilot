
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Download, Save, FileText, Eye, Loader2 } from "lucide-react";

export function AISearch() {
  const [query, setQuery] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [exportFormat, setExportFormat] = useState("pdf");

  const availablePages = [
    { id: "page-1", title: "API Documentation", space: "Engineering", lastUpdated: "2 days ago" },
    { id: "page-2", title: "User Authentication Guide", space: "Product", lastUpdated: "1 week ago" },
    { id: "page-3", title: "Database Schema", space: "Engineering", lastUpdated: "3 days ago" },
    { id: "page-4", title: "UI Component Library", space: "Design", lastUpdated: "5 days ago" },
    { id: "page-5", title: "Security Protocols", space: "Engineering", lastUpdated: "1 day ago" }
  ];

  const handlePageSelection = (pageId: string, checked: boolean) => {
    if (checked) {
      setSelectedPages([...selectedPages, pageId]);
    } else {
      setSelectedPages(selectedPages.filter(id => id !== pageId));
    }
  };

  const handleSearch = async () => {
    if (!query.trim() || selectedPages.length === 0) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults({
        answer: "Based on the selected Confluence pages, the authentication process involves OAuth 2.0 implementation with JWT tokens. The system uses a middleware-based approach for route protection and implements refresh token rotation for enhanced security. Key components include the AuthService class for token management and the middleware functions for request validation.",
        sources: selectedPages.map(id => availablePages.find(p => p.id === id)),
        confidence: 87,
        relatedTopics: ["OAuth Implementation", "JWT Token Management", "Security Best Practices"]
      });
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Search</h1>
        <p className="text-muted-foreground">
          Search across your Confluence pages with AI-powered insights and get comprehensive answers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Configuration */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Search Configuration</CardTitle>
            <CardDescription>Select pages and enter your query</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search-query">Your Question</Label>
              <Textarea
                id="search-query"
                placeholder="e.g., How does user authentication work in our system?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label>Select Confluence Pages</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-3">
                {availablePages.map((page) => (
                  <div key={page.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={page.id}
                      checked={selectedPages.includes(page.id)}
                      onCheckedChange={(checked) => handlePageSelection(page.id, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={page.id} className="text-sm font-medium cursor-pointer">
                        {page.title}
                      </label>
                      <div className="text-xs text-muted-foreground">
                        {page.space} • {page.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedPages.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedPages.length} page(s) selected
                </p>
              )}
            </div>

            <Button 
              onClick={handleSearch} 
              disabled={!query.trim() || selectedPages.length === 0 || isSearching}
              className="w-full"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results and Context */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI-Generated Answer</CardTitle>
            <CardDescription>
              Comprehensive answer based on your selected Confluence pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Analyzing your Confluence pages...</p>
                </div>
              </div>
            ) : searchResults ? (
              <div className="space-y-6">
                {/* Answer */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">AI Answer</Badge>
                    <Badge variant="outline">{searchResults.confidence}% Confidence</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{searchResults.answer}</p>
                </div>

                {/* Sources */}
                <div>
                  <h4 className="font-medium mb-2">Sources Used</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.sources.map((source: any) => (
                      <div key={source.id} className="flex items-center gap-2 p-2 border rounded">
                        <FileText className="h-4 w-4 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{source.title}</p>
                          <p className="text-xs text-muted-foreground">{source.space}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Topics */}
                <div>
                  <h4 className="font-medium mb-2">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.relatedTopics.map((topic: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="export-format" className="text-sm">Format:</Label>
                    <Select value={exportFormat} onValueChange={setExportFormat}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="docx">DOCX</SelectItem>
                        <SelectItem value="txt">TXT</SelectItem>
                        <SelectItem value="md">MD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
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
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter a question and select pages to get AI-powered answers</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
