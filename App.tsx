
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import CourseModules from './components/CourseModules.tsx';
import FAQSection from './components/FAQSection.tsx';
import Footer from './components/Footer.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import PurchaseModal from './components/PurchaseModal.tsx';
import PromptSandbox from './components/PromptSandbox.tsx';
import VideoGallery from './components/VideoGallery.tsx';
import ImageGenerator from './components/ImageGenerator.tsx';
import CourseRoadmap from './components/CourseRoadmap.tsx';
import GoogleSimulator from './components/GoogleSimulator.tsx';

const App: React.FC = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSeniorMode, setIsSeniorMode] = useState(false);

  useEffect(() => {
    if (isSeniorMode) {
      document.body.classList.add('senior-mode');
    } else {
      document.body.classList.remove('senior-mode');
    }
  }, [isSeniorMode]);

  return (
    <div className="min-h-screen selection:bg-purple-500/50 bg-[#030712] text-white overflow-x-hidden">
      <Header 
        isSeniorMode={isSeniorMode} 
        onToggleSeniorMode={() => setIsSeniorMode(!isSeniorMode)} 
      />
      
      <main>
        <Hero />
        
        <section className="px-6 -mt-10 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-4 block">As seen on search</span>
              <h2 className="text-3xl font-bold">איך אנחנו נראים בגוגל?</h2>
            </div>
            <GoogleSimulator />
          </div>
        </section>

        <CourseRoadmap />

        <PromptSandbox />

        <ImageGenerator />

        <VideoGallery />

        <CourseModules />
        
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[60px] flex flex-col md:flex-row items-center gap-16 border border-white/10 shadow-2xl">
            <div className="flex-1 text-right">
              <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-6 tracking-widest uppercase">
                Limited Time Offer
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                אל תחכו לעתיד,<br />
                <span className="gradient-text">תיצרו אותו.</span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 leading-relaxed">
                הצטרפו לקהילה של מעל 1,500 תלמידים ששינו את חייהם. קבלו גישה לכלים הכי מתקדמים, ליווי אישי וסרטונים בלעדיים.
              </p>
              <button 
                onClick={() => setIsPurchaseModalOpen(true)}
                className="group relative bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-purple-50 transition-all shadow-2xl flex items-center justify-center gap-4 overflow-hidden"
              >
                <span className="relative z-10">אני רוצה להתחיל עכשיו</span>
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                   <svg className="w-4 h-4 text-white -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </button>
            </div>
            <div className="flex-1 w-full max-w-xl aspect-square relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[80px] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className="relative z-10 w-full h-full glass rounded-[80px] border border-white/20 flex items-center justify-center p-4 overflow-hidden shadow-2xl">
                <img 
                   src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=70&w=800" 
                   alt="AI Intelligence" 
                   loading="lazy"
                   className="w-full h-full object-cover rounded-[60px] group-hover:scale-105 transition-transform duration-[3000ms]"
                />
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>

      <Footer />

      <AIAssistant 
        isSeniorMode={isSeniorMode}
        onLimitReached={() => setIsPurchaseModalOpen(true)} 
      />

      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onClose={() => setIsPurchaseModalOpen(false)} 
      />
    </div>
  );
};

export default App;
