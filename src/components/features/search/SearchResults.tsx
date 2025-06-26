
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";
import { SearchSources } from "./SearchSources";
import { SearchExport } from "./SearchExport";

interface SearchResult {
  answer: string;
  sources: Array<{
    id: string;
    title: string;
    space: string;
  }>;
  confidence: number;
  relatedTopics: string[];
}

interface SearchResultsProps {
  isSearching: boolean;
  searchResults: SearchResult | null;
  exportFormat: string;
  setExportFormat: (format: string) => void;
}

export function SearchResults({ 
  isSearching, 
  searchResults, 
  exportFormat, 
  setExportFormat 
}: SearchResultsProps) {
  return (
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
            <SearchSources sources={searchResults.sources} />

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
            <SearchExport 
              exportFormat={exportFormat} 
              setExportFormat={setExportFormat} 
            />
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter a question and select pages to get AI-powered answers</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
