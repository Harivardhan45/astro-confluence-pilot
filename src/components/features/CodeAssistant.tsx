
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Download, Save, FileText, Play, Copy } from "lucide-react";

export function CodeAssistant() {
  const [selectedCodePage, setSelectedCodePage] = useState("");
  const [modification, setModification] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [results, setResults] = useState<any>(null);

  const codePages = [
    {
      id: "auth-service",
      title: "Authentication Service",
      language: "JavaScript",
      description: "User authentication and JWT token management",
      lastUpdated: "2 days ago"
    },
    {
      id: "api-routes",
      title: "API Route Handlers",
      language: "Node.js",
      description: "RESTful API endpoints and middleware",
      lastUpdated: "1 day ago"
    },
    {
      id: "user-model",
      title: "User Data Model",
      language: "Python",
      description: "Database models and ORM configurations",
      lastUpdated: "3 days ago"
    },
    {
      id: "frontend-utils",
      title: "Frontend Utilities",
      language: "TypeScript",
      description: "Common utility functions and helpers",
      lastUpdated: "1 week ago"
    }
  ];

  const originalCode = `// Authentication Service - JavaScript
class AuthService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = '24h';
  }

  async generateToken(payload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn
    });
  }

  async verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}

module.exports = AuthService;`;

  const modifiedCode = `// Authentication Service - TypeScript (Converted)
interface AuthPayload {
  userId: string;
  email: string;
  role: string;
}

interface AuthConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

class AuthService {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async generateToken(payload: AuthPayload): Promise<string> {
    return jwt.sign(payload, this.config.secret, {
      expiresIn: this.config.expiresIn
    });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, this.config.secret, {
      expiresIn: this.config.refreshExpiresIn
    });
  }

  async verifyToken(token: string): Promise<AuthPayload> {
    try {
      return jwt.verify(token, this.config.secret) as AuthPayload;
    } catch (error) {
      throw new Error(\`Token verification failed: \${error.message}\`);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12; // Enhanced security
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default AuthService;`;

  const handleProcess = () => {
    if (!selectedCodePage) return;
    
    setResults({
      original: originalCode,
      modified: modifiedCode,
      changes: [
        "Converted from JavaScript to TypeScript",
        "Added type interfaces for better type safety",
        "Enhanced error handling with detailed messages",
        "Added password comparison method",
        "Increased salt rounds for better security",
        "Made configuration injectable via constructor"
      ],
      summary: "Successfully converted the JavaScript authentication service to TypeScript with enhanced type safety, improved error handling, and additional security features."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Code Assistant</h1>
        <p className="text-muted-foreground">
          View, modify, and convert code from your Confluence pages with AI assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Code Configuration</CardTitle>
            <CardDescription>Select code and specify modifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="code-page">Code Page</Label>
              <Select value={selectedCodePage} onValueChange={setSelectedCodePage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select code page" />
                </SelectTrigger>
                <SelectContent>
                  {codePages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCodePage && (
                <div className="mt-2 p-2 bg-muted rounded text-xs">
                  {codePages.find(p => p.id === selectedCodePage)?.description}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="modification">Describe Modifications</Label>
              <Textarea
                id="modification"
                placeholder="e.g., Add error handling, optimize performance, add logging..."
                value={modification}
                onChange={(e) => setModification(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="target-language">Convert To (Optional)</Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Keep original language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleProcess} 
              disabled={!selectedCodePage}
              className="w-full"
            >
              <Code className="mr-2 h-4 w-4" />
              Process Code
            </Button>
          </CardContent>
        </Card>

        {/* Code Preview and Results */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Code Preview & Results</CardTitle>
            <CardDescription>
              Original code and AI-generated modifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
                  <TabsTrigger value="original">Original</TabsTrigger>
                  <TabsTrigger value="modified">Modified</TabsTrigger>
                </TabsList>
                
                <TabsContent value="comparison" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Original Code */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Original Code</Badge>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-96">
                        <code>{results.original}</code>
                      </pre>
                    </div>
                    
                    {/* Modified Code */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default">Modified Code</Badge>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3 rounded text-xs overflow-auto max-h-96">
                        <code>{results.modified}</code>
                      </pre>
                    </div>
                  </div>
                  
                  {/* Changes Summary */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Changes Made</h4>
                    <ul className="space-y-1">
                      {results.changes.map((change: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Summary</h4>
                    <p className="text-sm">{results.summary}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="original">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Original Code</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="bg-muted p-4 rounded overflow-auto max-h-96">
                      <code>{results.original}</code>
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="modified">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="default">Modified Code</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <pre className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded overflow-auto max-h-96">
                      <code>{results.modified}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a code page and describe modifications to get started</p>
              </div>
            )}
            
            {results && (
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Ready for Export</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Code
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
