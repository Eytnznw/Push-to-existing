
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Loader2, Sparkles, AlertCircle, Volume2, Globe, RefreshCcw, Mic, MicOff } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { speak } from '../services/ttsService';
import { ChatMessage } from '../types';
import { MAX_FREE_MESSAGES } from '../constants';

interface AIAssistantProps {
  onLimitReached: () => void;
  isSeniorMode: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onLimitReached, isSeniorMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<(ChatMessage & { sources?: any[] })[]>([
    { role: 'assistant', content: 'שלום! אני המוח של האקדמיה. אני מחובר לגוגל בזמן אמת – תשאלו אותי כל דבר על AI או בקשו ממני למצוא סרטון הדרכה.' }
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
    if (!SpeechRecognition) {
      alert("הדפדפן שלך לא תומך בזיהוי קולי.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
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
      const result = await getGeminiResponse(trimmedInput, messages.map(m => ({ role: m.role, content: m.content })));
      const assistantMessage = { role: 'assistant' as const, content: result.text, sources: result.sources };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);

      if (isSeniorMode) {
        handleSpeak(result.text);
      }
    } catch (err) {
      setIsLoading(false);
      setError("אירעה שגיאה בחיבור לשרת. אנא נסו שוב.");
    }
  };

  const handleSpeak = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      await speak(text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-40 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform animate-float ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot className="w-10 h-10 text-white" />
        <span className="text-[12px] font-black text-white mt-1 uppercase">עוזר חכם</span>
      </button>

      <div className={`fixed bottom-8 left-8 z-50 ${isSeniorMode ? 'w-[90vw] md:w-[500px] h-[80vh]' : 'w-[400px] h-[600px]'} glass rounded-[40px] flex flex-col shadow-2xl border-2 border-white/20 transition-all duration-500 ease-out transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 rounded-t-[40px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className={`font-black ${isSeniorMode ? 'text-2xl' : 'text-lg'}`}>המדריך הדיגיטלי</h4>
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-blue-400 animate-pulse" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Live Search Active</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`relative max-w-[90%] p-5 rounded-[28px] shadow-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-100 rounded-tl-none'} ${isSeniorMode ? 'text-2xl font-bold leading-relaxed' : 'text-sm'}`}>
                {msg.content}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">מקורות וקישורים:</p>
                    {msg.sources.slice(0, 3).map((source: any, idx: number) => (
                      <a key={idx} href={source.web?.uri} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-blue-300 hover:underline truncate">
                        🔗 {source.web?.title || source.web?.uri}
                      </a>
                    ))}
                  </div>
                )}
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => handleSpeak(msg.content)}
                    className="absolute -bottom-3 -left-3 p-3 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-purple-600' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-5 rounded-[28px] rounded-tl-none flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                <span className="text-xs text-gray-400">מחפש תשובה מדויקת...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
              <AlertCircle className="w-5 h-5 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-white/5 rounded-b-[40px]">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isSeniorMode ? "שאלו אותי משהו..." : "הקלידו שאלה..."}
                className={`w-full bg-black/40 border-2 border-white/10 rounded-2xl py-5 px-6 pr-14 focus:outline-none focus:border-purple-500/50 transition-all ${isSeniorMode ? 'text-2xl' : 'text-base'}`}
                disabled={isLoading || usageCount >= MAX_FREE_MESSAGES}
              />
              <button 
                onClick={startListening}
                className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
                title="דבר אלי"
              >
                {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim() || usageCount >= MAX_FREE_MESSAGES}
              className="p-4 bg-purple-600 rounded-2xl text-white hover:bg-purple-700 transition-colors disabled:opacity-30 disabled:hover:bg-purple-600"
            >
              {isLoading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 px-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase">נשארו {MAX_FREE_MESSAGES - usageCount} הודעות חינם</span>
            <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000" 
                style={{ width: `${((MAX_FREE_MESSAGES - usageCount) / MAX_FREE_MESSAGES) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
