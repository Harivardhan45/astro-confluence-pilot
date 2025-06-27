
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Video, Code, BarChart, TestTube, LayoutDashboard } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  {
    name: "Dashboard",
    id: "dashboard",
    icon: LayoutDashboard,
    description: "Overview and analytics"
  },
  {
    name: "AI Search",
    id: "search",
    icon: Search,
    description: "Search across Confluence spaces"
  },
  {
    name: "Video Summarizer",
    id: "video",
    icon: Video,
    description: "Generate video summaries"
  },
  {
    name: "Code Assistant",
    id: "code",
    icon: Code,
    description: "Code analysis and suggestions"
  },
  {
    name: "Impact Analyzer",
    id: "diff",
    icon: BarChart,
    description: "Analyze change impact"
  },
  {
    name: "Test Support",
    id: "testing",
    icon: TestTube,
    description: "Generate test suites"
  },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <TooltipProvider>
      <div className="flex h-full w-64 flex-col bg-slate-50 border-r border-slate-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Confluence AI</h2>
            <p className="text-xs text-slate-500">Assistant</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-11 px-3 text-slate-700 hover:bg-blue-50 hover:text-blue-900",
                        isActive && "bg-blue-100 text-blue-900 shadow-sm font-medium"
                      )}
                      onClick={() => onViewChange(item.id)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{item.name}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-slate-900 text-white">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-300">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Need Help?</h4>
            <p className="text-xs text-blue-700 mb-3">
              Check our documentation for guides and tutorials.
            </p>
            <Button size="sm" variant="outline" className="w-full text-blue-700 border-blue-300 hover:bg-blue-100">
              View Docs
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
