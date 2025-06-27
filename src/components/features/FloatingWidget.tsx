
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Film, 
  Code, 
  ChartBar, 
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
  isMinimized: boolean;
  onMinimize: () => void;
}

type FeatureType = 'search' | 'video' | 'code' | 'impact' | 'testing' | null;

export function FloatingWidget({ isVisible, onClose, isMinimized, onMinimize }: FloatingWidgetProps) {
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
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'video' as FeatureType,
      icon: Film,
      label: 'Video Summary',
      description: 'Summarize video content',
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      textColor: 'text-white'
    },
    {
      id: 'code' as FeatureType,
      icon: Code,
      label: 'Code Helper',
      description: 'AI-powered code assistance',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      textColor: 'text-white'
    },
    {
      id: 'impact' as FeatureType,
      icon: ChartBar,
      label: 'Impact Check',
      description: 'Analyze change impact',
      bgColor: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      textColor: 'text-white'
    },
    {
      id: 'testing' as FeatureType,
      icon: TestTube,
      label: 'Test Support',
      description: 'Testing assistance tools',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      textColor: 'text-white'
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
        const newY = Math.max(0, Math.min(window.innerHeight - (isMinimized ? 80 : 450), e.clientY - dragOffset.y));
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
  }, [isDragging, dragOffset, isMinimized]);

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
      <div className="fixed inset-0 pointer-events-none z-40">
        <Card
          ref={widgetRef}
          className="absolute pointer-events-auto w-64 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl"
          style={{
            left: position.x,
            top: position.y,
            height: isMinimized ? 'auto' : '420px'
          }}
        >
          {/* Header */}
          <div 
            className="drag-handle flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 cursor-move rounded-t-lg"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <Badge variant="outline" className="text-xs font-medium bg-white/80">
                Confluence AI Assistant
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMinimize}
                className="h-6 w-6 p-0 hover:bg-white/60"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 hover:bg-white/60"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="p-3 space-y-3 flex-1 overflow-y-auto">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Tooltip key={feature.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-14 p-3 transition-all duration-200 hover:scale-105 border-0 ${feature.bgColor} ${feature.hoverColor} ${feature.textColor} rounded-lg shadow-sm hover:shadow-md`}
                        onClick={() => setActiveFeature(feature.id)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="p-2 rounded-md bg-white/20">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">{feature.label}</div>
                            <div className="text-xs opacity-90 truncate">
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
          <DialogContent className="max-w-4xl h-[80vh] overflow-hidden p-0 bg-white">
            <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <DialogTitle className="text-xl font-semibold text-gray-800">{getFeatureTitle()}</DialogTitle>
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
