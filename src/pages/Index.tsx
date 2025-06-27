
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarLauncher } from "@/components/features/SidebarLauncher";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="confluence-ai-theme">
      <div className="min-h-screen w-full bg-background">
        {/* Main Content Area - simulating a Confluence page */}
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Confluence Page Example</h1>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              This is a sample Confluence page to demonstrate the AI Assistant sidebar. 
              The sidebar is fixed to the right edge and can be collapsed or expanded.
            </p>
            <p className="text-gray-700 mb-4">
              Click on the AI Assistant button in the top-right corner or use the sidebar 
              to access various AI-powered features including search, video summarization, 
              code assistance, impact analysis, and testing support.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Note:</strong> The sidebar starts in collapsed mode showing only icons. 
                Click any feature to expand the panel and access the full interface.
              </p>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Sample Content</h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Feature 1: AI-powered search across all Confluence content</li>
              <li>Feature 2: Video content summarization and key points extraction</li>
              <li>Feature 3: Code assistance with syntax highlighting and suggestions</li>
              <li>Feature 4: Impact analysis for changes and updates</li>
              <li>Feature 5: Testing support and automation guidance</li>
            </ul>
          </div>
        </div>
        
        <SidebarLauncher />
      </div>
    </ThemeProvider>
  );
};

export default Index;
