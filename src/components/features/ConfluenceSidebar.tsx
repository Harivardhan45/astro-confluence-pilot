
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Film, 
  Code, 
  ChartBar, 
  TestTube, 
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { AISearch } from "./AISearch";
import { VideoSummarizer } from "./VideoSummarizer";
import { CodeAssistant } from "./CodeAssistant";
import { ImpactAnalyzer } from "./ImpactAnalyzer";
import { TestingSupport } from "./TestingSupport";

type FeatureType = 'search' | 'video' | 'code' | 'impact' | 'testing' | null;

interface ConfluenceSidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ConfluenceSidebar({ isVisible, onClose }: ConfluenceSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null);

  const features = [
    {
      id: 'search' as FeatureType,
      icon: Search,
      label: 'AI Search',
      description: 'Search across Confluence with AI',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'video' as FeatureType,
      icon: Film,
      label: 'Video Summary',
      description: 'Summarize video content',
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      id: 'code' as FeatureType,
      icon: Code,
      label: 'Code Helper',
      description: 'AI-powered code assistance',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'impact' as FeatureType,
      icon: ChartBar,
      label: 'Impact Analyzer',
      description: 'Analyze change impact',
      bgColor: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
    {
      id: 'testing' as FeatureType,
      icon: TestTube,
      label: 'Test Support',
      description: 'Testing assistance tools',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
    }
  ];

  const handleFeatureClick = (featureId: FeatureType) => {
    setActiveFeature(featureId);
    setIsExpanded(true);
  };

  const handleBackToSidebar = () => {
    setActiveFeature(null);
    setIsExpanded(false);
  };

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
      <div className="fixed right-0 top-0 h-full z-50 flex">
        {/* Main Sidebar */}
        <div className={`bg-white border-l border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-80' : 'w-20'
        } h-full flex flex-col`}>
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              {isExpanded ? (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-medium bg-white/80">
                    Confluence AI
                  </Badge>
                </div>
              ) : (
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                {!isExpanded && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="h-8 w-8 p-0 hover:bg-white/60"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-white/60"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Panel Content */}
          {isExpanded && activeFeature ? (
            <div className="flex-1 flex flex-col">
              {/* Panel Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToSidebar}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <h3 className="font-semibold text-gray-800">{getFeatureTitle()}</h3>
                </div>
              </div>
              
              {/* Panel Content */}
              <div className="flex-1 overflow-auto p-4">
                {renderFeatureContent()}
              </div>
            </div>
          ) : (
            /* Feature Buttons */
            <div className="flex-1 p-3 space-y-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Tooltip key={feature.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full transition-all duration-200 hover:scale-105 border-0 ${feature.bgColor} ${feature.hoverColor} text-white rounded-lg shadow-sm hover:shadow-md ${
                          isExpanded ? 'h-16 justify-start p-4' : 'h-12 w-12 p-0 justify-center'
                        }`}
                        onClick={() => handleFeatureClick(feature.id)}
                      >
                        <div className={`flex items-center ${isExpanded ? 'gap-3 w-full' : ''}`}>
                          <div className="p-1 rounded-md bg-white/20">
                            <Icon className="h-4 w-4" />
                          </div>
                          {isExpanded && (
                            <div className="flex-1 text-left">
                              <div className="font-medium text-sm">{feature.label}</div>
                              <div className="text-xs opacity-90 truncate">
                                {feature.description}
                              </div>
                            </div>
                          )}
                        </div>
                      </Button>
                    </TooltipTrigger>
                    {!isExpanded && (
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="font-medium">{feature.label}</p>
                        <p className="text-xs opacity-90">{feature.description}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          )}

          {/* Footer */}
          {isExpanded && !activeFeature && (
            <div className="p-4 border-t border-gray-200">
              <div className="rounded-lg bg-gray-50 p-3">
                <h4 className="text-sm font-medium text-gray-800">Need Help?</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Click any feature above to get started with AI assistance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
