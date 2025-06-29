
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Code, Download, Save, Copy, RefreshCw } from "lucide-react";

export function CodeAssistantPage() {
  const [selectedPage, setSelectedPage] = useState("");
  const [modificationPrompt, setModificationPrompt] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [modifiedCode, setModifiedCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const codePages = [
    "API Endpoints Documentation",
    "Frontend Components",
    "Backend Services",
    "Database Schemas",
    "Configuration Files",
    "Build Scripts"
  ];

  const languages = [
    "JavaScript",
    "TypeScript", 
    "Python",
    "Java",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby"
  ];

  const handleLoadCode = () => {
    if (!selectedPage) return;
    
    // Simulate loading code from selected page
    setOriginalCode(`// Original code from: ${selectedPage}
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserComponent;`);
  };

  const handleModifyCode = () => {
    if (!modificationPrompt.trim() || !originalCode) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setModifiedCode(`// Modified code based on: "${modificationPrompt}"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const UserComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  if (loading) {
    return <div className="spinner">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleRefresh}>Retry</button>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className="header">
        <h2>User Management</h2>
        <button onClick={handleRefresh} className="refresh-btn">
          <RefreshIcon /> Refresh
        </button>
      </div>
      
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p className="email">{user.email}</p>
            <span className={\`status \${user.status}\`}>
              {user.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComponent;`);
      setIsProcessing(false);
    }, 2000);
  };

  const handleLanguageConvert = () => {
    if (!selectedLanguage || !originalCode) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      let convertedCode = "";
      
      switch (selectedLanguage) {
        case "Python":
          convertedCode = `# Converted to Python
import requests
from typing import List, Dict, Optional
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str
    email: str
    status: str = "active"

class UserService:
    def __init__(self):
        self.users: List[User] = []
        self.loading = False
        self.error: Optional[str] = None
    
    async def fetch_users(self):
        """Fetch users from API"""
        try:
            self.loading = True
            self.error = None
            
            response = requests.get('/api/users')
            response.raise_for_status()
            
            user_data = response.json()
            self.users = [User(**user) for user in user_data]
            
        except requests.RequestException as e:
            self.error = f"Failed to load users: {str(e)}"
        finally:
            self.loading = False
    
    def refresh(self):
        """Refresh user data"""
        return self.fetch_users()`;
          break;
          
        case "Java":
          convertedCode = `// Converted to Java
import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class User {
    private int id;
    private String name;
    private String email;
    private String status;
    
    // Constructors, getters, setters
    public User(int id, String name, String email, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = status;
    }
    
    // Getters and setters omitted for brevity
}

public class UserService {
    private List<User> users = new ArrayList<>();
    private boolean loading = false;
    private String error = null;
    
    public CompletableFuture<Void> fetchUsers() {
        return CompletableFuture.runAsync(() -> {
            try {
                loading = true;
                error = null;
                
                // HTTP client call would go here
                // users = httpClient.get("/api/users");
                
            } catch (Exception e) {
                error = "Failed to load users: " + e.getMessage();
            } finally {
                loading = false;
            }
        });
    }
    
    public void refresh() {
        fetchUsers();
    }
}`;
          break;
          
        default:
          convertedCode = "Language conversion not implemented for " + selectedLanguage;
      }
      
      setModifiedCode(convertedCode);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Code Assistant</h1>
        <p className="text-slate-600">AI-powered code analysis, modification, and language conversion.</p>
      </div>

      {/* Code Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Code Page</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose page with code" />
                </SelectTrigger>
                <SelectContent>
                  {codePages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleLoadCode} disabled={!selectedPage}>
            Load Code
          </Button>
        </CardContent>
      </Card>

      {/* Code Modification */}
      {originalCode && (
        <Card>
          <CardHeader>
            <CardTitle>Code Modification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Modification Instructions</Label>
              <Textarea
                placeholder="Describe what changes you want to make... e.g., 'Add error handling and loading states', 'Convert to use hooks', 'Add TypeScript types'"
                value={modificationPrompt}
                onChange={(e) => setModificationPrompt(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <Button 
              onClick={handleModifyCode}
              disabled={!modificationPrompt.trim() || isProcessing}
            >
              {isProcessing ? "Modifying Code..." : "Apply Modifications"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Language Converter */}
      {originalCode && (
        <Card>
          <CardHeader>
            <CardTitle>Language Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Convert to Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleLanguageConvert}
              disabled={!selectedLanguage || isProcessing}
            >
              {isProcessing ? "Converting..." : "Convert Language"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Code Viewer */}
      {originalCode && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Original Code
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                <pre className="text-sm font-mono">
                  <code>{originalCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {modifiedCode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Modified Code
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="text-sm font-mono">
                    <code>{modifiedCode}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Export Options */}
      {modifiedCode && (
        <Card>
          <CardHeader>
            <CardTitle>Export & Save</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Code
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Diff
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Save to Confluence</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Page title for modified code"
                    className="flex-1"
                  />
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Code
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
