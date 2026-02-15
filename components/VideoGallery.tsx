
import React from 'react';
import { Youtube, ExternalLink, PlayCircle, Sparkles } from 'lucide-react';

const FEATURED_VIDEOS = [
  { id: '1', title: 'מה זה בינה מלאכותית ב-5 דקות', provider: 'YouTube', url: 'https://www.youtube.com/results?search_query=what+is+ai+hebrew' },
  { id: '2', title: 'איך להשתמש ב-ChatGPT למתחילים', provider: 'YouTube', url: 'https://www.youtube.com/results?search_query=chatgpt+tutorial+hebrew' },
  { id: '3', title: 'יצירת תמונות מרהיבות ב-AI', provider: 'YouTube', url: 'https://www.youtube.com/results?search_query=midjourney+tutorial+hebrew' }
];

const VideoGallery: React.FC = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold mb-4 uppercase tracking-widest">
              <Youtube className="w-3 h-3" /> מרכז הלמידה החזותי
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">ללמוד דרך העיניים</h2>
            <p className="text-gray-400 text-lg max-w-2xl">ריכזנו עבורכם את הסרטונים הטובים ביותר ברשת כדי שתוכלו להתחיל ליישם כבר היום.</p>
          </div>
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold transition-colors">
            לכל הסרטונים ביוטיוב
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {FEATURED_VIDEOS.map((video) => (
            <div key={video.id} className="group relative glass rounded-[40px] overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-500 shadow-xl">
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/ai-vid-${video.id}/800/450?blur=2`} 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700" 
                  alt={video.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <PlayCircle className="absolute w-20 h-20 text-white/20 group-hover:text-red-500 group-hover:scale-110 transition-all z-10" />
              </div>
              <div className="p-8 text-right">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">{video.provider}</span>
                <h3 className="text-2xl font-bold mb-6 group-hover:text-white transition-colors leading-tight">{video.title}</h3>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/5 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-2xl transition-all text-sm group-hover:shadow-lg group-hover:shadow-red-500/20"
                >
                  לצפייה עכשיו
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
