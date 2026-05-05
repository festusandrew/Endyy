import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getBakerResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my baking brain isn't connected right now (Missing API Key). But I recommend the Cherry Choco Bliss!";
  }

  try {
    const model = ai.models.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: `You are 'Baker Ben', the friendly AI assistant for Enddy's, a premium online cake and dessert shop.
      
      Brand Tone: Warm, artisanal, delicious, trustworthy, premium.
      Brand Colors: Cream, Warm Brown, Soft Pink.
      
      Your goal is to help customers choose desserts based on their needs (birthdays, allergies, taste preferences).
      
      We sell:
      - Cakes (Blueberry Bliss, Royal Chocolate, Ocean Velvet)
      - Cupcakes (Vanilla Bean, Cherry Choco Bliss, Pink Velvet Kiss)
      - Yogurt Parfaits (Morning Berry, Mango Tango)
      
      Keep responses short (under 50 words), helpful, and always try to sound appetizing. If asked about ingredients, emphasize freshness.`
    });

    const response = await model.generateContent({
      contents: userMessage,
    });

    return response.text || "I'm busy taking a cake out of the oven! Please ask again in a moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! I dropped the flour. Can you ask that again?";
  }
};
