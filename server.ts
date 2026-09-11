import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google GenAI on server side
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "CareSetu API", timestamp: new Date().toISOString() });
  });

  // AI Health Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not configured yet
        const isHindi = language === "hi";
        return res.json({
          reply: isHindi
            ? `नमस्कार! मैं केयरसेतु एआई सहायक हूँ। आपका प्रश्न था: "${message}"।\n\nकीट-पतंगे, बुखार, पोषण या सरकारी योजनाओं के बारे में जानकारी के लिए आप केयरसेतु ऐप के मॉड्यूल देख सकते हैं।\n\n⚠️ सूचना: मैं केवल स्वास्थ्य जागरूकता के लिए हूँ, डॉक्टर का विकल्प नहीं हूँ। आपात स्थिति में तुरंत 108 पर कॉल करें या नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) जाएँ।`
            : `Hello! I am CareSetu AI Assistant. Regarding your question: "${message}".\n\nFor health awareness, first aid, or government scheme guidance, please check our CareSetu modules.\n\n⚠️ Note: I provide health awareness only, not medical diagnosis. In an emergency, please call 108 or visit your nearest Primary Health Centre (PHC) immediately.`,
        });
      }

      const systemInstruction = `You are CareSetu AI (केयरसेतु एआई), a friendly, simple-language rural health awareness assistant for Indian communities.
Language preference: ${language === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
Guidelines:
1. Respond in clear, simple ${language === 'hi' ? 'Hindi (or simple Hinglish if appropriate)' : 'English'}.
2. Use short bullet points, friendly tone, and simple terms suitable for rural community members.
3. Keep responses concise (under 200 words).
4. ALWAYS add a clear disclaimer at the end:
   - English: "⚠️ Disclaimer: This is for health awareness only, not medical diagnosis. Please consult a doctor at your nearest PHC/hospital. In emergencies, call 108."
   - Hindi: "⚠️ सूचना: यह केवल स्वास्थ्य जागरूकता के लिए है, चिकित्सा निदान नहीं। कृपया अपने नजदीकी प्राथमिक स्वास्थ्य केंद्र/अस्पताल में डॉक्टर से परामर्श लें। आपात स्थिति में 108 पर कॉल करें।"
5. Never prescribe dosages or give definitive medical diagnoses.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || (language === 'hi' ? 'क्षमा करें, मैं जवाब प्रोसेस नहीं कर सका। कृपया डॉक्टर से सलाह लें।' : 'Sorry, I could not process that request. Please consult a doctor.');

      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      const isHindi = req.body?.language === "hi";
      return res.status(500).json({
        reply: isHindi
          ? "सर्वर व्यस्त है। स्वास्थ्य सहायता के लिए कृपया निकटतम स्वास्थ्य केंद्र (PHC) या 108 पर संपर्क करें।"
          : "Server is currently busy. For health assistance, please contact your nearest PHC or call 108.",
      });
    }
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CareSetu Server running on http://localhost:${PORT}`);
  });
}

startServer();
