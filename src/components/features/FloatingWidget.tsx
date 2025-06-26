
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, ArrowLeft } from "lucide-react";
import { AISearch } from "./AISearch";
import { VideoSummarizer } from "./VideoSummarizer";
import { CodeAssistant } from "./CodeAssistant";
import { ImpactAnalyzer } from "./ImpactAnalyzer";
import { TestingSupport } from "./TestingSupport";

interface FloatingWidgetProps {
  isVisible: boolean;
  activeFeature: 'search' | 'video' | 'code' | 'impact' | 'testing' | null;
  onClose: () => void;
}

export function FloatingWidget({ isVisible, activeFeature, onClose }: FloatingWidgetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

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
    const titles = {
      search: 'AI Powered Search',
      video: 'Video Summarizer',
      code: 'Code Assistant',
      impact: 'Impact Analyzer',
      testing: 'Test Support Tool'
    };
    return activeFeature ? titles[activeFeature] : '';
  };

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, onClose]);

  return (
    <Sheet open={isVisible} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[90vw] sm:w-[80vw] lg:w-[60vw] xl:w-[50vw] max-w-4xl p-0 border-l"
        ref={sheetRef}
      >
        <SheetHeader className="px-6 py-4 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <SheetTitle className="text-lg font-semibold">
                {getFeatureTitle()}
              </SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto p-6">
          {renderFeatureContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
