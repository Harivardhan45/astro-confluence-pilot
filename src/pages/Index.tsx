
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConfluenceAICard } from "@/components/features/ConfluenceAICard";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="confluence-ai-theme">
      <ConfluenceAICard />
    </ThemeProvider>
  );
};

export default Index;
