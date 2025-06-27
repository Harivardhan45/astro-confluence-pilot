
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Bot, Minimize2 } from "lucide-react";
import { FloatingWidget } from "./FloatingWidget";

export function FloatingWidgetLauncher() {
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <TooltipProvider>
      <div className="fixed top-4 right-4 z-50">
        {!isWidgetVisible && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsWidgetVisible(true)}
                className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-blue-600 hover:bg-blue-700"
              >
                <Bot className="h-6 w-6 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open Confluence AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <FloatingWidget 
        isVisible={isWidgetVisible} 
        onClose={() => setIsWidgetVisible(false)}
        isMinimized={isMinimized}
        onMinimize={handleMinimize}
      />
    </TooltipProvider>
  );
}
