
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Download, Save, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function ImpactAnalyzerPage() {
  const [oldVersion, setOldVersion] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const pages = [
    "API Documentation v1.2",
    "API Documentation v1.3", 
    "User Guide - March 2024",
    "User Guide - April 2024",
    "System Architecture v2.1",
    "System Architecture v2.2",
    "Database Schema v1.0",
    "Database Schema v1.1"
  ];

  const handleAnalyzeChanges = () => {
    if (!oldVersion || !newVersion) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        summary: {
          linesAdded: 47,
          linesRemoved: 23,
          linesModified: 15,
          filesChanged: 8,
          riskLevel: "Medium"
        },
        changes: [
          {
            section: "Authentication API",
            type: "addition",
            impact: "high",
            description: "Added OAuth 2.0 authentication endpoints"
          },
          {
            section: "User Management",
            type: "modification", 
            impact: "medium",
            description: "Updated user role permissions structure"
          },
          {
            section: "Error Handling",
            type: "removal",
            impact: "low", 
            description: "Removed deprecated error codes"
          },
          {
            section: "Rate Limiting",
            type: "addition",
            impact: "high",
            description: "Added new rate limiting policies"
          }
        ],
        recommendations: [
          "Update client applications to use new OAuth endpoints",
          "Review and test user permission changes",
          "Update error handling code to remove deprecated references",
          "Implement rate limiting on client side",
          "Update API documentation with breaking changes"
        ],
        breakingChanges: [
          "OAuth authentication now required for all endpoints",
          "User role 'moderator' renamed to 'editor'",
          "Error codes 4001-4005 no longer supported"
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "addition": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "removal": return <XCircle className="h-4 w-4 text-red-600" />;
      case "modification": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Impact Analyzer</h1>
        <p className="text-slate-600">Analyze changes between document versions and assess their impact.</p>
      </div>

      {/* Version Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Version Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Old Version</Label>
              <Select value={oldVersion} onValueChange={setOldVersion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select older version" />
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
              <Label>New Version</Label>
              <Select value={newVersion} onValueChange={setNewVersion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select newer version" />
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
          </div>

          <Button 
            onClick={handleAnalyzeChanges}
            disabled={!oldVersion || !newVersion || isAnalyzing}
            className="w-full md:w-auto"
          >
            {isAnalyzing ? "Analyzing Changes..." : "Analyze Impact"}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <>
          {/* Metrics Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Change Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    +{analysisResult.summary.linesAdded}
                  </div>
                  <div className="text-sm text-slate-600">Lines Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    -{analysisResult.summary.linesRemoved}
                  </div>
                  <div className="text-sm text-slate-600">Lines Removed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {analysisResult.summary.linesModified}
                  </div>
                  <div className="text-sm text-slate-600">Lines Modified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {analysisResult.summary.filesChanged}
                  </div>
                  <div className="text-sm text-slate-600">Files Changed</div>
                </div>
                <div className="text-center">
                  <Badge variant={getRiskColor(analysisResult.summary.riskLevel)} className="text-xs">
                    {analysisResult.summary.riskLevel} Risk
                  </Badge>
                  <div className="text-sm text-slate-600 mt-1">Risk Level</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Side-by-side Diff Viewer */}
          <Card>
            <CardHeader>
              <CardTitle>Change Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResult.changes.map((change: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getChangeIcon(change.type)}
                        <h4 className="font-medium">{change.section}</h4>
                      </div>
                      <Badge variant={getRiskColor(change.impact)}>
                        {change.impact} impact
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm">{change.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Breaking Changes */}
          {analysisResult.breakingChanges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Breaking Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisResult.breakingChanges.map((change: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800 text-sm">{change}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResult.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-blue-800 text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export & Save</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Markdown
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Save Report to Confluence</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Impact analysis report title"
                      className="flex-1"
                    />
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
