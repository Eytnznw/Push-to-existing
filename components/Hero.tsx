
import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-sm font-medium text-purple-300 mb-8">
          <Sparkles className="w-4 h-4" />
          <span>הצטרפו למהפכה הדיגיטלית של 2024</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          תפסיקו להסתכל על הבינה המלאכותית,<br />
          <span className="gradient-text">תתחילו לשלוט בה.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          הקורס המקיף ביותר בישראל ללימוד AI. מהיסודות ועד לפיתוח מערכות אוטונומיות. 
          אל תשארו מאחור בעולם החדש.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 group">
            להרשמה לקורס המלא
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <a href="#modules" className="w-full sm:w-auto glass hover:bg-white/10 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all">
            לצפייה בסילבוס
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'תלמידים מרוצים', value: '1,500+' },
            { label: 'שעות לימוד', value: '20+' },
            { label: 'פרויקטים מעשיים', value: '12' },
            { label: 'דירוג ממוצע', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
