
import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AISearch } from "@/components/features/AISearch";
import { VideoSummarizer } from "@/components/features/VideoSummarizer";
import { CodeAssistant } from "@/components/features/CodeAssistant";
import { ImpactAnalyzer } from "@/components/features/ImpactAnalyzer";
import { TestingSupport } from "@/components/features/TestingSupport";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />;
      case "search":
        return <AISearch />;
      case "video":
        return <VideoSummarizer />;
      case "code":
        return <CodeAssistant />;
      case "diff":
        return <ImpactAnalyzer />;
      case "testing":
        return <TestingSupport />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="confluence-ai-theme">
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
