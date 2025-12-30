import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { EndpointCard } from '@/components/EndpointCard';
import { apiEndpoints } from '@/lib/api-data';
import { Menu, X, Github } from 'lucide-react';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import logoImage from '@assets/generated_images/optiklink_logo_neon_green_geometric.png';

export default function Docs() {
  const [activeEndpointId, setActiveEndpointId] = useState(apiEndpoints[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to active endpoint when changed via sidebar
  useEffect(() => {
    const element = document.getElementById(activeEndpointId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeEndpointId]);

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D0D0D] border-b border-[#1F1F1F] z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="OptikLink" className="h-10 w-10" />
          <span className="font-bold text-lg">OptikLink</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-muted-foreground hover:text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar - Desktop Fixed, Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          activeId={activeEndpointId} 
          onSelect={(id) => {
            setActiveEndpointId(id);
            setMobileMenuOpen(false);
          }} 
          mobileOpen={mobileMenuOpen}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 h-screen overflow-y-auto pt-16 lg:pt-0 scroll-smooth">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
          
          {/* Hero Section */}
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              API Documentation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Explore our comprehensive suite of APIs for AI generation, media downloading, and utility tools. 
              Simple, fast, and developer-friendly.
            </p>
            <div className="flex flex-col items-center gap-4 pt-6">
              <a href="https://github.com/CpmJhon21" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-xs font-medium transition-colors">
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              
              <div className="flex gap-2 flex-wrap justify-center">
                <a href="https://instagram.com/cpm_jhon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-xs font-medium transition-colors">
                  <SiInstagram className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
                
                <a href="https://tiktok.com/@cpm_jhon21" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-xs font-medium transition-colors">
                  <SiTiktok className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">TikTok</span>
                </a>
                
                <a href="https://whatsapp.com/channel/0029VaLiUSS5q08hPj5mcH0m" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-xs font-medium transition-colors">
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent mb-12"></div>

          {/* Endpoints List */}
          <div className="space-y-16 pb-24">
            {["AI", "Downloader", "Tools", "Music", "Search", "Movie", "Server"].map((category) => {
              const categoryEndpoints = apiEndpoints.filter(ep => ep.category === category);
              if (categoryEndpoints.length === 0) return null;

              return (
                <section key={category} id={category.toLowerCase()} className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{category} Endpoints</h2>
                    <div className="h-px flex-1 bg-[#1f1f1f]"></div>
                  </div>
                  <div className="space-y-4">
                    {categoryEndpoints.map((endpoint) => (
                      <div key={endpoint.id} id={endpoint.id} className="scroll-mt-32">
                        <EndpointCard endpoint={endpoint} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
