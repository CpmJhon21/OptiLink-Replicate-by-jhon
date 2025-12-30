import { useState } from 'react';
import { apiEndpoints } from '@/lib/api-data';
import { cn } from '@/lib/utils';
import { ChevronRight, Search, Zap, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  mobileOpen?: boolean;
}

export function Sidebar({ activeId, onSelect, className, mobileOpen }: SidebarProps) {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    AI: true,
    Downloader: true,
    Tools: true,
    Music: true,
    Search: true,
    Movie: true,
    Server: true,
  });

  const categories = ["AI", "Downloader", "Tools", "Music", "Search", "Movie", "Server"] as const;

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredEndpoints = apiEndpoints.filter(ep => 
    ep.path.toLowerCase().includes(search.toLowerCase()) || 
    ep.description.toLowerCase().includes(search.toLowerCase()) ||
    ep.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className={cn(
      "bg-[#0D0D0D] border-r border-[#1F1F1F] h-screen flex flex-col transition-all duration-300 z-50",
      className
    )}>
      {/* Brand */}
      <div className="p-6 border-b border-[#1F1F1F] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">OptikLink</h1>
          <p className="text-xs text-muted-foreground">API Documentation</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search endpoints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161616] border border-[#2A2A2A] rounded-lg py-2 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6 scrollbar-thin">
        
        {/* Story Generator Tool */}
        <div>
          <button
            onClick={() => setLocation('/story-generator')}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2.5 group",
              "bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15"
            )}
            data-testid="button-story-generator-nav"
          >
            <Wand2 className="w-4 h-4" />
            <span>Story Generator</span>
          </button>
        </div>

        <div className="h-px bg-[#1F1F1F]"></div>

        {categories.map((category) => {
          const categoryEndpoints = filteredEndpoints.filter(ep => ep.category === category);
          if (categoryEndpoints.length === 0) return null;

          return (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center w-full text-left mb-2 group"
              >
                <ChevronRight 
                  className={cn(
                    "w-4 h-4 mr-2 text-muted-foreground transition-transform duration-200",
                    expandedCategories[category] && "rotate-90"
                  )} 
                />
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {category}
                </span>
                <span className="ml-auto text-xs bg-[#1F1F1F] text-muted-foreground px-2 py-0.5 rounded-full">
                  {categoryEndpoints.length}
                </span>
              </button>

              <AnimatePresence>
                {expandedCategories[category] && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1 ml-2 border-l border-[#1F1F1F] pl-2 overflow-hidden"
                  >
                    {categoryEndpoints.map((ep) => (
                      <li key={ep.id}>
                        <button
                          onClick={() => onSelect(ep.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center justify-between group",
                            activeId === ep.id 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:text-foreground hover:bg-[#161616]"
                          )}
                        >
                          <span className="truncate">{ep.path.split('/').pop()}</span>
                          <span className={cn(
                            "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border opacity-70 group-hover:opacity-100",
                            ep.method === 'GET' 
                              ? "border-green-500/30 text-green-400 bg-green-500/10"
                              : "border-blue-500/30 text-blue-400 bg-blue-500/10"
                          )}>
                            {ep.method}
                          </span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#1F1F1F] text-xs text-muted-foreground">
        <div className="flex justify-between items-center mb-2">
          <span>Server Status</span>
          <span className="flex items-center gap-1.5 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Online
          </span>
        </div>
        <p>© 2024 OptikLink API</p>
      </div>
    </aside>
  );
}
