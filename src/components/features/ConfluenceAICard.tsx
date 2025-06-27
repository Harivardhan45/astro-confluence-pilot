
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Video, Code, BarChart, TestTube } from "lucide-react";
import { AISearch } from "./AISearch";
import { VideoSummarizerTab } from "./VideoSummarizerTab";
import { CodeAssistantTab } from "./CodeAssistantTab";
import { ImpactAnalyzerTab } from "./ImpactAnalyzerTab";
import { TestSupportTab } from "./TestSupportTab";

export function ConfluenceAICard() {
  const [activeTab, setActiveTab] = useState("search");

  const features = [
    {
      id: "search",
      label: "AI Search",
      icon: Search,
      component: AISearch
    },
    {
      id: "video",
      label: "Video Summarizer",
      icon: Video,
      component: VideoSummarizerTab
    },
    {
      id: "code",
      label: "Code Assistant",
      icon: Code,
      component: CodeAssistantTab
    },
    {
      id: "impact",
      label: "Impact Analyzer",
      icon: BarChart,
      component: ImpactAnalyzerTab
    },
    {
      id: "testing",
      label: "Test Support",
      icon: TestTube,
      component: TestSupportTab
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-6xl mx-auto shadow-2xl rounded-2xl border-0 bg-card">
        <CardHeader className="pb-0">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Confluence AI Assistant</h1>
            <p className="text-muted-foreground text-lg">
              Enhance your Confluence experience with AI-powered tools
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-muted/30 p-1 rounded-xl h-14">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <TabsTrigger
                    key={feature.id}
                    value={feature.id}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm hover:bg-muted/50"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{feature.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {features.map((feature) => {
              const FeatureComponent = feature.component;
              return (
                <TabsContent
                  key={feature.id}
                  value={feature.id}
                  className="mt-0 focus-visible:outline-none focus-visible:ring-0"
                >
                  <div className="min-h-[600px]">
                    <FeatureComponent />
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
