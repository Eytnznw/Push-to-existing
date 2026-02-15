
import React from 'react';
import { X, Check, Star, Zap, ShieldCheck } from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative glass w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-600/20 to-transparent -z-10" />
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12 text-center">
          <div className="inline-flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-widest mb-4">
            <Zap className="w-4 h-4 fill-purple-400" />
            מבצע השקה מוגבל
          </div>
          
          <h3 className="text-3xl font-extrabold mb-4">הפכו למאסטרים ב-AI היום</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            הגעת לקצה גבול היכולת של המדריך החינמי. פתח גישה מלאה לכל השיעורים, המשימות והעוזר האישי ללא הגבלה.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-right space-y-4">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm">מעל 120 שיעורי וידאו מוקלטים</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm">גישה לקהילת ה-VIP וסדנאות לייב</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm">צ'אט בוט אישי צמוד 24/7 ללא הגבלה</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 shrink-0" />
              <span className="text-sm">עדכונים לכל החיים לכלים חדשים</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-4xl font-black text-white mb-1">₪499</div>
            <div className="text-sm text-gray-500 line-through">במקום ₪1,200</div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-purple-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            רכישה בטוחה וגישה מיידית
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-gray-500 font-medium">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              תשלום מאובטח
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              התחייבות להחזר כספי (14 יום)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
