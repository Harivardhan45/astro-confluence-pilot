
import { ThemeProvider } from "@/components/ThemeProvider";
import { FloatingWidgetLauncher } from "@/components/features/FloatingWidgetLauncher";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="confluence-ai-theme">
      <div className="min-h-screen w-full bg-background">
        <FloatingWidgetLauncher />
      </div>
    </ThemeProvider>
  );
};

export default Index;
