
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Video, Download, Save, Loader2, Upload, Play, Clock } from "lucide-react";

export function VideoSummarizerPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  const handleSummarize = async () => {
    if (!videoUrl.trim()) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setSummary({
        title: "React Best Practices - Component Design Patterns",
        duration: "28:45",
        keyPoints: [
          "Component composition patterns for reusable UI elements",
          "State management strategies using hooks and context",
          "Performance optimization techniques with React.memo",
          "Error boundary implementation for robust applications",
          "Testing strategies for React components"
        ],
        summary: "This video covers essential React best practices focusing on component design patterns. The presenter demonstrates how to create reusable components using composition, manage state effectively with hooks, and optimize performance. Key topics include proper use of useEffect, avoiding common pitfalls, and implementing error boundaries for better user experience.",
        timestamps: [
          { time: "00:00", topic: "Introduction to Component Patterns" },
          { time: "05:30", topic: "State Management with Hooks" },
          { time: "12:15", topic: "Performance Optimization" },
          { time: "18:45", topic: "Error Handling Strategies" },
          { time: "24:00", topic: "Testing Best Practices" }
        ]
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Video className="h-8 w-8 text-primary" />
          Video Summarizer
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Generate AI-powered summaries of video content with key points and timestamps
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Input</CardTitle>
          <CardDescription>Provide a video URL or upload a file</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter video URL (YouTube, Vimeo, etc.)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>
          <Button onClick={handleSummarize} disabled={!videoUrl.trim() || isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Video...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Video Summary</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" />
                  Duration: {summary.duration}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                    <DropdownMenuItem>Export as TXT</DropdownMenuItem>
                    <DropdownMenuItem>Export as HTML</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Confluence
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{summary.title}</h3>
                <p className="text-muted-foreground">{summary.summary}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Key Points</h4>
                <ul className="space-y-1">
                  {summary.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
              <CardDescription>Key topics with time markers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summary.timestamps.map((timestamp: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <span className="text-primary font-mono text-sm bg-muted px-2 py-1 rounded">
                      {timestamp.time}
                    </span>
                    <span className="text-sm">{timestamp.topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
