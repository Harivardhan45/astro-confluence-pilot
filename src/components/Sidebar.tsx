
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Video, Code, BarChart, TestTube } from "lucide-react";
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
    name: "AI Powered Search",
    id: "search",
    icon: Search,
    description: "Search across Confluence spaces with AI assistance"
  },
  {
    name: "Video Summarizer",
    id: "video",
    icon: Video,
    description: "Generate summaries from video content"
  },
  {
    name: "Code Assistant",
    id: "code",
    icon: Code,
    description: "AI-powered code analysis and modifications"
  },
  {
    name: "Impact Analyzer",
    id: "diff",
    icon: BarChart,
    description: "Analyze changes and their impact"
  },
  {
    name: "Test Support Tool",
    id: "testing",
    icon: TestTube,
    description: "Generate comprehensive test strategies"
  },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <TooltipProvider>
      <div className="flex h-full w-72 flex-col bg-white border-r border-slate-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 text-lg">Confluence AI</h2>
            <p className="text-sm text-slate-600">Assistant</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-4 h-auto p-4 text-left hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded-lg transition-all duration-200",
                        isActive && "bg-blue-100 border-blue-200 text-blue-900 shadow-sm"
                      )}
                      onClick={() => onViewChange(item.id)}
                    >
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md",
                        isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={cn(
                          "font-medium text-sm truncate",
                          isActive ? "text-blue-900" : "text-slate-900"
                        )}>
                          {item.name}
                        </div>
                        <div className={cn(
                          "text-xs mt-1 line-clamp-2 leading-4",
                          isActive ? "text-blue-700" : "text-slate-500"
                        )}>
                          {item.description}
                        </div>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-300 mt-1">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900 mb-2">Quick Help</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select any feature above to start using AI assistance for your Confluence workflows.
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
