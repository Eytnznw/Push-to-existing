
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../constants.tsx';

const FAQItem: React.FC<{ faq: { question: string, answer: string } }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-right group"
      >
        <span className="text-lg font-bold group-hover:text-purple-400 transition-colors">{faq.question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-purple-400" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 mb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 leading-relaxed text-right">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 px-6 bg-white/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">שאלות נפוצות</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
