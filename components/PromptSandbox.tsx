
import React, { useState } from 'react';
import { Play, Sparkles, Lightbulb, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService.ts';

const PromptSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const testPrompt = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(false);
    
    try {
      const { text } = await getGeminiResponse(`הנה פרומפט שמשתמש כתב: "${prompt}". תן לו תוצאה קצרה של מה שהיה יוצא (כ-2 משפטים), ואז תן לו טיפ אחד איך לשפר את הפרומפט כדי שיהיה יותר מקצועי. תפריד בין התוצאה לטיפ עם המילה הספציפית: 'TIP_SPLIT_HERE'.`, [], 'search');
      
      if (text.includes('TIP_SPLIT_HERE')) {
        const parts = text.split('TIP_SPLIT_HERE');
        setResult(parts[0].trim());
        setFeedback(parts[1].trim());
      } else {
        setResult(text);
        setFeedback("הפרומפט שלך מעניין! נסה להוסיף יותר הקשר (Context) כדי לקבל תוצאה טובה יותר.");
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "תכתוב לי ברכה מרגשת לסבתא בת 80",
    "איך להכין פיצה ביתית ב-10 דקות?",
    "כתוב מייל רשמי לבוס על העלאה בשכר"
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto glass rounded-[40px] p-8 md:p-12 border border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles className="w-32 h-32 text-blue-400" />
        </div>
        
        <div className="relative z-10 text-right">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-end gap-3">
            ארגז החול: נסו בעצמכם
            <Play className="w-8 h-8 text-blue-400 fill-blue-400" />
          </h2>
          <p className="text-gray-400 mb-8">
            כאן תוכלו לתרגל כתיבת בקשות (פרומפטים) ולקבל משוב מיידי מהמערכת שלנו.
          </p>

          <div className="space-y-6">
            <div className="text-right">
              <label className="block text-sm font-medium mb-3 text-gray-300">הבקשה שלכם:</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="למשל: תכתוב לי תוכנית אימונים לשבוע..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 transition-colors min-h-[120px] outline-none text-right"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setPrompt(s)}
                  className="text-xs glass px-3 py-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={testPrompt}
                disabled={isLoading || !prompt}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl flex items-center justify-center gap-2 w-full sm:w-auto transition-all disabled:opacity-50"
              >
                {isLoading ? 'מנתח פרומפט...' : 'בדוק את הפרומפט'}
                <Sparkles className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 justify-end text-red-400 text-sm">
                משהו השתבש בעיבוד הבקשה. נסו שוב.
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}

            {result && !isLoading && (
              <div className="mt-8 grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-right">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h4 className="text-sm font-bold text-gray-400 mb-3 flex items-center justify-end gap-2">
                    התוצאה שהייתה מתקבלת:
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </h4>
                  <p className="text-sm leading-relaxed">{result}</p>
                </div>
                <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                  <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center justify-end gap-2">
                    טיפ לשדרוג:
                    <Lightbulb className="w-4 h-4" />
                  </h4>
                  <p className="text-sm leading-relaxed text-blue-100">{feedback}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptSandbox;
