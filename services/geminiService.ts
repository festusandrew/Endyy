import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';
import { ChatMessage } from '../types';

// @ts-ignore - Bypass Vite env typing syntax error
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getBakerResponse = async (userMessage: string, history: ChatMessage[] = []): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my baking brain isn't connected right now (Missing API Key). But I recommend the Cherry Choco Bliss!";
  }

  try {
    const productCatalog = PRODUCTS.map(p => `- ${p.name} (${p.category}): ₦${p.price.toLocaleString()}`).join('\n      ');

    const formattedHistory = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are 'Baker Ben', the friendly AI assistant for Enddy's, a premium online cake and dessert shop.
      
      Brand Tone: Warm, artisanal, delicious, trustworthy, premium.
      Brand Colors: Cream, Warm Brown, Soft Pink.
      
      Your goal is to help customers choose desserts based on their needs (birthdays, allergies, taste preferences), and give them accurate pricing information.
      
      Here is our current live menu and prices in Naira (₦):
      ${productCatalog}
      
      Keep responses short (under 50 words), helpful, and always try to sound appetizing. If asked about prices, always use the ₦ symbol.`
      }
    });

    return response.text || "I'm busy taking a cake out of the oven! Please ask again in a moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! I dropped the flour. Can you ask that again?";
  }
};
