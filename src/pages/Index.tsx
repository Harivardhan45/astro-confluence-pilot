
import { ThemeProvider } from "@/components/ThemeProvider";
import { FloatingWidgetLauncher } from "@/components/features/FloatingWidgetLauncher";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="confluence-ai-theme">
      <div className="min-h-screen w-full bg-background/50 backdrop-blur-sm">
        {/* Simulated Confluence page content */}
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h1 className="text-2xl font-semibold mb-4">Project Documentation</h1>
            <p className="text-muted-foreground mb-4">
              This is a sample Confluence page where the AI assistant tools can be accessed 
              through the floating panel on the right side of the screen.
            </p>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <div className="space-y-3">
              <div className="h-3 bg-muted rounded w-4/5"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
        
        <FloatingWidgetLauncher />
      </div>
    </ThemeProvider>
  );
};

export default Index;
