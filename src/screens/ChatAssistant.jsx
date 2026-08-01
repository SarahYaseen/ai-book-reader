import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw } from "lucide-react";

export default function ChatAssistant({ book }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Hello! I'm your AI Reading Assistant. Ask me anything about "${book.title}"! I can explain complex vocabulary, summarize chapters, or analyze characters.`
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    "Summarize current chapter",
    "Who are the main characters?",
    "What is the main theme?",
    "Explain difficult words"
  ];

  const handleSend = (textToSend) => {
    const userText = textToSend || inputText;
    if (!userText.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userText
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    // AI thinking latency
    setTimeout(() => {
      setLoading(false);
      let replyText = "";

      const query = userText.toLowerCase();

      // Context-aware response simulation based on selected book
      if (book.id === "gatsby") {
        if (query.includes("summar") || query.includes("chapter")) {
          replyText = "In Chapter 1, we meet Nick Carraway, who moves to West Egg and visits his cousin Daisy Buchanan and her wealthy husband Tom in East Egg. He is introduced to Jordan Baker and learns of Tom's affair. At night, he spots his neighbor, Jay Gatsby, reaching out toward a green light across the bay.";
        } else if (query.includes("character") || query.includes("protagonist")) {
          replyText = "The protagonist is Jay Gatsby, a mysterious, wealthy man who throws extravagant parties. Other key characters are Nick Carraway (the narrator), Daisy Buchanan (Gatsby's lost love), Tom Buchanan (Daisy's arrogant husband), and Jordan Baker (a professional golfer).";
        } else if (query.includes("theme")) {
          replyText = "Key themes in 'The Great Gatsby' include the decay of the American Dream, the division of social classes (old money vs. new money), the illusion of wealth, love and obsession, and the weight of the past.";
        } else {
          replyText = "That's a fascinating question about Gatsby. Fitzgerald's work explores the vanity of the Jazz Age, showing Gatsby's hopeless romantic pursuit of Daisy. Nick Carraway observes that Gatsby believed in the green light, the orgastic future that year by year recedes before us.";
        }
      } else if (book.id === "history-time") {
        if (query.includes("summar") || query.includes("chapter")) {
          replyText = "Chapter 1 traces the history of human understandings of the universe, starting from ancient beliefs (like Aristotle's spherical earth and the mythic flat earth supported by a giant tortoise) to Copernicus, Galileo, and Newton's gravitational model.";
        } else if (query.includes("character") || query.includes("who is")) {
          replyText = "As a non-fiction science book, there are no characters, but Stephen Hawking frequently references famous physicists like Albert Einstein, Isaac Newton, Galileo Galilei, Nicolaus Copernicus, and Edwin Hubble.";
        } else if (query.includes("theme")) {
          replyText = "The main theme is the search for a unified theory of physics—a single model that combines quantum mechanics (the physics of the very small) with general relativity (the physics of the very large) to explain everything in the universe.";
        } else {
          replyText = "Hawking's book breaks down cosmology into readable ideas. He explains how space and time are dynamic, and how black holes might emit radiation, which we now call Hawking Radiation.";
        }
      } else {
        // Fallback for custom uploaded documents
        if (query.includes("summar") || query.includes("chapter")) {
          replyText = `Based on your uploaded document "${book.title}", the initial chapters establish the core concepts. The AI summarizes this as an introductory exposition outlining the core goals, background variables, and developmental layout of the content.`;
        } else if (query.includes("character")) {
          replyText = "Since this is an uploaded document, I don't see distinct fictional characters. Instead, I see a structured exposition of educational ideas and subject matter analysis.";
        } else {
          replyText = `I have analyzed the text of "${book.title}". Your question relates to key themes in the document. To get full OpenAI API completions, make sure to launch the backend Express server and configure your API key!`;
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "ai",
        text: replyText
      }]);
    }, 1200);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-screen animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* App Header */}
      <div className="app-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="header-btn" style={{ background: "rgba(99,102,241,0.15)", color: "var(--primary-color)" }}>
            <Sparkles size={14} />
          </div>
          <div>
            <h1 style={{ fontSize: "14px", lineHeight: "1.2" }}>ReadAI Assistant</h1>
            <span style={{ fontSize: "9px", color: "var(--text-muted)", display: "block" }}>Context: {book.title}</span>
          </div>
        </div>
      </div>

      {/* Chat History bubbles */}
      <div className="chat-history">
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble ${m.sender}`}>
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble ai" style={{ display: "flex", gap: "4px", padding: "12px 16px" }}>
            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>AI is analyzing text...</span>
            <RefreshCw size={12} className="text-secondary" style={{ animation: "rotateDisk 1.2s linear infinite" }} />
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Quick Prompts slider */}
      <div className="quick-prompts">
        {quickPrompts.map((p, idx) => (
          <button 
            key={idx} 
            className="quick-prompt-btn"
            onClick={() => handleSend(p)}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input textbox */}
      <div className="chat-input-area">
        <input 
          type="text" 
          className="chat-input"
          placeholder="Ask a question about the book..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
          disabled={loading}
        />
        <button 
          className="chat-send-btn"
          onClick={() => handleSend()}
          disabled={loading || !inputText.trim()}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
