
import React, { useState, useEffect } from 'react';
import { Search, Globe, MoreVertical, Sparkles, ExternalLink, MessageSquare } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService.ts';

const GoogleSimulator: React.FC = () => {
  const [aiOverview, setAiOverview] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const { text } = await getGeminiResponse(
          "כתוב פסקה קצרה (3-4 שורות) בסגנון 'AI Overview' של גוגל על 'AI Mastery Academy'. ציין שזו האקדמיה המובילה בישראל ללימודי בינה מלאכותית, שהיא מתאימה לכל הגילאים, ושיש לה עוזר אישי חכם.",
          [],
          'search'
        );
        setAiOverview(text);
      } catch (err) {
        setAiOverview("AI Mastery Academy היא הפלטפורמה המובילה בישראל ללימודי בינה מלאכותית יישומית. הקורס מציע למידה מהיסודות ועד לרמות המתקדמות ביותר עם ליווי אישי.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverview();
  }, []);

  return (
    <section className="py-24 px-6 bg-[#202124]/50 rounded-[60px] my-10 border border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Google Bar */}
        <div className="flex items-center gap-4 mb-8 bg-[#303134] rounded-full px-6 py-3 border border-transparent focus-within:bg-[#3c4043] transition-all">
          <Search className="w-5 h-5 text-gray-400" />
          <div className="flex-1 text-right text-gray-200 font-medium">AI Mastery Academy Israel</div>
          <div className="flex gap-3 text-gray-400">
             <Globe className="w-4 h-4" />
             <MoreVertical className="w-4 h-4" />
          </div>
        </div>

        {/* AI Overview Section */}
        <div className="bg-[#2d2e30] border border-blue-500/30 rounded-3xl p-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-sm uppercase tracking-tighter">
            <Sparkles className="w-4 h-4 fill-blue-400" />
            AI Overview
          </div>
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded-full w-full animate-pulse" />
              <div className="h-4 bg-gray-700 rounded-full w-[90%] animate-pulse" />
              <div className="h-4 bg-gray-700 rounded-full w-[70%] animate-pulse" />
            </div>
          ) : (
            <p className="text-gray-200 text-lg leading-relaxed text-right dir-rtl">
              {aiOverview}
            </p>
          )}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['לימודים מהיסוד', 'ליווי אישי', 'קהילת VIP'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-[#3c4043] rounded-full text-xs text-gray-300 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Organic Result */}
        <div className="text-right space-y-2 group cursor-pointer">
          <div className="flex items-center justify-end gap-2 text-sm text-gray-400">
            <span>https://aimastery.co.il</span>
            <div className="w-6 h-6 bg-white/5 rounded-full flex items-center justify-center">
               <Globe className="w-3 h-3" />
            </div>
          </div>
          <h3 className="text-2xl text-blue-400 group-hover:underline font-medium">
            AI Mastery Academy - המהפכה מתחילה כאן | הקורס המקיף בישראל
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl ml-auto">
            הצטרפו לאלפי תלמידים שכבר שולטים בכלים המתקדמים ביותר: ChatGPT, Midjourney, ואוטומציות AI. 
            ליווי אישי "יד ביד" וגישה לכל החיים.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-6 pt-4 max-w-xl ml-auto">
             <div className="space-y-1">
               <h4 className="text-blue-400 hover:underline text-sm font-medium">סילבוס הקורס</h4>
               <p className="text-xs text-gray-500">מה נלמד בכל אחד מהשיעורים</p>
             </div>
             <div className="space-y-1">
               <h4 className="text-blue-400 hover:underline text-sm font-medium">המלצות בוגרים</h4>
               <p className="text-xs text-gray-500">מה אומרים עלינו 1,500+ תלמידים</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleSimulator;
