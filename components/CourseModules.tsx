
import React from 'react';
import { Brain, Code, Layers, MessageSquare, Zap, Clock } from 'lucide-react';
import { COURSE_MODULES } from '../constants';

const IconMap: Record<string, any> = {
  Brain, Code, Layers, MessageSquare, Zap
};

const CourseModules: React.FC = () => {
  return (
    <section id="modules" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">מה נלמד בקורס?</h2>
          <p className="text-gray-400">תכנית הלימודים המעודכנת ביותר, שנבנתה כדי להפוך אותך למומחה תוך שבועות.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_MODULES.map((module) => {
            const Icon = IconMap[module.icon] || Brain;
            return (
              <div key={module.id} className="glass p-8 rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{module.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {module.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{module.duration} של תוכן וידאו</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseModules;
