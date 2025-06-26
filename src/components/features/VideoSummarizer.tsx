
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, Play, Download, FileText, Clock, Users, Share } from "lucide-react";

export function VideoSummarizer() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const videoSummaries = [
    {
      title: "Q4 Product Demo",
      duration: "15:32",
      uploadDate: "2 hours ago",
      status: "completed",
      summary: "Overview of new features including user dashboard improvements, API enhancements, and mobile app updates. Key highlights: 40% performance improvement, new analytics dashboard, and simplified onboarding flow.",
      keyPoints: [
        "40% performance improvement in core features",
        "New analytics dashboard with real-time metrics",
        "Simplified 3-step onboarding process",
        "Mobile app beta release scheduled for next month"
      ],
      participants: ["Product Manager", "Engineering Lead", "Design Lead"],
      tags: ["Product", "Demo", "Q4"]
    },
    {
      title: "Team Standup - Dec 20",
      duration: "23:45",
      uploadDate: "1 day ago",
      status: "completed",
      summary: "Daily standup covering sprint progress, blockers, and upcoming deliverables. Team is on track for Q4 goals with minor adjustments needed for testing phase.",
      keyPoints: [
        "Sprint 23 is 80% complete",
        "Authentication service needs additional testing",
        "UI components ready for production",
        "Database migration scheduled for weekend"
      ],
      participants: ["Dev Team", "Scrum Master", "QA Lead"],
      tags: ["Standup", "Development", "Sprint"]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Summarizer</h1>
        <p className="text-muted-foreground">
          Upload meeting recordings and get AI-generated summaries with key insights.
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
          <CardDescription>
            Supported formats: MP4, AVI, MOV, WebM (Max size: 500MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop your video here</h3>
            <p className="text-muted-foreground mb-4">or click to browse your files</p>
            <Button>Choose File</Button>
          </div>
          
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Uploading...</span>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Summaries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Summaries</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        {videoSummaries.map((video, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <Badge variant={video.status === "completed" ? "default" : "secondary"}>
                      {video.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Upload className="h-3 w-3" />
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{video.participants.length} participants</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Summary</h4>
                  <p className="text-muted-foreground">{video.summary}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    {video.keyPoints.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tags:</span>
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Summary
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Transcript
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
