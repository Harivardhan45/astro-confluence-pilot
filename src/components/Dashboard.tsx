
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { AISearchPage } from "@/components/pages/AISearchPage";
import { VideoSummarizerPage } from "@/components/pages/VideoSummarizerPage";
import { CodeAssistantPage } from "@/components/pages/CodeAssistantPage";
import { ImpactAnalyzerPage } from "@/components/pages/ImpactAnalyzerPage";
import { TestSupportPage } from "@/components/pages/TestSupportPage";

export function Dashboard() {
  const [activeView, setActiveView] = useState("search");

  const renderContent = () => {
    switch (activeView) {
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
        return <AISearchPage />;
    }
  };

  return (
    <div className="flex h-screen max-h-[700px] w-full max-w-[1600px] mx-auto bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto bg-slate-50">
        <div className="h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
