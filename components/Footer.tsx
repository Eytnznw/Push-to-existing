
import React from 'react';
import { Cpu, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold tracking-tight">AI MASTERY</span>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            אנחנו כאן כדי להכשיר את הדור הבא של מומחי הבינה המלאכותית בישראל. 
            הצטרפו לאלפי בוגרים שכבר שינו את הקריירה שלהם.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <a href="#" className="p-2 glass rounded-lg hover:text-purple-400 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-2 glass rounded-lg hover:text-purple-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="p-2 glass rounded-lg hover:text-purple-400 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">ניווט מהיר</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">על הקורס</a></li>
            <li><a href="#" className="hover:text-white transition-colors">תכנית הלימודים</a></li>
            <li><a href="#" className="hover:text-white transition-colors">קהילה</a></li>
            <li><a href="#" className="hover:text-white transition-colors">בלוג</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">תמיכה</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">צור קשר</a></li>
            <li><a href="#" className="hover:text-white transition-colors">תנאי שימוש</a></li>
            <li><a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} AI Mastery Academy. כל הזכויות שמורות.
      </div>
    </footer>
  );
};

export default Footer;
