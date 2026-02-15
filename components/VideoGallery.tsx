
import React from 'react';
import { Youtube, ExternalLink, PlayCircle } from 'lucide-react';

const FEATURED_VIDEOS = [
  { id: '1', title: 'מה זה בינה מלאכותית ב-5 דקות', provider: 'YouTube', url: 'https://www.youtube.com/results?search_query=what+is+ai+hebrew' },
  { id: '2', title: 'איך להשתמש ב-ChatGPT למתחילים', provider: 'YouTube', url: 'https://www.youtube.com/results?search_query=chatgpt+tutorial+hebrew' },
  { id: '3', title: 'יצירת תמונות מרהיבות ב-AI', provider: 'YouTube', url: 'https://www.youtube.com/results?search_query=midjourney+tutorial+hebrew' }
];

const VideoGallery: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-red-500/20 rounded-2xl">
            <Youtube className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">מרכז הלמידה החזותי</h2>
            <p className="text-gray-400">סרטונים נבחרים ועדכניים מהרשת שילמדו אתכם הכל.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_VIDEOS.map((video) => (
            <div key={video.id} className="glass group rounded-3xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-all">
              <div className="aspect-video bg-gray-800 relative flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${video.id}/400/225?grayscale`} 
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500" 
                  alt={video.title} 
                />
                <PlayCircle className="absolute w-16 h-16 text-white/80 group-hover:text-red-500 transition-colors z-10" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500 font-bold uppercase">{video.provider}</span>
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold text-sm"
                  >
                    לצפייה עכשיו
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
