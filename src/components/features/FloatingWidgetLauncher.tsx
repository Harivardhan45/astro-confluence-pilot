
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Bot, Zap } from "lucide-react";
import { FloatingWidget } from "./FloatingWidget";

export function FloatingWidgetLauncher() {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-40">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsWidgetVisible(true)}
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90"
              disabled={isWidgetVisible}
            >
              <div className="relative">
                <Bot className="h-6 w-6" />
                <Zap className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400" />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Open Confluence AI Tools</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <FloatingWidget 
        isVisible={isWidgetVisible} 
        onClose={() => setIsWidgetVisible(false)} 
      />
    </TooltipProvider>
  );
}
