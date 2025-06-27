
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Download, Save, AlertTriangle, CheckCircle, Users, Loader2 } from "lucide-react";

export function ImpactAnalyzerTab() {
  const [changeDescription, setChangeDescription] = useState("");
  const [changeType, setChangeType] = useState("feature");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!changeDescription.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        overallImpact: "High",
        riskLevel: "Medium",
        affectedSystems: [
          { name: "User Authentication", risk: "High", impact: "Direct" },
          { name: "API Gateway", risk: "Medium", impact: "Indirect" },
          { name: "Database Layer", risk: "Low", impact: "Minor" },
          { name: "Frontend Applications", risk: "Medium", impact: "Direct" }
        ],
        stakeholders: [
          { role: "Engineering Team", impact: "High", action: "Implementation required" },
          { role: "Product Team", impact: "Medium", action: "Requirements review" },
          { role: "QA Team", impact: "High", action: "Test plan update" },
          { role: "DevOps Team", impact: "Medium", action: "Deployment planning" },
          { role: "Support Team", impact: "Low", action: "Documentation update" }
        ],
        timeline: {
          planning: "1-2 weeks",
          development: "3-4 weeks",
          testing: "2 weeks",
          deployment: "1 week",
          total: "7-9 weeks"
        },
        recommendations: [
          "Conduct thorough security review before implementation",
          "Create comprehensive test coverage for authentication flows",
          "Plan phased rollout to minimize user impact",
          "Prepare rollback strategy for quick recovery",
          "Update all relevant documentation and user guides"
        ],
        dependencies: [
          "OAuth provider configuration",
          "Database schema updates",
          "Certificate management updates",
          "Load balancer configuration"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BarChart className="h-6 w-6 text-primary" />
          Impact Analyzer
        </h2>
        <p className="text-muted-foreground">
          Analyze the potential impact of changes on your systems and stakeholders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Change Details</CardTitle>
            <CardDescription>Describe the change you want to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="change-type">Change Type</Label>
              <Select value={changeType} onValueChange={setChangeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">New Feature</SelectItem>
                  <SelectItem value="enhancement">Enhancement</SelectItem>
                  <SelectItem value="bugfix">Bug Fix</SelectItem>
                  <SelectItem value="security">Security Update</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="deprecated">Deprecation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="change-description">Change Description</Label>
              <Textarea
                id="change-description"
                placeholder="Describe the change in detail, including what systems will be affected..."
                value={changeDescription}
                onChange={(e) => setChangeDescription(e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div>
              <Label>Analysis Scope</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="system-impact" defaultChecked />
                  <label htmlFor="system-impact" className="text-sm">System impact analysis</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="stakeholder-analysis" defaultChecked />
                  <label htmlFor="stakeholder-analysis" className="text-sm">Stakeholder analysis</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="timeline-estimation" defaultChecked />
                  <label htmlFor="timeline-estimation" className="text-sm">Timeline estimation</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="risk-assessment" defaultChecked />
                  <label htmlFor="risk-assessment" className="text-sm">Risk assessment</label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={!changeDescription.trim() || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart className="mr-2 h-4 w-4" />
                  Analyze Impact
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Impact Analysis</CardTitle>
            <CardDescription>
              Comprehensive analysis of change impact and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Analyzing impact across systems...</p>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Overall Impact</span>
                    </div>
                    <div className={`text-2xl font-bold ${getRiskColor(analysis.overallImpact)}`}>
                      {analysis.overallImpact}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Risk Level</span>
                    </div>
                    <div className={`text-2xl font-bold ${getRiskColor(analysis.riskLevel)}`}>
                      {analysis.riskLevel}
                    </div>
                  </div>
                </div>

                {/* Affected Systems */}
                <div>
                  <h4 className="font-medium mb-3">Affected Systems</h4>
                  <div className="space-y-2">
                    {analysis.affectedSystems.map((system: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{system.name}</div>
                          <div className="text-xs text-muted-foreground">{system.impact} impact</div>
                        </div>
                        <Badge variant={getRiskBadgeVariant(system.risk)} className="text-xs">
                          {system.risk} Risk
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stakeholders */}
                <div>
                  <h4 className="font-medium mb-3">Stakeholder Impact</h4>
                  <div className="space-y-2">
                    {analysis.stakeholders.map((stakeholder: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{stakeholder.role}</div>
                            <div className="text-xs text-muted-foreground">{stakeholder.action}</div>
                          </div>
                        </div>
                        <Badge variant={getRiskBadgeVariant(stakeholder.impact)} className="text-xs">
                          {stakeholder.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-medium mb-3">Estimated Timeline</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold">{analysis.timeline.planning}</div>
                        <div className="text-xs text-muted-foreground">Planning</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.timeline.development}</div>
                        <div className="text-xs text-muted-foreground">Development</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.timeline.testing}</div>
                        <div className="text-xs text-muted-foreground">Testing</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{analysis.timeline.deployment}</div>
                        <div className="text-xs text-muted-foreground">Deployment</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-primary">{analysis.timeline.total}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Export Options */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save to Confluence
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Describe a change to analyze its impact</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
