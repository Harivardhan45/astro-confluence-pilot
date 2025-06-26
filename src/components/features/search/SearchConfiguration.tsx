
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Loader2 } from "lucide-react";

interface PageItem {
  id: string;
  title: string;
  space: string;
  lastUpdated: string;
}

interface SearchConfigurationProps {
  query: string;
  setQuery: (query: string) => void;
  selectedPages: string[];
  onPageSelection: (pageId: string, checked: boolean) => void;
  onSearch: () => void;
  isSearching: boolean;
  availablePages: PageItem[];
}

export function SearchConfiguration({
  query,
  setQuery,
  selectedPages,
  onPageSelection,
  onSearch,
  isSearching,
  availablePages
}: SearchConfigurationProps) {
  return (
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
                  onCheckedChange={(checked) => onPageSelection(page.id, checked as boolean)}
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
          onClick={onSearch} 
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
  );
}
