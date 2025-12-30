import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Menu, X, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';

export default function StoryGenerator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('ai-storygenerator');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    text: '',
    client: 'StoryGenerator',
    mode: 'Young Adult',
    length: 'Novel',
    creative: 'High',
    language: 'en',
    syllable: { min: 2, max: 4 }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSyllableChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      syllable: {
        ...prev.syllable,
        [field]: numValue
      }
    }));
  };

  const validateForm = (): boolean => {
    setError('');

    if (!formData.text.trim()) {
      setError('❌ Text field wajib diisi!');
      return false;
    }

    if (!formData.creative.trim()) {
      setError('❌ Creative level wajib dipilih!');
      return false;
    }

    if (!formData.language.trim()) {
      setError('❌ Language wajib dipilih!');
      return false;
    }

    if (!formData.syllable || typeof formData.syllable.min !== 'number' || typeof formData.syllable.max !== 'number') {
      setError('❌ Syllable harus diisi dengan format yang benar!');
      return false;
    }

    if (formData.syllable.min < 1 || formData.syllable.max < 1) {
      setError('❌ Nilai syllable harus minimal 1!');
      return false;
    }

    if (formData.syllable.min > formData.syllable.max) {
      setError('❌ Min syllable tidak boleh lebih besar dari max!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setResult('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://host.optikl.ink/ai/storygenerator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (data.success && data.text) {
        setResult(data.text);
        setSuccess(true);
        setError('');
      } else {
        setError('❌ API response tidak valid. Cek kembali parameter yang dikirim.');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menghubungi API';
      setError(`❌ ${errorMsg}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D0D0D] border-b border-[#1F1F1F] z-40 flex items-center justify-between px-4">
        <span className="font-bold text-lg">OptikLink</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-muted-foreground hover:text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          activeId={activeId} 
          onSelect={(id) => {
            setActiveId(id);
            setMobileMenuOpen(false);
          }} 
          mobileOpen={mobileMenuOpen}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 h-screen overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
          
          {/* Header */}
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Story Generator</h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Create compelling short stories and novels with AI assistance
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl overflow-hidden">
            <div className="p-8 space-y-8">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="text" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Story Topic / Prompt <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Masukkan tema cerita atau prompt..."
                    className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50 rounded-lg p-4 text-foreground resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Contoh: "Seorang petualang menemukan harta karun di pulau terpencil"</p>
                </div>

                {/* Mode Selection */}
                <div className="space-y-2">
                  <Label htmlFor="mode" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Story Mode
                  </Label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={(e) => setFormData(prev => ({ ...prev, mode: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50 rounded-lg px-4 py-3 text-foreground"
                  >
                    <option>Young Adult</option>
                    <option>Fantasy</option>
                    <option>Romance</option>
                    <option>Mystery</option>
                    <option>Science Fiction</option>
                    <option>Horror</option>
                    <option>Drama</option>
                  </select>
                </div>

                {/* Length Selection */}
                <div className="space-y-2">
                  <Label htmlFor="length" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Length
                  </Label>
                  <select
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50 rounded-lg px-4 py-3 text-foreground"
                  >
                    <option>Short Story</option>
                    <option>Novel</option>
                    <option>Epic</option>
                  </select>
                </div>

                {/* Creative Level */}
                <div className="space-y-2">
                  <Label htmlFor="creative" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Creative Level <span className="text-red-400">*</span>
                  </Label>
                  <select
                    id="creative"
                    name="creative"
                    value={formData.creative}
                    onChange={(e) => setFormData(prev => ({ ...prev, creative: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50 rounded-lg px-4 py-3 text-foreground"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Maximum</option>
                  </select>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Language <span className="text-red-400">*</span>
                  </Label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50 rounded-lg px-4 py-3 text-foreground"
                  >
                    <option value="en">English</option>
                    <option value="id">Indonesian (Bahasa Indonesia)</option>
                    <option value="es">Spanish (Español)</option>
                    <option value="fr">French (Français)</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="ja">Japanese (日本語)</option>
                    <option value="zh">Chinese (中文)</option>
                  </select>
                </div>

                {/* Syllable Configuration */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Syllable Range <span className="text-red-400">*</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Min Syllable</label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.syllable.min}
                        onChange={(e) => handleSyllableChange('min', e.target.value)}
                        className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Max Syllable</label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.syllable.max}
                        onChange={(e) => handleSyllableChange('max', e.target.value)}
                        className="bg-[#1a1a1a] border border-[#2a2a2a] focus:border-primary/50"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Min dan Max harus diisi untuk mengontrol kompleksitas cerita</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg transition-all"
                  data-testid="button-generate-story"
                >
                  {loading ? '⏳ Generating Story...' : '✨ Generate Story'}
                </Button>
              </form>

              {/* Success Message & Result */}
              {success && result && (
                <div className="space-y-4 pt-8 border-t border-[#1f1f1f]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-sm font-semibold text-green-400">✅ Cerita berhasil digenerate!</p>
                  </div>
                  
                  <Card className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                        Generated Story
                      </h3>
                      <div className="prose prose-invert max-w-none text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {result}
                      </div>
                    </div>
                  </Card>

                  <Button
                    onClick={() => {
                      const textarea = document.createElement('textarea');
                      textarea.value = result;
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textarea);
                      alert('✅ Cerita disalin ke clipboard!');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    📋 Copy Story to Clipboard
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* API Documentation */}
          <div className="mt-12 p-6 bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl">
            <h3 className="text-lg font-semibold mb-4">📚 API Details</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div><strong className="text-foreground">Endpoint:</strong> POST /ai/storygenerator</div>
              <div><strong className="text-foreground">URL:</strong> https://host.optikl.ink/ai/storygenerator</div>
              <div><strong className="text-foreground">Content-Type:</strong> application/json</div>
              <div>
                <strong className="text-foreground">Required Parameters:</strong>
                <ul className="list-disc list-inside ml-2 mt-1">
                  <li>text (string) - Tema atau prompt cerita</li>
                  <li>creative (string) - Tingkat kreativitas</li>
                  <li>language (string) - Bahasa cerita</li>
                  <li>syllable (object) - {'{min: number, max: number}'}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
