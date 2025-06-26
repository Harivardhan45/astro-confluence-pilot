
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Play, Download, Save, Mic, MicOff, FileText, Quote } from "lucide-react";

export function VideoSummarizer() {
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [exportFormat, setExportFormat] = useState("pdf");

  const availableVideos = [
    { 
      id: "video-1", 
      title: "Product Demo - Q4 Features", 
      duration: "12:34", 
      size: "45 MB",
      page: "Product Updates",
      uploadDate: "2 days ago"
    },
    { 
      id: "video-2", 
      title: "Team Meeting - Architecture Review", 
      duration: "28:45", 
      size: "120 MB",
      page: "Engineering Notes",
      uploadDate: "1 week ago"
    },
    { 
      id: "video-3", 
      title: "Customer Interview Session", 
      duration: "35:20", 
      size: "95 MB",
      page: "User Research",
      uploadDate: "3 days ago"
    },
    { 
      id: "video-4", 
      title: "Security Training Workshop", 
      duration: "22:18", 
      size: "78 MB",
      page: "Training Materials",
      uploadDate: "5 days ago"
    }
  ];

  const handleVideoSelection = (videoId: string, checked: boolean) => {
    if (checked) {
      setSelectedVideos([...selectedVideos, videoId]);
    } else {
      setSelectedVideos(selectedVideos.filter(id => id !== videoId));
    }
  };

  const handleProcess = async () => {
    if (selectedVideos.length === 0) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResults({
            transcript: "Welcome to our Q4 product demo. Today we'll be showcasing the new authentication features, including OAuth integration and enhanced security protocols. The new dashboard provides real-time analytics and improved user experience...",
            summary: "This product demo covers the major Q4 feature releases, focusing on authentication improvements, dashboard enhancements, and security upgrades. Key highlights include OAuth 2.0 implementation, real-time analytics, and user experience improvements.",
            keyQuotes: [
              "The new authentication system provides enterprise-grade security",
              "User engagement has increased by 40% with the new dashboard",
              "We've reduced login time by 60% with OAuth integration"
            ],
            topics: ["Authentication", "Dashboard", "Security", "User Experience"],
            speakers: ["John Doe (Product Manager)", "Sarah Wilson (Lead Developer)"]
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setVoiceQuery("Can you explain the authentication process mentioned in the video?");
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Summarizer</h1>
        <p className="text-muted-foreground">
          Extract insights, transcripts, and summaries from your Confluence video attachments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Videos</CardTitle>
            <CardDescription>Choose video attachments to process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableVideos.map((video) => (
                <div key={video.id} className="border rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={video.id}
                      checked={selectedVideos.includes(video.id)}
                      onCheckedChange={(checked) => handleVideoSelection(video.id, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <label htmlFor={video.id} className="text-sm font-medium cursor-pointer block">
                        {video.title}
                      </label>
                      <div className="text-xs text-muted-foreground mt-1">
                        <div>Duration: {video.duration} • Size: {video.size}</div>
                        <div>From: {video.page} • {video.uploadDate}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedVideos.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {selectedVideos.length} video(s) selected
              </div>
            )}

            <Button 
              onClick={handleProcess} 
              disabled={selectedVideos.length === 0 || isProcessing}
              className="w-full"
            >
              {isProcessing ? "Processing..." : "Process Videos"}
            </Button>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Processing videos...</span>
                  <span>{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Video Analysis Results</CardTitle>
            <CardDescription>
              Transcript, summary, and key insights from your videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="quotes">Key Quotes</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">AI-Generated Summary</h4>
                    <p className="text-sm leading-relaxed">{results.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Topics Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.topics.map((topic: string, index: number) => (
                        <Badge key={index} variant="secondary">{topic}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Speakers</h4>
                    <div className="space-y-1">
                      {results.speakers.map((speaker: string, index: number) => (
                        <div key={index} className="text-sm">{speaker}</div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="transcript" className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap">{results.transcript}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="quotes" className="space-y-4">
                  {results.keyQuotes.map((quote: string, index: number) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <Quote className="h-4 w-4 text-primary mb-2" />
                      <p className="text-sm italic">"{quote}"</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="qa" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask a question about the video content..."
                        value={voiceQuery}
                        onChange={(e) => setVoiceQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant={isListening ? "destructive" : "outline"}
                        size="sm"
                        onClick={toggleVoiceInput}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {isListening && (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          Listening...
                        </div>
                      </div>
                    )}
                    
                    {voiceQuery && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Your Question:</h4>
                        <p className="text-sm mb-3">{voiceQuery}</p>
                        <h4 className="font-medium mb-2">AI Answer:</h4>
                        <p className="text-sm">Based on the video content, the authentication process involves OAuth 2.0 integration with JWT tokens, providing enterprise-grade security while reducing login time by 60%.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select videos and click process to see analysis results</p>
              </div>
            )}
            
            {results && (
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Label htmlFor="export-format" className="text-sm">Export as:</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                      <SelectItem value="txt">TXT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save to Confluence
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
