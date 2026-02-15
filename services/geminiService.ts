
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
אתה העוזר האישי הבכיר של "אקדמיית AI Mastery". 
התפקיד שלך הוא להנגיש את עולם הבינה המלאכותית לכולם - מתלמידים צעירים ועד אזרחים ותיקים.
ענה תמיד בעברית ברורה, סבלנית ומקצועית.
`;

export async function getGeminiResponse(
  userPrompt: string, 
  history: { role: 'user' | 'assistant', content: string }[], 
  mode: 'search' | 'thinking' = 'search'
) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return { text: "שגיאה: חסר מפתח API.", sources: [] };

  const ai = new GoogleGenAI({ apiKey });
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  contents.push({ role: 'user', parts: [{ text: userPrompt }] });

  try {
    const isThinking = mode === 'thinking';
    const modelName = isThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: isThinking ? 1.0 : 0.7,
    };

    if (isThinking) {
      config.thinkingConfig = { thinkingBudget: 32768 };
    } else {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents as any,
      config: config,
    });

    return { 
      text: response.text || "לא התקבלה תשובה מהמודל.", 
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] 
    };
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return { text: "חלה שגיאה בתקשורת עם השרת. נסו שוב בעוד רגע.", sources: [] };
  }
}

export async function generateAIImage(prompt: string) {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("Missing API Key");

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (part?.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
}
