
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Download, Save, Loader2, FileText, Globe, BookOpen } from "lucide-react";

export function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          title: "User Authentication Best Practices",
          content: "Learn about implementing secure authentication systems with OAuth 2.0 and JWT tokens...",
          type: "Documentation",
          relevance: 95,
          space: "Engineering"
        },
        {
          title: "API Gateway Configuration Guide",
          content: "Step-by-step guide for setting up and configuring API gateways in cloud environments...",
          type: "Guide",
          relevance: 88,
          space: "DevOps"
        },
        {
          title: "Database Migration Procedures",
          content: "Best practices for database migrations including rollback strategies and data validation...",
          type: "Procedure",
          relevance: 82,
          space: "Database"
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Search className="h-8 w-8 text-primary" />
          AI Search
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Search across all your Confluence spaces with AI-powered insights
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Query</CardTitle>
          <CardDescription>Enter your search terms or ask a question</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for documentation, guides, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={!searchQuery.trim() || isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>Found {results.length} relevant results</CardDescription>
            </div>
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
          </CardHeader>
          <CardContent className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{result.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{result.relevance}% match</Badge>
                    <Badge variant="outline">{result.space}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{result.content}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {result.type === "Documentation" && <FileText className="h-4 w-4" />}
                  {result.type === "Guide" && <BookOpen className="h-4 w-4" />}
                  {result.type === "Procedure" && <Globe className="h-4 w-4" />}
                  {result.type}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
