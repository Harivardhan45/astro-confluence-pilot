
import { ThemeProvider } from "@/components/ThemeProvider";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="confluence-ai-theme">
      <Dashboard />
    </ThemeProvider>
  );
};

export default Index;
