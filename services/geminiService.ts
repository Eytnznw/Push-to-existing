
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
אתה עוזר אישי חכם עבור "אקדמיית AI Mastery". 
התפקיד שלך הוא לעזור לתלמידים (מכל הגילאים, כולל מבוגרים) להבין AI.
אם המשתמש שואל על סרטונים או הדרכות, השתמש בכלי החיפוש של גוגל כדי למצוא קישורים רלוונטיים מיוטיוב או אתרים מובילים.
דבר בעברית פשוטה וברורה. במצב "סבתא", השתמש במשפטים קצרים מאוד והסברים ללא מונחים טכניים.
חשוב: כשאתה מתבקש לענות בפורמט מסוים (כמו שימוש ב-TIP_SPLIT_HERE), עקוב אחריו בדיוק רב.
תמיד תציג את המקורות (URLs) שמצאת בסוף התשובה בצורה אסתטית אם השתמשת בחיפוש.
`;

export async function getGeminiResponse(userPrompt: string, history: { role: 'user' | 'assistant', content: string }[], useSearch = true) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  try {
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents as any,
      config: config,
    });

    if (!response || !response.text) {
      return { 
        text: "מצטער, התוכן נחסם מטעמי בטיחות או שיש תקלה זמנית. נסה לשאול בצורה אחרת.", 
        sources: [] 
      };
    }

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return { text: "הייתה תקלה בתקשורת עם השרת. אנא נסו שוב בעוד רגע.", sources: [] };
  }
}
