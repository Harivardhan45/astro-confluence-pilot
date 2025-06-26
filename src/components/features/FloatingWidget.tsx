
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Video, 
  Code, 
  Activity, 
  TestTube, 
  Minimize2, 
  Maximize2, 
  GripVertical,
  X
} from "lucide-react";
import { AISearch } from "./AISearch";
import { VideoSummarizer } from "./VideoSummarizer";
import { CodeAssistant } from "./CodeAssistant";
import { ImpactAnalyzer } from "./ImpactAnalyzer";
import { TestingSupport } from "./TestingSupport";

interface FloatingWidgetProps {
  isVisible: boolean;
  onClose: () => void;
}

type FeatureType = 'search' | 'video' | 'code' | 'impact' | 'testing' | null;

export function FloatingWidget({ isVisible, onClose }: FloatingWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: 'search' as FeatureType,
      icon: Search,
      label: 'AI Search',
      description: 'Search across Confluence with AI',
      color: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-200 dark:border-blue-800'
    },
    {
      id: 'video' as FeatureType,
      icon: Video,
      label: 'Video Summary',
      description: 'Summarize video content',
      color: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-200 dark:border-purple-800'
    },
    {
      id: 'code' as FeatureType,
      icon: Code,
      label: 'Code Assistant',
      description: 'AI-powered code help',
      color: 'bg-green-500/10 hover:bg-green-500/20 border-green-200 dark:border-green-800'
    },
    {
      id: 'impact' as FeatureType,
      icon: Activity,
      label: 'Impact Analyzer',
      description: 'Analyze change impact',
      color: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-200 dark:border-orange-800'
    },
    {
      id: 'testing' as FeatureType,
      icon: TestTube,
      label: 'Test Support',
      description: 'Testing assistance tools',
      color: 'bg-red-500/10 hover:bg-red-500/20 border-red-200 dark:border-red-800'
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (widgetRef.current && e.target === widgetRef.current.querySelector('.drag-handle')) {
      setIsDragging(true);
      const rect = widgetRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(window.innerWidth - 280, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 400, e.clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'search':
        return <AISearch />;
      case 'video':
        return <VideoSummarizer />;
      case 'code':
        return <CodeAssistant />;
      case 'impact':
        return <ImpactAnalyzer />;
      case 'testing':
        return <TestingSupport />;
      default:
        return null;
    }
  };

  const getFeatureTitle = () => {
    const feature = features.find(f => f.id === activeFeature);
    return feature ? feature.label : '';
  };

  if (!isVisible) return null;

  return (
    <TooltipProvider>
      <div className="fixed inset-0 pointer-events-none z-50">
        <Card
          ref={widgetRef}
          className="absolute pointer-events-auto w-72 bg-background/95 backdrop-blur-sm border shadow-lg rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl"
          style={{
            left: position.x,
            top: position.y,
            height: isMinimized ? 'auto' : '420px'
          }}
        >
          {/* Header */}
          <div 
            className="drag-handle flex items-center justify-between p-3 border-b cursor-move bg-muted/50 rounded-t-lg"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                Confluence AI
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="p-3 space-y-2 flex-1 overflow-y-auto">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Tooltip key={feature.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-16 p-3 transition-all duration-200 hover:scale-105 border ${feature.color}`}
                        onClick={() => setActiveFeature(feature.id)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 rounded-md bg-background/50">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">{feature.label}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>{feature.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          )}
        </Card>

        {/* Feature Modal */}
        <Dialog open={activeFeature !== null} onOpenChange={() => setActiveFeature(null)}>
          <DialogContent className="max-w-6xl h-[80vh] overflow-hidden p-0">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-xl">{getFeatureTitle()}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto px-6 pb-6">
              {renderFeatureContent()}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
