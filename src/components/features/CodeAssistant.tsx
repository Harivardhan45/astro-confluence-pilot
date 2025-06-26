
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Edit, Eye, Download, Copy, FileText, GitBranch } from "lucide-react";

export function CodeAssistant() {
  const [selectedFile, setSelectedFile] = useState("auth.js");

  const codeFiles = [
    {
      name: "auth.js",
      path: "/src/utils/auth.js",
      language: "javascript",
      size: "2.3 KB",
      lastModified: "2 hours ago",
      description: "Authentication utilities and helper functions"
    },
    {
      name: "api-config.json",
      path: "/config/api-config.json",
      language: "json", 
      size: "1.1 KB",
      lastModified: "1 day ago",
      description: "API endpoint configurations and settings"
    },
    {
      name: "user-service.py",
      path: "/services/user-service.py",
      language: "python",
      size: "4.7 KB",
      lastModified: "3 days ago",
      description: "User management service with CRUD operations"
    }
  ];

  const sampleCode = `// Authentication utility functions
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthService {
  constructor() {
    this.secret = process.env.JWT_SECRET || 'default-secret';
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new Error('Password hashing failed');
    }
  }

  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '24h' });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export default AuthService;`;

  const aiSuggestions = [
    {
      type: "optimization",
      title: "Use environment variable validation",
      description: "Add validation for JWT_SECRET to prevent using default value in production",
      priority: "high"
    },
    {
      type: "security",
      title: "Implement rate limiting",
      description: "Add rate limiting for authentication attempts to prevent brute force attacks",
      priority: "medium"
    },
    {
      type: "improvement", 
      title: "Add logging",
      description: "Include structured logging for authentication events for better monitoring",
      priority: "low"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Code Assistant</h1>
        <p className="text-muted-foreground">
          View, analyze, and get AI-powered suggestions for your Confluence code snippets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Browser */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Code Files</CardTitle>
            <CardDescription>
              Browse and select code from your Confluence pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {codeFiles.map((file) => (
                <div
                  key={file.name}
                  onClick={() => setSelectedFile(file.name)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                    selectedFile === file.name ? 'bg-accent border-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{file.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {file.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {file.language}
                    </Badge>
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.lastModified}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Viewer and Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{selectedFile}</CardTitle>
                <CardDescription>
                  /src/utils/{selectedFile}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="code">Code View</TabsTrigger>
                <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
                <TabsTrigger value="documentation">Docs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{sampleCode}</code>
                  </pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Changes
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions" className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <Badge 
                          variant={
                            suggestion.priority === 'high' ? 'destructive' :
                            suggestion.priority === 'medium' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="documentation" className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Function: hashPassword</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Hashes a plain text password using bcrypt with configurable salt rounds.
                    </p>
                    <div className="text-sm">
                      <strong>Parameters:</strong> password (string) - Plain text password to hash
                    </div>
                    <div className="text-sm">
                      <strong>Returns:</strong> Promise&lt;string&gt; - Hashed password
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Function: generateToken</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Creates a JWT token with the provided payload and 24-hour expiration.
                    </p>
                    <div className="text-sm">
                      <strong>Parameters:</strong> payload (object) - Data to encode in token
                    </div>
                    <div className="text-sm">
                      <strong>Returns:</strong> string - Signed JWT token
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
