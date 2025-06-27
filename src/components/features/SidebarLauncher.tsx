
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Bot } from "lucide-react";
import { ConfluenceSidebar } from "./ConfluenceSidebar";

export function SidebarLauncher() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <TooltipProvider>
      <div className="fixed top-4 right-4 z-40">
        {!isSidebarVisible && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsSidebarVisible(true)}
                className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-blue-600 hover:bg-blue-700"
              >
                <Bot className="h-5 w-5 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open Confluence AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <ConfluenceSidebar 
        isVisible={isSidebarVisible} 
        onClose={() => setIsSidebarVisible(false)}
      />
    </TooltipProvider>
  );
}
