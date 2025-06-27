
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Upload, Download, Save, Play, Clock, Users, Loader2 } from "lucide-react";

export function VideoSummarizerTab() {
  const [videoUrl, setVideoUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [exportFormat, setExportFormat] = useState("pdf");

  const handleSummarize = async () => {
    if (!videoUrl.trim()) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setSummary({
        title: "Product Demo: New Authentication System",
        duration: "12:34",
        keyPoints: [
          "Introduction to OAuth 2.0 implementation (0:30-2:15)",
          "JWT token structure and validation (2:15-5:45)",
          "User registration flow demonstration (5:45-8:20)",
          "Security best practices overview (8:20-11:30)",
          "Q&A session highlights (11:30-12:34)"
        ],
        summary: "This video demonstrates the new authentication system implementation using OAuth 2.0 and JWT tokens. The presenter walks through the complete user registration and login process, highlighting security features and best practices. Key topics include token validation, session management, and integration with existing systems.",
        participants: ["John Smith (Product Manager)", "Sarah Chen (Engineering Lead)", "Mike Johnson (Security Architect)"],
        actionItems: [
          "Update documentation with new authentication flow",
          "Schedule security review meeting",
          "Create migration guide for existing users"
        ]
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          Video Summarizer
        </h2>
        <p className="text-muted-foreground">
          Upload or link to videos and get AI-generated summaries with key points and action items.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Video Input</CardTitle>
            <CardDescription>Provide video URL or upload file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                placeholder="https://example.com/video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">or</div>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Video File
              </Button>
            </div>

            <div>
              <Label>Processing Options</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="extract-action-items" defaultChecked />
                  <label htmlFor="extract-action-items" className="text-sm">Extract action items</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="identify-speakers" defaultChecked />
                  <label htmlFor="identify-speakers" className="text-sm">Identify speakers</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="timestamp-keypoints" defaultChecked />
                  <label htmlFor="timestamp-keypoints" className="text-sm">Add timestamps</label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSummarize} 
              disabled={!videoUrl.trim() || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Summarize Video
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Video Summary</CardTitle>
            <CardDescription>
              AI-generated summary with key points and insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isProcessing ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Processing video content...</p>
                </div>
              </div>
            ) : summary ? (
              <div className="space-y-6">
                {/* Video Info */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{summary.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {summary.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {summary.participants.length} participants
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-medium mb-2">Summary</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">{summary.summary}</p>
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="font-medium mb-2">Key Points</h4>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Participants */}
                <div>
                  <h4 className="font-medium mb-2">Participants</h4>
                  <div className="flex flex-wrap gap-2">
                    {summary.participants.map((participant: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div>
                  <h4 className="font-medium mb-2">Action Items</h4>
                  <ul className="space-y-2">
                    {summary.actionItems.map((item: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Export Options */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="export-format" className="text-sm">Format:</Label>
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
                      Download
                    </Button>
                    <Button size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save to Confluence
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload or link to a video to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
