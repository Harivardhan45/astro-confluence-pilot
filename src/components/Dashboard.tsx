
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { AISearchPage } from "@/components/pages/AISearchPage";
import { VideoSummarizerPage } from "@/components/pages/VideoSummarizerPage";
import { CodeAssistantPage } from "@/components/pages/CodeAssistantPage";
import { ImpactAnalyzerPage } from "@/components/pages/ImpactAnalyzerPage";
import { TestSupportPage } from "@/components/pages/TestSupportPage";

export function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />;
      case "search":
        return <AISearchPage />;
      case "video":
        return <VideoSummarizerPage />;
      case "code":
        return <CodeAssistantPage />;
      case "diff":
        return <ImpactAnalyzerPage />;
      case "testing":
        return <TestSupportPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        <div className="h-full p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
