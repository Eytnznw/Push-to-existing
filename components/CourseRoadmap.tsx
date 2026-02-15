
import React from 'react';
import { Flag, Rocket, ShieldCheck, Trophy, Target } from 'lucide-react';

const STEPS = [
  { title: 'הצעד הראשון', desc: 'הבנת מושגי יסוד ופתיחת חשבונות', icon: Rocket, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'שליטה בשיחה', desc: 'כתיבת פרומפטים מורכבים ותקשורת עם המכונה', icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'ארגז הכלים', desc: 'שימוש ב-AI ליצירת תוכן, תמונות וסרטונים', icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-500/10' },
  { title: 'הפרויקט הסופי', desc: 'בניית עוזר אישי או אוטומיזציה מלאה', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
];

const CourseRoadmap: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">מסלול ההמראה שלך</h2>
          <p className="text-gray-400 text-lg">אנחנו נלווה אותך שלב אחר שלב עד שתהפוך למאסטר.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 hidden md:block" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`w-20 h-20 ${step.bg} rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-all duration-500 shadow-xl`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <div className="glass p-6 rounded-3xl border border-white/5 w-full">
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseRoadmap;
