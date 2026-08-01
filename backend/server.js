import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "MOCK_KEY_DISCONNECTED",
});

// Middleware to verify OpenAI API Key is present
const verifyApiKey = (req, res, next) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(401).json({
      error: "Missing OpenAI API Key",
      isMock: true,
      message: "Please configure OPENAI_API_KEY in backend/.env file to run real AI API integrations."
    });
  }
  next();
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", apiStatus: process.env.OPENAI_API_KEY ? "connected" : "mock-mode" });
});

/**
 * 1. AI Book Translator Endpoint
 * Translates book paragraphs into ur, ar, zh, es, fr, en
 */
app.post("/api/translate", async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Missing required fields 'text' or 'targetLang'" });
  }

  // Language code translation mappings
  const langNames = {
    en: "English",
    ur: "Urdu (اردو)",
    ar: "Arabic (العربية)",
    zh: "Chinese (中文)",
    es: "Spanish (Español)",
    fr: "French (Français)"
  };

  const targetLangName = langNames[targetLang] || targetLang;

  try {
    // If running in Mock Mode (no API key configured)
    if (openai.apiKey === "MOCK_KEY_DISCONNECTED") {
      return res.json({
        translatedText: `[Simulated Real-time translation to ${targetLangName}]:\n\n"${text.substring(0, 100)}..."\n\n(Configure your OPENAI_API_KEY in backend/.env to connect this API to real GPT translations.)`,
        isMock: true
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert translator. Translate the following text into ${targetLangName}. Preserve formatting and tone. Retain the same paragraphs.`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3
    });

    res.json({
      translatedText: response.choices[0].message.content,
      isMock: false
    });
  } catch (error) {
    console.error("Translation API error:", error);
    res.status(500).json({ error: "Translation request failed", details: error.message });
  }
});

/**
 * 2. AI Reading Assistant Chatbot Endpoint
 * Provides context-aware answers about the current book chapter
 */
app.post("/api/chat", async (req, res) => {
  const { bookTitle, chapterTitle, paragraphText, query, history } = req.body;

  if (!bookTitle || !query) {
    return res.status(400).json({ error: "Missing required fields 'bookTitle' or 'query'" });
  }

  try {
    // If running in Mock Mode
    if (openai.apiKey === "MOCK_KEY_DISCONNECTED") {
      return res.json({
        replyText: `[Simulated Assistant reply about "${bookTitle}"]: You asked: "${query}". Connecting this backend server to OpenAI allows real-time vector embeddings or chat queries about this paragraph: "${paragraphText?.substring(0, 50)}..."`,
        isMock: true
      });
    }

    const messages = [
      {
        role: "system",
        content: `You are a premium AI reading assistant called "ReadAI". Your goal is to help readers understand the book: "${bookTitle}".
        The reader is currently looking at: "${chapterTitle || "General chapter"}"
        Specific passage content context: "${paragraphText || "Not specified"}"
        
        Answer their questions clearly, analyze characters, explain difficult words, summarize concepts, and help them engage with the material. Keep your responses highly helpful, literary, and engaging.`
      }
    ];

    // Append chat history (if provided)
    if (history && Array.isArray(history)) {
      history.forEach(msg => {
        messages.push({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        });
      });
    }

    // Add current user query
    messages.push({
      role: "user",
      content: query
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.5
    });

    res.json({
      replyText: response.choices[0].message.content,
      isMock: false
    });
  } catch (error) {
    console.error("AI Chatbot API error:", error);
    res.status(500).json({ error: "AI Chatbot request failed", details: error.message });
  }
});

/**
 * 3. Text-to-Speech (TTS) Narrator Endpoint
 * Connects to OpenAI Audio TTS API and streams MP3 output back to the client
 */
app.get("/api/tts", async (req, res) => {
  const { text, voice } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Missing required query parameter 'text'" });
  }

  // Allowed OpenAI voices: alloy, echo, fable, onyx, nova, shimmer
  const selectedVoice = voice || "alloy";

  try {
    // If mock mode, return standard alert
    if (openai.apiKey === "MOCK_KEY_DISCONNECTED") {
      return res.status(200).json({
        message: "TTS Mock Mode: In the live app, this returns an audio stream. Currently executing local Web Speech API narration in client browser for full responsiveness.",
        isMock: true
      });
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: selectedVoice,
      input: text,
    });

    // Set audio header content type
    res.setHeader("Content-Type", "audio/mpeg");
    
    // Convert speech stream to buffer and pipe to express response
    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.send(buffer);

  } catch (error) {
    console.error("Text-To-Speech API error:", error);
    res.status(500).json({ error: "Speech synthesis failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`ReadAI backend listening on http://localhost:${PORT}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY ? "CONNECTED" : "DISCONNECTED (Running in simulation mode)"}`);
});
