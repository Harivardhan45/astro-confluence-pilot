
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Save } from "lucide-react";

interface SearchExportProps {
  exportFormat: string;
  setExportFormat: (format: string) => void;
}

export function SearchExport({ exportFormat, setExportFormat }: SearchExportProps) {
  return (
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
  );
}
