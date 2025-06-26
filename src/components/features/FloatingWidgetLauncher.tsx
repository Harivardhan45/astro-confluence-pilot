
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Search, Video, Code, Activity, TestTube } from "lucide-react";
import { FloatingWidget } from "./FloatingWidget";

type FeatureType = 'search' | 'video' | 'code' | 'impact' | 'testing' | null;

export function FloatingWidgetLauncher() {
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null);

  const features = [
    {
      id: 'search' as FeatureType,
      icon: Search,
      label: 'AI Powered Search',
      description: 'Search across Confluence with AI',
      color: 'hover:bg-blue-500/10 hover:border-blue-300'
    },
    {
      id: 'video' as FeatureType,
      icon: Video,
      label: 'Video Summarizer',
      description: 'Summarize video content',
      color: 'hover:bg-purple-500/10 hover:border-purple-300'
    },
    {
      id: 'code' as FeatureType,
      icon: Code,
      label: 'Code Assistant',
      description: 'AI-powered code help',
      color: 'hover:bg-green-500/10 hover:border-green-300'
    },
    {
      id: 'impact' as FeatureType,
      icon: Activity,
      label: 'Impact Analyzer',
      description: 'Analyze change impact',
      color: 'hover:bg-orange-500/10 hover:border-orange-300'
    },
    {
      id: 'testing' as FeatureType,
      icon: TestTube,
      label: 'Test Support Tool',
      description: 'Testing assistance tools',
      color: 'hover:bg-red-500/10 hover:border-red-300'
    }
  ];

  return (
    <TooltipProvider>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl shadow-lg p-2 space-y-1 min-w-[60px]">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Tooltip key={feature.id}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setActiveFeature(feature.id)}
                    variant="ghost"
                    size="icon"
                    className={`h-12 w-12 rounded-lg transition-all duration-200 border border-transparent ${feature.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="font-medium">
                  <p>{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      <FloatingWidget 
        isVisible={activeFeature !== null} 
        activeFeature={activeFeature}
        onClose={() => setActiveFeature(null)} 
      />
    </TooltipProvider>
  );
}
