
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6 gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <Select defaultValue="product-space">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select space" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product-space">Product Space</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="main-page">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-page">Main Documentation</SelectItem>
                <SelectItem value="api-docs">API Documentation</SelectItem>
                <SelectItem value="user-guide">User Guide</SelectItem>
                <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative flex-1 max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search Confluence..." 
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Connect Confluence
          </Button>
        </div>
      </div>
    </header>
  );
}
