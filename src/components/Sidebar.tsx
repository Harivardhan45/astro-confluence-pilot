
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Video, Code, Diff, TestTube, LayoutDashboard } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  {
    name: "Dashboard",
    id: "dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "AI Search",
    id: "search",
    icon: Search,
  },
  {
    name: "Video Summarizer",
    id: "video",
    icon: Video,
  },
  {
    name: "Code Assistant",
    id: "code",
    icon: Code,
  },
  {
    name: "Impact Analyzer",
    id: "diff",
    icon: Diff,
  },
  {
    name: "Testing Support",
    id: "testing",
    icon: TestTube,
  },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">CA</span>
        </div>
        <div>
          <h2 className="font-semibold">Confluence AI</h2>
          <p className="text-xs text-muted-foreground">Assistant</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  activeView === item.id && "bg-secondary"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t">
        <div className="rounded-lg bg-muted p-3">
          <h4 className="text-sm font-medium">Need Help?</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Check our documentation for guides and tutorials.
          </p>
          <Button size="sm" variant="outline" className="w-full mt-2">
            View Docs
          </Button>
        </div>
      </div>
    </div>
  );
}
