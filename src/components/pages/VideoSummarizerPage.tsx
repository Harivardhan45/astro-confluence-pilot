
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Video, FileText, Download, Save, Mic, MicOff } from "lucide-react";

export function VideoSummarizerPage() {
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [qaQuestion, setQaQuestion] = useState("");
  const [qaAnswer, setQaAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const pages = [
    "Team Meeting Recordings",
    "Training Videos",
    "Product Demos",
    "Technical Presentations",
    "Customer Interviews"
  ];

  const videos = [
    "Q4 Planning Meeting - Dec 2024.mp4",
    "New Feature Demo - Dashboard.mp4",
    "Customer Feedback Session.mp4",
    "Engineering Standup - Week 12.mp4",
    "Training: Security Best Practices.mp4"
  ];

  const handleProcessVideo = () => {
    if (!selectedVideo) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setTranscript(`[00:00] Speaker 1: Welcome everyone to today's meeting. We'll be discussing the Q4 roadmap and priorities.

[00:15] Speaker 2: Thanks for joining. Let me start by sharing the key metrics from Q3...

[01:30] Speaker 1: The user feedback has been overwhelmingly positive about the new dashboard features.

[02:45] Speaker 3: We should prioritize the mobile optimization based on the usage analytics.

[04:20] Speaker 2: I agree. The mobile traffic has increased by 40% this quarter.

[05:15] Speaker 1: Let's also discuss the security enhancements that were requested...`);

      setSummary(`**Key Discussion Points:**

• **Q4 Roadmap Planning** - Team discussed priorities and resource allocation for the upcoming quarter
• **Q3 Performance Review** - Positive metrics and user feedback on dashboard features  
• **Mobile Optimization Priority** - 40% increase in mobile traffic drives need for mobile-first approach
• **Security Enhancements** - New security requirements identified and prioritized

**Action Items:**
1. Finalize mobile optimization timeline
2. Review security enhancement proposals
3. Allocate resources for Q4 initiatives

**Next Steps:**
Follow-up meeting scheduled to finalize Q4 commitments and timeline.`);

      setQuotes([
        "The user feedback has been overwhelmingly positive about the new dashboard features.",
        "We should prioritize the mobile optimization based on the usage analytics.",
        "The mobile traffic has increased by 40% this quarter."
      ]);
      
      setIsProcessing(false);
    }, 3000);
  };

  const handleVoiceQA = () => {
    if (!qaQuestion.trim()) return;
    
    setTimeout(() => {
      setQaAnswer(`Based on the video content, here's the answer to "${qaQuestion}":

The discussion covered this topic around the 2:45 mark where Speaker 3 mentioned the mobile optimization priority. The team agreed that with the 40% increase in mobile traffic this quarter, it's become a critical focus area for Q4 planning.`);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Video Summarizer</h1>
        <p className="text-slate-600">Generate summaries, extract quotes, and get answers from video content.</p>
      </div>

      {/* Video Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Page</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose page with videos" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Video</Label>
              <Select value={selectedVideo} onValueChange={setSelectedVideo}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose video to analyze" />
                </SelectTrigger>
                <SelectContent>
                  {videos.map((video) => (
                    <SelectItem key={video} value={video}>
                      {video}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleProcessVideo}
            disabled={!selectedVideo || isProcessing}
            className="w-full md:w-auto"
          >
            {isProcessing ? "Processing Video..." : "Process & Analyze Video"}
          </Button>
        </CardContent>
      </Card>

      {/* Transcript Display */}
      {transcript && (
        <Card>
          <CardHeader>
            <CardTitle>Video Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 border rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-slate-800 font-mono">
                {transcript}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary and Quotes */}
      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-slate-800">
                  {summary}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quotes.map((quote, index) => (
                  <div key={index} className="border-l-4 border-blue-400 pl-4 py-2 bg-blue-50">
                    <p className="text-slate-800 italic">"{quote}"</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Voice Q&A */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice-Enabled Q&A
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question about the video content..."
                value={qaQuestion}
                onChange={(e) => setQaQuestion(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsListening(!isListening)}
                className={isListening ? "bg-red-100 border-red-300" : ""}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={handleVoiceQA} disabled={!qaQuestion.trim()}>
                Ask
              </Button>
            </div>

            {qaAnswer && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-slate-800">{qaAnswer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Export & Save</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Download TXT
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Save Results to Confluence</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Page title for video summary"
                    className="flex-1"
                  />
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Page
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
