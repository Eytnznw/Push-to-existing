
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Loader2, Sparkles, AlertCircle, Volume2, Globe, RefreshCcw, Mic, MicOff, BrainCircuit, Youtube, ExternalLink } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService.ts';
import { speak } from '../services/ttsService.ts';
import { ChatMessage } from '../types.ts';
import { MAX_FREE_MESSAGES } from '../constants.tsx';

interface AIAssistantProps {
  onLimitReached: () => void;
  isSeniorMode: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onLimitReached, isSeniorMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'search' | 'thinking'>('search');
  const [messages, setMessages] = useState<(ChatMessage & { sources?: any[] })[]>([
    { 
      role: 'assistant', 
      content: 'שלום! אני העוזר האישי של האקדמיה. אני יכול לחפש עבורך סרטוני הדרכה ביוטיוב או לחשוב לעומק על שאלות מורכבות. מה תרצה לדעת היום?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => setInput(event.results[0][0].transcript);
    recognition.start();
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    if (usageCount >= MAX_FREE_MESSAGES) {
      onLimitReached();
      return;
    }

    const userMessage = { role: 'user' as const, content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    setUsageCount(prev => prev + 1);

    try {
      const result = await getGeminiResponse(
        trimmedInput, 
        messages.map(m => ({ role: m.role, content: m.content })),
        mode
      );
      
      const assistantMessage = { role: 'assistant' as const, content: result.text, sources: result.sources };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      if (isSeniorMode) handleSpeak(result.text);
    } catch (err) {
      setIsLoading(false);
      setError("אירעה שגיאה בחיבור. נסה שוב.");
    }
  };

  const handleSpeak = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try { await speak(text); } finally { setIsSpeaking(false); }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-40 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform animate-float ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-10 h-10 text-white" />
        <span className="text-[10px] font-black text-white mt-1 uppercase">AI Assistant</span>
      </button>

      <div className={`fixed bottom-8 left-8 z-50 transition-all duration-500 ease-out transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'} ${isSeniorMode ? 'w-[90vw] md:w-[550px] h-[85vh]' : 'w-[420px] h-[650px]'} glass rounded-[40px] flex flex-col shadow-2xl border-2 border-white/20`}>
        
        {/* Header with Mode Switcher */}
        <div className="p-6 border-b border-white/10 bg-white/5 rounded-t-[40px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${mode === 'thinking' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-blue-500 shadow-blue-500/20'}`}>
                {mode === 'thinking' ? <BrainCircuit className="w-6 h-6 text-white" /> : <Globe className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h4 className="font-black text-lg">{mode === 'thinking' ? 'מצב חשיבה עמוקה' : 'מצב חימוש ומידע'}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{mode === 'thinking' ? 'Gemini 3 Pro Active' : 'Real-time Web Search'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setMode('search')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'search' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Globe className="w-3 h-3" /> חיפוש וסרטונים
            </button>
            <button 
              onClick={() => setMode('thinking')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'thinking' ? 'bg-orange-500/20 text-orange-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <BrainCircuit className="w-3 h-3" /> חשיבה (Pro)
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative max-w-[90%] p-5 rounded-[28px] shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-100 rounded-tl-none'} ${isSeniorMode ? 'text-2xl font-bold leading-relaxed' : 'text-sm'}`}>
                {msg.content}
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <p className="text-[10px] uppercase font-black text-blue-400 tracking-wider flex items-center gap-2">
                      <Youtube className="w-3 h-3 text-red-500" /> מקורות וסרטונים שמצאתי:
                    </p>
                    <div className="grid gap-2">
                      {msg.sources.slice(0, 4).map((source: any, idx: number) => {
                        const isVideo = source.web?.uri?.includes('youtube.com') || source.web?.uri?.includes('youtu.be');
                        return (
                          <a 
                            key={idx} 
                            href={source.web?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group"
                          >
                            <span className="text-[11px] text-gray-300 truncate max-w-[200px] font-medium">
                              {source.web?.title || 'קישור למידע'}
                            </span>
                            <ExternalLink className="w-3 h-3 text-blue-400 group-hover:scale-110 transition-transform" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => handleSpeak(msg.content)}
                    className="absolute -bottom-3 -left-3 p-3 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-blue-600' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-5 rounded-[28px] rounded-tl-none flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Loader2 className={`w-6 h-6 animate-spin ${mode === 'thinking' ? 'text-orange-400' : 'text-blue-400'}`} />
                  <span className="text-xs text-gray-400 font-bold">{mode === 'thinking' ? 'Gemini Pro חושב לעומק...' : 'מחפש מידע וסרטונים...'}</span>
                </div>
                {mode === 'thinking' && (
                  <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 animate-[loading_2s_ease-in-out_infinite]" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-white/5 rounded-b-[40px]">
          <div className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isSeniorMode ? "שאלו אותי משהו..." : "הקלידו שאלה או בקשו סרטון..."}
                className={`w-full bg-black/40 border-2 border-white/10 rounded-2xl py-5 px-6 pr-14 focus:outline-none focus:border-blue-500/50 transition-all ${isSeniorMode ? 'text-2xl' : 'text-base'}`}
                disabled={isLoading}
              />
              <button 
                onClick={startListening}
                className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-4 rounded-2xl text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-30 ${mode === 'thinking' ? 'bg-orange-600' : 'bg-blue-600'}`}
            >
              {isLoading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
};

export default AIAssistant;
