
import React from 'react';
import { Cpu, Accessibility, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isSeniorMode: boolean;
  onToggleSeniorMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSeniorMode, onToggleSeniorMode }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-500 to-purple-600 p-2 rounded-lg">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI MASTERY
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={onToggleSeniorMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isSeniorMode ? 'bg-yellow-500 text-black font-bold' : 'glass text-gray-300 hover:text-white'}`}
          >
            <Accessibility className="w-4 h-4" />
            {isSeniorMode ? 'מצב רגיל' : 'מצב פשוט (לסבתא וסבא)'}
          </button>
          <a href="#about" className="text-sm font-medium hover:text-purple-400 transition-colors">על הקורס</a>
          <a href="#modules" className="text-sm font-medium hover:text-purple-400 transition-colors">סילבוס</a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20">
            הרשמה מהירה
          </button>
        </nav>
        
        <div className="md:hidden flex items-center gap-2">
           <button onClick={onToggleSeniorMode} className="p-2 glass rounded-lg"><Accessibility className="w-5 h-5" /></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
