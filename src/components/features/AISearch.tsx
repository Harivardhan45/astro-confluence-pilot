
import { useState } from "react";
import { SearchConfiguration } from "./search/SearchConfiguration";
import { SearchResults } from "./search/SearchResults";

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
        <SearchConfiguration
          query={query}
          setQuery={setQuery}
          selectedPages={selectedPages}
          onPageSelection={handlePageSelection}
          onSearch={handleSearch}
          isSearching={isSearching}
          availablePages={availablePages}
        />

        <SearchResults
          isSearching={isSearching}
          searchResults={searchResults}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
        />
      </div>
    </div>
  );
}
