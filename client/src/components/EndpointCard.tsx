import { useState } from 'react';
import { Endpoint } from '@/lib/api-data';
import { cn } from '@/lib/utils';
import { ChevronDown, Copy, Play, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestEndpoint } from '@/hooks/use-test-endpoint';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EndpointCardProps {
  endpoint: Endpoint;
}

type CodeLanguage = 'curl' | 'javascript' | 'python' | 'java';

export function EndpointCard({ endpoint }: EndpointCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('curl');
  const { response, isLoading, isOpen: testOpen, setIsOpen: setTestOpen, testEndpoint } = useTestEndpoint();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getParameterType = (): string => {
    if (endpoint.params.length === 0) return '';
    if (endpoint.method === 'GET') return 'Query Parameters';
    if (endpoint.params.some(p => p.type === 'file')) return 'Form Data';
    return 'Body Parameters';
  };

  const codeExample = generateCodeExample(endpoint, selectedLanguage);
  const paramType = getParameterType();

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl overflow-hidden hover:border-[#333] transition-colors mb-6 shadow-sm">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer flex items-center gap-4 bg-[#141414] hover:bg-[#1a1a1a] transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={cn(
          "px-3 py-1 rounded-md text-xs font-bold border",
          endpoint.method === 'GET' 
            ? "border-green-500/20 bg-green-500/10 text-green-400" 
            : "border-blue-500/20 bg-blue-500/10 text-blue-400"
        )}>
          {endpoint.method}
        </div>
        
        <code className="text-sm font-mono text-foreground/90 flex-1">{endpoint.path}</code>
        
        <div className="hidden sm:flex items-center text-xs text-muted-foreground gap-4">
          <span>{endpoint.description}</span>
        </div>

        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-[#1f1f1f] space-y-8">
              {/* Description (Mobile only view) */}
              <div className="sm:hidden text-sm text-muted-foreground">
                {endpoint.description}
              </div>

              {/* Parameters */}
              {endpoint.params.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px] opacity-70">
                    {paramType}
                  </h3>
                  <div className="bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#141414] text-xs text-muted-foreground border-b border-[#1f1f1f]">
                        <tr>
                          <th className="px-4 py-3 font-medium">Name</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                          <th className="px-4 py-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1f1f1f]">
                        {endpoint.params.map((param) => (
                          <tr key={param.name} className="hover:bg-[#111]">
                            <td className="px-4 py-3 font-mono text-primary/90">
                              {param.name}
                              {param.required && <span className="ml-2 text-[10px] text-red-400 font-sans">*</span>}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground italic text-xs">{param.type}</td>
                            <td className="px-4 py-3 text-muted-foreground">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Example Request */}
              <div className="space-y-8">
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-[11px] opacity-70">Example Code</h3>
                    <div className="flex gap-2 text-xs overflow-x-auto pb-2 sm:pb-0">
                      <button 
                        onClick={() => setSelectedLanguage('curl')}
                        className={cn(
                          "px-2.5 sm:px-3 py-1.5 rounded transition-all font-medium whitespace-nowrap flex-shrink-0",
                          selectedLanguage === 'curl' 
                            ? "bg-primary/20 text-primary border border-primary/30 shadow-md" 
                            : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground"
                        )}
                        data-testid="button-code-curl"
                      >
                        cURL
                      </button>
                      <button 
                        onClick={() => setSelectedLanguage('javascript')}
                        className={cn(
                          "px-2.5 sm:px-3 py-1.5 rounded transition-all font-medium whitespace-nowrap flex-shrink-0",
                          selectedLanguage === 'javascript' 
                            ? "bg-primary/20 text-primary border border-primary/30 shadow-md" 
                            : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground"
                        )}
                        data-testid="button-code-js"
                      >
                        JS
                      </button>
                      <button 
                        onClick={() => setSelectedLanguage('python')}
                        className={cn(
                          "px-2.5 sm:px-3 py-1.5 rounded transition-all font-medium whitespace-nowrap flex-shrink-0",
                          selectedLanguage === 'python' 
                            ? "bg-primary/20 text-primary border border-primary/30 shadow-md" 
                            : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground"
                        )}
                        data-testid="button-code-python"
                      >
                        Python
                      </button>
                      <button 
                        onClick={() => setSelectedLanguage('java')}
                        className={cn(
                          "px-2.5 sm:px-3 py-1.5 rounded transition-all font-medium whitespace-nowrap flex-shrink-0",
                          selectedLanguage === 'java' 
                            ? "bg-primary/20 text-primary border border-primary/30 shadow-md" 
                            : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground"
                        )}
                        data-testid="button-code-java"
                      >
                        Java
                      </button>
                    </div>
                  </div>
                  <div className="relative group rounded-lg overflow-hidden">
                    <pre className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 sm:p-6 text-[11px] sm:text-xs font-mono text-muted-foreground overflow-x-auto overflow-y-auto whitespace-pre max-h-[400px] leading-relaxed scrollbar-thin">
                      <code>{codeExample}</code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard(codeExample)}
                      className="absolute top-3 right-3 p-2 bg-[#1f1f1f] rounded hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100 z-10"
                      data-testid="button-copy-code"
                      title="Copy code"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-[11px] opacity-70">Sample Response</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">200 OK</span>
                  </div>
                  <div className="relative group rounded-lg overflow-hidden">
                    <pre className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 sm:p-6 text-[11px] sm:text-xs font-mono text-green-400/80 overflow-x-auto overflow-y-auto whitespace-pre min-h-[180px] leading-relaxed scrollbar-thin">
                      <code>{endpoint.response}</code>
                    </pre>
                  </div>
                </section>
              </div>

              {/* Try It Out Action */}
              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => testEndpoint(endpoint)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-black text-sm font-bold rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                  data-testid="button-test-endpoint"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isLoading ? "Testing..." : "Test Endpoint"}
                </button>
              </div>

              {/* Test Response Modal */}
              <Dialog open={testOpen} onOpenChange={setTestOpen}>
                <DialogContent className="sm:max-w-[600px] bg-[#1a1a1a] border-[#333] text-foreground max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span className={cn(
                        "px-3 py-1 rounded-md text-xs font-bold border",
                        response?.status && response.status < 400
                          ? "border-green-500/20 bg-green-500/10 text-green-400"
                          : "border-red-500/20 bg-red-500/10 text-red-400"
                      )}>
                        {response?.status || "Error"}
                      </span>
                      <span>{endpoint.method} {endpoint.path}</span>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {response?.error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {response.error}
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-foreground/90">Response Body</h4>
                      <div className="rounded-lg overflow-hidden">
                        <pre className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 text-xs font-mono text-green-400/80 overflow-x-auto whitespace-pre max-h-[300px] overflow-y-auto leading-relaxed scrollbar-thin">
                          <code>{typeof response?.body === 'string' ? response.body : JSON.stringify(response?.body || {}, null, 2)}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button 
                        onClick={() => setTestOpen(false)}
                        className="px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded text-foreground text-sm transition-colors"
                        data-testid="button-close-modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function generateCodeExample(endpoint: Endpoint, language: CodeLanguage): string {
  // Use pre-defined examples from endpoint data
  if (language === 'curl') {
    return 'curlExample' in endpoint ? (endpoint as any).curlExample : '';
  }
  if (language === 'javascript') {
    return 'jsExample' in endpoint ? (endpoint as any).jsExample : '';
  }
  
  // Generate for other languages
  const hasFile = endpoint.params.some(p => p.type === 'file');

  if (language === 'python') {
    if (endpoint.method === 'GET') {
      const query = endpoint.params.map(p => `'${p.name}': 'value'`).join(', ');
      return `import requests

params = {${query}}
response = requests.get('https://host.optikl.ink${endpoint.path}', params=params)
print(response.json())`;
    } else if (hasFile) {
      return `import requests

files = {'file': open('/path/to/file', 'rb')}
response = requests.post('https://host.optikl.ink${endpoint.path}', files=files)
print(response.json())`;
    } else {
      const body = endpoint.params.reduce((acc, curr) => ({ ...acc, [curr.name]: "value" }), {});
      return `import requests
import json

data = ${JSON.stringify(body, null, 2)}
response = requests.post('https://host.optikl.ink${endpoint.path}', json=data)
print(response.json())`;
    }
  }

  if (language === 'java') {
    if (endpoint.method === 'GET') {
      const query = endpoint.params.map(p => `${p.name}=value`).join('&');
      return `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://host.optikl.ink${endpoint.path}${query ? '?' + query : ''}"))
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`;
    } else if (hasFile) {
      return `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://host.optikl.ink${endpoint.path}"))
    .POST(HttpRequest.BodyPublishers.ofFile(Paths.get("/path/to/file")))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`;
    } else {
      const body = endpoint.params.reduce((acc, curr) => ({ ...acc, [curr.name]: "value" }), {});
      return `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

HttpClient client = HttpClient.newHttpClient();
String json = "${JSON.stringify(body).replace(/"/g, '\\"')}";

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://host.optikl.ink${endpoint.path}"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`;
    }
  }

  return '';
}
