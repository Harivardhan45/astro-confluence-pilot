
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";

interface SourceItem {
  id: string;
  title: string;
  space: string;
}

interface SearchSourcesProps {
  sources: SourceItem[];
}

export function SearchSources({ sources }: SearchSourcesProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Sources Used</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {sources.map((source) => (
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
  );
}
