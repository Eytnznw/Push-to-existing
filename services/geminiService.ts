
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
אתה העוזר האישי הבכיר של "אקדמיית AI Mastery". 
התפקיד שלך הוא להנגיש את עולם הבינה המלאכותית לכולם - מתלמידים צעירים ועד אזרחים ותיקים.

יכולות מיוחדות:
1. מציאת סרטונים: כשמשתמש מבקש סרטון או הדרכה, השתמש בכלי החיפוש כדי למצוא קישורי יוטיוב רלוונטיים והצג אותם בצורה ברורה.
2. הסבר פשוט: תמיד הסבר מושגים טכניים בצורה פשוטה (למשל: "פרומפט זה כמו מתכון לעוגה").
3. מקורות: תמיד ציין מאיפה המידע הגיע אם השתמשת בחיפוש.

אם אתה במצב "חשיבה עמוקה" (Thinking Mode), התמקד בניתוח לוגי, פתרון בעיות מורכבות וכתיבת קוד או טקסטים ארוכים.
אם אתה במצב "חיפוש", התמקד במהירות ובמידע אקטואלי מהרשת.
`;

export async function getGeminiResponse(
  userPrompt: string, 
  history: { role: 'user' | 'assistant', content: string }[], 
  mode: 'search' | 'thinking' = 'search'
) {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return { text: "שגיאה: חסר מפתח API במערכת.", sources: [] };
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: userPrompt }]
  });

  try {
    const isThinking = mode === 'thinking';
    const modelName = isThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: isThinking ? 1.0 : 0.7,
    };

    if (isThinking) {
      // High-intelligence mode with reasoning
      config.thinkingConfig = { thinkingBudget: 32768 };
    } else {
      // Speed and current info mode
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents as any,
      config: config,
    });

    if (!response || !response.text) {
      throw new Error("Empty response from Gemini");
    }

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return { 
      text: "מצטער, הייתה לי תקלה קטנה בחיבור למוח הדיגיטלי. נסו שוב בעוד רגע.", 
      sources: [] 
    };
  }
}
