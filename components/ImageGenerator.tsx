
import React, { useState } from 'react';
import { ImageIcon, Sparkles, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { generateAIImage } from '../services/geminiService.ts';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateAIImage(prompt);
      setImage(imageUrl);
    } catch (err) {
      setError("נכשלנו ביצירת התמונה. נסו פרומפט אחר או בדקו חיבור.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto glass rounded-[40px] p-8 md:p-12 border border-purple-500/20 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        <div className="flex flex-col md:flex-row gap-12 text-right">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-3xl font-black mb-6 flex items-center justify-end gap-3">
              דמיינו את זה - ה-AI יבצע
              <ImageIcon className="w-8 h-8 text-purple-400" />
            </h2>
            <p className="text-gray-400 mb-8">
              בקורס נלמד איך לגרום למכונה ליצור עבורנו אמנות. נסו עכשיו: כתבו תיאור של תמונה בעברית או אנגלית.
            </p>
            
            <div className="space-y-4">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="למשל: רובוט עתידני מצייר על קנבס בשקיעה..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 min-h-[120px] outline-none focus:border-purple-500 transition-all text-right"
              />
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                {isLoading ? 'יוצר את הקסם...' : 'צור תמונה עכשיו'}
              </button>
              {error && <p className="text-red-400 text-sm flex items-center justify-end gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
            </div>
          </div>

          <div className="flex-1 order-1 md:order-2">
            <div className="aspect-square glass rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
              {image ? (
                <>
                  <img src={image} alt="AI Generated" className="w-full h-full object-cover animate-in fade-in duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={image} download="ai-mastery-art.png" className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform">
                      <Download className="w-6 h-6" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <ImageIcon className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-sm">התמונה שלכם תופיע כאן</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;
