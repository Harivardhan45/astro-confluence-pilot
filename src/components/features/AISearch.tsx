
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, FileText, Users, Star } from "lucide-react";

export function AISearch() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchResults = [
    {
      title: "API Authentication Guide",
      snippet: "Complete guide on implementing OAuth 2.0 authentication for our REST APIs, including code examples and troubleshooting tips...",
      space: "Engineering",
      lastUpdated: "2 days ago",
      author: "John Smith",
      relevance: 95,
      type: "Documentation"
    },
    {
      title: "User Registration Flow",
      snippet: "Step-by-step process for user registration including validation rules, email verification, and database schema...",
      space: "Product",
      lastUpdated: "1 week ago",
      author: "Sarah Johnson",
      relevance: 88,
      type: "Process"
    },
    {
      title: "Database Migration Scripts",
      snippet: "Collection of SQL scripts for migrating user data between database versions, with rollback procedures...",
      space: "Engineering",
      lastUpdated: "3 days ago",
      author: "Mike Chen",
      relevance: 82,
      type: "Code"
    }
  ];

  const quickFilters = [
    { label: "All Content", active: true },
    { label: "Documentation", active: false },
    { label: "Code", active: false },
    { label: "Processes", active: false },
    { label: "Recent", active: false }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Search</h1>
        <p className="text-muted-foreground">
          Search across all your Confluence spaces with intelligent context understanding.
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Ask me anything about your Confluence content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
            <Button variant="outline" size="lg">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Quick Filters */}
          <div className="flex gap-2 mt-4">
            {quickFilters.map((filter) => (
              <Button
                key={filter.label}
                variant={filter.active ? "default" : "outline"}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <span className="text-sm text-muted-foreground">
            Found {searchResults.length} results in 0.3 seconds
          </span>
        </div>
        
        {searchResults.map((result, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg hover:text-primary">
                      {result.title}
                    </CardTitle>
                    <Badge variant="secondary">{result.relevance}% match</Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {result.snippet}
                  </CardDescription>
                </div>
                <Star className="h-4 w-4 text-muted-foreground hover:text-yellow-500 cursor-pointer" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{result.space}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{result.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{result.lastUpdated}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {result.type}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
